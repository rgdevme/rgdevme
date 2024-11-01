import {
	DatabaseObjectResponse,
	DatePropertyItemObjectResponse,
	EmailPropertyItemObjectResponse,
	FilesPropertyItemObjectResponse,
	MultiSelectPropertyItemObjectResponse,
	NumberPropertyItemObjectResponse,
	PageObjectResponse,
	PhoneNumberPropertyItemObjectResponse,
	RelationPropertyItemObjectResponse,
	RichTextItemResponse,
	RichTextPropertyItemObjectResponse,
	SelectPropertyItemObjectResponse,
	TitlePropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

type Prop =
	| DatabaseObjectResponse['properties'][string]
	| PageObjectResponse['properties'][string]

export type NotionSelect = NonNullable<
	SelectPropertyItemObjectResponse['select']
>

export const getRichText = (prop: Prop) => {
	const property = prop as unknown as RichTextPropertyItemObjectResponse
	const result = (property?.rich_text ??
		[]) as unknown as RichTextItemResponse[]
	return result
}

export const getNotionTitle = (prop: Prop) => {
	const property = prop as unknown as TitlePropertyItemObjectResponse
	const result = (property?.title ?? []) as unknown as RichTextItemResponse[]
	return result
}

export const getDate = (prop: Prop) => {
	const property = prop as unknown as DatePropertyItemObjectResponse
	const result = property?.date
	return result
}

export const getLinks = (prop: Prop) => {
	const property = prop as unknown as FilesPropertyItemObjectResponse
	const result = (property?.files ?? []).map(x => ({
		name: x.name,
		url:
			x.type === 'external'
				? x.external.url
				: x.type === 'file'
				? x.file.url
				: null
	}))
	return result
}

export const getCover = (res: DatabaseObjectResponse) => {
	const property = res.cover
	const result =
		property?.type === 'external'
			? property.external.url
			: property?.type === 'file'
			? property.file.url
			: null
	return result
}

export const getRelations = (prop: Prop) => {
	const property = prop as unknown as RelationPropertyItemObjectResponse
	const result = (property?.relation ??
		[]) as unknown as RelationPropertyItemObjectResponse['relation'][]
	return result
}

export const getSelect = (prop: Prop) => {
	const property = prop as unknown as SelectPropertyItemObjectResponse
	const result = property?.select
	return result
}

export const getMultiSelect = (prop: Prop) => {
	const property = prop as unknown as MultiSelectPropertyItemObjectResponse
	const result = property?.multi_select ?? []
	return result
}

export const getNumber = (prop: Prop) => {
	const property = prop as unknown as NumberPropertyItemObjectResponse
	const result = property?.number
	return result
}

export const getEmail = (prop: Prop) => {
	const property = prop as unknown as EmailPropertyItemObjectResponse
	const result = property?.email
	return result
}

export const getPhone = (prop: Prop) => {
	const property = prop as unknown as PhoneNumberPropertyItemObjectResponse
	const result = property?.phone_number
	return result
}
