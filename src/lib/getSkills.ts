import { notion } from '../config/notion'
import { Skill } from '../types/skill'

export const getSkills = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.SKL!,
    sorts: [
      { property: 'type', direction: 'ascending' },
      { property: 'name', direction: 'ascending' },
    ],
    filter: {
      and: [
        { property: 'type', select: { does_not_equal: 'Language' } },
        { property: 'type', select: { does_not_equal: 'Interest' } },
      ],
    },
  })

  const data: Skill[] = (results as any[]).map(
    ({ properties, id }) =>
      ({
        id,
        area: properties.area.select,
        institution: properties.institution.rich_text[0]?.plain_text ?? '',
        level: properties.level.number ?? 0,
        name: properties.name.title[0].plain_text ?? '',
        tags: properties.tags.multi_select,
        type: properties.type.select,
      } as Skill)
  )

  return data
}
