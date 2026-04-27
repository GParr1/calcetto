import React, { FC, useState } from 'react'
import {
  COLORS,
  FlexDirection,
  FlexJustifyContent,
  SizesPx
} from 'components/core/Container/enum'
import { Container } from 'components/core/Container/Container'
import Button from 'components/core/Button/Button'
import { Text, TextInput } from 'react-native'
import { btnSecondaryDefault, UITextProps } from 'styles'
import { checkMaxPlayersMatch, handleDeleteMatchUtils, handleJoinGuestMatch, handleSaveResult } from 'utils/matchUtils'
import { AdminActionProps } from './types'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'
import { useSelector } from 'react-redux'
import { getMatches } from 'state/support/selectors'
import { Match } from 'types/match'
import PlayerModal from 'components/Modal/PlayerModal'
import ModalForm from 'components/Modal/ModalForm'
import { openModal } from 'components/Matches/utils'
import { Player } from 'types/player'
import { ModalInfo } from 'types/molal'
import { useResponsiveValue } from 'components/core/utils'
import OverlayBackdrop from 'components/Modal/OverlayBackdrop'
import { TableRow } from 'components/core/Table/TableRow'
import { Table } from 'components/core/Table/Table'

const AdminAction: FC<AdminActionProps> = (props) => {
  const matches = useSelector(getMatches) as Match[] // 👈 forza il tipo
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalResultVisible, setModalResultVisible] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    show: false,
    mode: null,
    matchId: null,
    modalTitle: null,
    handleSubmit: null
  })
  const { match, isPast, playerExists } = props
  const { players } = match

  const [goalsA, setGoalsA] = useState<Record<string, number>>({})
  const [goalsB, setGoalsB] = useState<Record<string, number>>({})
  const isMaxPlayers = checkMaxPlayersMatch(match)

  const handleSubmitResult = async () => {
    if (!goalsA?.goal || !goalsB?.goal) {
      return alert('Inserisci entrambi i gol')
    }
    const { goal: goalA, ...restA } = goalsA
    const { goal: goalB, ...restB } = goalsB
    const result = {
      goalsA: Number(goalA),
      goalsB: Number(goalB),
      ...restA,
      ...restB,
      status: 'closed'
    }
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
        console.log('pippo')
        await handleDeleteMatchUtils(matches, match.id)
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
      onPress: async () => await handleSubmitResult(),
      accessibilityLabel: 'Remove Match',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    label: 'Salva '
  } as ButtonProps
  const btnResultConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () => setModalResultVisible(true),
      accessibilityLabel: 'Remove Match',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    label: 'Inserisci il risultato '
  } as ButtonProps
  const containerConfig = {
    flexDirection: useResponsiveValue({
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    }),
    flexJustifyContent:FlexJustifyContent.CENTER,
    flexGap: SizesPx.S
  }
  const overlayConfig = {
    visible: modalResultVisible,
    closeOverlay: () => setModalResultVisible(false)
  }
  return (
    <Container flexGap={SizesPx.L}>
      <Container {...containerConfig}>
        {isMaxPlayers && <Button {...btnAddGuestMatchConfig} />}
        <Button {...btnRemoveGuestMatchConfig} />
      </Container>
      <Container {...containerConfig}>
        <Button {...btnResultConfig} />
        <Button {...btnRemoveMatchConfig} />
      </Container>
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

      <OverlayBackdrop {...overlayConfig}>
        <Container>
          <Container {...containerConfig}>
            <Table containerStyle={{ flex: 1 }}>
              <TableRow
                key={'goalsA'}
                label={'Gol Squadra A'}
                containerStyle={{
                  style: {
                    borderBottomWidth: 1,
                    borderColor: COLORS.PRIMARY_TEXT
                  }
                }}
                value={[
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Gol Squadra A"
                    value={goalsA.goal}
                    onChangeText={(t) =>
                      setGoalsA((prev) => ({
                        ...prev,
                        goal: t
                      }))
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 16
                    }}
                  />
                ]}
              />
              {match?.teamBalance?.teamA?.map((ta) => {
                return (
                  <>
                    <TableRow
                      key={ta.id}
                      label={ta.name}
                      value={[
                        <TextInput
                          keyboardType="numeric"
                          placeholder={`Gol ${ta.name}  `}
                          value={goalsA[ta.id]}
                          onChangeText={(t) =>
                            setGoalsA((prev) => ({
                              ...prev,
                              [ta.id]: t
                            }))
                          }
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16
                          }}
                        />
                      ]}
                    />
                  </>
                )
              })}
            </Table>
            <Table containerStyle={{ flex: 1 }}>
              <TableRow
                key={'goalsB'}
                label={'Gol Squadra B'}
                containerStyle={{
                  style: {
                    borderBottomWidth: 1,
                    borderColor: COLORS.PRIMARY_TEXT
                  }
                }}
                value={[
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Gol Squadra B"
                    value={goalsB.goal}
                    onChangeText={(t) =>
                      setGoalsB((prev) => ({
                        ...prev,
                        goal: t
                      }))
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 16
                    }}
                  />
                ]}
              />
              {match?.teamBalance?.teamB?.map((tb) => {
                return (
                  <TableRow
                    key={tb.id}
                    label={tb.name}
                    value={
                      <TextInput
                        keyboardType="numeric"
                        placeholder={`Gol ${tb.name}`}
                        value={goalsB[tb.id]}
                        onChangeText={(t) =>
                          setGoalsB((prev) => ({
                            ...prev,
                            [tb.id]: t
                          }))
                        }
                        style={{
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 8,
                          padding: 12,
                          fontSize: 16
                        }}
                      />
                    }
                  />
                )
              })}
            </Table>
          </Container>
          <Button {...btnSaveResultConfig} />
        </Container>
      </OverlayBackdrop>
    </Container>
  )
}

export default AdminAction