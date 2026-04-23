import { RootState } from 'state/store'
import { User } from 'types/user' // Assicurati di avere RootState definito

export const getUser = (state: RootState) => state.auth?.user as User
export const getCustomerIndo = (state: RootState) => state.auth?.user?.customerInfo
