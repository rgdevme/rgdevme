import { notion } from '../config/notion'

export const getInfo = async () => {
  const page = await notion.pages.retrieve({
    page_id: process.env.INF!,
  })

  return page
}
