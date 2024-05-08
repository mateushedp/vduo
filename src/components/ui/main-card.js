export default function MainCard({children}) {
	return (
		<div className="w-[526px] h-auto flex flex-col min-h-96 mt-[-10px] border-white rounded-xl drop-shadow-md bg-grey-mid py-5 px-12">
			{children}
		</div>
	)
}
