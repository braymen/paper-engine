import { IpcMain } from 'electron'
import { guardedParse, spitLog } from '../utils'
import * as config from '../config'
import * as fs from 'fs'
import { md5 } from 'js-md5'

export const load = (ipc: IpcMain) => {
	ipc.handle('load', (_event, key: string) => {
		return loadFunction(key)
	})
}

export const loadFunction = (key: string) => {
	spitLog('Loading', 'Starting to load the data.', false)

	const loadPath = config.getSavePath(key)
	spitLog('Loading', `Save path using: ${loadPath}`, false)

	const hashPath = config.getHashPath(key)
	spitLog('Loading', `Hash path using: ${hashPath}`, false)

	// Delete temp file if it exists
	try {
		spitLog('Loading', `Check for a temp file to delete for save ${key}`, false)
		const tempFilePath = config.getSavePath(key) + '.temp'
		if (fs.existsSync(tempFilePath)) {
			fs.unlinkSync(tempFilePath)
		}
	} catch (err) {
		spitLog('Loading', `Failed to operate on the temp file. ${err}`, false)
	}

	// Attempt to load file
	let dataString
	try {
		spitLog('Loading', `Loading data for slot ${key}`, false)
		dataString = fs.readFileSync(loadPath).toString()
		spitLog('Loading', `Parsing the data into JSON`, false)
	} catch (err) {
		spitLog('Loading', `Failed to load the data. ${err}`, false)
	}

	// Load the hash from the file
	let hashString
	try {
		spitLog('Loading', `Loading hash for ${key}`, false)
		hashString = fs.readFileSync(hashPath).toString()
		spitLog('Loading', `Parsing the hash into a string`, false)
	} catch (err) {
		spitLog('Loading', `Failed to load the data. ${err}`, false)
	}

	// Attempts to use previous if hash is corrupted or data doesn't exist
	if (!dataString || !hashString || hashString != md5(dataString)) {
		try {
			if (fs.existsSync(loadPath + '.previous')) {
				spitLog('Loading', `Loading previous data for slot ${key}`, false)
				dataString = fs.readFileSync(loadPath + '.previous').toString()
				spitLog('Loading', `Parsing previous the data into JSON`, false)
			} else {
				spitLog('Loading', `No save exists for previous.`, false)

				// Final effort to save the save
				if (fs.existsSync(loadPath)) {
					spitLog('Loading', `Last ditch effort to load the data with an unverified save.`, false)
					dataString = fs.readFileSync(loadPath).toString()
				}
			}
		} catch (err) {
			spitLog('Loading', `Failed to load the data. ${err}`, false)
		}
	}

	if (dataString == null) {
		spitLog('Loading', `No save exists.`, false)
		return null
	}

	spitLog('Loading', `Loaded save re-hashed: ${md5(dataString)}`, false)
	spitLog('Loading', `Loaded hash from file: ${hashString}`, false)

	return guardedParse(dataString)
}
