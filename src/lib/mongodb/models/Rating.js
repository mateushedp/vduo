import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
	rating:{
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	ratedUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	raterUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema)


export default Rating