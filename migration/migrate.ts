import { FirebormDataManager } from '../src/utils/importer'
import { firestore } from '../src/firebase/config'
import experience from './experience.json'
import terms from './terms.json'
import profile from './profile.json'

const importer = async () => {
	const importer = new FirebormDataManager(firestore)

	importer.import({
		files: [{ collection: 'profile', objects: profile }]
	})
}

importer()
