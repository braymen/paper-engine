import { IpcMain } from 'electron'
import { Client } from 'steamworks.js'

export const hasDlc = (ipc: IpcMain, steam: Client) => {
	ipc.handle('has-dlc', (_event, appid: number): boolean => {
		return steam.apps.isDlcInstalled(appid)
	})
}
