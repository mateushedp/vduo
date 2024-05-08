import { NextResponse, NextRequest } from "next/server"
import multer from "multer"
import mongoose from "mongoose"
import fs from "fs/promises" // Import fs module to read file contents

import User from "@/lib/mongodb/models/User"

const upload = multer({ dest: "uploads/" }) 

const handler = async(req, res) => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("DB connected")
	} catch (error) {
		console.log("There was an error connection to the DB", error)
	}

	const formData = JSON.parse(req.body.user)
	
	try {
		if(formData) {
			const picturePath = req.file.path
			const pictureData = await fs.readFile(picturePath)
		
			// Prepare picture object for saving
			const picture = {
				data: pictureData,
				contentType: req.file.mimetype // Use mimetype to get content type
			}
		
			formData.picture = picture

			const response = await User.create(formData)

			return res.status(200).json(response)
		}
		return res.status(500).json({message: "User not sent"})

	} catch (error) {
		console.log("error: " + error)
		return res.status(500).json({error})
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

// export default upload.single("picture")(handler)