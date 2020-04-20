import { VideoConverterIpcEnum } from '../../../common/ipc-events/video-converter.ipc.events'
import { IVideoConverterStart } from '../../../common/services/video-converter.types'
const { ipcRenderer } = window.require('electron-better-ipc')

export function listenerVideoConverterProgress (cb) {
  console.log(VideoConverterIpcEnum.PROGRESS)
  ipcRenderer.on(VideoConverterIpcEnum.PROGRESS, (_, event) => {
    cb(event)
  })
}
