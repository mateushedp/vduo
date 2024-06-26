import { signIn } from "next-auth/react"


export default function SocialsButton({social, provider}) {
	return (
		<button className="flex items-center justify-start w-full border border-black rounded-sm py-3 px-5 hover:shadow-lg" onClick={() => {
			if(provider){
				signIn(provider, { callbackUrl: "/players"})
			}
		}}>
			<img src={`/img/socialIcons/${social}.png`} alt="" className="mr-2" />
			<div className="flex-grow flex justify-center">
				<p className="font-bold text-muted-foreground">Continue with {social}</p>
			</div>
		</button>
	)
}