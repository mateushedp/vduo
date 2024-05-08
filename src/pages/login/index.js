import { useState, useEffect } from "react"
import { getProviders } from "next-auth/react"

import { MoveRight } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import SocialsButton from "@/components/ui/socialsButton"

export default function Login() {
	const [openDialogSignup, setOpenDialogSignup] = useState(false)
	const [openDialogLogin, setOpenDialogLogin] = useState(false)
	const [providers, setProviders] = useState()


	useEffect(() => {
		//essa função busca todos os providers de autenticação do nextauth atualmente sendo usados
		(async () => {
			const result = await getProviders()

			setProviders(result)
		})()

	}, [])


	return(
		<div>
			<Dialog open={openDialogSignup} onOpenChange={setOpenDialogSignup}>
				<DialogContent className="py-16 px-10">
					<DialogHeader className="">
						<DialogTitle className="text-black">Join VDuo</DialogTitle>
						<DialogDescription>
							Find players to form groups and play together
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-2.5 mt-5">
						<SocialsButton social={"Facebook"}/>
						<SocialsButton social={"Google"} provider={providers?.google.id}/>
						<SocialsButton social={"Discord"}/>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={openDialogLogin} onOpenChange={setOpenDialogLogin}>
				<DialogContent className="py-16 px-10">
					<DialogHeader className="">
						<DialogTitle className="text-black">Welcome back!</DialogTitle>
						<DialogDescription>
							Please log in
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-2.5 mt-5">
						<SocialsButton social={"Facebook"} />
						<SocialsButton social={"Google"} provider={providers?.google.id}/>
						<SocialsButton social={"Discord"}/>
					</div>
				</DialogContent>
			</Dialog>
			<div className="absolute w-screen h-screen bg-cover bg-[url('/img/cover.jpg')] opacity-60">
			

			</div>
			<main className="relative text-white">
				<nav className="flex justify-between items-center h-16 px-4">
					<img src="/img/valorant_icon.png" alt="" width={60}/>
	
					<div className="flex justify-between text-xl gap-10" >
						<button className="hover:underline" onClick={() => setOpenDialogLogin(true)}>LOG IN</button>
						<button className="rounded-full bg-main-red px-11 py-1 shadow-[4px_0_4px_0_rgba(0,0,0,0.75)] hover:underline" onClick={() => setOpenDialogSignup(true)}>Sign Up</button>
					</div>
				</nav>

				<section className="mx-auto w-fit mt-32">
					<div className="text-7xl font-bold ">
						<p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Find your duo.</p>
						<p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Grind together.</p>
						<p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Be the best player you can be!</p>
					</div>

					<p className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-9">
						VDUO - A social platform that helps you form groups in Valorant
					</p>

					<div className="flex justify-center mt-20">
						<button className="flex items-center gap-4 rounded-xl bg-main-red px-24 py-4 text-2xl shadow-[0_4px_4px_0_rgba(0,0,0,1)]"
							onClick={() => setOpenDialogSignup(true)}>
						Join VDUO
							<MoveRight />
						</button>
					</div>

				</section>
	
			</main>
		</div>
	)

}