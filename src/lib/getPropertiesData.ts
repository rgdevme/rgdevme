import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const getPropertiesData = ({ properties }: PageObjectResponse) => {
  const result: any = {}

  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      const { type } = properties[key]

      result[key] = (properties[key] as any)[type]
    }
  }

  return result
}
