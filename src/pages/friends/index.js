import connectDB from "@/lib/mongodb/db"
import User from "@/lib/mongodb/models/User"
import { getSession } from "next-auth/react"
import PlayerCard from "@/components/ui/player-card"
import { useState, useEffect } from "react"
import { LucideX, LucideStar, LucideCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomDialog } from "@/components/ui/custom-dialog"
import Spinner from "@/components/ui/spinner"
import axios from "axios"


export default function Friends({userId}) {

	const [players, setPlayers] = useState([])
	const [invites, setInvites] = useState([])
	const [openTab, setOpenTab] = useState("friends")
	const [isLoading, setIsLoading] = useState(false)

	const [openRateFriendModal, setOpenRateFriendModal] = useState(false)
	const [openRemoveFriendModal, setOpenRemoveFriendModal] = useState(false)
	const [openAcceptInviteModal, setOpenAcceptInviteModal] = useState(false)
	const [openDeclineInviteModal, setOpenDeclineInviteModal] = useState(false)

	const getFriends = async () => {
		setIsLoading(true)
		try {
			const response = await axios.post("/api/users/getFriends", {userId})
			if(response.status === 200) {
				setPlayers(response.data.friends)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const getInvites = async () => {
		setIsLoading(true)
		try {
			const response = await axios.post("/api/users/getInvites", {userId})
			if(response.status === 200) {
				setInvites(response.data.invites)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const acceptInvite = async(receiverId, senderId) => {
		try {
			const response = await axios.post("/api/users/acceptInvite", {
				receiverId,
				senderId,
			})

			getInvites()
		} catch (error) {
			console.log(error)
		}
	}

	const declineInvite = async(receiverId, senderId) => {
		try {
			const response = await axios.post("/api/users/declineInvite", {
				receiverId,
				senderId,
			})

			getInvites()

		} catch (error) {
			console.log(error)
		}
	}

	// useEffect(() => {
	// 	getFriends()
	// }, [getFriends])
	
	useEffect(() => {
		if(openTab === "invites") getInvites()
		else getFriends()

	}, [openTab])

	const addRating = async (raterUserId, ratedUserId, score) => {

		try {
			const response = await axios.post("/api/users/addRating", {
				raterUserId,
				ratedUserId,
				score,
			})

			getFriends()
		} catch (error) {
			console.log(error)
		}
	}

	const removeFriend = async (currentUser, selectedUser) => {
		try {
			const response = await axios.post("/api/users/removeFriend", {
				currentUser,
				selectedUser
			})

			getFriends()

		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div className="mt-8">
			
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
						{isLoading &&
							<Spinner className="fill-white mt-20" />
						
						}
						{players.length>0 && 
						players.map(player => {
							return(
								<>
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
									<CustomDialog
										open={openRemoveFriendModal}
										setOpen={setOpenRemoveFriendModal}
										title="Remover amizade"
										description="Deseja remover esse perfil da sua lista de amigos?"
										raterUserId={userId || null}
										ratedUserId={player._id}
										handleClick={removeFriend}
									/>
									<CustomDialog
										open={openRateFriendModal}
										setOpen={setOpenRateFriendModal}
										title="Avaliar Amigo"
										description="Como você avalia esse perfil?"
										isRating={true}
										raterUserId={userId || null}
										ratedUserId={player._id}
										handleClick={addRating}
									/>
								</>
							)
						})
						}
					</div>
				</div>
			}
			{openTab === "invites" &&
			<div>
				<h2>Convites</h2>
				<div className="flex flex-col gap-2">
					{isLoading &&
							<Spinner className="fill-white mt-20" />
						
					}
					{invites.length>0 && 
						invites.map(player => {
							return(
								<>
									<PlayerCard
										key={player._id}
										player={player}
									>
										<div className="my-6 flex items-start ">
											<div className="w-[75px] h-full pt-8 px-2 border-r border-grey-very-light">
												<button className="flex flex-col items-center gap-2"
													onClick={() => setOpenAcceptInviteModal(true)}
												>
													<LucideCheck size={30}/>
													<p>Aceitar Convite</p>
												</button>
											</div>
											<div className="w-[75px] h-full pt-8 px-2 ">
												<button className="flex flex-col items-center gap-2"
													onClick={() => setOpenDeclineInviteModal(true)}
												>
													<LucideX size={30}/>
													<p>Recusar Convite</p>
												</button>
											</div>
										
										</div>
									</PlayerCard>
									<CustomDialog
										open={openAcceptInviteModal}
										setOpen={setOpenAcceptInviteModal}
										title="Aceitar convite"
										description="Deseja aceitar esse convite de amizade?"
										raterUserId={userId || null}
										ratedUserId={player._id}
										handleClick={acceptInvite}
									/>
									
									<CustomDialog
										open={openDeclineInviteModal}
										setOpen={setOpenDeclineInviteModal}
										title="Recusar convite"
										description="Deseja recusar esse convite de amizade?"
										raterUserId={userId || null}
										ratedUserId={player._id}
										handleClick={declineInvite}	
									/>
								</>
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
	const session = await getSession(context)
	let userId

	try {
		await connectDB()
		let user = await User.findOne({ email: session.user.email }).select("_id")
		if (user) userId = user._id.toString()		

	} catch (error) {
		console.log("There was an error connection to the DB", error)
	}

	return { props: { userId}}

}
