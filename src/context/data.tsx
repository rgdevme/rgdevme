/* eslint-disable react/no-children-prop */
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react'
import { experienceStore } from '../firebase/models/experience'
import { SkillModel } from '../firebase/types/skill'
import {
	extractExperienceData,
	MergedExperience
} from '../lib/transformers/experience'
import { skillStore } from '../firebase/models/skill'
import { extractSkillData } from '../lib/transformers/skill'

type Data = {
	data: {
		experience: MergedExperience[]
		skills: SkillModel[]
		skill_type: string[]
		skill_tags: string[]
		experience_category: string[]
		experience_contract: string[]
	}
	filters: {
		skill_type: string[]
		experience_category: string[]
		range: [Date | null, Date | null]
		withLink: boolean
	}
}

type Methods = {
	setFilter: (prop: keyof Data['filters'], val: any) => void
}

const initialCtx: Data = {
	data: {
		experience: [],
		skills: [],
		skill_type: [],
		skill_tags: [],
		experience_category: [],
		experience_contract: []
	},
	filters: {
		skill_type: [],
		experience_category: [],
		range: [null, null],
		withLink: false
	}
}

const DataCtx = createContext<Data & Methods>({
	...initialCtx,
	setFilter: () => {}
})

export const DataProvider = ({ children }: PropsWithChildren) => {
	const [state, setState] = useState(initialCtx)

	const setFilter: Methods['setFilter'] = (prop, val) => {
		setState(p => {
			const upd = { ...p }

			switch (prop) {
				case 'withLink':
				case 'range':
					upd.filters[prop] = val
					break
				case 'experience_category':
				case 'skill_type':
					if (typeof val === 'string' && upd.filters[prop].includes(val)) {
						upd.filters[prop] = [...upd.filters[prop].filter(x => x !== val)]
					} else {
						upd.filters[prop] = [...upd.filters[prop], val]
					}
					break

				default:
					break
			}

			return upd
		})
	}

	const getContextData = async () => {
		const expdata = await experienceStore.query({ where: [] })
		const exp = extractExperienceData(expdata)

		const skilldata = await skillStore.query({ where: [] })
		const skill = extractSkillData(skilldata)

		setState(p => {
			p.data = { ...exp, ...skill }
			return p
		})
	}

	useEffect(() => {
		getContextData()
	}, [])

	useEffect(() => {
		console.log({ state })
	}, [state])

	return (
		<DataCtx.Provider value={{ ...state, setFilter }} children={children} />
	)
}

export const useData = () => useContext(DataCtx).data
export const useFilter = () => useContext(DataCtx).filters
export const useSetFilter = () => useContext(DataCtx).setFilter
