import { IVideoData } from '../../../common/types/video-data.type'

export interface IDropzoneComponentProps {
  onDropFilePath: (data: IVideoData) => void
  onDropInit: () => void
}
