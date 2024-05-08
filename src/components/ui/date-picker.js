import { useState } from "react"
// import { CalendarIcon } from "@radix-ui/react-icons"
import { CalendarDays } from "lucide-react"

import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
 
export function DatePicker() {
	const [date, setDate] = useState()
 
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					// variant={"outline"}
					className={cn(
						"w-[285px] justify-start text-left font-normal rounded-md border border-grey-light bg-grey-dark px-3 py-2 text-base",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarDays className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Data de nascimento</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}