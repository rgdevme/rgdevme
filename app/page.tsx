import { profileStore } from '@/src/firebase/models/profile'
import Home from './_home'

export default async function Page() {
	const { props } = await getProps()
	return <Home {...props} />
}

const getProps = async () => {
	const [info] = await profileStore.query({ where: [] })

	return {
		props: { info },
		revalidate: 60
	}
}
