import { ipcMain } from 'electron-better-ipc'
import { VideoConverterIpcEnum } from '../../common/ipc-events/video-converter.ipc.events'
import { IVideoConverterStart } from '../../common/services/video-converter.types'
import { VideoConverterService } from '../../services/video-converter/video-converter.service'

// Listeners
export function videoConverterIpc () {
  ipcMain.on(VideoConverterIpcEnum.START, (event, video: IVideoConverterStart) => {
    // First progress event
    event.reply(VideoConverterIpcEnum.PROGRESS, { timemark: '-' })
    // Convert video
    VideoConverterService.convert(
      video,
      function onProgress (timemark: string) {
        event.reply(VideoConverterIpcEnum.PROGRESS, { timemark })
      },
      function onError (error: any) {
        event.reply(VideoConverterIpcEnum.ERROR, error.message)
      },
      function onFinish (output) {
        event.reply(VideoConverterIpcEnum.FINISH, { output })
      }
    )
  })
}
