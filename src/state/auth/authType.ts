import { CustomerInfo, UserLogin } from 'src/types'
export interface AuthUpdateProfileParams {
  userLogin: UserLogin
  customerInfo: CustomerInfo
}
export interface Result {
  successMessage?: boolean
  errorMessage?: string
}
export interface HandleSaveFormUserResult {
  errorMessage?: string
  successMessage?: boolean
}
export interface FirebaseLoginParams {
  action: 'email' | 'google' | 'facebook'
  options?: {
    email?: string
    password?: string
  }
}
export interface UserSummary {
  id: string
  firstName: string
  lastName: string
  photoURL: string
  overall: number
  position: string
}
