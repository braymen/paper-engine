import { app } from 'electron'
import * as path from 'path'

export const COMPANY_NAME = 'Paper Crown Games'
export const GAME_NAME = 'A Paper Crown Game'

export const STEAM_APPID = 480

export const MIN_WINDOW_WIDTH = 1296
export const MIN_WINDOW_HEIGHT = 759
export const BACKUP_INTERVAL_SECS = 30

export const DIRECTORY = path.join(app.getPath('userData'), COMPANY_NAME, GAME_NAME)
export const SAVE_DIRECTORY = path.resolve(DIRECTORY, 'saves')
export const BACKUP_DIRECTORY = path.resolve(DIRECTORY, 'saves/backups')
export const LOG_DIRECTORY = path.resolve(DIRECTORY, 'logs')

export const SAVE_KEY = 'save-'
