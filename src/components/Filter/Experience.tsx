import { useData } from '@/src/context/data'
import { MultiSelect } from '@mantine/core'

export const ExperiencesFilter = () => {
	const { experience_category, experience_contract } = useData()

	return (
		<div className='flex flex-row gap-2'>
			<MultiSelect
				styles={{
					root: { width: '0%', minWidth: 'unset', flex: '1 0 auto' },
					input: { minWidth: 'unset' },
					inputField: { minWidth: 'unset' }
				}}
				placeholder='Experience type'
				data={experience_category
					.map(s => ({ label: `${s.name}`, value: s.id }))
					.sort((a, b) => a.label.localeCompare(b.label))}
				searchable
			/>
			<MultiSelect
				styles={{
					root: { width: '0%', minWidth: 'unset', flex: '1 0 auto' },
					input: { minWidth: 'unset' },
					inputField: { minWidth: 'unset' }
				}}
				placeholder='Contract'
				data={experience_contract
					.map(s => ({ label: `${s.name}`, value: s.id }))
					.sort((a, b) => a.label.localeCompare(b.label))}
				searchable
			/>
			{/* <MultiSelect
				styles={{
					root: { width: '0%', minWidth: 'unset', flex: '1 0 auto' },
					input: { minWidth: 'unset' },
					inputField: { minWidth: 'unset' }
				}}
				placeholder='Country'
				data={experience_country
					.map(s => ({ label: `${s.name}`, value: s.id }))
					.sort((a, b) => a.label.localeCompare(b.label))}
				searchable
			/> */}
		</div>
	)
}
