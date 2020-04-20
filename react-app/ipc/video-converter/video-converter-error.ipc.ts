import { VideoConverterIpcEnum } from '../../../src/common/ipc-events/video-converter.ipc.events'
import { IVideoConverterStart } from '../../../src/common/services/video-converter.types'
const { ipcRenderer } = window.require('electron-better-ipc')

export function listenerVideoConverterError (cb) {
  ipcRenderer.on(VideoConverterIpcEnum.ERROR, (_, event) => cb(event))
}
