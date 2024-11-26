import { ConvertedModel, DefaultModel } from '@/src/utils/types'
import { ExperienceRef } from './experience'

export type SkillDoc = {
	icon?: string
	type?: string
	area?: string
	tags: string[]
	level?: string
	institution: string
	name: string
	experience: ExperienceRef[]
	certifications: { name: string; url: string }[]
}

export type SkillModel = ConvertedModel<SkillDoc, { use_count: number }>

export type SkillDefault = DefaultModel<SkillModel>

export type SkillRef = SkillModel['_ref']
