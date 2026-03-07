import { RootState } from 'state/store' // Assicurati di avere RootState definito

export const getUser = (state: RootState) => state.auth?.user
export const getCustomerIndo = (state: RootState) => state.auth?.user?.customerInfo
