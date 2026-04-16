import React, { FC } from 'react'
import { findInArrByUid } from 'utils/utils'
import {
  handleJoinMatch,
  handleRemoveMatch,
} from 'utils/matchUtils'
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button';
import { btnSecondaryDefault, UITextProps } from 'styles';
import { Container } from 'components/core/Container/Container'
import { SizesPx } from 'components/core/Container/enum'
import AdminAction from 'components/Matches/AdminAction'
import { MatchActionsProps } from 'components/Matches/types'


const MatchActions: FC<MatchActionsProps> = ({
  match,
  user,
  openModal
}) => {

  const { customerInfo } = user
  const { id, players, data } = match
  const playerExists = findInArrByUid(players ?? [], user.userLogin?.uid ?? '')

  // Controlla se la partita è nel passato
  const matchDate = new Date(data)
  const isPast = matchDate.toLocaleString() < new Date().toLocaleString()

  const btnAddMeMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => await handleJoinMatch(match, user),
      accessibilityLabel: 'Add me',
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
    label: 'Iscriviti'
  } as ButtonProps

  const btnRemoveMeMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => {
        await handleRemoveMatch(user.userLogin?.uid ?? '', match)
      },
      disabled: !playerExists,
      accessibilityLabel: 'Remove Me',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'close-circle-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Eliminami'
  } as ButtonProps

  const mainContainerConfig = {
    flexGap: SizesPx.S
  }
  const adminActionConfig = {
    match,
    isPast,
    playerExists,
    openModal
  }

  return (
    <>
      <Container {...mainContainerConfig}>
        {/* Pulsanti iscrizione */}
        {!isPast && !playerExists && <Button {...btnAddMeMatchConfig} />}
        {!isPast && playerExists && <Button {...btnRemoveMeMatchConfig} />}
        {/*Admin Controls*/}
        {
          /*{customerInfo?.isAdmin  &&*/
          <AdminAction {...adminActionConfig} />
        }
      </Container>
    </>
  )
}

export default MatchActions
