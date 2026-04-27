import React, { FC, useState } from 'react'
import { Container } from 'components/core/Container/Container'
import Button from 'components/core/Button/Button'
import ModalForm from 'components/Modal/ModalForm'
import { handleCreateMatchUtils } from 'utils/matchUtils'
import { ButtonType } from 'components/core/Button/enum'
import { btnSecondaryDefault, UITextProps } from 'styles'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'

const MatchCreate: FC = () => {
  const [showCrateMatchModal, setShowCrateMatchModal] = useState<boolean>(false)
  const btnAddMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => setShowCrateMatchModal(true),
      accessibilityLabel: 'Crea Match',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'create' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Crea una nuova partita'
  } as ButtonProps
  return (
    <Container>
      <Button {...btnAddMatchConfig} />
      {showCrateMatchModal && (
        <ModalForm
          modalInfo={{
            show: showCrateMatchModal,
            mode: 'createMatch',
            modalTitle: 'Crea una nuova partita',
            handleSubmit: handleCreateMatchUtils
          }}
          closeModal={() => setShowCrateMatchModal(false)}
        />
      )}
    </Container>
  )
}

export default MatchCreate
