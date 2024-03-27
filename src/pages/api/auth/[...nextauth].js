import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
import { getUserExists, getUserByGoogleId } from "@/lib/mongodb/users"


export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// FacebookProvider({
		// 	clientId: process.env.FACEBOOK_CLIENT_ID,
		// 	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		// }),
		// ...add more providers here
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
			}
			return false
		},
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
				token.user = await getUserByGoogleId(token.sub)
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
export default NextAuth(authOptions)