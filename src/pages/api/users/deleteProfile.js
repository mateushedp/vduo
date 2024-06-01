import { deleteUserProfile, getUserIDByEmail} from "@/lib/mongodb/models/User"
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
	const session = await getServerSession(req, res, authOptions)

	if (req.method !== "DELETE") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	try {
		const userId = await getUserIDByEmail(session.user.email)
		await deleteUserProfile(userId)
		return res.status(200).json({ message: "User profile deleted successfully" })
	} catch (error) {
		console.error("Error deleting user profile:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}