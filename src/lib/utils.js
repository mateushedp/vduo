import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str) {
	return str
		.toLowerCase()
		.split(" ")
		.map(word => 
			word.charAt(0).toUpperCase() +
      word.slice(1).toLowerCase()
		)
		.join(" ")
}
