import { app } from 'electron'

export const spitLog = (where: string, message: string, wasBad: boolean) => {
	const errorMessage = `[${where}]: ${message}`
	console.log(errorMessage)
	// TODO: Log to file
	if (wasBad) {
		app.quit()
	}
}

export const guardedParse = (str: string) => {
	try {
		spitLog('Guarded Parse', `Starting guarded parse`, false)
		const parsed = JSON.parse(str)

		if (parsed !== null && typeof parsed === 'object') {
			spitLog('Guarded Parse', `Data parsed successfully!`, false)
			return parsed
		} else {
			spitLog('Guarded Parse', `Data parsed failed...`, false)
			return null
		}
	} catch (err) {
		spitLog('Guarded Parse', `Failed to parse string. ${err}`, false)
	}
}
