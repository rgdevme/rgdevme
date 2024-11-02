import { useData } from '@/src/context/data'
import { dateString } from '@/src/utils/date'
import { MergedExperience } from '@/src/utils/experience'
import { useElementSize, useHover, useToggle } from '@mantine/hooks'
import { SkillCard } from './skill'

export const ProjectCard = ({
	project,
	client,
	description,
	start,
	skills,
	end
}: MergedExperience['projects'][number]) => {
	const { skills: skillList } = useData()
	const [hideSkills, toggleSkills] = useToggle([true, false])
	const { ref: sizeRef, height } = useElementSize()
	const { ref: hoverRef, hovered } = useHover()

	return (
		<div
			ref={hoverRef}
			className='flex flex-col md:flex-row gap-2 md:gap-4 flex-wrap'>
			<div className='top flex flex-col md:gap-2 flex-none md:min-w-[9rem] relative z-10'>
				{client && <span className='client font-bold'>{client}</span>}
				<span className='font-mono text-xs text-zinc-500'>
					{dateString(start)} - {dateString(end)}
				</span>
				<span
					style={{
						opacity: hovered ? 1 : 0,
						transform: hovered ? 'translateY(0)' : 'translateY(-0.5rem)'
					}}
					className='skill-btn hidden md:inline cursor-pointer font-mono  text-xs text-zinc-500 hover:text-zinc-900 text-sm flex flex-1 items-end'
					onClick={() => toggleSkills()}>
					Show skills +
				</span>
			</div>
			<div className='bot flex flex-col gap-2 flex-1'>
				<span className='font-bold'>{project}</span>
				<div className='description text-justify leading-6'>
					{description.split('\n').map(z => (
						<p key={z}>{z}</p>
					))}
				</div>
			</div>
			<div
				ref={sizeRef}
				style={{
					marginTop: hideSkills ? `-${height}px` : 0,
					marginBottom: hideSkills ? 0 : '1rem',
					opacity: hideSkills ? 0 : '1',
					pointerEvents: hideSkills ? 'none' : 'auto'
				}}
				className={`hidden md:flex flex-[1_1_100%] relative select-none z-0 gap-x-4 flex-wrap font-mono text-xs font-normal text-zinc-500 opacity-1 gap-2 data-[show=true]:opacity-0`}>
				{skills
					.map(skid => skillList.find(s => s.id === skid)!)
					.map(skill => (
						<SkillCard key={skill.id} {...skill} hide={true} />
					))}
			</div>
		</div>
	)
}
