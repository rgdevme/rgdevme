/* eslint-disable react/no-children-prop */
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { SkillModel } from '../firebase/types/skill'
import { MergedExperience } from '../lib/getExperience'
import { NotionSelect } from '../utils/notion'

type Data = {
	data: {
		experience: MergedExperience[]
		skills: SkillModel[]
		skill_type: string[]
		skill_tags: string[]
		experience_category: string[]
		experience_country: string[]
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
		range: [null, null],
		withLink: false
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

	return (
		<DataCtx.Provider value={{ ...state, setFilter }} children={children} />
	)
}

export const useData = () => useContext(DataCtx).data
export const useFilter = () => useContext(DataCtx).filters
export const useSetFilter = () => useContext(DataCtx).setFilter
