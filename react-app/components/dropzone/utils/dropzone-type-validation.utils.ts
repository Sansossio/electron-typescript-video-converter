const regex = /video\/(.*)/gi

export function dropzoneTypeValidationUtils (type: string) {
  return regex.test(type)
}
