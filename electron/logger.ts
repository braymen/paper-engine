import { app } from 'electron'

export const spitLog = (where: string, message: string, wasBad: boolean) => {
	const errorMessage = `[${where}]: ${message}`
	console.log(errorMessage)
	// TODO: Log to file
	if (wasBad) {
		app.quit()
	}
}
