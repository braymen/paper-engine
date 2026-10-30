import { load } from 'js-yaml'

// const achievementsFiles = import.meta.glob('../data/achievements/*.yaml', {
// 	query: '?raw',
// 	import: 'default',
// 	eager: true
// })
// const currenciesFiles = import.meta.glob('../data/currencies/*.yaml', { query: '?raw', import: 'default', eager: true })
const itemsFiles = import.meta.glob('../data/items/*.yaml', { query: '?raw', import: 'default', eager: true })

const harvestData = (files: Record<string, unknown>) => {
	let data = {}
	Object.keys(files).forEach((file) => {
		const fileData = load(files[file] as string)
		data = { ...data, ...fileData! }
	})
	return data
}

const items = harvestData(itemsFiles)

console.log(items)
