import * as React from 'react'
import { StyledDropZone } from 'react-drop-zone'
import { IFileDropzone } from './types/file.dropzone.type'
import { dropzoneTypeValidationUtils } from './utils/dropzone-type-validation.utils'

import './dropzone.component.scss'
import { showNotification } from '../../os/notification/notification'
import { NotificationTypeEnum } from '../../os/notification/notification.types'

export class DropzoneComponent extends React.Component {
  onDrop (file: IFileDropzone) {
    const { type, path } = file
    if (!dropzoneTypeValidationUtils(type)) {
      const title = 'Not valid file error'
      const message = 'File must be a video'
      showNotification(
        NotificationTypeEnum.ERROR,
        title,
        message
      )
      return
    }
    console.log(path)
  }

  render () {
    return (
      <StyledDropZone
        onDrop={this.onDrop}
      />
    )
  }
}
