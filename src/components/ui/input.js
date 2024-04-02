import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, value, onChange, ...props }, ref) => {
	// console.log(value)
	return (
		(<input
			type={type}
			className={cn(
				"flex h-10 w-[285px] rounded-md text-white border border-grey-light bg-grey-dark px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			ref={ref}
			defaultValue={value}
			// onChange={onChange}
			{...props} />)
	)
})
Input.displayName = "Input"

export { Input }
