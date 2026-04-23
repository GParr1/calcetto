import React, { FC, useState } from 'react'
import { COLORS, FlexDirection, SizesPx } from 'components/core/Container/enum'
import { Container } from 'components/core/Container/Container'
import Button from 'components/core/Button/Button'
import { Text, TextInput } from 'react-native'
import { btnSecondaryDefault, UITextProps } from 'styles'
import {
  checkMaxPlayersMatch,
  handleCreateMatchUtils,
  handleDeleteMatchUtils,
  handleJoinGuestMatch,
  handleSaveResult
} from 'utils/matchUtils'
import { AdminActionProps } from './types'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'
import { useSelector } from 'react-redux'
import { getMatches } from 'state/support/selectors'
import { Match } from 'types/match'
import PlayerModal from 'components/Modal/PlayerModal'
import ModalForm from 'components/Modal/ModalForm'
import { openModal } from 'components/Matches/utils'
import {  Player } from 'types/player'
import { ModalInfo } from 'types/molal'

const AdminAction: FC<AdminActionProps> = (props) => {
  const matches = useSelector(getMatches) as Match[] // 👈 forza il tipo
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    show: false,
    mode: null,
    matchId: null,
    modalTitle: null,
    handleSubmit: null
  })
  const { match, isPast, playerExists } = props
  const {players} = match

  const [goalsA, setGoalsA] = useState<string>('')
  const [goalsB, setGoalsB] = useState<string>('')
  const isMaxPlayers = checkMaxPlayersMatch(match)

  const handleSubmitResult = async () => {
    if (goalsA === '' || goalsB === '') return alert('Inserisci entrambi i gol')
    const result = { goalsA: Number(goalsA), goalsB: Number(goalsB) }
    await handleSaveResult(match, result)
  }

  const handleModalAddGuest = async (obj: Record<string, any>) => {
    const { matchId, guestName, guestOverall } = obj
    const player = {
      name: guestName,
      overall: parseInt(guestOverall, 10)
    } as Player
    await handleJoinGuestMatch(matches, matchId, player)
    closeModal()
  }

  const closeModal = () => {
    setModalInfo({
      show: false,
      mode: null,
      matchId: null,
      modalTitle: null,
      handleSubmit: null
    })
  }


  const btnAddGuestMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () =>
        setModalInfo(openModal('addGuest', match.id, handleModalAddGuest)),
      disabled: !isMaxPlayers,
      accessibilityLabel: 'Add Guest',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'add-circle-sharp' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Add Guest'
  } as ButtonProps

  const btnRemoveGuestMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () => setModalVisible(!modalVisible),
      accessibilityLabel: 'Remove Guest',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'person-remove-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Elimina Guest'
  } as ButtonProps
  const btnRemoveMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => {
        console.log("pippo")
        await handleDeleteMatchUtils(matches,match.id)
      },
      accessibilityLabel: 'Remove Match',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'ban-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Elimina Partita'
  } as ButtonProps

  const btnSaveResultConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => handleSubmitResult,
      disabled: !playerExists,
      accessibilityLabel: 'Remove Match',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    label: 'Salva'
  } as ButtonProps
  const containerConfig = {
    flexDirection: FlexDirection.ROW,
    flexGap: SizesPx.S
  }
  return (
    <Container>
      <Container {...containerConfig}>
        {isMaxPlayers && <Button {...btnAddGuestMatchConfig} />}
        <Button {...btnRemoveGuestMatchConfig} />
        <Button {...btnRemoveMatchConfig} />
      </Container>
      {isPast && (
        <Container>
          <Text
            style={{ color: COLORS.PRIMARY_TEXT }}
            children={'Inserisci Risultato'}
          />
          <Container {...containerConfig}>
            <TextInput
              keyboardType="numeric"
              placeholder="Gol Squadra A"
              value={goalsA}
              onChangeText={setGoalsA}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 12,
                fontSize: 16
              }}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Gol Squadra A"
              value={goalsB}
              onChangeText={setGoalsB}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 12,
                fontSize: 16
              }}
            />
          </Container>
          <Button {...btnSaveResultConfig} />
        </Container>
      )}
      {modalVisible && (
        <PlayerModal
          players={players ?? []}
          closeModal={() => setModalVisible(!modalVisible)}
          modalTitle={'Rimuovi giocatori'}
          matchId={match.id}
        />
      )}
      {/* 🟡 Modale dinamica */}
      {modalInfo.show && (
        <ModalForm
          modalInfo={modalInfo}
          objSubmit={{ matchId: modalInfo.matchId }}
          closeModal={closeModal}
        />
      )}
    </Container>
  )
}

export default AdminAction