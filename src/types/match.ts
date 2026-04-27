import { Player } from './player'
export interface Match extends MatchInfo {
  id: string
}
export interface MatchInfo {
  status: string
  campo: string
  data: string
  tipo: string
  players?: Player[]
  teamBalance?: TeamBalance
  result?: MatchResult
}

export interface MatchResult {
  goalsA: number
  goalsB: number
}

/** Squadre bilanciate */
export interface TeamBalance {
  teamA: Player[]
  teamB: Player[]
}

interface Teams {
  teamA: string
  teamB: string
}
export interface AnalyzeMatch {
  possession: Teams
  passAccuracy: Teams
  shots: Teams
  shotsOnTarget: Teams
  goals: Teams
  winner: string
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