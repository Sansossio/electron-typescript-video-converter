import { VideoConverterIpcEnum } from '../../../src/common/ipc-events/video-converter.ipc.events'
import { IVideoConverterStart } from '../../../src/common/services/video-converter.types'
const { ipcRenderer } = window.require('electron-better-ipc')

export function listenerVideoConverterProgress (cb) {
  console.log(VideoConverterIpcEnum.PROGRESS)
  ipcRenderer.on(VideoConverterIpcEnum.PROGRESS, (_, event) => {
    cb(event)
  })
}
