import { RootState } from 'state/store' // Assicurati di avere il RootState corretto

export const getMatches = (state: RootState) => state.support?.matches || []
export const getModal = (state: RootState) => state.support?.modal || []
