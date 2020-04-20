import { BrowserWindow, app } from 'electron'
import * as isDev from 'electron-is-dev'
import * as dotenv from 'dotenv'
import { baseUrl } from './url/base-url'
import { initIpc } from './ipc'

dotenv.config()

app.on('ready', () => {
  const main = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  main.loadURL(baseUrl())
  if (isDev) {
    main.webContents.openDevTools()
  }
})

initIpc()
