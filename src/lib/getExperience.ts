import {
  CheckboxPropertyItemObjectResponse,
  DatabaseObjectResponse,
  SelectPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notion } from '../config/notion'
import {
  getDate,
  getLinks,
  getNotionTitle,
  getRelations,
  getRichText,
  getSelect,
} from '../utils/notion'

type PartialSelectResponse = NonNullable<
  SelectPropertyItemObjectResponse['select']
>

export const getExperience = async () => {
  const response = await notion.databases.query({
    database_id: process.env.DBID_EXPERIENCE!,
    filter: { and: [{ property: 'inactive', checkbox: { equals: false } }] },
    sorts: [
      {
        property: 'dates',
        direction: 'descending',
      },
      {
        property: 'end_date',
        direction: 'descending',
      },
    ],
  })

  const results = response.results as DatabaseObjectResponse[]

  const experience_category: PartialSelectResponse[] = []
  const experience_contract: PartialSelectResponse[] = []
  const experience_country: PartialSelectResponse[] = []

  const experience = results.map(x => {
    const category_select = getSelect(x.properties.category)
    const contract_select = getSelect(x.properties.contract)
    const country_select = getSelect(x.properties.country)
    if (
      category_select &&
      !experience_category.some(y => y.id === category_select.id)
    ) {
      experience_category.push(category_select)
    }
    if (
      contract_select &&
      !experience_contract.some(y => y.id === contract_select.id)
    ) {
      experience_contract.push(contract_select)
    }
    if (
      country_select &&
      !experience_country.some(y => y.id === country_select.id)
    ) {
      experience_country.push(country_select)
    }

    return {
      id: x.id as string,
      cover: x.cover as string | null,
      icon: x.icon as string | null,
      created: x.created_time as string,
      updated: x.last_edited_time as string,
      category: category_select?.id ?? null,
      contract: contract_select?.id ?? null,
      country: country_select?.id ?? null,
      completed:
        (
          x.properties
            .completed as unknown as CheckboxPropertyItemObjectResponse
        ).checkbox ?? null,
      start: getDate(x.properties.dates)!.start,
      end: getDate(x.properties.dates)!.end,
      project:
        getRichText(x.properties.project_en)
          .map(y => y.plain_text)
          .join('') ?? null,
      description:
        getRichText(x.properties.desc_en)
          .map(y => y.plain_text)
          .join('') ?? null,
      role:
        getRichText(x.properties.role_en)
          .map(y => y.plain_text)
          .join('') ?? null,
      client:
        getNotionTitle(x.properties.client)
          .map(y => y.plain_text)
          .join('') ?? null,
      institution:
        getRichText(x.properties.institution)
          .map(y => y.plain_text)
          .join('') ?? null,
      skills: getRelations(x.properties.skills).map(y => y.id ?? null) ?? null,
      links: getLinks(x.properties.link),
    }
  })

  return {
    experience,
    experience_category,
    experience_contract,
    experience_country,
  }
}

export type ExperienceItem = Awaited<
  ReturnType<typeof getExperience>
>['experience'][number]
