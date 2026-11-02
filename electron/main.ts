import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as config from './config'
import * as Steamworks from 'steamworks.js'
import { error } from 'console'
import { spitLog } from './logger'
import { setupIpcHandlers } from './ipc'

const platform = process.platform

// Unsupported OS check
if (platform !== 'win32') {
	process.exit(1)
}

let steam: Steamworks.Client
try {
	steam = Steamworks.init(config.STEAM_APPID || 480) as Steamworks.Client
	if (!steam) throw error('Steam Client was unable to be initialized')
} catch (err) {
	spitLog('Steamworks Initialization', JSON.stringify(err), true)
}
spitLog('Steamworks Initialization', 'Steamworks has been initialized', false)

function createWindow() {
	// Create the window
	const window = new BrowserWindow({
		minWidth: config.MIN_WINDOW_WIDTH,
		minHeight: config.MIN_WINDOW_HEIGHT,
		width: config.MIN_WINDOW_WIDTH,
		height: config.MIN_WINDOW_HEIGHT,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			backgroundThrottling: false
		},
		autoHideMenuBar: true,
		center: true,
		show: false,
		icon: path.join(__dirname, 'favicon.svg')
	})

	// Setup the settings
	window.removeMenu()
	window.show()
	window.webContents.openDevTools({ mode: 'detach' })
	window.loadURL('http://localhost:5173')

	// Window Cleanup
	window.on('closed', () => {
		app.quit()
		return
	})

	return window
}

app.whenReady().then(() => {
	spitLog('App Ready', 'App is now ready and starting the createWindow()', false)

	// Setup the Window
	const window = createWindow()

	// Setup the IPCs
	setupIpcHandlers(ipcMain, steam, app, window)

	// Finished Setting up
	spitLog('App Read', "App has run through it's functions", false)
})
