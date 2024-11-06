import { useFilter, useSetFilter } from '@/src/context/data'
import { DatePickerInput, MonthPickerInput } from '@mantine/dates'

export const DateFilter = () => {
	const { range } = useFilter()
	const set = useSetFilter()

	return (
		<MonthPickerInput
			type='range'
			placeholder='Pick a date range'
			value={range}
			onChange={val => set('range', val)}
			radius='xl'
			valueFormat='MMM. YY'
			clearable
			styles={{
				input: {
					background: 'white',
					border: 0,
					// fontFamily: 'JetBrains Mono',
					fontWeight: 200,
					textTransform: range.some(x => x) ? 'lowercase' : 'none'
				}
			}}
			popoverProps={{ styles: { dropdown: { borderRadius: '1rem' } } }}
			className='drop-shadow-md'
		/>
	)
}
