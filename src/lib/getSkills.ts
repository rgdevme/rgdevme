import { notion } from '../config/notion'

export const getSkills = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.SKL!,
    sorts: [
      {
        property: 'category',
        direction: 'ascending',
      },
      {
        property: 'name',
        direction: 'ascending',
      },
    ],
  })

  return results
}
