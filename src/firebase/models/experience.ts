import dayjs from 'dayjs'
import { fireborm } from '../config'
import {
	ExperienceDefault,
	ExperienceDoc,
	ExperienceModel,
	ExperienceRef
} from '../types/experience'
import { Timestamp } from 'firebase/firestore'

export const experienceStore = fireborm.initializeStore<
	ExperienceDoc,
	ExperienceModel,
	ExperienceDefault,
	ExperienceDefault
>({
	singular: 'Experience',
	plural: 'Experiences',
	path: 'experience',
	defaultData: {
		project: '',
		role: '',
		description: '',
		institution: '',
		client: '',
		skills: [],
		links: [],
		images: [],
		type: '',
		format: ''
	},
	toModel: doc => {
		const { id, ref } = doc
		const { start, end, ...docData } = doc.data()
		const model = {
			...docData,
			id,
			_ref: ref as ExperienceRef,
			start: start && dayjs(start.toDate()),
			end: end && dayjs(end.toDate())
		}

		return model
	},
	toDocument: ({ id, _ref, start, end, ...model }) => {
		const doc = {
			...model,
			start: start && Timestamp.fromDate(start.toDate()),
			end: end && Timestamp.fromDate(end.toDate())
		}
		return doc
	}
})

export const experienceCover = fireborm.initializeStorage({
	path: 'experience',
	folder: 'cover'
})
export const experienceImages = fireborm.initializeStorage({
	path: 'experience',
	folder: 'images'
})
