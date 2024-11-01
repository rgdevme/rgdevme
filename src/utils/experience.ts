import dayjs, { Dayjs } from 'dayjs'
import { ExperienceItem, getExperience } from '../lib/getExperience'

export const experienceAsText = (items: ExperienceItem[]) => {
	console.clear()

	const now = Date.now()
	let last_desc = ''
	let txt = ''

	const records: Map<
		string,
		{
			start: Date
			end: Date
			institution: string
			role: string
			clients: Map<
				string,
				{
					client: string
					start: Date
					role: string
					end: Date
					items: {
						description: string
						start: Date
						end: Date
					}[]
				}
			>
		}
	> = new Map()

	items
		.map(x => ({
			...x,
			client: x.client.trim(),
			institution: x.institution.trim(),
			description: x.description.trim()
		}))
		.filter(x => x.category === '9147e54b-6480-4a28-985c-407afcbca5f8')
		.forEach(x => {
			if (!records.has(x.institution)) {
				records.set(x.institution, {
					start: new Date(x.start),
					end: new Date(x.end ?? now),
					clients: new Map(),
					institution: x.institution,
					role: x.role
				})
			}

			const institutionData = records.get(x.institution)!

			if (institutionData.start.valueOf() > new Date(x.start).valueOf()) {
				institutionData.start = new Date(x.start)
			}
			if (institutionData.end.valueOf() < new Date(x.end ?? now).valueOf()) {
				institutionData.end = new Date(x.end ?? now)
				institutionData.role = x.role.trim()
			}

			if (!institutionData.clients.has(x.client)) {
				institutionData.clients.set(x.client, {
					client: x.client,
					start: new Date(x.start),
					end: new Date(x.end ?? now),
					items: [],
					role: x.role
				})
			}
			const clientData = institutionData.clients.get(x.client)!

			if (clientData.start.valueOf() > new Date(x.start).valueOf()) {
				clientData.start = new Date(x.start)
			}
			if (clientData.end.valueOf() < new Date(x.end ?? now).valueOf()) {
				clientData.end = new Date(x.end ?? now)
			}

			const items = [
				...clientData.items,
				{
					description: x.description,
					start: new Date(x.start),
					end: new Date(x.end ?? now)
				}
			].sort((a, b) => b.start.valueOf() - a.start.valueOf())
			clientData.items = items
			institutionData.clients.set(x.client, clientData)
			records.set(x.institution, institutionData)
		})

	const institutionsArray = Array.from(records.values()).sort(
		(a, b) => b.end.valueOf() - a.end.valueOf()
	)
	institutionsArray.forEach(x => {
		Array.from(x.clients.values())
			.sort((a, b) => {
				if (a.client === x.institution) return -1
				if (b.client === x.institution) return 1
				return b.start.valueOf() - a.start.valueOf()
			})
			.forEach(c => {
				const startM = c.start.toLocaleString('us', { month: 'short' })
				const startY = c.start.toLocaleString('us', { year: 'numeric' })
				const start = `${startM}. ${startY}`
				const endM = c.end.toLocaleString('us', { month: 'short' })
				const endY = c.end.toLocaleString('us', { year: 'numeric' })
				const end = c.end.valueOf() === now ? 'Now' : `${endM}. ${endY}`

				txt += `\n${c.role} ${start} - ${end}`
				if (c.client !== x.institution) txt += ` for ${c.client}`
				txt += ` at ${x.institution}\n`

				c.items.forEach(i => {
					if (i.description === last_desc) return
					last_desc = i.description
					txt += '- ' + last_desc + '\n'
				})
			})
	})
}

export type MergedExperience = Pick<
	ExperienceItem,
	'role' | 'contract' | 'country' | 'institution' | 'start' | 'end'
> & {
	projects: Omit<
		ExperienceItem,
		'institution' | 'country' | 'contract' | 'role'
	>[]
}

export const mergeExperiences = (experiences: ExperienceItem[]) => {
	const mergedExperiences = new Map<string, MergedExperience>()

	experiences.forEach(({ institution, country, contract, role, ...exp }) => {
		if (!mergedExperiences.has(institution)) {
			mergedExperiences.set(institution, {
				institution,
				country,
				contract,
				start: exp.start,
				end: exp.end ? exp.end : null,
				role,
				projects: []
			})
		}

		const current = mergedExperiences.get(institution)!
		const newStart = dayjs(exp.start)
		const newEnd = exp.end ? dayjs(exp.end) : null
		current.projects.push(exp)
		if (newStart.isBefore(current.start)) current.start = exp.start
		if (newEnd && current.end && newEnd.isAfter(current.end)) {
			current.end = exp.end
		}
	})

	return Array.from(mergedExperiences.values())
}
