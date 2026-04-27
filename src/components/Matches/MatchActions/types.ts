import { Match } from 'types/match'
import { User } from 'types/user'

export interface AdminActionProps {
  match: Match
  isPast: boolean
  playerExists: boolean
}
export interface UserActionProps {
  match: Match
  userAuth: User
  isPast: boolean
  playerExists: boolean
}