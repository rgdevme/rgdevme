import { useData, useFilter, useSetFilter } from '@/src/context/data'
import { MultiSelect } from '@mantine/core'

export const SkillsFilter = () => {
	const {
		skills,
		//skill_tags,
		skill_type
	} = useData()
	const filter = useFilter()
	const set = useSetFilter()

	const skillList = skills
		.filter(x => x.use_count > 0)
		.map(s => ({ label: `${s.name}`, value: s.id }))
		.sort((a, b) => a.label.localeCompare(b.label))

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
				onChange={val => set('skill_type', val)}
				value={filter.skill_type}
				placeholder='Looking for a particular skill?'
				data={skillList}
				searchable
				hidePickedOptions
				clearable
			/>

			{/* {skill_type.map((t, i) => {
				const list = skills
					.filter(x => x.use_count > 0 && x.type === t.id)
					.map(s => ({ label: `${s.name}`, value: s.id }))
					.sort((a, b) => a.label.localeCompare(b.label))

				return list.length <= 1 ? null : (
					<MultiSelect
						key={t.id}
						radius={'xl'}
						styles={{
							root: { width: '25%', minWidth: 'unset', flex: '1 1 0' },
							input: { minWidth: 'unset' },
							inputField: { minWidth: 'unset' }
						}}
						onChange={val => set('skill_type', val)}
						value={filter.skill_type.filter(x =>
							list.map(i => i.value).includes(x)
						)}
						placeholder={t.name}
						data={list}
						searchable
					/>
				)
			})} */}
		</div>
	)
}
