import React, { useState } from 'react'
import { getObjFromForm } from 'utils/utils'
import ModalForm from 'components/Modal/ModalForm'
import {
  handleCreateMatchUtils,
  handleDeleteMatchUtils,
  handleJoinGuestMatch,
  handleRemoveGuestMatch,
  handleRemoveMatch,
} from 'utils/matchUtils'
import MatchSlider from 'components/Matches/MatchSlider'
import { MatchListProps, ModalInfo, ModalMode } from 'components/Matches/types'
import { Match, Player } from 'types'




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

  const handleRemove = async (match: Match) => {
    await handleRemoveMatch( user.userLogin?.uid ?? '', match )
  }

  // 🧍‍♂️ Guest: aggiunta
  const handleModalAddGuest = async (
    obj: Record<string, any>
  ) => {
    const { matchId, player } = obj

    await handleJoinGuestMatch(matches, matchId, player)
    closeModal()
  }

  // 🚫 Guest: rimozione
  const handleModalRemoveGuest = async (obj: Record<string, any>) => {
    const { matchId, player } = obj
    await handleRemoveGuestMatch(matches, matchId, player)
    closeModal()
  }

  // ⚽ Creazione partita
  const handleCreateMatch = async (obj: Record<string, any>) => {
    await handleCreateMatchUtils(obj)
    closeModal()
  }

  // 🗑️ Eliminazione partita
  const handleDeleteMatch = async (matchId: string) => {
    await handleDeleteMatchUtils( matches, matchId )
  }

  // 🪟 Apertura modale dinamica
  const openModal = (mode: ModalMode, matchId?: string ) => {
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
    <>
      <MatchSlider
        title={title}
        matches={matches}
        showAddMatch={showAddMatch}
        user={user}
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
    </>
  )
}

export default MatchList
