import { experienceStore } from '../firebase/models/experience'
import { ExperienceModel } from '../firebase/types/experience'

export type MergedExperience = Pick<
	ExperienceModel,
	'role' | 'contract' | 'country' | 'institution' | 'start' | 'end'
> & {
	projects: Omit<
		ExperienceModel,
		'institution' | 'country' | 'contract' | 'role'
	>[]
}

export const getExperience = async () => {
	const results = await experienceStore.query({
		where: [['completed', '==', true]]
	})

	const [experience, category, contract, country] = results.reduce(
		(acc, project) => {
			if (!acc[0].has(project.institution)) {
				acc[0].set(project.institution, { ...project, projects: [] })
			}

			const institution = acc[0].get(project.institution)!
			institution.projects.push(project)

			const newEnd = project.end
			if (project.start?.isBefore(institution.start ?? null))
				institution.start = project.start
			if (project.end?.isAfter(institution.end ?? null)) {
				institution.end = project.end
			}

			if (project?.category) acc[1].add(project?.category)
			if (project?.contract) acc[2].add(project?.contract)
			if (project?.country) acc[3].add(project?.country)
			return acc
		},
		[
			new Map<string, MergedExperience>(),
			new Set<string>(),
			new Set<string>(),
			new Set<string>()
		]
	)

	return {
		experience: Array.from(experience.values()),
		experience_category: Array.from(category),
		experience_contract: Array.from(contract),
		experience_country: Array.from(country)
	}
}
