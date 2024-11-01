import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion } from '../config/notion'
import {
  getDate,
  getEmail,
  getLinks,
  getMultiSelect,
  getNotionTitle,
  getNumber,
  getPhone,
  getRichText,
} from '../utils/notion'

export const getInfo = async () => {
  const page = (await notion.pages.retrieve({
    page_id: process.env.PAGEID_INFO!,
  })) as PageObjectResponse

  const info = {
    address:
      getRichText(page.properties.address)
        .map(y => y.plain_text)
        .join('') ?? null,
    birthday: getDate(page.properties.birthday)?.start,
    goal:
      getRichText(page.properties.goal)
        .map(y => y.plain_text)
        .join('') ?? null,
    links: getLinks(page.properties.links),
    nationality: getMultiSelect(page.properties.nationality).map(x => x.name),
    email: getEmail(page.properties.email),
    phone: getPhone(page.properties.phone),
    hobbies:
      getRichText(page.properties.hobbies)
        .map(y => y.plain_text)
        .join('') ?? null,
    profile_picture: getLinks(page.properties.profile_picture)[0].url,
    name:
      getNotionTitle(page.properties.name)
        .map(y => y.plain_text)
        .join('') ?? null,
    rate: getNumber(page.properties.rate_hourly),
  }

  return info
}
