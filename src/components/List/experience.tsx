/* eslint-disable react-hooks/exhaustive-deps */
import { useData } from '@/src/context/data'
import { ExperienceCard } from '../Card/experience'

export const ExperienceList = () => {
	const { experience } = useData()
	return (
		<div
			id='experience-list'
			className='flex flex-col gap-8 mx-auto max-w-3xl w-full'>
			{experience.map(data => (
				<ExperienceCard key={data.institution} {...data} />
			))}
		</div>
	)
}
