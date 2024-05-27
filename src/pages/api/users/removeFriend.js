import { removeFriend } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { currentUser, selectedUser } = req.body

	try {
		await connectDB()

		await removeFriend(currentUser, selectedUser)

		return res.status(200).json({ message: "Friend removed successfully" })
	} catch (error) {
		console.error("Error adding rating:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}