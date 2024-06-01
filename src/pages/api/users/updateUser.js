import multer from "multer"
import User from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"

const upload = multer({ dest: "uploads/" })

const handler = async (req, res) => {
	await connectDB()

	const formData = JSON.parse(req.body.user)


	try {
		if (formData) {
			const userId = formData._id
			delete formData._id // Remove _id from formData to avoid issues during update

			const existingUser = await User.findById(userId)
			if (!existingUser) {
				return res.status(404).json({ message: "User not found" })
			}

			let isDifferent = false
			for (const key in formData) {
				if (formData[key] !== existingUser[key]) {
					isDifferent = true
					break
				}
			}

			if (isDifferent) {
				const updatedUser = await User.findByIdAndUpdate(userId, formData, {
					new: true,
				})
				return res.status(200).json(updatedUser)
			} else {
				return res.status(200).json({ message: "No changes detected" })
			}
		}
		return res.status(500).json({ message: "User data not provided" })
	} catch (error) {
		console.log("error: " + error)
		return res.status(500).json({ error })
	}
}

const multerMiddleware = upload.single("picture")

export default async (req, res) => {
	await multerMiddleware(req, res, async (err) => {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log("Multer error:", err)
			return res.status(500).json({ message: "Error uploading file" })
		} else if (err) {
			// An unknown error occurred when uploading.
			console.log("Unknown error:", err)
			return res.status(500).json({ message: "Unknown error uploading file" })
		}

		// No error occurred, continue to the route handler.
		return handler(req, res)
	})
}

export const config = {
	api: {
		bodyParser: false, // Disable default bodyParser
	},
}