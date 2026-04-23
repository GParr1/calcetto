import React, { FC, useState } from 'react'
import { FieldsFormStructure, GeneralFormProps } from './types'
import { Input } from 'components/core/Inputs/CustomInput'
import Button from 'components/core/Button/Button'
import { validateForm } from 'components/Form/utils'
import { DateField } from 'components/core/Inputs/DateField'
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexJustifyContent,
  SizesPx,
} from 'components/core/Container/enum'
import { ButtonType } from 'components/core/Button/enum'
import { SelectInput } from 'components/core/Inputs/SelectInput'

/**
 * 🔹 GeneralForm
 * Generatore dinamico di form sulla base della struttura
 * definita in `getFormStructure(formId)`.
 */
const GeneralForm: FC<GeneralFormProps> = ({
  handleSubmit,
  handleChangeInput,
  formData,
  obj = {},
}) => {
  const { id, fields, submitLabel } = formData

  const [formValues, setFormValues] = useState(
    formData.fields.reduce((acc: any, field: FieldsFormStructure) => {
        acc[field.name] = obj[field.name] ?? field.defaultValue ?? ''
      return acc
    }, {})
  )
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const onFormSubmit = () => {
    let { formValid, formErrors } = validateForm(formData, formValues)
    if (!formValid) {
      setErrors(formErrors) // Aggiorna lo stato con gli errori
      return
    }
    handleSubmit?.({ ...obj, ...formValues }) // Passa i dati del form validato
  }

  const handleChange = (name: string, value: string | number) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value
    }))
    handleChangeInput?.({ [name]: value })
  }
  const viewFormConfig = {
    flexGap: SizesPx.S
  }

  const btnConfig = {
    touchableOpacityConfig: {
      type: ButtonType.PRIMARY,
      onPress: onFormSubmit,
      accessibilityLabel: 'Submit'
    },
    label: submitLabel ?? 'Submit'
  }
  const containerBtn = {
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER
  }
  return (
    <Container role={'form'} id={id} {...viewFormConfig}>
      {fields.map((field: any) => {
        const {
          label,
          type,
          name,
          placeholder,
          defaultValue,
          options = [],
          required,
          pattern
        } = field

        switch (type) {
          case 'text':
          case 'email':
          case 'number':
          case 'datetime-local':
          case 'password':
            const inputConfig = {
              type,
              label,
              name,
              placeholder,
              required,
              options,
              defaultValue,
              pattern,
              value: formValues[name],
              errorText: errors[name],
              onChangeText: (value: string) => handleChange(name, value)
            }
            return (
              <Container key={name}>
                <Input {...inputConfig} />
              </Container>
            )
          case 'select':
            return (
              <SelectInput
                value={formValues[name]}
                items={options}
                label={label}
                onValueChange={(v: number) => handleChange(name, v)}
              />
            )

          case 'date':
            return (
              <DateField
                key={name}
                label={label}
                required={required}
                errorText={errors[name]}
                value={formValues[name]}
                onChange={(date: string) => handleChange(name, date)}
              />
            )

          case 'button':

          default:
            return null
        }
      })}
      <Container {...containerBtn}>
        <Button {...btnConfig} />
      </Container>
    </Container>
  )
}

export default GeneralForm
