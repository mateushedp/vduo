 
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

import { LucideStar, LucideStarOff } from "lucide-react"
import RatingStars from "./rating"
 
export function CustomDialog({open, setOpen, title, description, rating}) {
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
					{/* <div className="flex items-center gap-2">
						<LucideStar size={40}/>
						<LucideStar size={40}/>
						<LucideStar size={40}/>
						<LucideStar size={40}/>
						<LucideStar size={40}/>						
					</div> */}
					{rating &&
						<RatingStars />
					}

				</div>
				<DialogFooter className="sm:justify-center">
					<DialogClose asChild>
						<Button type="button" variant="destructive">
							Cancelar
						</Button>
					</DialogClose>
					<Button type="button">
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}