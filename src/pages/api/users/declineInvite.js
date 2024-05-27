import { declineInvite } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { receiverId, senderId } = req.body
	try {
		await connectDB()
		await declineInvite(receiverId, senderId)
		res.status(200).send("Invite declined successfully")
	} catch (error) {
		res.status(500).send("Error declining invite")
	}
}