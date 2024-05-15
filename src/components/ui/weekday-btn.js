import { cn } from "@/lib/utils"


function WeekdayButton({isClickable, isActive, day, className, onClick}) {
	
	return (
		<div 
			className={cn(`h-full border-r border-grey-light p-0 flex justify-center items-center ${isClickable ? "cursor-pointer" : "cursor-default"} transition-all duration-150 ${isActive ? "z-10 bg-grey-dark text-white shadow-[3px_1px_5px_0px_rgba(0,0,0,0.75)]" : "z-0 bg-grey-very-light text-grey-light"}`, className)}
			onClick={onClick}>
			<p className="leading-4">{day}</p>
		</div>
	)
}



export default WeekdayButton