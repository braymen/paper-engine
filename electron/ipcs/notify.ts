import { IpcMain } from 'electron'
// import notifier from 'node-notifier'

export const quit = (ipc: IpcMain, app: Electron.App) => {
	ipc.handle('quit', () => {
		app.quit()
	})
}
