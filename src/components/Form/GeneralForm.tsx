import React, { FormEvent, useState } from 'react';
import { getFormStructure } from 'utils/utils';
import { StyleSheet, View } from 'react-native';
import { FieldsFormStructure, FormStructure, GeneralFormProps } from './types';
import Input from 'components/core/CustomInput';
import Button, { ButtonType } from 'components/core/Button';
import { ContainerProps } from 'styles';
import { validateForm } from 'components/Form/utils';
import { useResponsiveStyle } from 'styles/styles.utils';
import DateField from 'components/core/DateField';

/**
 * 🔹 GeneralForm
 * Generatore dinamico di form sulla base della struttura
 * definita in `getFormStructure(formId)`.
 */
const GeneralForm: React.FC<GeneralFormProps> = ({
                                                   handleSubmit,
                                                   formId,
                                                   obj = {},
                                                   labels
                                                 }) => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const formData: FormStructure = getFormStructure(formId);
  // Stato dinamico per ogni campo del form
  const [formValues, setFormValues] = useState(
    formData.fields.reduce((acc: any, field: FieldsFormStructure) => {
      if (field.type === 'date-split') {
        acc[`${field.name}_day`] = field.defaultValue ? field.defaultValue.split('-')[2] : '';
        acc[`${field.name}_month`] = field.defaultValue ? field.defaultValue.split('-')[1] : '';
        acc[`${field.name}_year`] = field.defaultValue ? field.defaultValue.split('-')[0] : '';
      } else {
        acc[field.name] = field.defaultValue || ''; // Inizializza con i valori predefiniti o stringa vuota
      }
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onFormSubmit = () => {
    let { formValid, formErrors } = validateForm(formData,formValues)
    if (!formValid) {
      setErrors(formErrors); // Aggiorna lo stato con gli errori
      return;
    }
    handleSubmit?.({...obj,...formValues}); // Passa i dati del form validato
  };

  const handleChange = (name: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const viewFormConfig =getResponsiveStyle({
    width: ['80%','80%','70%']
  })
  return (
    <View role={'form'} id={formId} style={{...viewFormConfig}}>
      {formData.fields.map((field :any) => {
        const {
          touchableOpacityConfig,
          label,
          type,
          name,
          placeholder,
          defaultValue,
          options = [],
          required,
          pattern
        } = field;

        switch (type) {
          case 'text':
          case 'email':
          case 'number':
          case 'datetime-local':
          case 'password':
          case 'select':
            const inputConfig ={
              type,
              label,
              name,
              placeholder,
              required,
              options,
              defaultValue,
              pattern,
              value:formValues[name],
              onChangeText:(value: string) => handleChange(name, value)
            }
            const viewConfig = {
              key:name
            }
            return (
              <View {...viewConfig}>
                <Input {...inputConfig}/>
              </View>
            );

          /** =====================
           *  Caso date-split (GG/MM/AAAA)
           *  ===================== */
          case 'date-split': {
            const days = Array.from({ length: 31 }, (_, i) => i + 1);
            const months = [
              { code: '01', label: 'Gennaio' },
              { code: '02', label: 'Febbraio' },
              { code: '03', label: 'Marzo' },
              { code: '04', label: 'Aprile' },
              { code: '05', label: 'Maggio' },
              { code: '06', label: 'Giugno' },
              { code: '07', label: 'Luglio' },
              { code: '08', label: 'Agosto' },
              { code: '09', label: 'Settembre' },
              { code: '10', label: 'Ottobre' },
              { code: '11', label: 'Novembre' },
              { code: '12', label: 'Dicembre' }
            ];

            const currentYear = new Date().getFullYear();
            const startYear = 1900;
            const years = Array.from(
              { length: currentYear - startYear + 1 },
              (_, i) => startYear + i
            );

            const [defaultYear, defaultMonth, defaultDay] = defaultValue
              ? defaultValue.split('-')
              : ['', '', ''];
            const viewSplitDate = {
              gap: 2
            }
            return (
              <View key={name} >
                {label && (
                  <label htmlFor={name} className="form-label me-2">
                    {label}
                  </label>
                )}
                <View style={{...viewSplitDate}}>
                  <Input
                    label="Giorno"
                    type="select"
                    name={`${name}_day`}
                    required={required}
                    options={days.map((day) => ({
                      label: String(day).padStart(2, '0'),
                      value: String(day).padStart(2, '0')
                    }))}
                    placeholder={'Giorno'}
                    value={formValues[`${name}_day`] || defaultDay}  // Assicurati di passare il valore corretto
                    onChangeText={(value: string) => handleChange(`${name}_day`, value)}
                  />

                  <Input
                    label="Mese"
                    type="select"
                    name={`${name}_month`}
                    required={required}
                    options={months.map((month) => ({
                      label: month.label,
                      value: month.code
                    }))}
                    placeholder={'Mese'}
                    value={formValues[`${name}_month`] || defaultMonth}  // Lo stesso per mese
                    onChangeText={(value: string) => handleChange(`${name}_month`, value)}
                  />

                  <Input
                    label="Anno"
                    type="select"
                    name={`${name}_year`}
                    required={required}
                    options={years.map((year) => ({
                      label: String(year),
                      value: String(year)
                    }))}
                    placeholder={'Anno'}
                    value={formValues[`${name}_year`] || defaultYear}  // Lo stesso per anno
                    onChangeText={(value: string) => handleChange(`${name}_year`, value)}
                  />

                </View>
              </View>
            );
          }
          case 'date':
            return (
              <DateField
                key={name}
                label={label}
                required={required}
                value={formValues[name]}
                onChange={(date: string) =>
                  handleChange(name, date)
                }
              />
            );

          case 'button':
            const btnConfig = {
              touchableOpacityConfig: {
                ...touchableOpacityConfig,
                onPress: onFormSubmit,
                accessibilityLabel: "Submit",
              },
              label: labels?.submitLabel ?? 'Submit',
            }
            const containerBtn = getResponsiveStyle({
              justifyContent: [ContainerProps.justifyCenter],
              alignItems: [ContainerProps.alignCenter]
            })
            return (
              <View style={{...containerBtn}}>
                <Button {...btnConfig}/>
              </View>
            )
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});
export default GeneralForm;
