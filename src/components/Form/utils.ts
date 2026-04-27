import { FormStructure } from 'components/Form/types';

interface ValidateFormResponse {
  formValid: boolean
  formErrors: { [key: string]: string }
}

export const validateForm = (formData: FormStructure, formValues: FormStructure): ValidateFormResponse => {
  let formValid = true;
  const formErrors: { [key: string]: string } = {}; // Oggetto per raccogliere gli errori
  formData.fields.forEach((field: any) => {
    const { name, required, pattern } = field;
    const value = formValues[name];
    if (required && !value.trim()) {
      formValid = false;
      formErrors[name] = 'Questo campo è obbligatorio';
    }
    if (pattern && value && !pattern.test(value)) {
      formValid = false;
      formErrors[name] = 'Formato non valido';
    }
  });

  return {
    formValid,
    formErrors
  }
}
