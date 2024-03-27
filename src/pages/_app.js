import "@/styles/globals.css"
import { Roboto_Condensed } from "next/font/google"
import { SessionProvider } from "next-auth/react"


const robotoC = Roboto_Condensed({ subsets: ["latin"] })

export default function App({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<main className={robotoC.className}>
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	)
}
