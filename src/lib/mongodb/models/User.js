import mongoose from "mongoose"
import Rating from "./Rating"
import connectDB from "../db"

// Define schema
const userSchema = new mongoose.Schema({
	sub: {
		type: String,
	},
	picture: {
		data: Buffer, // Store image binary data
		contentType: String // Store image content type (e.g., 'image/jpeg', 'image/png')
	},
	name: {
		type: String,
		minlength: 6,
		required: true
	},
	email: {
		type: String,
		maxlength: 70,
		unique: true,
		required: true
	},
	birthday: {
		type: Date,
		required: true
	},
	region: {
		type: String,
		required: true
	},
	language: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: true
	},
	agents: {
		type: [String],
		required: true
	},
	role: {
		type: String,
		required: true
	},
	rank: {
		type: String,
		required: true
	},
	gameDays: {
		type: [String]
	},
	gameHoursStart: {
		type: String,
		// required: true
	},
	gameHoursEnd: {
		type: String,
		// required: true
	},
	averageRating: {
		type: Number,
		default: 0
	},
	ratingCount: {
		type: Number,
		default: 0
	},
	ratings: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Rating"
	}]
})

const User = mongoose.models.Users || mongoose.model("Users", userSchema)

export async function getUserByGoogleId(googleId) {
	try {
		
		await connectDB()
		
		const user = await User.findOne({ sub: googleId })
  
		
		if (user) user._id = user._id.toString()
  
		return user

	} catch (error) {

		console.log(error)

		return null
	}
}

export async function getUserByEmail(email) {
	try {
		
		await connectDB()
		
		const user = await User.findOne({ email: email }).select("-picture")
		
		if (user) user._id = user._id.toString()

		return user

	} catch (error) {

		console.log(error)

		return null
	}
}

export async function getUserIDByEmail(email) {
	try {
		
		await connectDB()
		
		const user = await User.findOne({ email: email }).select("_id")
		
		if (user) user._id = user._id.toString()

		return user._id

	} catch (error) {

		console.log(error)

		return null
	}
}

export async function getUserExists(email) {
	try {

		await connectDB()

		const user = await User.findOne({ email })
		
		return !!user

	} catch (error) {

		console.log(error)

		return null
	}
}

export async function addUserRating(raterUserId, ratedUserId, score) {
	try {
		// Check if the user has already rated the target user
		const existingRating = await Rating.findOne({ raterUser: raterUserId, ratedUser: ratedUserId })

		if (existingRating) {
			// Update existing rating
			existingRating.rating = score
			await existingRating.save()
		} else {
			// Create a new rating
			const newRating = new Rating({
				rating: score,
				raterUser: raterUserId,
				ratedUser: ratedUserId
			})
			await newRating.save()
		}

		// Update the rated user's average rating
		const ratedUser = await User.findById(ratedUserId)
		if (!ratedUser) {
			throw new Error("Rated user not found")
		}

		const ratings = await Rating.find({ ratedUser: ratedUserId })
		const totalRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0)
		ratedUser.ratingCount = ratings.length
		ratedUser.averageRating = ratedUser.ratingCount ? totalRatings / ratedUser.ratingCount : 0
		await ratedUser.save()

		console.log("Rating added successfully")
	} catch (err) {
		console.error("Error adding rating:", err)
	}
}

export default User
