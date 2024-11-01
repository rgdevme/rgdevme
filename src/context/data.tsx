/* eslint-disable react/no-children-prop */
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react'
import { Skill } from '../lib/getSkills'
import { MergedExperience } from '../utils/experience'
import { NotionSelect } from '../utils/notion'

type Data = {
	data: {
		experience: MergedExperience[]
		skills: Skill[]
		skill_type: NotionSelect[]
		skill_tags: NotionSelect[]
		experience_category: NotionSelect[]
		experience_country: NotionSelect[]
		experience_contract: NotionSelect[]
	}
	filters: {
		skill_type: string[]
		experience_category: string[]
		range: [Date | null, Date | null]
	}
}

type Methods = {
	setFilter: (prop: keyof Data['filters'], val: any) => void
}

const DataCtx = createContext<Data & Methods>({
	data: {
		experience: [],
		skills: [],
		skill_type: [],
		skill_tags: [],
		experience_category: [],
		experience_country: [],
		experience_contract: []
	},
	filters: {
		skill_type: [],
		experience_category: [],
		range: [null, null]
	},
	setFilter: () => {}
})

export const DataProvider = ({
	children,
	...data
}: PropsWithChildren<Data>) => {
	const [state, seState] = useState(data)

	const setFilter: Methods['setFilter'] = (prop, val) => {
		seState(p => {
			const upd = { ...p }

			if (Array.isArray(val)) {
				upd.filters[prop] = val as any
			} else if (
				typeof val === 'string' &&
				upd.filters[prop].includes(val as any)
			) {
				upd.filters[prop] = [...upd.filters[prop].filter(x => x !== val)] as any
			} else {
				upd.filters[prop] = [...upd.filters[prop], val] as any
			}

			return upd
		})
	}

	return (
		<DataCtx.Provider value={{ ...state, setFilter }} children={children} />
	)
}

export const useData = () => useContext(DataCtx).data
export const useFilter = () => useContext(DataCtx).filters
export const useSetFilter = () => useContext(DataCtx).setFilter
