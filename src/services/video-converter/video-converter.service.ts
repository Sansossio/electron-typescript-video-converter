import * as Ffmpeg from 'fluent-ffmpeg'
import * as FfmpegInstaller from '@ffmpeg-installer/ffmpeg'
import * as path from 'path'
import * as fs from 'fs'
import { IVideoConverterStart, IVideoConverterFormatEnum } from '../../common/services/video-converter.types'

Ffmpeg.setFfmpegPath(FfmpegInstaller.path)

export class VideoConverterService {
  private static getExtension (format: IVideoConverterFormatEnum) {
    switch (format) {
      case IVideoConverterFormatEnum.MP4: return 'mp4'
    }
  }

  private static generateUniqueName (filePath: string, filename: string, extension: string) {
    let output: string
    let fullFilename: string
    let count = 0
    do {
      output = path.join(filePath, filename)
      if (count++ !== 0) {
        output += `(${count})`
      }
      fullFilename = `${output}.${extension}`
    } while (fs.existsSync(fullFilename))
    return fullFilename
  }

  static convert (
    data: IVideoConverterStart,
    onProgress: (timemark: string) => void,
    onError: (error: any) => void,
    onFinish: (output: string) => void
  ) {
    const fileBuffer = fs.createReadStream((data.path))
    const filename = path.parse(data.path).name
    const newExt = VideoConverterService.getExtension(data.output.format)
    const output = VideoConverterService.generateUniqueName(data.output.path, filename, newExt)
    Ffmpeg(fileBuffer)
      .output(output)
      .on('progress', progressData => {
        onProgress(progressData.timemark)
      })
      .on('error', error => {
        try {
          fs.unlinkSync(output)
        } catch (e) {}
        onError(error)
      })
      .on('end', () => {
        onFinish(output)
      })
      .run()
  }
}
