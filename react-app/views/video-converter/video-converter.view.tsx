import * as React from 'react'
import { DropzoneComponent } from '../../components/dropzone/dropzone.component'
import { videoConverterStart } from '../../ipc/video-converter/video-converter-start.ipc'
import { IVideoConverterViewState } from './types/video-converter.view.state'
import { VideoPreviewComponent } from '../../components/video-preview/video-preview.component'
import { IVideoData } from '../../common/types/video-data.type'
import { IVideoConverterFormatEnum } from '../../../common/services/video-converter.types'
import { listenerVideoConverterProgress } from '../../ipc/video-converter/video-converter-progress.ipc'
import { listenerVideoConverterFinish } from '../../ipc/video-converter/video-converter-finish.ipc'
import { listenerVideoConverterError } from '../../ipc/video-converter/video-converter-error.ipc'
import { showNotification } from '../../os/notification/notification'
import { NotificationTypeEnum } from '../../os/notification/notification.types'

export class VideoConverterView extends React.Component<{}, IVideoConverterViewState> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.initIpcEvents()
  }

  private resetVideo () {
    this.setState({ videoPath: null, videoType: null, progress: null, outputPath: null })
  }

  private initIpcEvents () {
    listenerVideoConverterProgress(({ timemark }) => {
      this.setState({ progress: timemark })
    })

    listenerVideoConverterFinish(({ output: outputPath }) => {
      this.setState({ outputPath, progress: null, videoPath: null })
    })

    listenerVideoConverterError(error => {
      const title = 'Error converting video'
      const message = typeof error === 'string' ? error : JSON.stringify(error)
      showNotification(NotificationTypeEnum.ERROR, title, message)
      this.resetVideo()
    })
  }

  private onDropFilePath ({ path: videoPath, type: videoType }: IVideoData) {
    this.setState({ videoPath, videoType })
  }

  private onChangeVideo (e) {
    e.preventDefault()
    this.resetVideo()
  }

  private onSendVideo (e) {
    e.preventDefault()
    const filePath = this.state.videoPath.replace(/\\/g, '/').split('/').slice(0, -1).join('/')
    videoConverterStart({
      path: this.state.videoPath,
      output: {
        path: filePath,
        format: IVideoConverterFormatEnum.MP4
      }
    })
  }

  private renderProgress () {
    const { progress } = this.state
    return (
      <em>Loading {progress}</em>
    )
  }

  private renderOutputPath () {
    const { outputPath } = this.state
    return (
      <>
        <hr />
        <div id='finished'>
          <h3>Video converted!</h3>
          <VideoPreviewComponent
            path={outputPath}
            type={''}
          />
          <p>Path: <a target='_black' href={outputPath}>{outputPath}</a></p>
        </div>
      </>
    )
  }

  render () {
    const {
      videoPath,
      videoType,
      progress,
      outputPath
    } = this.state
    if (progress) {
      return <>
        <hr />
        {this.renderProgress()}
      </>
    }
    return (
      <>
        {!videoPath ? (
          <DropzoneComponent
            onDropInit={() => this.resetVideo()}
            onDropFilePath={this.onDropFilePath.bind(this)}
          />
        ) : (
            <>
              <button onClick={(e) => this.onChangeVideo(e)}>Change video</button>
              <hr />
              <VideoPreviewComponent
                path={videoPath}
                type={videoType}
                onError={() => {
                  this.resetVideo()
                }}
              />
              <button onClick={(e) => this.onSendVideo(e)}>Convert</button>
            </>
          )}

        {outputPath && this.renderOutputPath()}
      </>
    )
  }
}
