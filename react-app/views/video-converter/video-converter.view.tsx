import * as React from 'react'
import { DropzoneComponent } from '../../components/dropzone/dropzone.component'

export class VideoConverterView extends React.Component {
  onDropFilePath (path: string) {
    console.log(path)
  }

  render () {
    return (
      <DropzoneComponent onDropFilePath={this.onDropFilePath} />
    )
  }
}
