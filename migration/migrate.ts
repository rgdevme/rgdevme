import { fireborm } from '../src/firebase/config'
import experience from './experience.json'
import profile from './profile.json'
import terms from './terms.json'

const transformTerms = (data: typeof terms) =>
	data.map(x => ({
		...x,
		id: x.id,
		experience: x.experience
			.toString()
			.split(',')
			.map(s => s.trim()),
		level:
			typeof x.level === 'string'
				? x.level.length === 0
					? 0
					: Number(x.level)
				: x.level,
		tags: x.tags
			.toString()
			.split(',')
			.map(s => s.trim())
	}))

const transformExperience = (data: typeof experience) =>
	data.map(x => ({
		...x,
		id: x.id,
		skills: x.skills
			.toString()
			.split(',')
			.map(s => s.trim()),
		links: x.links.split(',').map(s => s.trim()),
		start: x.start.length > 0 ? new Date(x.start) : null,
		end: x.end.length > 0 ? new Date(x.end) : null
	}))

const importer = async () => {
	const importer = fireborm.initializeDataManager()

	importer.import({
		files: {
			profile,
			experience: transformExperience(experience),
			terms: transformTerms(terms)
		},
		ignore: { experience: ['id'], profile: [], terms: ['id'] },
		relations: {
			experience: [
				{
					from: { property: 'skills' },
					to: { collection: 'terms', property: 'id' }
				}
			],
			terms: [
				{
					from: { property: 'experience' },
					to: { collection: 'experience', property: 'id' }
				}
			],
			profile: []
		}
	})
}

importer()
