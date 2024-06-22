import { getUserByEmail } from "@/lib/mongodb/models/User"
import connectDB from "@/lib/mongodb/db"
import { getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import MainCard from "@/components/ui/main-card"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { Progress } from "@/components/ui/progress"
import Spinner from "@/components/ui/spinner"
import { parse, format, parseISO, addDays } from "date-fns"
import axios from "axios"
import { capitalizeFirstLetter } from "@/lib/utils"
import AgentCard from "./../../components/ui/agent-card"
import WeekdayPicker from "./../../components/ui/weekday-picker"
import nookies from "nookies"
import { useRouter } from "next/router"

export default function Signup({userData, regions, languages, ranks, agents, roles, defaultUserData, isEdit, session}) {
	const router = useRouter()
	const [page, setPage] = useState(1)
	const [selectedAgents, setSelectedAgents] = useState(defaultUserData?.agents ?? [])
	const [selectedDays, setSelectedDays] = useState(defaultUserData?.gameDays ?? [])
	const [selectedFile, setSelectedFile] = useState(null)

	const [formattedDate, setFormattedDate] = useState(defaultUserData?.birthday ? format(addDays(parseISO(defaultUserData.birthday), 1), "dd/MM/yyyy") : "")
	const [formattedHourStart, setFormattedHourStart] = useState(defaultUserData?.gameHoursStart ?? "")
	const [formattedHourEnd, setFormattedHourEnd] = useState(defaultUserData?.gameHoursEnd ?? "")

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		form.setValue("birthday", formattedDate)
	}, [formattedDate])
	
	useEffect(() => {
		form.setValue("agents", selectedAgents)
	}, [selectedAgents])

	useEffect(() => {
		form.setValue("gameDays", selectedDays)
	}, [selectedDays])

	useEffect(() => {
		form.setValue("gameHoursStart", formattedHourStart)
	}, [formattedHourStart])

	useEffect(() => {
		form.setValue("gameHoursEnd", formattedHourEnd)
	}, [formattedHourEnd])
	
	// useEffect(() => {
	// 	form.setValue("picture", selectedFile?.name)
	// }, [selectedFile])

	const handleFileChange = (event) => {
		form.setValue("picture", event.target.value)
		setSelectedFile(event.target.files[0])
	}

	
	const handleDateChange = (event) => {
		const { value } = event.target

		const numericValue = value.replace(/\D/g, "")

		const formattedValue = numericValue
			.slice(0, 2) + (numericValue.length > 2 ? "/" + numericValue.slice(2, 4) : "")
		+ (numericValue.length > 4 ? "/" + numericValue.slice(4, 8) : "")

		setFormattedDate(formattedValue)
	}

	const handleHoursChange = (event) => {
		const inputValue = event.target.value
	
		const sanitizedValue = inputValue.replace(/\D/g, "")
	
		let formattedValue = sanitizedValue.replace(/(\d{2})(?=\d)/g, "$1:")
	
		formattedValue = formattedValue.slice(0, 5)

		return formattedValue
	
	}

	const toggleAgentSelection = (name) => {
		if (selectedAgents.includes(name)) {
			setSelectedAgents(prevAgents => prevAgents.filter(agent => agent !== name))
		} else if (selectedAgents.length < 3) {
			setSelectedAgents(prevAgents => [...prevAgents, name])
		}
	}

	const toggleDaySelection = (day) => {
		if(selectedDays.includes(day)) {
			setSelectedDays(prevDays => prevDays.filter(prevDay => prevDay !== day))
		} else {
			setSelectedDays(prevDays => [...prevDays, day])
		}
	}

	const isValidTime = (value) => {
		if(!value) return true
		const [hours, minutes] = value.split(":").map((part) => parseInt(part, 10))
		return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
	}

	const formSchema = z.object({
		picture: z.string().optional(),
		name: z.string().min(6, {
			message: "Nome deve ter pelo menos 6 caracteres.",
		}),
		email: z.string().email({message: "E-mail inválido."}).max(70, {
			message: "E-mail inválido.",
		}),
		birthday: z.string().refine((value) => {
			const regex = /^\d{2}\/\d{2}\/\d{4}$/
			return regex.test(value)
		}, { message: "Formato de data inválido." })
			.refine((value) => {
				const parsedDate = parse(value, "dd/MM/yyyy", new Date())
				return !isNaN(parsedDate.getTime())
			}, { message: "Data não existe." }),
		region: z.string().min(2, {
			message: "Escolha sua localização.",
		}),
		language: z.string().min(2, {
			message: "Escolha seu idioma.",
		}),
		
		nickname: z.string()
			.min(2, {
				message: "Nome de usuário muito pequeno.",
			})
			.max(50, {
				message: "Nome de usuário muito grande."
			}),
		agents: z.array(z.string()).min(1, {
			message: "Escolha pelo menos um agente.",
		}),
		role: z.string().min(1, {
			message: "Escolha uma função.",
		}),
		rank: z.string().min(1, {
			message: "Escolha seu rank.",
		}),
		gameDays:z.array(z.string()).optional(),
		gameHoursStart: z.string().refine(isValidTime, {
			message: "Insira um horário válido.",
		}),
		gameHoursEnd: z.string().refine(isValidTime, {
			message: "Insira um horário válido.",
		}),
	})

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			picture: "",
			name: defaultUserData?.name ? defaultUserData.name : "",
			email: userData?.email ?? "",
			birthday: defaultUserData?.birthday ? defaultUserData.birthday : "",
			region: defaultUserData?.region ? defaultUserData.region : "",
			language: defaultUserData?.language ? defaultUserData.language : "",
			nickname: defaultUserData?.nickname ? defaultUserData.nickname : "",
			agents: defaultUserData?.agents ? defaultUserData.agents : "",
			role: defaultUserData?.role ? defaultUserData.role : "",
			rank: defaultUserData?.rank ? defaultUserData.rank : "",
			gameDays: defaultUserData?.gameDays ? defaultUserData.gameDays : "",
			gameHoursStart: defaultUserData?.gameHoursStart ? defaultUserData.gameHoursStart : "",
			gameHoursEnd: defaultUserData?.gameHoursEnd ? defaultUserData.gameHoursEnd : "",
		},
	})

	const validatePage = async () => {
		const fields = [[], ["name", "email", "birthday", "region", "language"], ["nickname", "agents", "role", "rank", "gameHoursStart", "gameHoursEnd"]]
		const isValid = await form.trigger(fields[page])
		return isValid
	}
	
	const handleNextPage = async () => {
		const isValid = await validatePage(page)
		if (isValid) {
			setPage(page + 1)
		}
	}

	async function onSubmit(values) {

		const [day, month, year] = values.birthday.split("/")
		const dateObject = new Date(`${year}-${month}-${day}`)
		
		let user
		if(isEdit && session) {
			user = {_id: defaultUserData?._id, ...values, birthday: dateObject}
		}else{
			user = {...values, birthday: dateObject}
		}
		
		const formData = new FormData()
		formData.append("user", JSON.stringify(user))
		formData.append("picture", selectedFile)

		setIsLoading(true)
		if(isEdit && session){

			try {
				const response = await axios.post("/api/users/updateUser", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
	
				setIsLoading(false)
				if(response.status === 200){
					setError("")
					router.push("/profile")
				} else {
					setError("Erro ao editar usuário!")
					
				}
	
			} catch (error) {
				console.log(
					"There was a problem with the fetch operation " + error.message
				)
			}
		} else {
			try {
				const response = await axios.post("/api/users/user", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
	
				setIsLoading(false)
				if(response.status === 200){
					setError("")
					signIn(userData?.provider || "google", { callbackUrl: "/players"})
				} else {
					setError("Erro ao criar usuário!")
					
				}
	
			} catch (error) {
				console.log(
					"There was a problem with the fetch operation " + error.message
				)
			}
		}
	}


	return (
		<main className="max-w-screen min-h-screen h-auto py-10 flex justify-center items-start bg-blue-dark">
			<MainCard>
				<Progress value={page < 3 ? 33 * page : 100} className="mb-8"/>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>

						{/* page 1 */}
						{page === 1 && 

						<div className="space-y-3">
							<h1 className="text-center text-3xl font-semibold mb-2">
								{isEdit && "Editar "}
								Detalhes do Perfil
							</h1>
							<h2 className="text-center text-base text-muted-foreground italic mb-7">*Campos obrigatórios</h2>
							
							<FormField
								control={form.control}
								name="picture"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Foto de Perfil</FormLabel>
										<FormControl>
											<Input type="file" {...field} accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome*</FormLabel>
										<FormControl>
											<Input placeholder="Nome" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>E-mail*</FormLabel>
										<FormControl>
											<Input placeholder="E-mail" {...field} disabled/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="birthday"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Data de Nascimento*</FormLabel>
										<FormControl>
											<Input
												type="string"
												onChangeCapture={handleDateChange}
												placeholder="dd/mm/yyyy"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="region"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Região*</FormLabel>
										<FormControl>
											<Combobox placeholder="Selecione sua região" options={regions} field={field} setValue={form.setValue}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Idioma*</FormLabel>
										<FormControl>
											<Combobox placeholder="Selecione seu idioma" options={languages} field={field} setValue={form.setValue}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						}

						{/* page 2 */}

						{page === 2 && 
						<div className="space-y-3">
							

							<h1 className="text-center text-3xl font-semibold mb-2">
								{isEdit && "Editar "}
								Detalhes do Jogo
							</h1>
							<h2 className="text-center text-base text-muted-foreground italic mb-7">*Campos obrigatórios</h2>

							<FormField
								control={form.control}
								name="nickname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome de Usuário*</FormLabel>
										<FormControl>
											<Input placeholder="Nome de Usuário" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="agents"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Agentes*</FormLabel>
										<FormControl>
											<ScrollArea className="h-72 pr-2 shadow-inner">
												<div className="grid grid-cols-4 gap-4 mt-2">
													{agents.map(agent => {
														return <AgentCard 
															key={agent.name} 
															iconUrl={agent.iconUrl} 
															name={agent.name} 
															isActive={selectedAgents.includes(agent.name)}
															toggleAgentSelection={toggleAgentSelection}
														/>
													})}
												</div>
											</ScrollArea>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Função*</FormLabel>
										<FormControl>
											<Combobox placeholder="Selecione sua função" options={roles} field={field} setValue={form.setValue}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rank"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rank*</FormLabel>
										<FormControl>
											<Combobox placeholder="Selecione seu rank" options={ranks} field={field} setValue={form.setValue}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="gameDays"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dias de jogo</FormLabel>
										<FormControl>
											<WeekdayPicker
												toggleDaySelection={toggleDaySelection}
												selectedDays={selectedDays}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="gameHoursStart"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Horário Início</FormLabel>
										<FormControl>
											<Input placeholder="18:00" onChangeCapture={(event) => {
												const formattedHour = handleHoursChange(event)
												setFormattedHourStart(formattedHour)
											}} maxLength={5} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
									
							<FormField
								control={form.control}
								name="gameHoursEnd"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Horário Fim</FormLabel>
										<FormControl>
											<Input placeholder="22:00" onChangeCapture={(event) => {
												const formattedHour = handleHoursChange(event)
												setFormattedHourEnd(formattedHour)
											}} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
								
						</div>
						}
						{page === 3 &&
						<div className="space-y-3 mb-16">
							{isEdit &&
							<>
								<h1 className="text-center text-3xl font-semibold mb-14">Finalizar Edição</h1>
								<p className="text-center">Clique em concluir para finalizar a edição dos seus dados.</p>
							</>
							}
							{!isEdit && 
							<>
								<h1 className="text-center text-3xl font-semibold mb-14">Tudo pronto!</h1>
								<p className="text-center">Clique em concluir para finalizar seu cadastro e começar a procurar seu próximo duo! Seja bem vindo.</p>
							</>
							}
							{error.length > 1 &&
								<p className="text-center text-xl text-red-600">{error}</p>
							}
							
						</div>
						}
						
						<div className="flex justify-between pt-6">
							{page > 1 ?
								(<Button variant="secondary" onClick={() => page > 1 ? setPage(page - 1) : setPage(page)} disabled={isLoading}>Voltar</Button>) :
								(<div className="invisible"></div>)
								
							}

							{page < 3 &&
								<Button type="button" onClick={handleNextPage} disabled={isLoading}>Próxima</Button>

							}
							{page === 3 &&
								<Button type="submit" disabled={isLoading}>
									{isLoading &&
										<Spinner className="fill-white h-5 w-5 mr-2" />
									}
								Confirmar
								</Button>
							}
						</div>
						{isEdit &&
							<div className="flex justify-center">
								<Button className="mt-5" variant="destructive" onClick={() => router.push("/profile")} disabled={isLoading}>Cancelar Edição</Button>
							</div>							
						}
					</form>
				</Form>
			</MainCard>

		</main>
	)
}

export async function getServerSideProps(context) {

	const session = await getSession(context)
	const cookies = nookies.get(context)
	const isEdit = context.query.isEdit || null
	let defaultUserData = null

	if(isEdit && session){
		try {
			await connectDB()
			let user = await getUserByEmail(session.user.email)
			if(user) {
				defaultUserData = JSON.parse(JSON.stringify(user))
			}
		} catch (error) {
			console.log(error)
		}
	}

	let userData = null

	if(session) {
		userData = {
			email: session.user.email,
			sub: session.user.sub
		}
	} else {
		userData = JSON.parse(cookies.user)
		userData.provider = cookies.provider
	}

	function sortAlphabetically(array){
		array.sort((a, b) => {
			const nameA = a.name.toUpperCase()
			const nameB = b.name.toUpperCase()
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0
		})
	
		return array
	}

	// regions
	const regions = [{name: "América Do Norte"}, {name: "América Latina"}, {name: "Brasil"}, {name: "Europa"}, {name: "Coréia"}, {name: "Ásia"}]

	//get countries and languages
	const result = await axios.get("https://restcountries.com/v3.1/all")
	let languagesSet = new Set()
	result.data.forEach(country => {
		if (country.languages && typeof country.languages === "object") {
			Object.values(country.languages).forEach(language => {
				languagesSet.add(language)
			})
		}
	})
	let languages = Array.from(languagesSet).sort().map(language => ({ name: language }))


	let countries = result.data.map(country => {
		return {
			name: country.name.common,
			code: country.cca2,
			iconUrl: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`
		}
	})

	countries = sortAlphabetically(countries)

	//get ranks
	const ranksResult = await axios.get("https://valorant-api.com/v1/competitivetiers")
	const ranksResultArray = ranksResult.data.data
	let ranks

	// if(ranksResult.status === 200) {
	// 	// console.log(ranksResultArray[ranksResultArray.length - 1].tiers)
	// 	ranks = ranksResultArray[ranksResultArray.length - 1].tiers.map(rank => {
	// 		if(rank.tier > 2){
	// 			return{
	// 				name: rank.tierName,
	// 				iconUrl: rank.smallIcon
	// 			}
	// 		}
	// 	})

	// 	console.log(ranks)

	// } else {
	// 	//logica se a chamada der erro
	// }
	ranks = ranksResultArray[ranksResultArray.length - 1].tiers
		.filter(rank => rank.tier > 2)
		.map(rank => {
			return {
				name: capitalizeFirstLetter(rank.tierName),
				iconUrl: rank.smallIcon
			}
		})
	

	//get agents and roles
	let agents, roles = []
	const agentsResult = await axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
	const agentsResultArray = agentsResult.data.data

	agents = agentsResultArray.map(agent => {
		if(!roles.find(role => role.name === agent.role.displayName)){
			roles.push({
				name: agent.role.displayName,
				iconUrl: agent.role.displayIcon
			})
		}
		return {
			name: agent.displayName,
			iconUrl: agent.displayIcon
		}
	})

	//adicionando a opção flex pros roles
	roles.push({
		name: "Flex",
		icon: "Asterisk"
	})

	return { props: { userData, regions, languages, ranks, agents, roles, defaultUserData, isEdit, session: !!session }}
}
