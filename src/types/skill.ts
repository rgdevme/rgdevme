import { Tag } from './tag'

export interface Skill {
  name: string
  institution: string
  tags: Tag[]
  id: string
  level: number
  type: Tag[]
  area: Tag[]
}
