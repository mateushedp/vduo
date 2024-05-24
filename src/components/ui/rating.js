import { useState, useEffect } from "react"
import { LucideStar } from "lucide-react"

function RatingStars({score, setScore}) {
	// const [rating, setRating] = useState(0) 
	const [initialRating, setInitialRating] = useState(0) 

	const handleStarClick = (index) => {
		setScore(index + 1)
		setInitialRating(index + 1)
	}

	const handleStarHover = (index) => {
		setScore(index + 1)
	}

	const handleStarLeave = () => {
		setScore(initialRating)
	}

	useEffect(() => {
		
	}, [score])

	return (
		<div className="flex items-center gap-2 my-6">
			{[...Array(5)].map((_, index) => (
				<LucideStar
					key={index}
					size={40}
					onClick={() => handleStarClick(index)}
					onMouseEnter={() => handleStarHover(index)}
					onMouseLeave={handleStarLeave}
					fill={index < score ? "#FFFFFF" : "transparent"}
				/>
			))}
		</div>
	)
}

export default RatingStars