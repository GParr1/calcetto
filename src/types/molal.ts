export type ModalMode = 'createMatch' | 'addGuest' | 'removeGuest'

export interface ModalInfo {
  show: boolean
  mode: ModalMode | null
  matchId?: string | null
  modalTitle: string | null
  handleSubmit: null | ((obj: Record<string, any>) => void)
}