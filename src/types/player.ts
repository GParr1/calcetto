/** Attributi giocatore outfield */
export interface PlayerAttributes {
  VEL: number
  TIR: number
  PAS: number
  DRI: number
  DIF: number
  FIS: number
}

/** Attributi portiere */
export interface GoalkeeperAttributes {
  PAR: number
  RIF: number
  POS: number
  VEL: number
  TEC: number
  RES: number
}

/** Giocatore generico */
export interface Player {
  id: string
  name: string
  overall: number
  [key: string]: any
}

/** Parametri upload immagine */
export interface UploadImageParams {
  user: any
  file: File
  isDragAndDrop: boolean
}

/** Risultato upload immagine */
export interface UploadImageResult {
  successMessage?: string
  errorMessage?: string
}

/** Parametri calcolo attributi */
export interface CalculateAttributesParams {
  height: number
  birthDate: string | Date
  position: string
}

/** Attributi giocatore */
export interface Attributes {
  [key: string]: number
}
