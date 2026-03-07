import React, { FormEvent } from 'react';

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

export interface GeneralFormProps {
  handleSubmit?: (obj: Record<string, any>) => void
  handleSubmitEvt?: (ev: FormEvent<HTMLFormElement>) => Promise<void>
  formId: FormId
  obj?: Record<string, any>
  labels?: {
    submitLabel?: string
  }
}
export interface FieldsFormStructure {
  type: string,
  name: string,
  label: string,
  placeholder: string,
  defaultValue?: string,
  options?: Array<any>
  required?:boolean,
  pattern?:string

}
export interface FormStructure {
  id:string,
  fields: Array<FieldsFormStructure>
  [key: string]: any
}