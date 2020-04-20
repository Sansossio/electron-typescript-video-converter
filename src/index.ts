import { BrowserWindow, app } from 'electron'
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
  main.webContents.openDevTools()
})

initIpc()
