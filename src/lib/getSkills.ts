import { skillStore } from '../firebase/models/skill'

export const getSkills = async () => {
	const results = await skillStore.query({ where: [] })
	const sortedResults = results.sort((a, b) => {
		if (b.area === a.area) {
			if (b.type === a.type) {
				if (b.name === a.name) return 0
				else if (!b.name && a.name) return 1
				else if (!a.name && b.name) return -1
				else return a.name!.localeCompare(b.name!)
			} else if (!b.type && a.type) return 1
			else if (!a.type && b.type) return -1
			else return a.type!.localeCompare(b.type!)
		} else if (!b.area && a.area) return 1
		else if (!a.area && b.area) return -1
		else return a.area!.localeCompare(b.area!)
	})

	const [tags, type] = results.reduce(
		(acc, curr) => {
			curr.tags.forEach(t => acc[0].add(t))
			if (curr.type) acc[1].add(curr.type)
			return acc
		},
		[new Set<string>(), new Set<string>()]
	)

	return {
		skills: sortedResults,
		skill_tags: Array.from(tags),
		skill_type: Array.from(type)
	}
}
