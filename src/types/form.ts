import { FieldsFormStructure } from 'components/Form/types'

/** Tipi di formId */
export type FormId =
  | 'formUser'
  | 'email-step'
  | 'resetPassword'
  | 'password-step'
  | 'resetPassword-step-password'
  | 'register-step-1'
  | 'register-step-2'
  | 'createMatch'
  | 'addGuest'
  | 'removeGuest'
/**
 * 🔹 Tipo base per i campi del form dinamico
 */
export interface FormField {
  type: string
  name: string
  label: string
  placeholder?: string
  defaultValue?: any
  options?: { code: string; label: string }[]
  className?: string
  required?: boolean
  pattern?: string
}

/** Struttura generica di un form */
export interface FormStructure {
  id: string
  fields: Array<FieldsFormStructure>
  submitLabel: string
}

/** Oggetto generico di un form */
export interface FormObject {
  [key: string]: any
  birthDate_day?: string
  birthDate_month?: string
  birthDate_year?: string
  birthDate?: string
}

/** Parametri per getObjFromForm */
export interface GetObjFromFormParams {
  formData: FormData
}

/**
 * 🔹 Tipi delle props
 */
export interface GeneralFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, obj: Record<string, any>) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => void
  formId: FormId
  obj?: Record<string, any>
  labels?: {
    submitLabel?: string
  }
}

