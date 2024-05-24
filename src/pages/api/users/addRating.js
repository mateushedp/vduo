import { addUserRating } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"

export default async function addRating(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { raterUserId, ratedUserId, score } = req.body

	try {
		await connectDB()

		await addUserRating(raterUserId, ratedUserId, score)

		return res.status(200).json({ message: "Rating added successfully" })
	} catch (error) {
		console.error("Error adding rating:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}