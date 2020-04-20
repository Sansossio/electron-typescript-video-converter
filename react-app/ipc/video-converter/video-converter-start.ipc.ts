import { VideoConverterIpcEnum } from '../../../common/ipc-events/video-converter.ipc.events'

const { ipcRenderer } = window.require('electron-better-ipc')

export function videoConverterStart (path: string) {
  ipcRenderer.send(VideoConverterIpcEnum.START, path)
}
