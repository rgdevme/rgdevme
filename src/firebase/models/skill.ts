import { fireborm } from '../config'
import { SkillDefault, SkillDoc, SkillModel, SkillRef } from '../types/skill'

export const skillStore = fireborm.initializeStore<
	SkillDoc,
	SkillModel,
	SkillDefault,
	SkillDefault
>({
	singular: 'Skill',
	plural: 'Skills',
	path: 'skill',
	defaultData: {
		institution: '',
		name: '',
		experience: [],
		tags: [],
		use_count: 0,
		certifications: []
	},
	toModel: ({ id, ref, data }) => {
		const { ...docData } = data()
		const model = {
			...docData,
			use_count: docData.certifications.length,
			id,
			_ref: ref as SkillRef
		}

		return model
	},
	toDocument: ({ id, _ref, use_count, ...model }) => {
		const doc = model
		return doc
	}
})

export const skillBucket = fireborm.initializeStorage({
	path: 'skill',
	folder: 'icon'
})
