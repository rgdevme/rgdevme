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

export const SideMenu = ({
	profile_picture,
	name,
	goal,
	links,
	email
}: Awaited<ReturnType<typeof getInfo>>) => {
	return (
		<div className='cursor-default sm:fixed sm:max-w-md sm:max-h-screen h-screen overflow-overlay overflow-x-hidden bg-zinc-900 no-scrollbar static w-screen sm:w-[40vw]'>
			<div className='bg-zinc-100 relative after:content-[""] after:w-full after:h-64 after:bottom-0 after:absolute after:bg-gradient-to-t after:from-zinc-900 after:to-transparent after:z-10'>
				<h2 className='relative text-5xl sm:text-4xl md:text-5xl leading-none text-zinc-600 font-display font-black		 uppercase px-8 pt-8 -mb-8 z-0'>
					{name}
				</h2>
				{profile_picture && (
					<Image
						src={profile_picture}
						alt={name}
						width={200}
						height={200}
						className='w-[120%] max-w-none object-center relative left-1/2 -translate-x-1/2 z-10'
						priority={true}
					/>
				)}
			</div>
			<div className='bg-zinc-900 p-8 flex font-mono flex-col gap-4 text-zinc-500'>
				<div className='flex flex-row gap-2 justify-evenly'>
					<Tooltip label='Email' className='cammelcase'>
						<a href={`mailto:${email}`} className='hover:text-zinc-300'>
							<IconMail />
							<span className='hidden'>email</span>
						</a>
					</Tooltip>
					{links.map(x => (
						<Tooltip key={x.name} label={x.name} className='capitalize'>
							<Link
								href={x.url ?? '#'}
								className='hover:text-zinc-300 active:text-zinc-100'>
								{x.name === 'linkedin' ? (
									<>
										<IconBrandLinkedin />
										<span className='hidden'>{x.name}</span>
									</>
								) : x.name === 'behance' ? (
									<>
										<IconBrandBehance />
										<span className='hidden'>{x.name}</span>
									</>
								) : x.name === 'github' ? (
									<>
										<IconBrandGithub />
										<span className='hidden'>{x.name}</span>
									</>
								) : (
									'#'
								)}
							</Link>
						</Tooltip>
					))}
				</div>

				<h3 className='text-lg uppercase font-display font-bold p-0 hover:text-zinc-300'>
					About me
				</h3>
				<p className='hover:text-zinc-300 font-thin'>{goal}</p>
			</div>
		</div>
	)
}
