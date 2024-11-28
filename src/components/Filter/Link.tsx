import { useFilter } from '@/src/context/data'
import { Checkbox } from '@mantine/core'

export const WithLink = () => {
	const {
		filters: { withLink },
		filterLink
	} = useFilter()

	return (
		<Checkbox
			label='With link'
			size='sm'
			className='flex text-zinc-500'
			styles={{
				body: { alignItems: 'center' },
				label: { color: 'slategray' }
			}}
			defaultChecked={withLink}
			onChange={e => filterLink(e.target.checked)}
		/>
	)
}
