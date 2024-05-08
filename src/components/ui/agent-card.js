export default function AgentCard({iconUrl, name, isActive, toggleAgentSelection, field, setValue}) {
	return (
		<div className={`w-fit h-fit bg-grey-dark p-1 pb-0 cursor-pointer rounded-2xl border-2 transition-all duration-200 ${isActive ? "opacity-100 border-main-red" : "opacity-50 border-transparent"}`}> 
			<div className={"w-[80px] h-[80px] rounded-2xl bg-center bg-cover bg-main-red"}
				style={{ backgroundImage: `url(${iconUrl})`}}
				onClick={() => toggleAgentSelection(name, field, setValue)}
			/>
			
			<p className="text-white text-center">{name}</p>
		</div>
	)
}

