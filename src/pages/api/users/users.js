import connectDB from "@/lib/mongodb/db"
import User from "@/lib/mongodb/models/User"

const handler = async(req, res) => {
	await connectDB()

	try {
		const users = await User.find({})

		return res.status(200).json({users})
	} catch (error) {
		console.log("error: " + error)
		return res.status(500).json({error})
	}
}

export default handler