import { DocumentData, DocumentReference } from 'firebase/firestore'

export type Modify<Base, Mods extends { [k in keyof Base]?: any }> = Omit<
	Base,
	keyof Mods
> &
	Mods

/** Return keys that match type */
export type PickByType<T extends Record<string, any>, V> = {
	[K in keyof T as T[K] extends infer U
		? U extends V
			? K
			: never
		: never]: T[K]
}

/** Returns a new type with only the optional keys of the given type */
export type PickOptionals<T extends Record<string, any>> = PickByType<
	T,
	undefined
>

export type ConvertedModel<
	D extends DocumentData,
	M extends D | DocumentData = {}
> = Modify<
	D,
	M & {
		id: string
		_ref: DocumentReference<ThisType<ConvertedModel<D, M>>, D>
	}
>

export type DefaultModel<M extends Object> = Omit<
	M,
	keyof PickOptionals<M> | 'id' | '_ref'
>
