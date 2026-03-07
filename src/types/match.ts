import { Player } from './player'
export interface Match {
  id: string
  status: string
  campo: string
  data: string
  tipo: string
  players: any[] // puoi poi sostituirlo con Player[] se hai un tipo
  teamBalance: TeamBalance
}

/** Squadre bilanciate */
export interface TeamBalance {
  teamA: Player[]
  teamB: Player[]
}

/** Analisi di una partita */
export interface MatchAnalysis {
  possession: { teamA: number; teamB: number }
  passAccuracy: { teamA: number; teamB: number }
  shots: { teamA: number; teamB: number }
  shotsOnTarget: { teamA: number; teamB: number }
  goals: { teamA: number; teamB: number }
  winner: 'Squadra A' | 'Squadra B' | 'Pareggio'
}