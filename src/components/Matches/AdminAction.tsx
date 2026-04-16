import React, { FC, useState } from 'react'
import { COLORS, FlexDirection, SizesPx } from 'components/core/Container/enum'
import { Container } from 'components/core/Container/Container'
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button'
import { Text, TextInput } from 'react-native'
import { btnSecondaryDefault, UITextProps } from 'styles'
import { checkMaxPlayersMatch, handleSaveResult } from 'utils/matchUtils'
import { AdminActionProps } from './types'

const AdminAction: FC<AdminActionProps> = (props) => {
  const [goalsA, setGoalsA] = useState<string>('')
  const [goalsB, setGoalsB] = useState<string>('')

  const { match, isPast, playerExists, openModal } = props
  const isMaxPlayers = checkMaxPlayersMatch(match)
  const handleSubmitResult = async () => {
    if (goalsA === '' || goalsB === '') return alert('Inserisci entrambi i gol')
    const result = { goalsA: Number(goalsA), goalsB: Number(goalsB) }
    await handleSaveResult(match, result)
  }


  const btnAddGuestMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => openModal('addGuest', match.id),
      disabled: isMaxPlayers,
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
      //"add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'add-circle-sharp' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Add Guest'
  } as ButtonProps

  const btnRemoveGuestMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => openModal('removeGuest', match.id),
      disabled: !playerExists,
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
      //| "bag-remove" | "bag-remove-outline" | "bag-remove-sharp" | "bag-sharp"
      // "add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'person-remove-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Elimina Guest'
  } as ButtonProps
  const btnRemoveMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => console.log('handleDeleteMatch(id)'),
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
    ioniconsConfig: {
      //| "bag-remove" | "bag-remove-outline" | "bag-remove-sharp" | "bag-sharp"
      // "add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
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
        <Button {...btnAddGuestMatchConfig} />
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
    </Container>
  )
}

export default AdminAction