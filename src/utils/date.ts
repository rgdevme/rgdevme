import dayjs, { Dayjs } from 'dayjs'

export const dateString = (date?: Dayjs) => {
	if (date === null) return 'Now'
	if (!date?.isValid()) return null
	return date.format('MMM. YY').toString()
}
