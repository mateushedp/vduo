import mongoose from "mongoose"
import User from "@/lib/mongodb/models/User"
import PlayerCard from "@/components/ui/player-card"
import { useState } from "react"
import { LucideUserPlus2 } from "lucide-react"
import { CustomDialog } from "@/components/ui/custom-dialog"


export default function Players({players}) {
	const [openInviteModal, setOpenInviteModal] = useState(false)

	return (
		<div className="mt-8">
			<h2>Jogadores</h2>
			<div className="flex flex-col gap-2">
				{players.length>0 && 
			players.map(player => {
				return(
					<>
						<PlayerCard
							key={player._id}
							player={player}
						>
							<div className="my-6 flex items-center justify-center">
								<button className="w-[75px] flex flex-col items-center justify-center gap-2"
									onClick={() => setOpenInviteModal(true)}>
									<LucideUserPlus2 size={30}/>
									<p>Adicionar</p>
								</button>
							</div>
						</PlayerCard>
						<CustomDialog
							open={openInviteModal}
							setOpen={setOpenInviteModal}
							title="Enviar convite"
							description={`Enviar convite para ${player.name.split(" ")[0]}?`}
							player={player}	
						/>
					</>
				)
			})
				}
			</div>
			
		</div>
	)
}

export async function getServerSideProps(context) {
	let players = null
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("DB connected")
		players = await User.find({})
		players = JSON.parse(JSON.stringify(players))
		
		
		// console.log(players)
	} catch (error) {
		console.log("There was an error connection to the DB", error)
	}

	// let agents, roles = []
	// const agentsResult = await axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
	// const agentsResultArray = agentsResult.data.data

	// agents = agentsResultArray.map(agent => {
	// 	if(!roles.find(role => role.name === agent.role.displayName)){
	// 		roles.push({
	// 			iconUrl: agent.role.displayIcon
	// 		})
	// 	}
	// 	return {
	// 		iconUrl: agent.displayIcon
	// 	}
	// })

	


	return { props: { players}}

}
