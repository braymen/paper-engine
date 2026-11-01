import { load } from 'js-yaml'
import fs from 'node:fs'

// Function for getting proper path
const attachPath = (files: string[], specificDirectory: string): string[] => {
	const filesWithPath: string[] = []
	files.forEach((file) => {
		filesWithPath.push(specificDirectory + file)
	})
	return filesWithPath
}

// Data Root Directory
const dataDirectory = 'data/'
const gameDataDirectory = 'src/data/'

// Clean out old data
const currentData = fs.readdirSync(gameDataDirectory)
currentData.forEach((file) => {
	fs.unlinkSync(gameDataDirectory + file)
})

// Get Directories
const directories = fs.readdirSync(dataDirectory)

// Actual Files of Directories
const categorizedFiles: Record<string, string[]> = {}
directories.forEach((directory) => {
	categorizedFiles[directory] = attachPath(fs.readdirSync(dataDirectory + directory), dataDirectory + directory + '/')
})

// Function for harvesting the file data and converting it to JSON.
const harvestData = (files: string[]) => {
	let data = {}
	files.forEach((file) => {
		const fileData = fs.readFileSync(file).toString()
		const yamlData = load(fileData) as object
		data = { ...data, ...yamlData }
	})
	return data
}

// Harvest the data for all the data
Object.keys(categorizedFiles).forEach((category) => {
	fs.writeFileSync(gameDataDirectory + category + '.json', JSON.stringify(harvestData(categorizedFiles[category])))
})
