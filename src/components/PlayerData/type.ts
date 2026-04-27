export interface Stats {
  partite: number
  gol: number
  assist: number
}
export interface Trophy {
  name: string
}

export interface PlayerDataCardSeasonsProps {
  /** Titolo mostrato sopra la card */
  title: string
  seasons: [string, Stats][]
  /** Tipo di card: 'stats' o 'coppe' */
}

export interface PlayerDataCardTrophyProps {
  trophy: Trophy[]
}
