import { IpcMain } from 'electron'

export const quit = (ipc: IpcMain, app: Electron.App) => {
	ipc.handle('quit', () => {
		app.quit()
	})
}
