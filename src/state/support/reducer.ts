import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteErrorAndSetState } from 'state/stateUtils'
import { Match, ModalInfo } from 'src/types'

interface SupportState {
  matches: Match[]
  modal: ModalInfo[]
  error?: string
}

const initialState: SupportState = {
  matches: [],
  modal: []
}

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) =>
      deleteErrorAndSetState<SupportState, 'matches'>('matches')(state, action),

    setModal: (state, action: PayloadAction<ModalInfo[]>) =>
      deleteErrorAndSetState<SupportState, 'modal'>('modal')(state, action)
  }
})

export const { setMatches, setModal } = supportSlice.actions

export default supportSlice.reducer
