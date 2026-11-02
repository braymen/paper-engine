import { IpcMain } from 'electron'
import { Client } from 'steamworks.js'

export const achievement = (ipc: IpcMain, steam: Client) => {
	ipc.handle('achievement', (_event, key) => {
		steam.achievement.activate(key)
	})
}
