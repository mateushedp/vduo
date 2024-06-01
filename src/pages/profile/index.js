import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import Spinner from "@/components/ui/spinner"
import WeekdayPicker from "@/components/ui/weekday-picker"
import { CustomDialog } from "@/components/ui/custom-dialog"
import { Button } from "@/components/ui/button"
import { LucidePencil, LucideTrash } from "lucide-react"
import { useRouter } from "next/router"
import axios from "axios"

export default function Profile() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [userData, setUserData] = useState()
	
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [openEditModal, setOpenEditModal] = useState(false)

	const getUserData = async () => {
		setIsLoading(true)
		try {
			let response = await axios.get("/api/users/getUserData")
			if(response.status === 200) {
				//format date
				const isoDate = response.data.user.birthday
				const year = isoDate.substring(0, 4)
				const month = isoDate.substring(5, 7)
				const day = isoDate.substring(8, 10)
				const formattedDate = `${day}/${month}/${year}`
				response.data.user.birthday = formattedDate

				setUserData(response.data.user)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const deleteUserProfile = async () => {
		try {
			const response = await axios.delete("/api/users/deleteProfile")
			if(response.status === 200) {
				signOut({ callbackUrl: "http://localhost:4000/login" })
			}
		} catch (error) {
			console.log(error)
		}
	}

	const redirectSignup = () => {
		router.push({
			pathname: "/login/signup",
			query: {isEdit: true}
		})
	}

	useEffect(() => {
		getUserData()
	}, [])

	return (
		<div className="w-[600px] h-[500px] mt-8 px-[75px] bg-grey-very-light shadow-md rounded">
			<CustomDialog
				open={openEditModal}
				setOpen={setOpenEditModal}
				title="Editar Perfil"
				description="Deseja editar as informações do seu perfil?"
				handleClick={redirectSignup}
			/>
			<CustomDialog
				open={openDeleteModal}
				setOpen={setOpenDeleteModal}
				title="Excluir Perfil"
				description="Deseja deletar seu perfil? ATENÇÃO: ESTA AÇÃO É IRREVERSÍVEL"
				handleClick={deleteUserProfile}
			/>
			{isLoading &&
				<Spinner className="fill-white mt-20" />
			}
			{!isLoading && userData && 
			<div className="flex flex-col gap-2 mt-10">
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Nome</p>
					<p className="flex-grow">{userData.name}</p>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">User</p>
					<p className="flex-grow">{userData.nickname}</p>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Nascimento</p>
					<p className="flex-grow">{userData.birthday}</p>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Localização</p>
					<p className="flex-grow">{userData.region}</p>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Rank</p>
					<p className="flex-grow">{userData.rank}</p>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Função</p>
					<p className="flex-grow">{userData.role}</p>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Agentes</p>
					<div className="flex gap-2">
						{userData.agents.map(agent => {
							return <img src={`/img/agents/${agent}.png`} alt="" key={agent} className="h-8 bg-main-red rounded"/>
						})}
					</div>
				</div>
				<div className="flex gap-6">
					<p className="font-bold text-grey-super-light uppercase w-52">Horários</p>
					<p className="flex-grow">{userData.gameHoursStart} - {userData.gameHoursEnd}</p>
				</div>
				<div className="flex gap-16">
					<p className="font-bold text-grey-super-light uppercase w-52">Dias de Jogo</p>
					<WeekdayPicker
						className="h-[25px]"
						selectedDays={userData.gameDays}
					/>
				</div>
				<Button className="w-full gap-2 mt-6" onClick={() => setOpenEditModal(true)}><LucidePencil size={18} />Editar Informações</Button>
				<Button className="w-full gap-2" variant="destructive" onClick={() => setOpenDeleteModal(true)}>< LucideTrash size={18}/>Excluir Perfil</Button>
			</div>
			}
			
		</div>
	)
}

