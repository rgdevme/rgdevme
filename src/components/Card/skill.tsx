import { useFilter } from '@/src/context/data'
import { SkillModel } from '@/src/firebase/types/skill'

export const SkillCard = ({
	id,
	name,
	hide
}: SkillModel & { hide: boolean }) => {
	const {
		filters: { skill },
		filterSkill
	} = useFilter()

	return (
		<span
			data-active={skill.includes(id)}
			data-hide={hide}
			className={`cursor-pointer hover:text-zinc-900 data-[active=true]:text-zinc-900 data-[active=true]:font-bold data-[hide=true]:opacity-1`}
			onClick={() => {
				const upd = [...skill]
				const index = skill.indexOf(id)
				if (index >= 0) upd.splice(index, 1)
				else upd.push(id)
				filterSkill(upd)
			}}>
			{name}
		</span>
	)
}
