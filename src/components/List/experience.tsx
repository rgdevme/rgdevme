/* eslint-disable react-hooks/exhaustive-deps */
import { useData, useFilter, useSetFilter } from '@/src/context/data'
import { MergedExperience } from '@/src/utils/experience'
import { useMemo } from 'react'
import { ExperienceCard } from '../Card/experience'

export const ExperienceList = () => {
	const { experience } = useData()
	const filter = useFilter()

	const filteredExperiences = useMemo(
		() =>
			experience.reduce((acc, curr) => {
				const upd = { ...curr }
				const projects = [
					...upd.projects.filter(y => {
						const isCategory =
							filter.experience_category.length === 0 ||
							filter.experience_category.some(z => (y.category = z))

						const hasSkill =
							filter.skill_type.length === 0 ||
							filter.skill_type.every(z => y.skills?.includes(z))

						console.log(y.project, {
							isCategory,
							hasSkill,
							filter: filter.skill_type,
							skills: y.skills
						})

						return isCategory && hasSkill
					})
				]

				console.log({ projects })

				upd.projects = projects
				if (projects.length !== 0) acc.push(upd)
				return acc
			}, [] as MergedExperience[]),
		[filter.experience_category, filter.skill_type]
	)

	console.log({ experience })

	return (
		<div id='experience-list' className='flex flex-col gap-8 mx-auto max-w-3xl'>
			{filteredExperiences.map(data => (
				<ExperienceCard key={data.institution} {...data} />
			))}
		</div>
	)
}
