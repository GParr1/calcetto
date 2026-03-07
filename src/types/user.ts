export interface UserLogin {
  uid?: string
  email?: string
  displayName?: string
  photoURL?: string
}

export interface CustomerInfo {
  firstName?: string
  lastName?: string
  favoriteTeam?: string
  overall?: number
  position?: string
  attributes?: Record<string, number>
  photoURL?: string
  isAdmin?: boolean
}

export interface User {
  userLogin?: UserLogin
  customerInfo?: CustomerInfo
}
