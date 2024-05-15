import {useRouter} from "next/router"
import "@/styles/globals.css"
import { Roboto_Condensed } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import Layout from "@/components/ui/layout"


const robotoC = Roboto_Condensed({ subsets: ["latin"] })

export default function App({ Component, pageProps }) {

	const router = useRouter()
	const { asPath } = router
	if(asPath.startsWith("/login")) {
		return (
			<SessionProvider session={pageProps.session}>
				<main className={robotoC.className}>
					<Component {...pageProps} />
				</main>
			</SessionProvider>
		)
	} else {
		return (
			<SessionProvider session={pageProps.session}>
				<main className={robotoC.className}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</main>
			</SessionProvider>
		)
	}
	
}
