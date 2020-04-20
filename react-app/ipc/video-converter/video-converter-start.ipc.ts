import { VideoConverterIpcEnum } from '../../../src/common/ipc-events/video-converter.ipc.events'
import { IVideoConverterStart } from '../../../src/common/services/video-converter.types'
const { ipcRenderer } = window.require('electron-better-ipc')

export function videoConverterStart (video: IVideoConverterStart) {
  ipcRenderer.send(VideoConverterIpcEnum.START, video)
}
