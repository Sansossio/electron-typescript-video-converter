import * as React from 'react'
import { IVideoData } from '../../common/types/video-data.type'

export function VideoPreviewComponent (props: IVideoData) {
  return (
    <video
      width='100%'
      height='auto'
      autoPlay
      controls
    >
      <source src={props.path} type={props.type} />
    </video>
  )
}
