import { ConvertedModel, DefaultModel } from '@/src/utils/types'

export type ProfileDoc = {
	profile_picture: string
	name: string
	goal: string
	links: { name: string; url: string }[]
	email: { name: 'email'; url: string }
}

export type ProfileModel = ConvertedModel<ProfileDoc>

export type ProfileDefault = DefaultModel<ProfileModel>

export type ProfileRef = ProfileModel['_ref']
