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
	}],
	sentInvites: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	receivedInvites: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	friends: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
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

export async function sendInvite(senderId, receiverId) {
	console.log("ENVIANDO CONVITE")
	try {
		await connectDB()

		const sender = await User.findById(senderId)
		const receiver = await User.findById(receiverId)

		if (!sender || !receiver) {
			throw new Error("User not found")
		}

		// Add receiver to sender's sentInvites
		if (!sender.sentInvites.includes(receiverId)) {
			sender.sentInvites.push(receiverId)
			await sender.save()
		}

		// Add sender to receiver's receivedInvites
		if (!receiver.receivedInvites.includes(senderId)) {
			receiver.receivedInvites.push(senderId)
			await receiver.save()
		}

		console.log("Invite sent successfully")
	} catch (err) {
		console.error("Error sending invite:", err)
	}
}

export async function getUsersWhoSentInvites(userId) {
	try {
		await connectDB()

		const user = await User.findById(userId).populate({ path: "receivedInvites", model: User, select: "-picture" })// Populating only the necessary fields

		if (!user) {
			throw new Error("User not found")
		}

		return user.receivedInvites
	} catch (error) {
		console.error("Error fetching users who sent invites:", error)
		return null
	}
}

export async function acceptInvite(receiverId, senderId) {
	try {
		await connectDB()

		const receiver = await User.findById(receiverId)
		const sender = await User.findById(senderId)

		if (!sender || !receiver) {
			throw new Error("User not found")
		}

		// Add each other as friends
		if (!sender.friends.includes(receiverId)) {
			sender.friends.push(receiverId)
			await sender.save()
		}

		if (!receiver.friends.includes(senderId)) {
			receiver.friends.push(senderId)
			await receiver.save()
		}

		// Remove sender from receiver's receivedInvites
		receiver.receivedInvites = receiver.receivedInvites.filter(id => id.toString() !== senderId)
		await receiver.save()

		// Remove receiver from sender's sentInvites
		sender.sentInvites = sender.sentInvites.filter(id => id.toString() !== receiverId)
		await sender.save()

		console.log("Invite accepted successfully")
	} catch (err) {
		console.error("Error accepting invite:", err)
	}
}

export async function declineInvite(receiverId, senderId) {
	try {
		await connectDB()

		const receiver = await User.findById(receiverId)
		const sender = await User.findById(senderId)

		if (!sender || !receiver) {
			throw new Error("User not found")
		}

		// Remove sender from receiver's receivedInvites
		receiver.receivedInvites = receiver.receivedInvites.filter(id => id.toString() !== senderId)
		await receiver.save()

		// Remove receiver from sender's sentInvites
		sender.sentInvites = sender.sentInvites.filter(id => id.toString() !== receiverId)
		await sender.save()

		console.log("Invite declined successfully")
	} catch (err) {
		console.error("Error declining invite:", err)
	}
}

export async function getUserFriends(userId) {
	try {
		await connectDB()

		const user = await User.findById(userId).populate({ path: "friends", model: User, select: "-picture" })// Populating only the necessary fields

		if (!user) {
			throw new Error("User not found")
		}

		return user.friends
	} catch (error) {
		console.error("Error fetching user friends:", error)
		return null
	}
}

export async function getPlayers(userId){
	try {
		await connectDB()

		// Find the current user's friends
		const currentUser = await User.findById(userId).populate({ path: "friends", model: User, select: "-picture" })
		const friendIds = currentUser.friends.map(friend => friend._id.toString())
		friendIds.push(userId)

		// Find all users except the current user and their friends
		let players = await User.find({ 
			_id: { $nin: friendIds } // Exclude friends
		}).select("-picture")

		// Convert Mongoose documents to plain JavaScript objects
		players = players.map(player => player.toObject())

		return players
	} catch (error) {
		console.error("There was an error connecting to the DB:", error)
	}
}

export async function removeFriend(userId, friendId) {
	try {
		await connectDB()

		const user = await User.findById(userId)
		const friend = await User.findById(friendId)

		if (!user || !friend) {
			throw new Error("User not found")
		}

		// Remove each other from friends list
		user.friends = user.friends.filter(id => id.toString() !== friendId)
		await user.save()

		friend.friends = friend.friends.filter(id => id.toString() !== userId)
		await friend.save()

		console.log("Friend removed successfully")
	} catch (err) {
		console.error("Error removing friend:", err)
	}
}

export async function deleteUserProfile(userId) {
	try {
		await connectDB()

		// Find the user to be deleted
		const user = await User.findById(userId)
		console.log("found user: ", user)
		if (!user) {
			throw new Error("User not found")
		}

		// Remove the user ID from all their friends' `friends` arrays
		await User.updateMany(
			{ _id: { $in: user.friends } },
			{ $pull: { friends: userId } }
		)

		// Delete the user profile
		await User.findByIdAndDelete(userId)

		console.log("User profile deleted successfully")
	} catch (error) {
		console.error("Error deleting user profile:", error)
	}
}

export default User
