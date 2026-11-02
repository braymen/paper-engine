import { IpcMain } from 'electron'
import { SteamClient } from '../types/Steam'
import { Client } from 'steamworks.js'

export const quit = (ipc: IpcMain, steam: Client) => {
	ipc.handle('achievement', (_event, key) => {})
}
