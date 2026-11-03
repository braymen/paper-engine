import { IpcMain, shell } from 'electron'
import * as config from '../config'
import { spitLog } from '../utils'
export type DirectoryType = 'Root' | 'Saves' | 'Logs' | 'Backups'

export const openFolder = (ipc: IpcMain) => {
	ipc.handle('open-folder', (_event, directoryType: DirectoryType) => {
		switch (directoryType) {
			case 'Root': {
				shell.openPath(config.DIRECTORY)
				break
			}
			case 'Saves': {
				shell.openPath(config.SAVE_DIRECTORY)
				break
			}
			case 'Logs': {
				shell.openPath(config.LOG_DIRECTORY)
				break
			}
			case 'Backups': {
				shell.openPath(config.BACKUP_DIRECTORY)
				break
			}
			default: {
				spitLog('Open Folder IPC', `Tried opening a directory with the type: ${directoryType}`, false)
				break
			}
		}
	})
}
