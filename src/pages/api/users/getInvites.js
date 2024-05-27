import { getUsersWhoSentInvites } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { userId } = req.body

	try {
		await connectDB()

		// Find the user by ID and populate the receivedInvites field
		const invites = await getUsersWhoSentInvites(userId)

		return res.status(200).json({invites})
	} catch (error) {
		console.error("Error getting invites:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}