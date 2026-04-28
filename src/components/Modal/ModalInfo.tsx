import React, { FC } from 'react'
import { Container } from 'components/core/Container/Container'
import { COLORS, FlexAlignItems, FlexJustifyContent, SizesPx } from 'components/core/Container/enum'
import TitleModal from 'components/Modal/TitleModal'
import { Modal } from 'react-native'

interface ModalInfoProps {
  modalTitle?: string
  type?: 'success' | 'error' | string
  message?: string
  closeModal: () => void
}

export const ModalInfoComponent: FC<ModalInfoProps> = ({
  modalTitle,
  message,
  type = 'info',
  closeModal
}) => {
  const getModalStyle = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success bg-opacity-25',
          text: 'text-success',
          icon: 'bi-check2'
        }
      case 'error':
        return {
          bg: 'bg-danger bg-opacity-25',
          text: 'text-danger',
          icon: 'bi-x-lg'
        }
      default:
        return {
          bg: 'bg-primary bg-opacity-25',
          text: 'text-primary',
          icon: 'bi-info-circle'
        }
    }
  }
  const modalConf = {
    visible: true,
    transparent: true,
    onRequestClose: closeModal
  }
  const contentConf = {
    padding: SizesPx.XL,
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER
  }
  return (
    <Modal
      {...modalConf}
      animationType={'fade'}
      presentationStyle={'pageSheet'}
    >
      <Container {...contentConf}>
        <Container
          style={{
            padding: 20,
            borderRadius: 12,
            backgroundColor: COLORS.SECONDARY_BG,
            gap: 8,
            minWidth: '50%',
            boxShadow: `0px 0px 8px ${COLORS.PRIMARY_COLOR}`
          }}
        >
          {modalTitle && (
            <TitleModal modalTitle={modalTitle} closeModal={closeModal} />
          )}
          {message}
        </Container>
      </Container>
    </Modal>
  )
}


