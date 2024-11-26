'use client'

import { useToggle, useViewportSize } from '@mantine/hooks'
import { DateFilter } from '../src/components/Filter/Dates'
import { WithLink } from '../src/components/Filter/Link'
import { SkillsFilter } from '../src/components/Filter/Skill'
import { ExperienceList } from '../src/components/List/experience'
import { SideMenu } from '../src/components/SideMenu'
import { DataProvider } from '../src/context/data'
import { getExperience } from '../src/lib/getExperience'
import { getInfo } from '../src/lib/getInfo'
import { getSkills } from '../src/lib/getSkills'

export default function Home({
	info,
	...props
}: Awaited<ReturnType<typeof getExperience>> &
	Awaited<ReturnType<typeof getSkills>> & {
		info: Awaited<ReturnType<typeof getInfo>>
	}) {
	const [menuItem, toggle] = useToggle(['experience', 'skills', 'blog'])
	const { width } = useViewportSize()

	return (
		<DataProvider
			data={props}
			filters={{
				skill_type: [],
				experience_category: [],
				range: [null, null],
				withLink: false
			}}>
			<div className={''}>
				{info && <SideMenu {...info} />}
				<div
					className='p-6'
					style={{
						marginLeft: width < 640 ? 0 : 'clamp(12rem, 40vw, 28rem)',
						overflowX: 'hidden'
					}}>
					{/* <div id='menu' className='flex justify-evenly '>
						<span
							onClick={() => toggle('experience')}
							className={menuItem === 'experience' ? `font-bold` : ''}>
							Experience
						</span>
						<span
							onClick={() => toggle('skills')}
							className={menuItem === 'skills' ? `font-bold` : ''}>
							Skills
						</span>
						<span>Blog</span>
					</div> */}
					<div id='views' className='flex flex-col gap-4 mt-4 sm:mt-0'>
						{menuItem === 'experience' ? (
							<>
								<div className='filters flex flex-col md:flex-row gap-2 md:gap-4 mx-auto w-full max-w-3xl '>
									<DateFilter />
									<SkillsFilter />
									<WithLink />
								</div>
								<ExperienceList />
							</>
						) : menuItem === 'skills' ? (
							<>
								<span>Skills</span>
								<div id='skill-list'>
									<h3>Skills</h3>
									<p>
										View of the top five skills and, down, an arrow drop down to
										see all of the skills:
									</p>
									<ul>
										<li>Name</li>
										<li>Gauge: Lvl indicator based on Project count</li>
										<li>Show related projects on click</li>
									</ul>
								</div>
							</>
						) : menuItem === 'blog' ? (
							'Blog'
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</DataProvider>
	)
}
