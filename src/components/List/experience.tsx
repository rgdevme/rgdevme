/* eslint-disable react-hooks/exhaustive-deps */
import { useData, useFilter, useSetFilter } from '@/src/context/data'
import { MergedExperience } from '@/src/utils/experience'
import { useMemo } from 'react'
import { ExperienceCard } from '../Card/experience'
import dayjs from 'dayjs'

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

						const inDateRange =
							(filter.range[0] !== null
								? !dayjs(filter.range[0]).isAfter(dayjs(y.start))
								: true) &&
							(filter.range[1] !== null
								? !dayjs(filter.range[1]).isBefore(dayjs(y.end))
								: true)

						const hasLink = filter.withLink ? y.links.length > 0 : true

						console.log(y.project, {
							isCategory,
							hasSkill,
							filter: filter.skill_type,
							skills: y.skills,
							inDateRange,
							range: filter.range
						})

						return isCategory && hasSkill && inDateRange && hasLink
					})
				]

				console.log({ projects })

				upd.projects = projects
				if (projects.length !== 0) acc.push(upd)
				return acc
			}, [] as MergedExperience[]),
		[
			filter.experience_category,
			filter.skill_type,
			filter.range,
			filter.withLink
		]
	)

	return (
		<div id='experience-list' className='flex flex-col gap-8 mx-auto max-w-3xl'>
			{filteredExperiences.map(data => (
				<ExperienceCard key={data.institution} {...data} />
			))}
		</div>
	)
}
