import { ExperienceItem } from '../lib/getExperience'

export const educationAsText = (items: ExperienceItem[]) => {
  const now = Date.now()
  let last_desc = ''
  let txt = ''

  const records: {
    start: Date
    end: Date
    institution: string
    project: string
  }[] = []

  items
    .filter(x => x.category !== '9147e54b-6480-4a28-985c-407afcbca5f8')
    .map(x => ({
      institution: x.institution.trim(),
      description: x.description.trim(),
      start: new Date(x.start),
      end: new Date(x.end ?? now),
      project: x.project.trim(),
    }))
    .sort((a, b) => b.start.valueOf() - a.start.valueOf())
    .forEach(x => records.push(x))

  console.log({ records })

  records.forEach(x => {
    const startM = x.start.toLocaleString('us', { month: 'short' })
    const startY = x.start.toLocaleString('us', { year: 'numeric' })
    const start = `${startM}. ${startY}`
    const endM = x.end.toLocaleString('us', { month: 'short' })
    const endY = x.end.toLocaleString('us', { year: 'numeric' })
    const end = x.end.valueOf() === now ? 'Now' : `${endM}. ${endY}`

    txt += `- ${x.project} (${start} - ${end}) at ${x.institution}\n`
  })
  console.log({ txt })
}
