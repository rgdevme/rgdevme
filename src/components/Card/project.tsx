import { useData, useSetFilter } from '@/src/context/data'
import { dateString } from '@/src/utils/date'
import { MergedExperience } from '@/src/utils/experience'
import { useElementSize, useHover, useToggle } from '@mantine/hooks'
import { SkillCard } from './skill'
import { IconExternalLink } from '@tabler/icons-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import Image from 'next/image'

export const ProjectCard = ({
	project,
	client,
	description,
	start,
	skills,
	end,
	links,
	images
}: MergedExperience['projects'][number]) => {
	const { skills: skillList } = useData()
	const set = useSetFilter()
	const [hideSkills, toggleSkills] = useToggle([true, false])
	const { ref: sizeRef, height } = useElementSize()
	const { ref: hoverRef, hovered } = useHover()

	return (
		<div
			ref={hoverRef}
			className='flex flex-col md:flex-row gap-2 md:gap-4 flex-wrap'>
			<div className='top flex flex-col md:gap-2 flex-none md:min-w-[9rem] relative z-10 text-right w-40'>
				{client && <span className='client font-bold'>{client}</span>}
				<span className='font-mono text-xs text-zinc-500'>
					<span
						className='cursor-pointer hover:text-zinc-900'
						onClick={() =>
							set('range', [
								dayjs(start).startOf('month').toDate(),
								dayjs().endOf('month').toDate()
							])
						}>
						{dateString(start)}
					</span>
					{' - '}
					<span
						className='cursor-pointer hover:text-zinc-900'
						onClick={() =>
							set('range', [
								dayjs(end).startOf('month').toDate(),
								dayjs().endOf('month').toDate()
							])
						}>
						{dateString(end)}
					</span>
				</span>
				{!!images[0]?.url && (
					<Image
						alt={project}
						src={images[0].url}
						unoptimized
						unselectable='on'
						width={260}
						height={173}
						style={{
							transitionProperty: 'box-shadow, transform',
							aspectRatio: '3/2'
						}}
						className='rounded-lg shadow-md hover:shadow-2xl z-20 object-cover object-center'
					/>
				)}
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
				<div className='description text-justify leading-6 h-full'>
					{description.split('\n').map(z => (
						<p key={z}>{z}</p>
					))}
				</div>

				{!!links.length && (
					<div className='links flex flex-row gap-2 mb-3'>
						{links.map(link => (
							<Link
								key={link.name}
								href={link.url!}
								title={link.name}
								target='_blank'
								className='flex flex-row gap-2 items-center justify-start w-min break-keep whitespace-nowrap font-mono text-xs px-3 py-1 border border-zinc-300 text-zinc-400 rounded-full hover:bg-zinc-400 hover:border-zinc-400 hover:text-zinc-100'>
								<IconExternalLink size={14} /> {link.name}
							</Link>
						))}
					</div>
				)}
			</div>
			<div
				ref={sizeRef}
				style={{
					marginTop: hideSkills ? `-${height}px` : 0,
					marginBottom: hideSkills ? 0 : '1rem',
					opacity: hideSkills ? 0 : '1',
					pointerEvents: hideSkills ? 'none' : 'auto',
					transitionProperty: 'opacity, margin'
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
