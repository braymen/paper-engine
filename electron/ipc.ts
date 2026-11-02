import { IpcMain } from 'electron'
import * as fs from 'fs'
import { quit } from './ipcs/quit'
import { link } from './ipcs/link'
import { Client } from 'steamworks.js'
import * as config from './config'
import { setFullscreen } from './ipcs/set-fullscreen'
import { getFullscreen } from './ipcs/get-fullscreen'
import { spitLog } from './logger'

export const setupIpcHandlers = (ipc: IpcMain, steam: Client, app: Electron.App, window: Electron.BrowserWindow) => {
	try {
		// Only need to do the backup directory, since it's nested in the save and recursive is true
		if (!fs.existsSync(config.BACKUP_DIRECTORY)) {
			fs.mkdirSync(config.BACKUP_DIRECTORY, { recursive: true })
		}
		if (!fs.existsSync(config.LOG_DIRECTORY)) {
			fs.mkdirSync(config.LOG_DIRECTORY, { recursive: true })
		}
	} catch (err) {
		spitLog('Setting up Directories', JSON.stringify(err), true)
	}

	// Initialize all the IPCs
	link(ipc)
	getFullscreen(ipc, window)
	setFullscreen(ipc, window)
	quit(ipc, app)
}
