import React from 'react'
import GeneralForm from 'components/Form/GeneralForm'
import { Modal } from 'react-native'
import { Container } from 'components/core/Container/Container'
import {
  COLORS,
  FlexAlignItems,
  FlexJustifyContent,
  SizesPx, SizeUnits,
} from 'components/core/Container/enum'
import TitleModal from 'components/Modal/TitleModal'
import { FromType } from 'structure/formUser'
import { FormId } from 'components/Form/types'
import { ModalInfo } from 'types/molal'

interface ModalFormProps {
  modalInfo: ModalInfo
  objSubmit?: Record<string, any>
  closeModal: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({
  modalInfo,
  objSubmit = {},
  closeModal
}) => {
  const { modalTitle, mode, handleSubmit } = modalInfo
  const modalConf = {
    visible: true,
    transparent: true,
    onRequestClose: closeModal
  }
  const contentConf = {
    padding: SizesPx.XL,
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
  }
  if(!mode){
    return null
  }
  return (
    <>
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
              minWidth: "50%",
              boxShadow: `0px 0px 8px ${COLORS.PRIMARY_COLOR}`
            }}
          >
            {modalTitle && <TitleModal modalTitle={modalTitle} closeModal={closeModal} />}
            <GeneralForm
              formData={FromType[mode]}
              handleSubmit={handleSubmit}
              obj={objSubmit}
            />
          </Container>
        </Container>
      </Modal>
    </>
  )
}

export default ModalForm