import { useFilter, useSetFilter } from '@/src/context/data'
import { Skill } from '@/src/lib/getSkills'

export const SkillCard = ({ id, name, hide }: Skill & { hide: boolean }) => {
	const set = useSetFilter()
	const { skill_type } = useFilter()

	const isActive = skill_type.includes(id)

	return (
		<span
			data-active={isActive}
			data-hide={hide}
			className={`cursor-pointer hover:text-zinc-900 data-[active=true]:text-zinc-900 data-[active=true]:font-bold data-[hide=true]:opacity-1`}
			onClick={() => set('skill_type', id)}>
			{name}
		</span>
	)
}
