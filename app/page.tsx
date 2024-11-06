import { getExperience } from '../src/lib/getExperience'
import { getInfo } from '../src/lib/getInfo'
import { getSkills } from '../src/lib/getSkills'
import Home from './_home'

export default async function Page() {
	const { props } = await getProps()
	return <Home {...props} />
}

const getProps = async () => {
	const [experience, skills, info] = await Promise.all([
		getExperience(),
		getSkills(),
		getInfo()
	])

	return {
		props: { ...experience, ...skills, info },
		revalidate: 60
	}
}
