import { useRouter } from "next/router"


export default function SidebarBtn({title, icon, isActive, onClick, destination}) {
	const router = useRouter()

	const handleClick = () => {
		onClick(title) // Set the active state in the parent component
		router.push(destination) // Navigate to the specified destination
	}
	return (
		<button
			className={`text-lg px-2 py-1 h-10 flex justify-start items-center gap-3 rounded-xl ${
				isActive ? "bg-grey-dark" : ""
			}`}
			onClick={handleClick}
		>
			{icon &&
				icon
			}
			{title}
		</button>
	)
}