import { ExperienceModel } from '@/src/firebase/types/experience'

export type MergedExperience = Pick<
	ExperienceModel,
	'role' | 'format' | 'institution' | 'start' | 'end'
> & {
	projects: Omit<ExperienceModel, 'institution' | 'contract' | 'role'>[]
}

export const extractExperienceData = (results: ExperienceModel[]) => {
	const [experience, category, contract, country] = results.reduce(
		(acc, project) => {
			if (!acc[0].has(project.institution)) {
				acc[0].set(project.institution, { ...project, projects: [] })
			}

			const institution = acc[0].get(project.institution)!
			institution.projects.push(project)

			if (project.start?.isBefore(institution.start ?? null))
				institution.start = project.start
			if (project.end?.isAfter(institution.end ?? null)) {
				institution.end = project.end
				institution.format = project.format
			}

			acc[0].set(project.institution, institution)
			if (project?.type) acc[1].add(project?.type)
			if (project?.format) acc[2].add(project?.format)

			return acc
		},
		[
			new Map<string, MergedExperience>(),
			new Set<string>(),
			new Set<string>(),
			new Set<string>()
		]
	)

	const finalResutls = {
		experience: Array.from(experience.values()),
		experience_category: Array.from(category),
		experience_contract: Array.from(contract),
		experience_country: Array.from(country)
	}

	return finalResutls
}
