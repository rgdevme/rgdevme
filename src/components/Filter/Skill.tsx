import { useData, useFilter } from '@/src/context/data'
import { MultiSelect } from '@mantine/core'

export const SkillsFilter = () => {
	const {
		skills,
		experience
		//skill_tags,
		// skill_type
	} = useData()
	const {
		filters: { skill },
		filterSkill
	} = useFilter()

	const skillList = skills
		.filter(s => s.use_count > 0)
		.filter(s =>
			experience.some(x =>
				x.projects
					.map(p => p.skills.map(ps => ps.id))
					.flat()
					.includes(s.id)
			)
		)
		.map(s => ({ label: `${s.name} [${s.use_count}]`, value: s.id }))
		.sort((a, b) => a.label.localeCompare(b.label))

	console.log(skills)

	return (
		<div className='flex flex-row gap-2 flex-1'>
			<MultiSelect
				radius={'xl'}
				comboboxProps={{
					transitionProps: { transition: 'pop', duration: 200 }
				}}
				styles={{
					root: { width: '25%', minWidth: 'unset', flex: '1 1 0' },
					input: { minWidth: 'unset', cursor: 'pointer', border: 0 },
					inputField: { minWidth: 'unset', cursor: 'pointer' },
					dropdown: { borderRadius: '1rem' }
				}}
				className='drop-shadow-md'
				onChange={filterSkill}
				value={skill}
				placeholder='Looking for a particular skill?'
				data={skillList}
				searchable
				hidePickedOptions
				clearable
			/>
		</div>
	)
}
