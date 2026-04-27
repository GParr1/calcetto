import React, { FC } from 'react'
import { UserActionProps } from 'components/Matches/MatchActions/types'
import { Container } from 'components/core/Container/Container'
import Button from 'components/core/Button/Button'
import { handleJoinMatch, handleRemoveMatch } from 'utils/matchUtils'
import { btnSecondaryDefault, UITextProps } from 'styles'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'

const UserAction: FC<UserActionProps> = (props) => {
  const { isPast, playerExists, match, userAuth } = props
  const btnAddMeMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () => handleJoinMatch(match, userAuth),
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
        await handleRemoveMatch(userAuth.user?.uid ?? '', match)
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
    label: 'Elimina'
  } as ButtonProps

  return (
    <Container>
      {!isPast && !playerExists && <Button {...btnAddMeMatchConfig} />}
      {!isPast && playerExists && <Button {...btnRemoveMeMatchConfig} />}
    </Container>
  )
}
export default UserAction