import { FC } from 'react'

export interface CIProps {
  name: string
  label?: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  required?: boolean
  defaultValue?: string
  pattern?: RegExp
  errorText?: string
}
export interface SelectItem {
  value: number
  label: string
}
export interface DateSelectProps {
  label?: string
  value: number
  onValueChange: (v: number) => void
  items: SelectItem[] | number[]
}
export interface DateFieldProps {
  label?: string
  value?: string // ISO string (es. '2026-03-07' o '2026-03-07T00:00:00.000Z')
  required?: boolean
  onChange: (date: string) => void // ritorna 'YYYY-MM-DD'
  errorText?: string
}