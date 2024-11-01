import { useEffect, useState } from 'react'

export const useMultitoggle = (initial: string[] = []) => {
	const [state, setState] = useState(initial)

	const reset = () => setState(initial)
	const clear = () => setState([])
	const add = (item: string) => setState(p => [...p, item])
	const remove = (item: string) => setState(p => [...p.filter(x => x !== item)])
	const toggle = (item: string) => {
		if (state.includes(item)) remove(item)
		else add(item)
	}

	const methods = { add, remove, toggle, clear, reset }
	return [state, methods] as [typeof state, typeof methods]
}
