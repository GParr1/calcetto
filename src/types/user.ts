import { GoalkeeperAttributes, PlayerAttributes } from 'types/player'

export interface UserLogin {
  uid: string
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
  attributes?: PlayerAttributes | GoalkeeperAttributes
  photoURL?: string
  isAdmin?: boolean
  isNewUser?: boolean
  height?: string
  birthDate?: string
}

export interface User {
  user?: UserLogin
  customerInfo?: CustomerInfo
}
