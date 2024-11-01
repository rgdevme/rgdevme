import dayjs from 'dayjs'

export const dateString = (date: string | null) => {
	if (date === null) return 'Now'
	const d = dayjs(date)
	if (!d.isValid()) return null
	return d.format('MMM. YY').toString()
}
