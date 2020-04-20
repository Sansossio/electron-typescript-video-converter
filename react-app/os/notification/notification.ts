import { NotificationTypeEnum } from './notification.types'

const { dialog } = window.require('electron').remote

export function showNotification (type: NotificationTypeEnum, title: string, message: string) {
  dialog.showMessageBox({
    type,
    title,
    message
  })
}
