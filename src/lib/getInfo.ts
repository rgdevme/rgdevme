import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion } from '../config/notion'
import { BasicInfo } from '../types/info'
import { getPropertiesData } from './getPropertiesData'
import { Attachment } from '../types/attachment'

export const getInfo = async () => {
  const page = (await notion.pages.retrieve({
    page_id: process.env.INF!,
  })) as PageObjectResponse

  const properties = getPropertiesData(page)

  const data: BasicInfo = {
    address: properties.address[0].plain_text,
    dateOfBirth: properties.birthday.start,
    goal: properties.goal[0].plain_text,
    hobbies: [],
    languages: [],
    links: properties.links.map(
      (item: any) =>
        ({
          text: item.name,
          url: item[item.type].url,
        } as Attachment)
    ),
    name: properties.name[0].plain_text,
    rate: properties.rate_hourly,
  }

  return data
}
