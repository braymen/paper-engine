import { IpcMain } from 'electron'
import { spitLog } from '../utils'

export const log = (ipc: IpcMain) => {
	ipc.handle('log', (_event, message: string) => {
		spitLog('UI', message, false)
	})
}
