import { Skill } from './skill'
import { Attachment } from './attachment'

export interface BasicInfo {
  name: string
  dateOfBirth: string
  address: string
  goal: string
  links: Attachment[]
  rate: number
  hobbies: Skill[]
  languages: Skill[]
}
