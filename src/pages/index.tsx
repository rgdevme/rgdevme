import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import { getExperience } from '../lib/getExperience'
import { getInfo } from '../lib/getInfo'
import { getSkills } from '../lib/getSkills'
import { experienceAsText } from '../utils/experience'
import { educationAsText } from '../utils/education'

export default function Home({
  experience,
  experience_category,
  experience_contract,
  experience_country,
  skills,
  skill_tags,
  skill_type,
  info,
}: Awaited<ReturnType<typeof getExperience>>
  & Awaited<ReturnType<typeof getSkills>>
  & {
    info: Awaited<ReturnType<typeof getInfo>>
  }
) {
  useEffect(() => {
    console.log({ ...experience, ...skills, info })
    console.log(educationAsText(experience))
  }, [])
  return (
    <div className={''}>
      <div className="info absolute h-full w-1/6 min-w-40 max-w-80 bg-black"></div>
      <div>
        Menu with anchors, social media buttons, and a save to PDF button
      </div>
      <div>Basic data</div>
      <div>
        <h3>Skills</h3>
        <p>
          View of the top five skills and, down, an arrow drop down to see all
          of the skills:
        </p>
        <ul>
          <li>Name</li>
          <li>Gauge: Lvl indicator based on Project count</li>
          <li>Show related projects on click</li>
        </ul>
      </div>
      <div>
        <h3>Experiece timeline</h3>
        <p>
          Categorized in tabs: Filterable (date, Location, name, scale),
          timeline-like list of experiences
        </p>
        <ul>
          <li>What, how, when, where, with whom</li>
          <li>Top 5 Related skills</li>
          <li>External link on click</li>
          <li>Modal for full list of skills</li>
        </ul>
      </div>
      <div>
        <h3>Contact form</h3>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [experience, skills, info] = await Promise.all([
    getExperience(),
    getSkills(),
    getInfo()
  ])

  return {
    props: { ...experience, ...skills, info },
    revalidate: 60,
  }
}
