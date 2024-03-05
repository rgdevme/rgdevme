import { Dayjs } from 'dayjs'
import { Tag } from './tag'
import { Attachment } from './attachment'
import { Skill } from './skill'

export interface Experience {
  id: string
  name: MultiLanguage
  description: MultiLanguage
  company: string
  role: MultiLanguage
  team: number
  contract: Tag
  country: string
  start: Dayjs
  end: Dayjs | null
  link: Attachment | null
  skills: string[]
}

interface MultiLanguage {
  en: string
  es: string
}
