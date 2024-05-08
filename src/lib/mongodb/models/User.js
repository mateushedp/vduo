const mongoose = require("mongoose")

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
	}
})

// const User = mongoose.model("Users", userSchema)
const User = mongoose.models.Users || mongoose.model("Users", userSchema)

export async function getUserByGoogleId(googleId) {
	try {
		
		await mongoose.connect(process.env.MONGODB_URI)
		
		const user = await User.findOne({ sub: googleId })
  
		
		if (user) user._id = user._id.toString()
  
		return { user }

	} catch (error) {

		console.log(error)

		return null
	}
}

export async function getUserExists(email) {
	try {

		await mongoose.connect(process.env.MONGODB_URI)

		const user = await User.findOne({ email })
		
		return !!user

	} catch (error) {

		console.log(error)

		return null
	}
}

// module.exports = mongoose.models.Users || User

export default User
