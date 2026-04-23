import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteErrorAndMergeState, deleteErrorAndSetState } from 'state/stateUtils'
import {User} from 'types/user'
interface AuthState {
  user: User | null
  accountInfo: any | null
  error?: string
}

const initialState: AuthState = {
  user: null,
  accountInfo: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) =>
      deleteErrorAndMergeState<AuthState ,'user'>('user')(state, action),
    accountInformation: (state, action: PayloadAction<any>) =>
      deleteErrorAndSetState<AuthState,'accountInfo'>('accountInfo')(state, action),
    logout: () => initialState
  }
})

export const { login, accountInformation, logout } = authSlice.actions
export default authSlice.reducer
