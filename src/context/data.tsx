/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import dayjs from 'dayjs'
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'
import { experienceStore } from '../firebase/models/experience'
import { skillStore } from '../firebase/models/skill'
import { SkillModel } from '../firebase/types/skill'
import {
	extractExperienceData,
	MergedExperience
} from '../lib/transformers/experience'
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
		skill: string[]
		type: string[]
		range: [Date | null, Date | null]
		withLink: boolean
	}
}

type Methods = {
	filterLink: (value: boolean) => void
	filterRange: (range: [Date | null, Date | null]) => void
	filterSkill: (skill: string[]) => void
	filterType: (type: string[]) => void
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
		skill: [],
		type: [],
		range: [null, null],
		withLink: false
	}
}

const DataCtx = createContext<Data & Methods>({
	...initialCtx
} as Data & Methods)

export const DataProvider = ({ children }: PropsWithChildren) => {
	const [experience, setExperience] = useState<MergedExperience[]>([])
	const [skills, setSkills] = useState<SkillModel[]>([])
	// const [state, setState] = useState(initialCtx)
	const [state, setState] = useState(initialCtx)

	const filteredExperiences = useMemo(
		() =>
			experience.reduce((acc, curr) => {
				const upd = { ...curr }
				const projects = [
					...upd.projects.filter(y => {
						const isCategory =
							!state.filters.type.length || state.filters.type.includes(y.type)

						const hasSkill =
							!state.filters.skill.length ||
							state.filters.skill.every(z => y.skills?.some(s => s.id === z))

						const [start, end] = state.filters.range
						const inDateRange =
							(!start ? true : !dayjs(start).isAfter(y.start)) &&
							(!end ? true : !dayjs(end).isBefore(y.end))

						const hasLinks = !state.filters.withLink || !!y.links.length

						return isCategory && hasLinks && inDateRange && hasSkill
					})
				]

				upd.projects = projects
				if (projects.length !== 0) acc.push(upd)
				return acc
			}, [] as MergedExperience[]),
		[Object.values(state.filters)]
	)

	const filterRange = (range: [Date | null, Date | null]) => {
		setState(p => {
			p.filters.range = range
			return { ...p }
		})
	}

	const filterLink = (value: boolean) => {
		setState(p => {
			p.filters.withLink = value
			return { ...p }
		})
	}

	const filterSkill = (skill: string[]) => {
		setState(p => {
			p.filters.skill = skill
			return { ...p }
		})
	}

	const filterType = (type: string[]) => {
		setState(p => {
			p.filters.type = type
			return { ...p }
		})
	}

	const methods = {
		filterLink,
		filterRange,
		filterSkill,
		filterType
	}

	const getContextData = async () => {
		const expdata = await experienceStore.query({ where: [] })
		const skilldata = await skillStore.query({ where: [] })

		const exp = extractExperienceData(expdata)
		const skill = extractSkillData(skilldata)

		setExperience(exp.experience)
		setSkills(skill.skills)
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
		<DataCtx.Provider
			value={{
				data: { ...state.data, experience: filteredExperiences, skills },
				filters: state.filters,
				...methods
			}}
			children={children}
		/>
	)
}

export const useData = () => useContext(DataCtx).data
export const useFilter = () => {
	const { filters, data, ...methods } = useContext(DataCtx)
	return { filters, ...methods }
}
