import WeekdayButton from "./weekday-btn"

function WeekdayPicker({toggleDaySelection, selectedDays}) {
	return (
		<div className='w-[285px] h-10 grid grid-cols-7 rounded-md text-white border border-grey-light bg-grey-dark text-base'>
			<WeekdayButton isActive={selectedDays.includes("Seg")} onClick={()=> toggleDaySelection("Seg")} day="Seg" className="rounded-l-md"/>
			<WeekdayButton isActive={selectedDays.includes("Ter")} onClick={()=> toggleDaySelection("Ter")} day="Ter"/>
			<WeekdayButton isActive={selectedDays.includes("Qua")} onClick={()=> toggleDaySelection("Qua")} day="Qua"/>
			<WeekdayButton isActive={selectedDays.includes("Qui")} onClick={()=> toggleDaySelection("Qui")} day="Qui"/>
			<WeekdayButton isActive={selectedDays.includes("Sex")} onClick={()=> toggleDaySelection("Sex")} day="Sex"/>
			<WeekdayButton isActive={selectedDays.includes("Sab")} onClick={()=> toggleDaySelection("Sab")} day="Sab"/>
			<WeekdayButton isActive={selectedDays.includes("Dom")} onClick={()=> toggleDaySelection("Dom")} day="Dom" className="rounded-r-md border-r-0"/>
		</div>
	)
}

export default WeekdayPicker