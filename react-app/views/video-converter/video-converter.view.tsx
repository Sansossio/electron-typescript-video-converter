import * as React from 'react'
import { DropzoneComponent } from '../../components/dropzone/dropzone.component'
import { videoConverterStart } from '../../ipc/video-converter/video-converter-start.ipc'
import { IVideoConverterViewState } from './types/video-converter.view.state'
import { VideoPreviewComponent } from '../../components/video-preview/video-preview.component'
import { IVideoData } from '../../common/types/video-data.type'

export class VideoConverterView extends React.Component<{}, IVideoConverterViewState> {
  constructor (props) {
    super(props)
    this.state = {
      videoPath: 's'
    }
  }
  private resetVideo () {
    this.setState({ videoPath: null, videoType: null })
  }

  onDropFilePath ({ path: videoPath, type: videoType }: IVideoData) {
    this.setState({ videoPath, videoType })
  }

  onChangeVideo (e) {
    e.preventDefault()
    this.resetVideo()
  }

  render () {
    const {
      videoPath,
      videoType
    } = this.state
    if (!videoPath) {
      return (
        <DropzoneComponent
          onDropInit={() => this.resetVideo()}
          onDropFilePath={this.onDropFilePath.bind(this)}
        />
      )
    }
    return (
      <>
        <button onClick={e => this.onChangeVideo(e)}>
          Change video
        </button>
        <hr />
        <VideoPreviewComponent path={videoPath} type={videoType} />
        <div id='control-buttons'>
        </div>
      </>
    )
  }
}
