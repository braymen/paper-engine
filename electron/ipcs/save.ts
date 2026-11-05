import { IpcMain } from 'electron'
import * as fs from 'fs'
import * as config from '../config'
import { spitLog } from '../utils'
import { md5 } from 'js-md5'
import { loadFunction } from './load'

export const save = (ipc: IpcMain) => {
	ipc.handle('save', (_event, data: object, key: string, backup: boolean) => {
		return saveFunction(data, key, backup)
	})
}

export const saveFunction = (data: object, key: string, backup: boolean) => {
	spitLog('Saving', 'Starting to save the data.', false)

	const savePath = config.getSavePath(key)
	spitLog('Saving', `Save path using: ${savePath}`, false)

	const dataString = JSON.stringify(data)
	spitLog('Saving', `Stringified save: ${dataString}`, false)

	const hashPath = config.getHashPath(key)
	spitLog('Saving', `Hash path using: ${hashPath}`, false)

	// Create a last known good save, for hashing later
	const previousSavePath = `${savePath}.previous`
	try {
		if (fs.existsSync(savePath)) {
			spitLog('Saving', 'Copying save into .previous.', false)
			fs.copyFileSync(savePath, previousSavePath)
		} else {
			spitLog('Saving', 'Skipping save into .previous.', false)
		}
	} catch (err) {
		spitLog('Saving', `Failed to copy previous save. ${err}`, false)
		return
	}

	// Create new save as a temp file
	const tempSavePath = `${savePath}.temp`
	try {
		spitLog('Saving', 'Writing save as a temp file', false)
		fs.writeFileSync(tempSavePath, dataString, { flush: true })
	} catch (err) {
		spitLog('Saving', `Failed to save the data to a temp file. ${err}`, false)
		return
	}

	// Rename temp file to replace current save
	try {
		spitLog('Saving', 'Renaming temp file as save', false)
		fs.renameSync(tempSavePath, savePath)
	} catch (err) {
		spitLog('Saving', `Failed to rename the save file and override the current save. ${err}`, false)
		return
	}

	// Create a hash of the save
	const hash = md5(dataString)
	try {
		spitLog('Saving', 'Creating a hashfile for save', false)
		fs.writeFileSync(hashPath, hash, { flush: true })
	} catch (err) {
		spitLog('Saving', `Failed to create hash file for the save. ${err}`, false)
		return
	}

	// Do a load for validation
	try {
		spitLog('Saving', 'Loading save now to validate', false)
		const loadedSave = loadFunction(key)

		// If load is not proper, revert to previous save
		if (md5(JSON.stringify(loadedSave)) !== hash) {
			spitLog('Saving', 'Loaded save failed validation. Going back to previous.', false)
			fs.renameSync(previousSavePath, savePath)
		} else {
			spitLog('Saving', 'Load validation has passed!', false)
		}
	} catch (err) {
		spitLog('Saving', `Failed to load the save for validation. ${err}`, false)
		return
	}

	// Create a backup if backup is true
	if (backup) {
		try {
			spitLog('Saving', 'Creating a backup of save', false)
			fs.writeFileSync(`${config.BACKUP_DIRECTORY}/${config.DATA_KEY}${key}_${Date.now()}`, dataString, {
				flush: true
			})
		} catch (err) {
			spitLog('Saving', `Failed to save a backup. ${err}`, false)
			return
		}
	} else {
		spitLog('Saving', 'Skipping the backup for save', false)
	}
}
