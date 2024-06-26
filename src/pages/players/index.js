import connectDB from "@/lib/mongodb/db"
import User from "@/lib/mongodb/models/User"
import { getSession } from "next-auth/react"
import PlayerCard from "@/components/ui/player-card"
import { useState, useEffect } from "react"
import { LucideUserPlus2 } from "lucide-react"
import { CustomDialog } from "@/components/ui/custom-dialog"
import { FilterCombobox } from "@/components/ui/filter-combobox"
import { Label } from "@/components/ui/label"
import Spinner from "@/components/ui/spinner"
import WeekdayPicker from "@/components/ui/weekday-picker"
import TimePicker from "@/components/ui/time-picker"
import axios from "axios"

export default function Players({userId}) {
	const [openInviteModal, setOpenInviteModal] = useState(false)
	const [players, setPlayers] = useState([])
	const [availablePlayers, setAvailablePlayers] = useState(players)
	const [isLoading, setIsLoading] = useState(false)
	const [selectedDays, setSelectedDays] = useState([])
	const [hourStart, setHourStart] = useState("01:00")
	const [hourEnd, setHourEnd] = useState("23:00")
	const [filters, setFilters] = useState({
		role: "",
		region: "",
		rank: "",
		rating: "",
		days: [],
		hourStart: "",
		hourEnd: ""
	})

	const roles = ["Duelist", "Sentinel", "Controller", "Initiator", "Flex"]
	const regions = [ "América Do Norte", "América Latina", "Brasil", "Europa", "Coréia", "Ásia"]
	const ranks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"]
	const ratings = ["5.00", "4.00", "3.00", "2.00", "1.00"]

	const getPlayers = async () => {
		setIsLoading(true)
		try {
			const response = await axios.post("/api/users/getPlayers", {userId})
			if(response.status === 200) {
				setPlayers(response.data.players)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const sendInvite = async (currentUser, selectedUser) => {
		try {
			const response = await axios.post("/api/users/sendInvite", {
				currentUser,
				selectedUser
			})

		} catch (error) {
			console.log(error)
		}
	}

	const toggleDaySelection = (day) => {
		if(selectedDays.includes(day)) {
			setSelectedDays(prevDays => prevDays.filter(prevDay => prevDay !== day))
		} else {
			setSelectedDays(prevDays => [...prevDays, day])
		}
	}

	useEffect(() => {
		setFilters(prevFilters => ({
			...prevFilters,
			days: selectedDays
		}))
		
	}, [selectedDays])

	useEffect(() => {
		getPlayers()
	}, [])

	useEffect(() => {
		setAvailablePlayers(players)
	}, [players])

	useEffect(() => {
		setFilters(prevFilters => ({
			...prevFilters,
			hourStart: hourStart
		}))
	}, [hourStart])
	
	useEffect(() => {
		setFilters(prevFilters => ({
			...prevFilters,
			hourEnd: hourEnd
		}))
	}, [hourEnd])
	
	useEffect(() => {
		let filteredPlayers = players.filter(player => {
			if(filters.role !== "" && player.role !== filters.role) return false
			if(filters.region !== "" && player.region !== filters.region) return false
			if(filters.rank !== "" && !player.rank.startsWith(filters.rank)) return false
			if(filters.rating !== "" && player.averageRating < filters.rating) return false
			if(filters.days.length > 0 && !filters.days.every(day => player.gameDays.includes(day))) return false
			const filterTimeStart = new Date(`2000-01-01T${filters.hourStart}`)
			const filterTimeEnd = new Date(`2000-01-01T${filters.hourEnd}`)
			const playerTimeStart = new Date(`2000-01-01T${player.gameHoursStart}`)
			const playerTimeEnd = new Date(`2000-01-01T${player.gameHoursEnd}`)
			if(playerTimeStart < filterTimeStart) return false
			if(playerTimeEnd > filterTimeEnd) return false
			return true
		})
		setAvailablePlayers(filteredPlayers)
		
	}, [filters])


	return (
		<div className="mt-8">
			<h2 className="text-2xl mb-2">Filtros</h2>
			<div className="flex items-center justify-between mb-4">
				<FilterCombobox placeholder="Função" options={roles} hasIcon={true} type={"role"} setFilters={setFilters}/>
				<FilterCombobox placeholder="Região" options={regions} hasIcon={false} type={"region"} setFilters={setFilters}/>
				<FilterCombobox placeholder="Ranks" options={ranks} hasIcon={true} type={"rank"} setFilters={setFilters}/>
				<FilterCombobox placeholder="Avaliação" options={ratings} hasIcon={false} type={"rating"} setFilters={setFilters}/>
			</div>
			<h2 className="text-2xl mb-2">Horários</h2>
			<div className="flex gap-4 items-center mb-10">
				<WeekdayPicker
					toggleDaySelection={toggleDaySelection}
					selectedDays={selectedDays}
				/>
				<div className="flex gap-2 items-center">
					<Label>Início: </Label>
					<TimePicker value={hourStart} setValue={setHourStart}/>
					<Label>Fim: </Label>
					<TimePicker value={hourEnd} setValue={setHourEnd}/>
				</div>
				
			</div>
			<div className="flex flex-col gap-2">
				{isLoading &&
					<Spinner className="fill-white mt-20" />	
				}

				{availablePlayers.length>0 && 
			availablePlayers.map(player => {
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
							raterUserId={userId}
							ratedUserId={player._id}
							handleClick={sendInvite}
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
