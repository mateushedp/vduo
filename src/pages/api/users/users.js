import mongoose from "mongoose"
import User from "@/lib/mongodb/models/User"

const handler = async(req, res) => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("DB connected")
	} catch (error) {
		console.log("There was an error connection to the DB", error)
	}

	const users = await User.find({})

	return res.status(200).json({users})

}

export default handler