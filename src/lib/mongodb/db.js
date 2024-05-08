import mongoose from "mongoose"

const URI = process.env.MONGODB_URI

if (!URI) throw new Error("URI do Mongo não foi encontrada")

mongoose.connect(URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
	console.log("Conectado ao Mongo.")
})

export default mongoose