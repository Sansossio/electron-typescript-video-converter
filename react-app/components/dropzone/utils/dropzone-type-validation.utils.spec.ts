import { dropzoneTypeValidationUtils } from './dropzone-type-validation.utils'

describe('Dropzone type validation', () => {
  it('should return false when file type is not a video', () => {
    const type = 'no-video'
    expect(dropzoneTypeValidationUtils(type)).toEqual(false)
  })

  it('should return true if type is a video', () => {
    const type = 'video/whatever'
    expect(dropzoneTypeValidationUtils(type)).toEqual(true)
  })
})
