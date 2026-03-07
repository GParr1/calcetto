import React, { useState } from 'react'
import { getObjFromForm } from 'utils/utils'
import ModalForm from 'components/Modal/ModalForm'
import OverlayBackdrop from 'components/Modal/OverlayBackdrop'
import {
  handleCreateMatchUtils,
  handleDeleteMatchUtils,
  handleJoinGuestMatch,
  handleJoinMatch,
  handleRemoveGuestMatch,
  handleRemoveMatch,
} from 'utils/matchUtils'
import MatchSlider from 'components/Matches/MatchSlider'
import {User} from 'types/user'
import { Match} from 'types/match'
import { View } from 'react-native';


// ✅ Tipi per la modale dinamica
export type ModalMode = 'createMatch' | 'addGuest' | 'removeGuest' | null

interface ModalInfo {
  show: boolean
  mode: ModalMode
  matchId: string | null
  modalTitle: string | null
  handleSubmit: ((evt: React.FormEvent<HTMLFormElement>, obj: any) => void) | null
}

// ✅ Props del componente principale
interface MatchListProps {
  user: User
  matches: Match[]
  title: string
  showAddMatch?: boolean
}

const MatchList: React.FC<MatchListProps> = ({
                                               user,
                                               matches,
                                               title,
                                               showAddMatch = false,
                                             }) => {
  // Stato per gestire la modale
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    show: false,
    mode: null,
    matchId: null,
    modalTitle: null,
    handleSubmit: null,
  })

  // 🟢 Gestione azioni principali
  const handleJoin = async (matchId: string) => {
    await handleJoinMatch({ matches, matchId, user })
  }

  const handleRemove = async (matchId: string) => {
    await handleRemoveMatch({ matches, matchId, user })
  }

  // 🧍‍♂️ Guest: aggiunta
  const handleModalAddGuest = async (
    evt: React.FormEvent<HTMLFormElement>,
    obj: { matchId: string }
  ) => {
    evt.preventDefault()
    const { matchId } = obj
    const formData = new FormData(evt.currentTarget)
    const formObject = getObjFromForm({ formData })
    await handleJoinGuestMatch({ matches, matchId, formObject })
    closeModal()
  }

  // 🚫 Guest: rimozione
  const handleModalRemoveGuest = async (
    evt: React.FormEvent<HTMLFormElement>,
    obj: { matchId: string }
  ) => {
    evt.preventDefault()
    const { matchId } = obj
    const formData = new FormData(evt.currentTarget)
    const formObject = getObjFromForm({ formData })
    await handleRemoveGuestMatch({ matches, matchId, formObject })
    closeModal()
  }

  // ⚽ Creazione partita
  const handleCreateMatch = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    await handleCreateMatchUtils(evt)
    closeModal()
  }

  // 🗑️ Eliminazione partita
  const handleDeleteMatch = async (matchId: string) => {
    await handleDeleteMatchUtils({ matches, matchId })
  }

  // 🪟 Apertura modale dinamica
  const openModal = (mode: ModalMode, matchId: string | null) => {
    let options: Partial<ModalInfo> = {}

    switch (mode) {
      case 'createMatch':
        options = {
          mode,
          matchId: null,
          modalTitle: 'Crea una nuova partita',
          handleSubmit: handleCreateMatch,
        }
        break

      case 'addGuest':
        options = {
          mode,
          matchId,
          modalTitle: 'Aggiungi Guest',
          handleSubmit: handleModalAddGuest,
        }
        break

      case 'removeGuest':
        options = {
          mode,
          matchId,
          modalTitle: 'Rimuovi Guest',
          handleSubmit: handleModalRemoveGuest,
        }
        break

      default:
        options = {
          mode: null,
          matchId: null,
          modalTitle: null,
          handleSubmit: null,
        }
        break
    }

    setModalInfo({ show: true, ...options } as ModalInfo)
  }

  // ❌ Chiusura modale
  const closeModal = () => {
    setModalInfo({
      show: false,
      mode: null,
      matchId: null,
      modalTitle: null,
      handleSubmit: null,
    })
  }

  return (
    <View>
      <MatchSlider
        title={title}
        matches={matches}
        showAddMatch={showAddMatch}
        user={user}
        handleJoin={handleJoin}
        handleRemove={handleRemove}
        openModal={openModal}
        handleModalAddGuest={handleModalAddGuest}
        handleModalRemoveGuest={handleModalRemoveGuest}
        handleDeleteMatch={handleDeleteMatch}
      />


      {/* 🟡 Modale dinamica */}
      {modalInfo.show && (
        <ModalForm
          modalInfo={modalInfo}
          objSubmit={{ matchId: modalInfo.matchId }}
          closeModal={closeModal}
        />
      )}
    </View>
  )
}

export default MatchList
