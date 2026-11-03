import { IpcMain } from 'electron'
import * as fs from 'fs'
import * as config from '../config'
import { spitLog } from '../utils'

export const save = (ipc: IpcMain) => {
	ipc.handle('save', (_event, data: object, key: string, backup: boolean) => {
		const savePath = `${config.SAVE_DIRECTORY}/${config.SAVE_KEY}${key}`
		const dataString = JSON.stringify(data)

		// Create a last known good save, for hashing later
		const previousSavePath = `${savePath}.previous`
		try {
			if (fs.existsSync(previousSavePath)) {
				fs.copyFileSync(savePath, previousSavePath)
			}
		} catch (err) {
			spitLog('Saving', `Failed to copy previous save. ${err}`, false)
		}

		// Create new save as a temp file
		const tempSavePath = `${savePath}.temp`
		try {
			fs.writeFileSync(tempSavePath, dataString)
		} catch (err) {
			spitLog('Saving', `Failed to save the data to a temp file. ${err}`, false)
		}

		// Rename temp file to replace current save
		try {
			fs.renameSync(tempSavePath, savePath)
		} catch (err) {
			spitLog('Saving', `Failed to rename the save file and override the current save. ${err}`, false)
		}

		// Create a backup if backup is true
		if (backup) {
			try {
				fs.writeFileSync(`${config.BACKUP_DIRECTORY}/${config.SAVE_KEY}${key}_${Date.now()}`, dataString)
			} catch (err) {
				spitLog('Saving', `Failed to save a backup. ${err}`, false)
			}
		}
	})
}
