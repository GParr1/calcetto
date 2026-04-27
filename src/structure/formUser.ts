import { teamLogo } from './teamLogo'
import { teamPosition } from './teamPosition'
import { btnPrimaryDefault } from 'styles';
import { ButtonType } from 'components/core/Button/enum'
import { FormStructure } from 'types/form'

const submitBtn = {
  type: 'button',
  touchableOpacityConfig: {
    type: ButtonType.PRIMARY,
    style: {
      ...btnPrimaryDefault,
    },
  },
  label: ''
}
const emailInput = {
  type: 'email',
  name: 'email',
  label: 'Email',
  required: true,
  placeholder: 'Inserisci la tua Email',
  pattern: new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
  defaultValue: '',
  title: 'Inserisci una email valida'
}

/*Almeno 8 caratteri - Almeno una lettera maiuscola - Almeno una lettera minuscola - Almeno un numero - Almeno un simbolo speciale*/
const passwordInput = {
  type: 'password',
  name: 'password',
  label: 'Password',
  required: true,
  placeholder: 'Inserisci la tua Password',
  defaultValue: '',
  // pattern:
  //   '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$',
  title:
    'La password deve avere almeno 8 caratteri, includere maiuscole, minuscole, numeri e un simbolo speciale'
}

const firstNameInput = {
  type: 'text',
  name: 'firstName',
  label: 'Nome',
  placeholder: 'Nome',
  defaultValue: '',
  required: true
}
const lastNameInput = {
  type: 'text',
  name: 'lastName',
  label: 'Cognome',
  placeholder: 'Cognome',
  defaultValue: ''
}

export const FORMUSER: FormStructure = {
  id: 'userForm',
  fields: [
    { ...firstNameInput },
    { ...lastNameInput },
    {
      type: 'date',
      name: 'birthDate',
      label: 'Data di nascita',
      placeholder: 'Data di nascita',
      defaultValue: ''
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza (cm)',
      placeholder: 'Altezza (cm)',
      defaultValue: ''
    },
    {
      type: 'select',
      name: 'favoriteTeam',
      label: 'Team Preferito',
      options: teamLogo
    },
    {
      type: 'select',
      name: 'position',
      label: 'Posizione',
      options: teamPosition
    },
    {
      type: 'hidden',
      name: 'isNewUser',
      defaultValue: 'true'
    },

  ],
  submitLabel: 'Registrati'
}
export const FORM_REGISTER_STEP_1: FormStructure = {
  id: 'register-step-1',
  fields: [
    { ...firstNameInput },
    { ...lastNameInput },
    {
      type: 'date',
      name: 'birthDate',
      label: 'Data di nascita',
      required: true,
      placeholder: '',
      defaultValue: ''
    },
  ],
  submitLabel: 'Avanti'
}

export const FORM_REGISTER_STEP_2: FormStructure = {
  id: 'register-step-2',
  fields: [
    { ...emailInput },
    { ...passwordInput },
    {
      type: 'consent',
      name: 'privacy',
      label: 'Accetto i consensi',
      options: [
        {
          code: 'privacy',
          label: 'Acconsento al trattamento dei dati personali',
          required: true
        },
        {
          code: 'marketing',
          label: 'Acconsento al marketing e comunicazioni promozionali'
        }
      ],
      defaultValue: 'privacy' // Se l'utente ha già dato il consenso per la privacy di default
    },
    {
      type: 'hidden',
      name: 'isNewUser',
      defaultValue: 'true'
    }
  ],
  submitLabel: 'Registrati'
}
export const FORM_EMAIL_STEP: FormStructure = {
  id: 'email-step',
  fields: [{ ...emailInput }],
  submitLabel: 'Reset Password'
}
export const FORM_PASSWORD_STEP: FormStructure = {
  id: 'password-step',
  fields: [{ ...passwordInput }],
  submitLabel: 'Reset Password'
}

export const FORM_ADD_GUEST: FormStructure = {
  id: 'addGuest',
  fields: [
    {
      type: 'text',
      name: 'guestName',
      label: 'Nome guest',
      placeholder: 'Nome guest',
      defaultValue: ''
    },
    {
      type: 'number',
      name: 'guestOverall',
      label: 'Overall',
      placeholder: 'Overall',
      defaultValue: ''
    },
  ],
  submitLabel: 'Aggiungi'
}
export const FORM_CREATE_MATCH: FormStructure = {
  id: 'createMatch',
  fields: [
    {
      type: 'text',
      name: 'campo',
      label: 'Campo',
      placeholder: 'Nome del campo',
      defaultValue: '',
      required: true
    },
    {
      type: 'date',
      name: 'data',
      label: 'Data',
      placeholder: 'Seleziona data e ora',
      required: true,
      defaultValue: ''
    },
    {
      type: 'select',
      name: 'tipo',
      label: 'Tipo',
      options: [
        { value: '5', label: 'Calcio a 5' },
        { value: '8', label: 'Calcio a 8' }
      ],
      defaultValue: 0,
      required: true
    },
  ],
  submitLabel: 'Crea Partita'
}

export const FORM_REMOVE_GUEST: FormStructure = {
  id: 'addGuest',
  fields: [
    {
      type: 'text',
      name: 'guestName',
      label: 'Nome guest',
      placeholder: 'Nome guest',
      defaultValue: ''
    }
  ],
  submitLabel: 'Rimuovi Guest'
}

export const FromType =  {
  formUser: FORMUSER,
  emailStep: FORM_EMAIL_STEP,
    resetPassword: FORM_EMAIL_STEP,
  passwordStep: FORM_PASSWORD_STEP,
 resetPasswordStepPassword: FORM_PASSWORD_STEP,
 registerStep1: FORM_REGISTER_STEP_1,
 registerStep2: FORM_REGISTER_STEP_2,
  createMatch: FORM_CREATE_MATCH,
  addGuest: FORM_ADD_GUEST,
  removeGuest: FORM_REMOVE_GUEST,
}