import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import RatingStars from "./rating"
 
export function CustomDialog({open, setOpen, title, description, isRating, raterUserId, ratedUserId, handleClick}) {
	const [score, setScore] = useState(0)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-md bg-grey-mid" closeIconColor="white">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="text-white">
						{description}
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-center items-center space-x-2">
					{isRating &&
						<RatingStars score={score} setScore={setScore}/>
					}

				</div>
				<DialogFooter className="sm:justify-center">
					<DialogClose asChild>
						<Button type="button" variant="destructive">
							Cancelar
						</Button>
					</DialogClose>
					<Button type="button" onClick={() => {
						if(isRating){
							handleClick(raterUserId, ratedUserId, score)
						} else {
							handleClick(raterUserId, ratedUserId)

						}
						setOpen(false)
					}}>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}