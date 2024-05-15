import Sidebar from "@/components/ui/sidebar"
export default function Layout({children}) {
	return (
		<div className="flex">
			<Sidebar />
			<main className="bg-blue-dark w-full flex flex-col items-center">
				{children}

			</main>
		</div>
	)
}