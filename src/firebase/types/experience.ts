import { ConvertedModel, DefaultModel } from '@/src/utils/types'
import { Dayjs } from 'dayjs'
import { Timestamp } from 'firebase/firestore'
import { SkillRef } from './skill'

export type ExperienceDoc = {
	cover?: string
	project: string
	role: string
	description: string
	institution: string
	client: string
	skills: SkillRef[]
	type: string
	format: string
	links: { name: string; url: string }[]
	images: { name: string; url: string }[]
	start?: Timestamp
	end?: Timestamp
}

export type ExperienceModel = ConvertedModel<
	ExperienceDoc,
	{ start?: Dayjs; end?: Dayjs }
>

export type ExperienceDefault = DefaultModel<ExperienceModel>

export type ExperienceRef = ExperienceModel['_ref']
