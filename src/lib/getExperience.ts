import { notion } from '../config/notion'

export const getExperience = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.EXP!,
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

  return results
}
