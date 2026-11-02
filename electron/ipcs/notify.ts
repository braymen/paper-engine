import { IpcMain } from 'electron'
import notifier from 'node-notifier'

export const notify = (ipc: IpcMain) => {
	ipc.handle('notify', (_event, message: string) => {
		notifier.notify(message)
	})
}
