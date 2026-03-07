import { store } from 'state/store'
import { setMatches, setModal } from 'state/support/reducer';
import { Match, ModalInfo } from 'src/types'

export const doSetMatches = async (value: Match[]): Promise<void> => {
  store.dispatch(setMatches(value))
}
export const doSetModal = async (value: ModalInfo[]): Promise<void> => {
  store.dispatch(setModal(value))
}
