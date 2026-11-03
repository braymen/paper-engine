import { app } from 'electron'
import { md5 } from 'js-md5'

export const spitLog = (where: string, message: string, wasBad: boolean) => {
	const errorMessage = `[${where}]: ${message}`
	console.log(errorMessage)
	// TODO: Log to file
	if (wasBad) {
		app.quit()
	}
}

export const hashContent = (content: string) => {
	return md5(content)
}
