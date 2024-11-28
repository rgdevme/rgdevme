import { useData } from '@/src/context/data'
import { dateString } from '@/src/utils/date'
import { ProjectCard } from './project'
import { MergedExperience } from '@/src/lib/transformers/experience'

export const ExperienceCard = ({
	institution,
	role,
	start,
	end,
	projects
}: MergedExperience) => {
	const {} = useData()

	return (
		<div key={institution}>
			<div className='flex flex-col md:flex-row gap-4 justify-between md:items-center'>
				<div className='title'>
					<span className='role font-black font-display uppercase'>{role}</span>
					<span className='institution text-zinc-500 font-mono text-sm font-medium'>
						{' '}
						at {institution}
					</span>
				</div>
				<span className='date text-zinc-500 font-mono text-xs font-medium'>
					<span className='start'>{dateString(start)}</span>
					{` - `}
					<span className='end'>{dateString(end)}</span>
					{/* {` | `}
					{country && (
						<span>{experience_country.find(z => z.id === country)!.name}</span>
					)} */}
				</span>
			</div>

			<div className='flex flex-col gap-6 mt-4 md:my-2 md:ml-4'>
				{projects
					.filter(x => x)
					.map(project => (
						<ProjectCard key={project.id} {...project} />
					))}
			</div>
		</div>
	)
}
