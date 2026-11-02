import { IpcMain } from 'electron'

export const getFullscreen = (ipc: IpcMain, window: Electron.BrowserWindow) => {
	ipc.handle('get-fullscreen', () => {
		return window.fullScreen
	})
}
