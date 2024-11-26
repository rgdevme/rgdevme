import { ConvertedModel, DefaultModel } from '@/src/utils/types'
import { DocumentReference } from 'firebase/firestore'

export type ProfileDoc = {
	profile_picture: string
	name: string
	goal: string
	links: { name: string; url: string }[]
	email: { name: 'email'; url: string }
}

export type ProfileModel = Omit<ConvertedModel<ProfileDoc>, '_ref'>

export type ProfileDefault = DefaultModel<ProfileModel>

export type ProfileRef = DocumentReference<ProfileModel, ProfileDoc>
