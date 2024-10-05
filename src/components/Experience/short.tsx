
type ExperienceShortItem = {
  title: string
  institution: string
  date_start: Date
  date_end: Date | null
}

export const ExperienceShort = (data: ExperienceShortItem) => {
  return <div className="experience-short-item">
    <span className="title bold">{data.title}</span>
    <span className="institution">{data.institution}</span>
    <span className="date">
      {data.date_start.toISOString()} - {data.date_end?.toISOString() ?? 'Now'}
    </span>
  </div>
}