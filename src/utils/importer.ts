import {
	collection,
	doc,
	DocumentReference,
	Firestore,
	writeBatch
} from 'firebase/firestore'

export class FirebormDataManager {
	firestore: Firestore
	constructor(firestore: Firestore) {
		this.firestore = firestore
	}

	import = async ({
		files,
		ignore = {},
		relationsMap = [],
		log = false
	}: {
		files: {
			collection: string
			objects: object[]
		}[]
		ignore?: { [collection: string]: string[] }
		relationsMap?: {
			from: {
				collection: string
				property: string
			}
			to: {
				collection: string
				property: string
			}
		}[]
		log?: boolean
	}) => {
		// const filesArray = new Array(files.length).map((_, i) => files.item(i)!)

		/** Get file data
		 * for each file iterate throug the objects to get their firestore ref,
		 * and their properties
		 */
		const unprocessedRecords = await Promise.all(
			files.map(file => {
				return file.objects.map(object => {
					return {
						collection: file.collection,
						ref: doc(collection(this.firestore, file.collection)),
						object
					}
				})
			})
		)

		const records: {
			ref: DocumentReference
			data: object
			collection: string
		}[] = []

		console.log('relating records')

		// Iterate through the records and build their associations
		unprocessedRecords.flat().forEach(({ ref, object, collection }, i, a) => {
			const data = object

			const relations = relationsMap.filter(
				r => r.from.collection === collection
			)

			relations.forEach(({ from, to }) => {
				const originValue: string | string[] = data[from.property]
				const originIsArray = Array.isArray(originValue)
				let update: DocumentReference[] | DocumentReference

				if (originIsArray) {
					const newVal = originValue as (string | DocumentReference)[]

					const targets = a.filter(x => {
						const isFromCollection = x.collection === to.collection
						let hasValue = false

						const targetValue: string | string[] = x.object[to.property]
						const targetIsArray = Array.isArray(targetValue)

						if (!targetIsArray) {
							hasValue = originValue.includes(targetValue.toString())
						} else {
							hasValue = originValue.some(y =>
								targetValue.includes(y.toString())
							)
						}

						return isFromCollection && hasValue
					})

					targets.forEach(t => {
						const targetValue: string | string[] = t.object[to.property]
						const targetIsArray = Array.isArray(targetValue)

						if (!targetIsArray) {
							const i = newVal.indexOf(targetValue.toString())
							newVal.splice(i, 1, t.ref)
						} else {
							targetValue.forEach(v => {
								const i = newVal.indexOf(v.toString())
								newVal.splice(i, 1, t.ref)
							})
						}
					})
					update = newVal as DocumentReference[]
				} else {
					let newVal = originValue as string | DocumentReference

					const target = a.find(x => {
						const isFromCollection = x.collection === to.collection
						let hasValue = false

						const targetValue: string | string[] = x.object[to.property]
						const targetIsArray = Array.isArray(targetValue)

						if (!targetIsArray)
							hasValue = originValue.toString() === targetValue.toString()
						else hasValue = targetValue.includes(originValue.toString())

						return isFromCollection && hasValue
					})
					if (!target) return
					newVal = target.ref
					update = newVal
				}
				data[from.property] = update
			})
			records.push({ ref, data, collection })
		})

		const batch = writeBatch(this.firestore)
		// Perform updates
		records.forEach(({ ref, data, collection }) => {
			for (const key in data) {
				if (ignore?.[collection]?.includes(key)) {
					delete data[key]
				}
			}
			batch.set(ref, data)
		})

		console.log('committing')
		// Commit updates
		await batch.commit()
		console.log('committed')
	}
}
