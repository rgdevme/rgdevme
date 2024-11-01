
type ExperienceItem = {
  title: string
  institution: string
  contract: string
  location: string
  date_start: Date
  date_end: Date | null
  items: {
    id: string
    description: string
    date_start: Date
    date_end: Date | null
  }[]
}

export const ExperienceLong = (data: ExperienceItem) => {
  return <div className="experience-item">
    <div className="details">
      <span className="bold">{data.title}</span>
      <span className=""> at {data.institution}</span>
      <span className=""> as {data.contract}</span>
    </div>
    <div className="details">
      <span className="">
        {data.date_start.toISOString()} - {data.date_end?.toISOString() ?? 'Now'}
      </span>
      <span className=""> {data.location}</span>
    </div>
    <div className="item">
      {data.items.map(i => (
        <div className="flex" key={i.id}>
          <div className="date">
            {data.date_start.toISOString()} - {data.date_end?.toISOString() ?? 'Now'}
          </div>
          <div className="description">{i.description}</div>
        </div>
      ))}
    </div>
  </div>
}