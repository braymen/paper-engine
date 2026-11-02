import { IpcMain } from 'electron'

export const setFullscreen = (ipc: IpcMain, window: Electron.BrowserWindow) => {
	ipc.handle('set-fullscreen', (_event, fullscreen: boolean) => {
		window.setFullScreen(fullscreen)
	})
}
