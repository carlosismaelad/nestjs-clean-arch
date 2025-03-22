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

  it('Valid cases for user validator class', () => {
    const props = userDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
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
  })
})

describe('User validator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  describe('Email field', () => {
    it('Invalidations cases for email field', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isValid = sut.validate({ ...userDataBuilder({}), email: '' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ])

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isValid = sut.validate({ ...userDataBuilder({}), email: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...userDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: 'a'.repeat(256) as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  it('Invalidations cases for password field', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    isValid = sut.validate({ ...userDataBuilder({}), password: '' as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
    ])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    isValid = sut.validate({ ...userDataBuilder({}), password: 10 as any })
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ])

    isValid = sut.validate({
      ...userDataBuilder({}),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: 'a'.repeat(256) as any,
    })
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
    ])
  })
})
