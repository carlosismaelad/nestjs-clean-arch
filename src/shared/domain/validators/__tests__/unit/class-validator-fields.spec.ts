import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  fields: string
}> {}

describe('ClassValidatorFielda unit tests', () => {
  const sut = new StubClassValidatorFields()
  it('Should initialize erros and validatedData with null', () => {
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
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })
})
