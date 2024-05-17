"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { capitalizeFirstLetter } from "@/lib/utils"

export function FilterCombobox({placeholder, options, hasIcon, type, setFilters}) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState("")

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button

					role="combobox"
					aria-expanded={open}
					className={`w-[140px] rounded-md border border-grey-light bg-grey-dark justify-between  ${options.find((option) => option === value) ? "text-white" : "text-muted-foreground"}`}
				>
					<p className="truncate">{value
						? options.find((option) => option === value)
						: placeholder}</p>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[285px] p-0">
				<Command>
					<CommandInput placeholder={placeholder}/>
					<CommandEmpty>Nenhum resultado.</CommandEmpty>
					<CommandGroup>
						{options && options.map((option) => (
							<CommandItem
								key={option}
								value={option}
								onSelect={(currentValue) => {
									currentValue = capitalizeFirstLetter(currentValue)
									currentValue = currentValue === value ? "" : currentValue
									setValue(currentValue)
									setFilters(prevFilters => ({
										...prevFilters,
										[type]: currentValue
									}))
								}}
								
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === option ? "opacity-100" : "opacity-0"
									)}
								/>
								{hasIcon &&
								<img
									src={`/img/${type}s/${option}${type === "rank" ? "_1_Rank" : ""}.png`}
									width="16"
									alt="Icon"
									className="mr-2"/>
								}
								
								{type === "rating" && parseFloat(option) < 5 ? option + " +" : option}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
