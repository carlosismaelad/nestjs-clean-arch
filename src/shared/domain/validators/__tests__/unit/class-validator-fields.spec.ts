import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  fields: string
}> {}

describe('ClassValidatorFielda unit tests', () => {
  it('Should initialize erros and validatedData with null', () => {
    const sut = new StubClassValidatorFields()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: { isRequired: 'test error' },
      },
    ])
    const sut = new StubClassValidatorFields()
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ fields: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ fields: 'value' })
    expect(sut.errors).toBeNull()
  })
})
