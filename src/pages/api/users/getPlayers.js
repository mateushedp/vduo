import { getPlayers } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { userId } = req.body

	try {
		await connectDB()

		const players = await getPlayers(userId)

		return res.status(200).json({players})
	} catch (error) {
		console.error("Error getting friends:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}