import { Player } from 'types/player'

export interface ContentMatchDetailProps {
  teamA: Player[]
  teamB: Player[]
}
export interface FieldProps {
  player: Player
  pos: {
    top: string
    left: string
  }
}