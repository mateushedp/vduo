function TimePicker({value, setValue}) {
	return (
		<div className="relative w-[100px]">
			<div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
				<svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
					<path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
				</svg>
			</div>
			<input value={value} onChange={(e) => setValue(e.target.value)} type="time" id="time" className="text-white border border-grey-light bg-grey-dark leading-none text-base h-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 block w-full p-2.5 " required />
		</div>
	)
}

export default TimePicker