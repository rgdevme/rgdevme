import { useFilter, useSetFilter } from '@/src/context/data'
import { Checkbox, getThemeColor } from '@mantine/core'
import theme from 'tailwindcss/defaultTheme'

export const WithLink = () => {
	const { withLink } = useFilter()
	const set = useSetFilter()

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
			onChange={e => set('withLink', e.target.checked)}
		/>
	)
}
