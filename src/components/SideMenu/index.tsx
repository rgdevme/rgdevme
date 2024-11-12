import { getInfo } from '@/src/lib/getInfo'
import Image from 'next/image'
import {
	IconBrandLinkedin,
	IconBrandGithub,
	IconMail,
	IconBrandBehance
} from '@tabler/icons-react'
import { Tooltip } from '@mantine/core'
import Link from 'next/link'

import './style.css'

export const SideMenu = ({
	profile_picture,
	name,
	goal,
	links,
	email
}: Awaited<ReturnType<typeof getInfo>>) => {
	const linkElements = [
		{ name: 'email', url: `mailto:${email}` },
		...links
	].map(x => ({
		...x,
		Icon:
			x.name === 'linkedin'
				? IconBrandLinkedin
				: x.name === 'behance'
				? IconBrandBehance
				: x.name === 'github'
				? IconBrandGithub
				: x.name === 'email'
				? IconMail
				: null
	}))

	const goalArray = goal.trim().split('\n')

	return (
		<div className='sidebar'>
			<div className='profile-wrap'>
				<h2 className='name'>{name}</h2>
				{profile_picture && (
					<Image
						className='profile-pic'
						src={profile_picture}
						alt={name}
						width={200}
						height={200}
						priority
					/>
				)}
			</div>
			<div className='links-wrap'>
				{linkElements.map(x => (
					<Tooltip key={x.name} label={x.name}>
						<Link href={x.url ?? '#'}>
							{x.Icon && <x.Icon />}
							<span>{x.name}</span>
						</Link>
					</Tooltip>
				))}
			</div>
			<div className='about-me'>
				{/* <h3 className='text-lg uppercase font-display font-bold p-0 hover:text-zinc-300'>
					About me
				</h3> */}
				{goalArray.map((p, i, a) => (
					<p key={i} data-last={i === a.length - 1}>
						{p}
					</p>
				))}
			</div>
		</div>
	)
}
