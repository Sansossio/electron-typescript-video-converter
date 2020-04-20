export function dropzoneTypeValidationUtils (type: string) {
  const regex = /video\/(.*)/gi
  return regex.test(type)
}
