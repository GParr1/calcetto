import { Match } from 'types/match'
import { User } from 'types/user'
import { Player } from 'types/player'

export type ModalMode = 'createMatch' | 'addGuest' | 'removeGuest' | null

export interface AdminActionProps {
  match: Match
  isPast: boolean
  playerExists: boolean
  openModal: (mode: ModalMode, matchId?: string) => void
}

export interface MatchActionsProps {
  match: Match
  user: User
  openModal: (mode: ModalMode, matchId?: string) => void

  //handleRemove: (matchId: string) => void
  // openDetailOverlay: (match: Match, closeDetail: () => void) => void
  // closeDetailOverlay: () => void
  // openModal: (modalType: 'addGuest' | 'removeGuest', matchId: string) => void
}
export interface MatchCardProps {
  match: Match
  uid: string
  user: User
  openModal: (mode: ModalMode, matchId?: string) => void
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
export interface ModalInfo {
  show: boolean
  mode: ModalMode
  matchId: string | null
  modalTitle: string | null
  handleSubmit?: null | ((obj: Record<string, any>) => void )
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
  title: string
  showAddMatch?: boolean
  user: User
  handleRemove: (match: string) => void
  openModal: (mode: ModalMode, matchId?: string ) => void

  handleModalAddGuest: (match: string) => void
  handleModalRemoveGuest: (match: string) => void
  handleDeleteMatch: (match: string) => void
}