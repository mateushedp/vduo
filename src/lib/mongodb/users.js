import clientPromise from "./index"

let client
let db
let users

async function init(){
	if(db) return
	try {
		client = await clientPromise
		db = await client.db()
		users = await db.collection("users")
	} catch(error){
		throw new Error("Erro ao criar conexão ao banco de dados")
	}
}

(async () => {
	await init()
})()

export async function getUsers() {
	try{
		if(!users) await init()
		const result = await users
			.find({})
			.map(user => ({ ...user, _id: user._id.toString() }))
			.toArray()

		return {users: result}
	}catch(error) {
		return {error: "Erro ao buscar usuarios"}
	}
}

export async function getUserExists(email) {
	try{
		if(!users) await init()
		const result = await users
			.findOne( { "email": email })

		return {result: !!result}
	}catch(error) {
		return {error: "Erro ao buscar usuario"}
	}
}
export async function getUserByGoogleId(googleId) {
	try{
		if(!users) await init()
		const result = await users
			.findOne( { "google_id": googleId })

		if(result) result._id = result._id.toString()

		return {user: result}
	}catch(error) {
		return {error: "Erro ao buscar usuario"}
	}
}