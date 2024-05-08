import { signOut } from "next-auth/react"

export default function Dashboard() {
	return (
		<div>
			<h2>dashboard</h2>
			<button onClick={() => signOut({ callbackUrl: "http://localhost:4000/login" })}>logout</button>
		</div>
	)
}
