/* eslint-disable react-hooks/exhaustive-deps */
import { useData, useFilter } from '@/src/context/data'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { ExperienceCard } from '../Card/experience'
import { MergedExperience } from '@/src/lib/transformers/experience'

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
							filter.experience_category.some(z => (y.type = z))

						const hasSkill =
							filter.skill_type.length === 0 ||
							filter.skill_type.every(z => y.skills?.some(s => s.id === z))

						const inDateRange =
							(filter.range[0] !== null
								? !dayjs(filter.range[0]).isAfter(dayjs(y.start))
								: true) &&
							(filter.range[1] !== null
								? !dayjs(filter.range[1]).isBefore(dayjs(y.end))
								: true)

						const hasLink = filter.withLink ? y.links.length > 0 : true

						return true // isCategory && hasSkill && inDateRange && hasLink
					})
				]

				console.log({ projects })

				upd.projects = projects
				if (projects.length !== 0) acc.push(upd)
				console.log({ acc })
				return acc
			}, [] as MergedExperience[]),
		[
			experience,
			filter.experience_category,
			filter.skill_type,
			filter.range,
			filter.withLink
		]
	)

	console.log({ filteredExperiences })
	return (
		<div
			id='experience-list'
			className='flex flex-col gap-8 mx-auto max-w-3xl w-full'>
			{filteredExperiences.map(data => (
				<ExperienceCard key={data.institution} {...data} />
			))}
		</div>
	)
}
