import { fireborm } from '../config'
import {
	ProfileDefault,
	ProfileDoc,
	ProfileModel,
	ProfileRef
} from '../types/profile'

export const profileStore = fireborm.initializeStore<
	ProfileDoc,
	ProfileModel,
	ProfileDefault,
	ProfileDefault
>({
	singular: 'Profile',
	plural: 'Profiles',
	path: 'profile',
	defaultData: {
		profile_picture: '',
		name: '',
		goal: '',
		links: [],
		email: { name: 'email', url: '' }
	},
	toModel: ({ id, ref, data }) => {
		const { ...docData } = data()
		const model = {
			...docData,
			id,
			_ref: ref as ProfileRef
		}

		return model
	},
	toDocument: ({ id, _ref, ...model }) => {
		const doc = model
		return doc
	}
})

export const profileBucket = fireborm.initializeStorage({
	path: 'profile',
	folder: 'icon'
})
