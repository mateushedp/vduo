"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Asterisk } from "lucide-react"

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

export function Combobox({placeholder, options, field, setValue}) {
	const { value } = field
	const [open, setOpen] = React.useState(false)

	const availableOptions = options.map(option =>  ({value: option.name, label: option.name, iconUrl: option.iconUrl, icon: option.icon}))

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button

					role="combobox"
					aria-expanded={open}
					className={`w-[285px] rounded-md border border-grey-light bg-grey-dark justify-between  ${availableOptions.find((option) => option.value === value) ? "text-white" : "text-muted-foreground"}`}
				>
					{value
						? availableOptions.find((option) => option.value === value)?.label
						: placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[285px] p-0">
				<Command>
					<CommandInput placeholder={placeholder}/>
					<CommandEmpty>Nenhum resultado.</CommandEmpty>
					<CommandGroup>
						{availableOptions.map((option) => (
							<CommandItem
								key={option.value}
								value={option.value}
								onSelect={(currentValue) => {
									currentValue = capitalizeFirstLetter(currentValue)
									setValue(field.name, currentValue === value ? "" : currentValue)
									setOpen(false)
								}}
								
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === option.value ? "opacity-100" : "opacity-0"
									)}
								/>
								{option.iconUrl &&
								<img
								// src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
									src={option.iconUrl}
									// srcSet="https://flagcdn.com/w40/ua.png 2x"
									width="20"
									alt="Ukraine"
									className="mr-2"/>
								}
								{
									option.icon === "Asterisk" &&
									<Asterisk className="mr-2 ml-[-2px]" size={25}/>
								}
								
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
