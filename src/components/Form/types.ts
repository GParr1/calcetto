import { FormStructure } from 'types/form'

export type FormId =
  | 'formUser'
  | 'emailStep'
  | 'resetPassword'
  | 'passwordStep'
  | 'resetPasswordStepPassword'
  | 'registerStep1'
  | 'registerStep2'
  | 'createMatch'
  | 'addGuest'
  | 'removeGuest'

export interface GeneralFormProps {
  handleSubmit?: null | ((obj: Record<string, any>) => void)
  handleChangeInput?: (obj: Record<string, any>) => void
  formData: FormStructure
  obj?: Record<string, any>
  labels?: {
    submitLabel?: string
  }
}
export interface FieldsFormStructure {
  type: string,
  name: string,
  label?: string,
  placeholder?: string,
  defaultValue?: string | number,
  options?: Array<any>
  required?:boolean,
  pattern?:RegExp

}
