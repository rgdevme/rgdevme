import {
	DatabaseObjectResponse,
	NumberPropertyItemObjectResponse,
	SelectPropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import { notion } from '../config/notion'
import {
	getLinks,
	getMultiSelect,
	getNotionTitle,
	getNumber,
	getRelations,
	getRichText,
	getSelect
} from '../utils/notion'

type PartialSelectResponse = NonNullable<
	SelectPropertyItemObjectResponse['select']
>

export const getSkills = async () => {
	const response = await notion.databases.query({
		database_id: process.env.DBID_SKILLS!,
		sorts: [
			{
				property: 'area',
				direction: 'ascending'
			},
			{
				property: 'type',
				direction: 'ascending'
			},
			{
				property: 'name',
				direction: 'ascending'
			}
		]
	})

	const results = response.results as DatabaseObjectResponse[]

	const skill_tags: PartialSelectResponse[] = []
	const skill_type: PartialSelectResponse[] = []
	const skills = results.map(x => {
		const area = getSelect(x.properties.area)?.id ?? null
		const type_select = getSelect(x.properties.type)
		const experience = getRelations(x.properties.experience).map(x => x.id)
		const tags = getMultiSelect(x.properties.tags)
		const level = getNumber(x.properties.level)

		if (type_select && !skill_type.some(y => y.id === type_select.id)) {
			skill_type.push(type_select)
		}

		tags.forEach(t => {
			if (skill_tags.some(y => y.id === t.id)) return
			skill_tags.push(t)
		})

		return {
			id: x.id as string,
			cover: x.cover as string | null,
			icon: x.icon as string | null,
			created: x.created_time as string,
			updated: x.last_edited_time as string,
			area,
			type: type_select?.id ?? null,
			level:
				type_select?.name === 'Language' && level !== null
					? ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'][level]
					: null,
			institution:
				getRichText(x.properties.institution)
					.map(x => x.plain_text)
					.join('') ?? null,
			name:
				getNotionTitle(x.properties.name)
					.map(x => x.plain_text)
					.join('') ?? null,
			experience,
			use_count: experience.length,
			certifications: getLinks(x.properties.certifications)
		}
	})

	return { skills, skill_tags, skill_type }
}

export type Skill = Awaited<ReturnType<typeof getSkills>>['skills'][number]
