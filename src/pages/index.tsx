import { getExperience } from '../lib/getExperience'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import { getSkills } from '../lib/getSkills'
import { getInfo } from '../lib/getInfo'
import { getPropertiesData } from '../lib/getPropertiesData'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default function Home({
  experience,
  skills,
  info,
}: {
  experience: ReturnType<typeof getExperience>
  skills: ReturnType<typeof getSkills>
  info: ReturnType<typeof getInfo>
}) {
  useEffect(() => {
    console.log({ experience, skills, info })
  }, [])
  return (
    <div className={''}>
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
  const experience = await getExperience()
  const skills = await getSkills()
  const info = getPropertiesData((await getInfo()) as PageObjectResponse)

  return {
    props: { experience, skills, info },
    revalidate: 60,
  }
}
