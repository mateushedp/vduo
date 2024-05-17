import { LucideStar, LucideMapPin, LucideAlarmClock, Languages, LucideAtSign } from "lucide-react"
import WeekdayPicker from "./weekday-picker"

export default function PlayerCard({player, showNickname, children}) {

	const formatRankToIconPath = (rank) => {

		const [word, number] = rank.split(" ")

		const pathToIcon = `${word}_${number}_Rank.png`
	
		return pathToIcon
	}


	const formatBirthdayToAge = (birthday) => {
		const birthDate = new Date(birthday)
    
		const currentDate = new Date()
	
		const age = currentDate.getFullYear() - birthDate.getFullYear()
	
		if (
			currentDate.getMonth() < birthDate.getMonth() ||
			(currentDate.getMonth() === birthDate.getMonth() &&
				currentDate.getDate() < birthDate.getDate())
		) {
			return age - 1
		}
	
		return age
	}


	return ( 
		<>
			{player && 
			<div className="h-[200px] w-fit rounded-lg bg-grey-mid shadow-lg flex">

				{/* Elo e imagem */}
				<div className="h-full w-24 bg-grey-very-light rounded-l-lg border-r border-black flex flex-col justify-center items-center mr-6">
					<img src={`/img/ranks/${formatRankToIconPath(player.rank)}`} alt="player rank" width={34} height={34}/>
					<p className="text-lg">{player.rank}</p>
				</div>

				<div className="flex flex-wrap w-[400px]">
					{/* Conteudo de perfil */}
					<div className="h-[100px] w-[260px] border-r border-b border-grey-very-light mt-6 flex">
						<div className="h-[90px] w-[90px] rounded-full bg-red-400 mr-6"></div>
						<div className="flex flex-col overflow-clip">
							<p className="text-ellipsis">{player.name.split(" ")[0]}, {formatBirthdayToAge(player.birthday)}</p>
							<div className="flex gap-1 items-center">
								<Languages size={16}/>
								<p>{player.language}</p>
							</div>
							<div className="flex gap-1 items-center">
								<LucideMapPin size={16}/>
								<p>{player.region}</p>
							</div>
							<div className="flex gap-1 items-center">
								<LucideStar size={16} fill="white"/>
								<p>{player.rating}</p>
							</div>
						</div>
					</div>

					{/* Conteudo do jogo */}
					<div className="h-[100px] w-[140px] mt-6 border-r border-b border-grey-very-light flex flex-col px-3">
						{showNickname &&
						<div className="flex items-center gap-1">
							<LucideAtSign size={16} />
							<p className="italic font-semibold">{player.nickname}</p>
						</div>
						}
						<div className="flex items-center gap-1">
							<img src={`/img/roles/${player.role}.png`} alt="" className="h-4"/>
							<p>{player.role}</p>
						</div >
						<div className="flex justify-between mt-2">
							{player.agents.map(agent => {
								{console.log()}
								return <img src={`/img/agents/${agent}.png`} alt="" key={agent} className="h-8 bg-main-red rounded"/>
							})}
						</div>
						
					</div>

					{/* Conteudo inferior (dias e horarios) */}
					<div className="w-[400px] h-[52px] border-r border-grey-very-light mb-6 flex gap-8">
						<div className="flex items-center">
							<WeekdayPicker selectedDays={player.gameDays} className="w-[224px] h-[25px]"/>
						</div>
						<div className="flex items-center gap-2">
							<LucideAlarmClock size={16}/>
							<p className="italic">{player.gameHoursStart} - {player.gameHoursEnd}</p>
						</div>

					</div>
				</div>
				{children}
				

			</div>
			}
		</>
	)
}