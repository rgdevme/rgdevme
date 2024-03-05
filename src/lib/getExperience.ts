import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion } from '../config/notion'
import { Experience } from '../types/experience'

export const getExperience = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.EXP!,
    sorts: [
      { property: 'dates', direction: 'descending' },
      { property: 'end_date', direction: 'descending' },
    ],
  })

  const data: Experience[] = (results as any[]).map(
    ({ properties, id }) =>
      ({
        id,
        company: properties.institution.title[0].plain_text ?? '',
        contract: properties.contract.select,
        country: properties.country.select?.name ?? '',
        description: {
          en: properties.desc_en.rich_text[0]?.plain_text ?? '',
          es: properties.desc_es.rich_text[0]?.plain_text ?? '',
        },
        end: properties.dates.date.end,
        link: properties.link.files.length
          ? {
              text: properties.link.files[0].name,
              url: properties.link.files[0][properties.link.files[0].type].url,
            }
          : null,
        name: {
          en: properties.project_en.rich_text[0]?.plain_text ?? '',
          es: properties.project_es.rich_text[0]?.plain_text ?? '',
        },
        role: {
          en: properties.role_en.rich_text[0]?.plain_text ?? '',
          es: properties.role_es.rich_text[0]?.plain_text ?? '',
        },
        skills: properties.skills.relation.map((s: any) => s.id),
        start: properties.dates.date.start,
        team: properties.teamsize.number,
      } as Experience)
  )

  return data
}
