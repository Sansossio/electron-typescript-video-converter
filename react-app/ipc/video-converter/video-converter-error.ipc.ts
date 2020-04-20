import { VideoConverterIpcEnum } from '../../../common/ipc-events/video-converter.ipc.events'
import { IVideoConverterStart } from '../../../common/services/video-converter.types'
const { ipcRenderer } = window.require('electron-better-ipc')

export function listenerVideoConverterError (cb) {
  ipcRenderer.on(VideoConverterIpcEnum.ERROR, (_, event) => cb(event))
}
