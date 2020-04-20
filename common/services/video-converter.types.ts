export enum IVideoConverterFormatEnum {
  MP4 = 'video/mp4'
}

export interface IVideoConverterStart {
  path: string
  output: {
    path: string
    format: IVideoConverterFormatEnum
  }
}
