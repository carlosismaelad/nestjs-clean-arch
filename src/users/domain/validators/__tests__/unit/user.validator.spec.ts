import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'

let sut: UserValidator

describe('User validator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  describe('Name field', () => {
    it('Invalidations cases for name field', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isValid = sut.validate({ ...userDataBuilder({}), name: '' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(['name should not be empty'])

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isValid = sut.validate({ ...userDataBuilder({}), name: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...userDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: 'a'.repeat(256) as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('Valid cases for name field', () => {
      const props = userDataBuilder({})
      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))
    })
  })
})
