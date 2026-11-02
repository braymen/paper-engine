import { ipcRenderer, contextBridge } from 'electron'
contextBridge.exposeInMainWorld('api', {
	save: (data: object, key: string) => {
		return ipcRenderer.invoke('save', data, key)
	},
	load: (key: string) => {
		return ipcRenderer.invoke('load', key)
	},
	delete: (key: string) => {
		return ipcRenderer.invoke('delete', key)
	},
	openFolder: () => {
		return ipcRenderer.invoke('open-folder')
	},
	achievement: (key: string) => {
		return ipcRenderer.invoke('achievement', key)
	},
	retriggerAchievments: (keys: string[]) => {
		return ipcRenderer.invoke('retrigger-achievements', keys)
	},
	hasDlc: (dlc: string) => {
		return ipcRenderer.invoke('has-dlc', dlc)
	},
	link: (url: string) => {
		return ipcRenderer.invoke('link', url)
	},
	log: (level: string, message: string) => {
		return ipcRenderer.invoke('log', level, message)
	},
	setFullscreen: (fullscreen: boolean) => {
		return ipcRenderer.invoke('set-fullscreen', fullscreen)
	},
	getFullscreen: () => {
		return ipcRenderer.invoke('get-fullscreen')
	},
	notify: (message: string) => {
		return ipcRenderer.invoke('notify', message)
	},
	quit: () => {
		return ipcRenderer.invoke('quit')
	}
})
