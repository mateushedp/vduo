import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { LucideUser, LucideUsers, LucideUserSearch, LucideLogOut } from "lucide-react"
import SidebarBtn from "./sidebar-btn"

export default function Sidebar() {
	const router = useRouter()

	const [activeButton, setActiveButton] = useState(null)

	useEffect(() => {
		const currentPath = router.pathname
		
		const pathToTitleMap = {
			"/profile": "Meu Perfil",
			"/friends": "Amigos",
			"/players": "Jogadores"
		}
	
		setActiveButton(pathToTitleMap[currentPath])
	}, [router.pathname])

	const handleButtonClick = (title) => {
		setActiveButton(title)
	}
  
	return (
		<div className="h-screen w-56 bg-[#31353B] shadow-md rounded-r-sm flex flex-col divide-y divide-[#42454B]">
			<div className="px-2 py-3">
				<h2 className="text-3xl font-bold mx-2 my-1">VDuo</h2>
			</div>
			<div className="flex flex-col px-2 py-3">
				<SidebarBtn 
					title="Meu Perfil" 
					icon={<LucideUser size={20}/>}
					isActive={activeButton === "Meu Perfil"}
					onClick={() => handleButtonClick("Meu Perfil")}
					destination="/profile"
				/>
				<SidebarBtn 
					title="Amigos" 
					icon={<LucideUsers size={20}/>}
					isActive={activeButton === "Amigos"}
					onClick={() => handleButtonClick("Amigos")}
					destination="/friends"
				/>
				<SidebarBtn 
					title="Jogadores" 
					icon={<LucideUserSearch size={20}/>}
					isActive={activeButton === "Jogadores"}
					onClick={() => handleButtonClick("Jogadores")}
					destination="/players"
				/>
			</div>
			<div className="px-2 py-3">
				<SidebarBtn
					title="Logout"
					icon={<LucideLogOut size={20}/>}
					onClick={() => signOut({ callbackUrl: "http://localhost:4000/login" })}
				/>
			</div>
			
			


		</div>
	)
}

