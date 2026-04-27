import React, { FC } from 'react'
import { Container } from 'components/core/Container/Container'
import {
  COLORS,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent
} from 'components/core/Container/enum'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface TitleModalProps {
  modalTitle: string
  closeModal: () => void
}
const TitleModal: FC<TitleModalProps> = ({ modalTitle, closeModal }) => {
  const containerConfig = {
    flexDirection: FlexDirection.ROW,
    flexAlignItems: FlexAlignItems.CENTER,
    flexJustifyContent: FlexJustifyContent.SPACE_BETWEEN,
  }
  return (
    <Container
      {...containerConfig}
      style={{
        borderBottomWidth: 1,
        borderColor: COLORS.PRIMARY_TEXT
      }}
    >
      {modalTitle.toUpperCase()}

      {/* Chiudi Modal */}
      <Pressable onPress={() => closeModal()}>
        <Ionicons name="close" size={22} color={COLORS.PRIMARY_TEXT} />
      </Pressable>
    </Container>
  )
}
export default TitleModal