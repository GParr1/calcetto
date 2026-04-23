import { ModalMode } from 'components/Matches/types'
import { ModalInfo } from 'types/molal'

const modalConfig: Record<
  ModalMode,
  Omit<ModalInfo, 'show' | 'handleSubmit'>
> = {
  createMatch: {
    mode: 'createMatch',
    modalTitle: 'Crea una nuova partita'
  },
  addGuest: {
    mode: 'addGuest',
    modalTitle: 'Aggiungi Guest'
  },
  removeGuest: {
    mode: 'removeGuest',
    modalTitle: 'Rimuovi Guest'
  }
}
interface OpenModalProp {
  mode: ModalMode
  matchId: string
  handleSubmit: (obj: Record<string, any>) => void
}

export const openModal = (
  mode: ModalMode,
  matchId: string,
  handleSubmit: (obj: Record<string, any>) => void
): ModalInfo => {
  if (!mode) {
    return {
      show: false,
      mode: null,
      matchId: null,
      modalTitle: '',
      handleSubmit: null
    }
  }
  const config = modalConfig[mode]
  return {
    show: true,
    ...config,
    matchId,
    handleSubmit
  }
}
