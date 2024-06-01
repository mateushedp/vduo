import { getUserByEmail } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions)

	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	try {
		await connectDB()

		const user = await getUserByEmail(session.user.email)

		return res.status(200).json({user})
	} catch (error) {
		console.error("Error getting user data:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}