import { useFilter } from '@/src/context/data'
import { MonthPickerInput } from '@mantine/dates'

export const DateFilter = () => {
	const {
		filters: { range },
		filterRange
	} = useFilter()

	return (
		<MonthPickerInput
			type='range'
			placeholder='Pick a date range'
			value={range}
			onChange={filterRange}
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
