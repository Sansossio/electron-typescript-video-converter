import { ipcMain } from 'electron-better-ipc'
import { VideoConverterIpcEnum } from '../../../common/ipc-events/video-converter.ipc.events'

export function videoConverterIpc () {
  ipcMain.on(VideoConverterIpcEnum.START, (event, path) => {
    console.log(path)
  })
}
