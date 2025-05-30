import { validateSync } from 'class-validator'
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null
  validatedData: PropsValidated = null

  validate(data: PropsValidated): boolean {
    const errors = validateSync(data as object)
    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property
        this.errors[field] = Object.values(error.constraints)
      }
      return false
    } else {
      this.validatedData = data
    }
    return true
  }
}
