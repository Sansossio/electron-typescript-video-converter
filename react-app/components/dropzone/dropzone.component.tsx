import * as React from 'react'
import { StyledDropZone } from 'react-drop-zone'
import { IFileDropzone } from './types/file.dropzone.type'
import { dropzoneTypeValidationUtils } from './utils/dropzone-type-validation.utils'

import './dropzone.component.scss'
import { showNotification } from '../../os/notification/notification'
import { NotificationTypeEnum } from '../../os/notification/notification.types'
import { IDropzoneComponentProps } from './types/dropzone.component.props'

export class DropzoneComponent extends React.Component<IDropzoneComponentProps, {}> {
  onDrop (file: IFileDropzone) {
    const { type, path } = file
    const isValidfile = dropzoneTypeValidationUtils(type)
    if (isValidfile) {
      this.props.onDropFilePath(path)
      return
    }

    const title = 'Not valid file error'
    const message = 'File must be a video'
    showNotification(
      NotificationTypeEnum.ERROR,
      title,
      message
    )
  }

  render () {
    return (
      <StyledDropZone
        dontRead
        onDrop={file => this.onDrop(file)}
      />
    )
  }
}
