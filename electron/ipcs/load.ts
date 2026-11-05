import { IpcMain } from 'electron'
import { spitLog } from '../utils'
import * as config from '../config'
import * as fs from 'fs'
import { md5 } from 'js-md5'

export const load = (ipc: IpcMain) => {
	ipc.handle('load', (_event, key: string) => {
		spitLog('Loading', 'Starting to load the data.', false)

		const loadPath = config.getSavePath(key)
		spitLog('Loading', `Save path using: ${loadPath}`, false)

		const hashPath = config.getHashPath(key)
		spitLog('Loading', `Hash path using: ${hashPath}`, false)

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

		if (!dataString || !hashString) {
			return null
		}

		spitLog('Loading', `Loaded hash from file: ${hashString}`, false)
		spitLog('Loading', `Loaded save re-hashed: ${md5(dataString)}`, false)

		// If hashes differ, save is corrupted. Load the previous
		if (hashString !== md5(dataString)) {
			try {
				spitLog('Loading', `Loading previous data for slot ${key}`, false)
				dataString = fs.readFileSync(loadPath + '.previous').toString()
				spitLog('Loading', `Parsing previous the data into JSON`, false)
			} catch (err) {
				spitLog('Loading', `Failed to load the data. ${err}`, false)
			}
		}

		return JSON.parse(dataString)

		// Fails to parse, attempt to use the previous
	})
}
