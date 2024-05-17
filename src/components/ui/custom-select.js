import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

function CustomSelect({placeholder, options, hasIcon, type, filterList}) {
	return (
		<Select onValueChange={(value) => filterList(value, type)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem key="default" value="">
					{placeholder}
				</SelectItem>

				{options && options.map((option) => {
					return (
						<SelectItem key={option} value={option}>
							<div className="flex items-center ">
								{hasIcon &&
								<img
									src={`/img/${type}s/${option}.png`}
									width="16"
									alt="Icon"
									className="mr-2"/>
								}

								{option}
							</div>
						</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}

export default CustomSelect