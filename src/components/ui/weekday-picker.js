import WeekdayButton from "./weekday-btn"
import { cn } from "@/lib/utils"

function WeekdayPicker({toggleDaySelection, selectedDays, className}) {

	const isClickable = toggleDaySelection ? true : false
	return (
		<div className={cn("w-[285px] h-10 grid grid-cols-7 rounded-md text-white border-2 border-grey-light bg-grey-dark text-base", className)}>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Seg")} onClick={()=> toggleDaySelection ? toggleDaySelection("Seg") : null} day="Seg" className="rounded-l"/>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Ter")} onClick={()=> toggleDaySelection ? toggleDaySelection("Ter") : null} day="Ter"/>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Qua")} onClick={()=> toggleDaySelection ? toggleDaySelection("Qua") : null} day="Qua"/>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Qui")} onClick={()=> toggleDaySelection ? toggleDaySelection("Qui") : null} day="Qui"/>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Sex")} onClick={()=> toggleDaySelection ? toggleDaySelection("Sex") : null} day="Sex"/>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Sab")} onClick={()=> toggleDaySelection ? toggleDaySelection("Sab") : null} day="Sab"/>
			<WeekdayButton isClickable={isClickable} isActive={selectedDays.includes("Dom")} onClick={()=> toggleDaySelection ? toggleDaySelection("Dom") : null} day="Dom" className="rounded-r border-r-0"/>
		</div>
	)
}

export default WeekdayPicker