import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import DiscordProvider from "next-auth/providers/discord"
import { getUserExists, getUserByEmail } from "@/lib/mongodb/models/User"
import { setCookie } from "nookies"

const scopes = ["identify", "email"].join(" ")


export const authOptions = (req, res) => {
	return {
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			}),
			DiscordProvider({
				clientId: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET,
				callbackUrl : "/players",
				authorization: {params: {scope: scopes}},
			}),
			FacebookProvider({
				clientId: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			}),
		],
		session: {
			strategy: "jwt",
		// maxAge: 60 * 60,
		},
		pages: {
			signIn: "/login"
		},
		callbacks: {
			async signIn(account) {

				const doesUserExist = await getUserExists(account.user.email)
				
				if(doesUserExist){

					return true

				} else {

					setCookie({ res }, "user", JSON.stringify(account.user), {
						maxAge: 2 * 24 * 60 * 60,
						path: "/",
						httpOnly: true,
					})

					setCookie({ res }, "provider", account.account.provider, {
						maxAge: 2 * 24 * 60 * 60, // 2 days
						path: "/",
						httpOnly: true,
					})
				}
				return "/login/signup"
			},
			async jwt({ token, account }) {
				if (account) {
					token.accessToken = account.access_token
					token.user = await getUserByEmail(token.email)
				} else {
					token.user = {
						email: token.email,
						sub: token.sub
					}
				}
				return token
			},

			async session({ session, token}){

				session.user = token.user
			
				return session
			}
		},
		secret: process.env.NEXTAUTH_SECRET,
	}
}
export default (req, res) => {
	return NextAuth(req, res, authOptions(req, res))
}