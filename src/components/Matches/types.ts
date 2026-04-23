import { Match } from 'types/match'
import { User } from 'types/user'
import { Player } from 'types/player'

export type ModalMode = 'createMatch' | 'addGuest' | 'removeGuest'



export interface MatchActionsProps {
  match: Match
}
export interface MatchCardProps {
  match: Match
  uid: string
}

export interface DetailOverlay {
  show: boolean
  match: Match | null
  closeDetailOverlay: (() => void) | null
}
export interface MatchContentProps {
  campo: string
  data: string
  tipo: string
  players?: Player[]
}
export interface MatchDetailProps {
  match: Match
  mode: 5 | 8
}

// ✅ Props del componente principale
export interface MatchListProps {
  user: User
  matches: Match[]
  title: string
  showAddMatch?: boolean
}

export interface MatchSliderProps {
  matches: Match[]
  uid: string
}

