import { IpcMain, shell } from 'electron'

export const link = (ipc: IpcMain) => {
	ipc.handle('link', (_event, url) => {
		shell.openExternal(url)
	})
}
