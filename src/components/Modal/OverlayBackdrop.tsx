import React, { FC } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Container } from 'components/core/Container/Container'
import {
  COLORS,
  FlexJustifyContent,
  SizesPx,
  SizeUnits
} from 'components/core/Container/enum'

interface OverlayBackdropProps {
  visible: boolean
  closeOverlay: () => void
  children: React.ReactNode
}
const OverlayBackdrop: FC<OverlayBackdropProps> = ({
  visible,
  closeOverlay,
  children
}) => {
  const modalConf = {
    visible,
    transparent: true,
    presentationStyle: 'overFullScreen',
    animationType: 'fade',
    onRequestClose: closeOverlay
  }
  const contentConf = {
    width: SizeUnits.FULL,
    height: SizeUnits.FULL,
    overflow: 'hidden',
    padding: SizesPx.XL,
    backgroundColor: COLORS.SECONDARY_BG
  }
  return (
    <Modal {...modalConf}>
      {/* Content */}
      <Container {...contentConf}>
        {/* Close button */}
        <Pressable
          onPress={closeOverlay}
          style={{ alignSelf: 'flex-end', marginBottom: 10 }}
        >
          <Ionicons name="close" size={24} color={COLORS.PRIMARY_TEXT} />
        </Pressable>
        {children}
      </Container>
    </Modal>
  )
}

export default OverlayBackdrop