import mongoose from "mongoose"
import User from "@/lib/mongodb/models/User"
import PlayerCard from "@/components/ui/player-card"
import { useState } from "react"
import { LucideX, LucideStar, LucideCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomDialog } from "@/components/ui/custom-dialog"


export default function Friends({players}) {

	const [openTab, setOpenTab] = useState("friends")
	const [openRemoveFriendModal, setOpenRemoveFriendModal] = useState(false)
	const [openRateFriendModal, setOpenRateFriendModal] = useState(false)


	return (
		<div className="mt-8">

			<CustomDialog
				open={openRemoveFriendModal}
				setOpen={setOpenRemoveFriendModal}
				title="Remover Amizade"
				description="Deseja remover esse perfil da sua lista de amigos?"	
			/>
			<CustomDialog
				open={openRateFriendModal}
				setOpen={setOpenRateFriendModal}
				title="Avaliar Amigo"
				description="Como você avalia esse perfil?"
				rating={true}
			/>
			<div className="flex justify-center">
				<Tabs value={openTab} onValueChange={setOpenTab} className="w-[300px]">
					<TabsList>
						<TabsTrigger value="friends">Amigos</TabsTrigger>
						<TabsTrigger value="invites">Convites</TabsTrigger>
					</TabsList>
					<TabsContent value="friends"></TabsContent>
					<TabsContent value="invites"></TabsContent>
				</Tabs>
			</div>
			{openTab === "friends" &&
				<div>
					<h2>Amigos</h2>
					<div className="flex flex-col gap-2">
						{players.length>0 && 
						players.map(player => {
							return(
								<PlayerCard
									showNickname={true}
									key={player._id}
									player={player}
								>
									<div className="my-6 flex items-start ">
										<div className="w-[75px] h-full pt-8 px-2 border-r border-grey-very-light">
											<button className="flex flex-col items-center gap-2"
												onClick={() => setOpenRateFriendModal(true)}>
												<LucideStar size={30}/>
												<p>Avaliar Amigo</p>
											</button>
										</div>
										<div className="w-[75px] h-full pt-8 px-2">
											<button className="flex flex-col items-center gap-2"
												onClick={() => setOpenRemoveFriendModal(true)}>
												<LucideX size={30}/>
												<p>Remover Amizade</p>
											</button>
										</div>
										
										
									</div>
								</PlayerCard>
							)
						})
						}
					</div>
				</div>
			}
			{openTab === "invites" &&
			<div>
				<h2>invites</h2>
				<div className="flex flex-col gap-2">
					{players.length>0 && 
						players.map(player => {
							return(
								<PlayerCard
									key={player._id}
									player={player}
								>
									<div className="my-6 flex items-start ">
										<div className="w-[75px] h-full pt-8 px-2 border-r border-grey-very-light">
											<button className="flex flex-col items-center gap-2">
												<LucideCheck size={30}/>
												<p>Aceitar Convite</p>
											</button>
										</div>
										<div className="w-[75px] h-full pt-8 px-2 ">
											<button className="flex flex-col items-center gap-2">
												<LucideX size={30}/>
												<p>Recusar Convite</p>
											</button>
										</div>
										
									</div>
								</PlayerCard>
							)
						})
					}
				</div>
			</div>
			}
			
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
