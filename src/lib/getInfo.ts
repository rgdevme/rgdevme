import { profileStore } from '../firebase/models/profile'

export const getInfo = async () => {
	const response = await profileStore.query({ where: [] })
	console.log({ response })
	return response[0]
}
