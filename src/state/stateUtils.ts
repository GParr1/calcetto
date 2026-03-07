import { PayloadAction } from '@reduxjs/toolkit'

// Funzione generica per impostare uno stato e gestire l'errore
export const deleteErrorAndSetState =
<T, K extends keyof T>(name: K) =>
(state: T & { error?: string }, action: PayloadAction<any> & { error?: boolean }) => {
  if (action.error) {
    state.error = action.payload?.message ?? action.payload ?? 'Errore'
  } else {
    if (state.error !== undefined) delete state.error
    state[name] = action.payload
  }
}

// Funzione generica per fare merge dello stato e gestire l'errore
export const deleteErrorAndMergeState =
<T, K extends keyof T>(name: K) =>
(state: T & { error?: string }, action: PayloadAction<any> & { error?: boolean }) => {
  if (action.error) {
    state.error = action.payload?.message ?? action.payload ?? 'Errore'
  } else {
    if (state.error !== undefined) delete state.error
    state[name] = {
      ...(state[name] || {}),
      ...action.payload
    }
  }
}
