import React, { FC } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet, View,
} from 'react-native';
import MatchDetail from 'components/Matches/MatchDetail'
import { Ionicons } from '@expo/vector-icons'
import { Match } from 'types/match';

interface OverlayBackdropProps {
  match: Match
  visible: boolean
  closeOverlay: () => void
}
const OverlayBackdrop: FC<OverlayBackdropProps>  = ({ visible, closeOverlay, match }) => {
  return (
    <Modal
      visible={visible}
      transparent
      presentationStyle={'overFullScreen'}
      animationType="fade"
      onRequestClose={closeOverlay} // Android back button
    >

        {/* Content */}
        <View
          style={styles.content}
        >
          {/* Close button */}
          <Pressable
            onPress={closeOverlay}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#000" />
          </Pressable>

          <MatchDetail match={match} />
        </View>
    </Modal>
  )
}

export default OverlayBackdrop

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  content: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10
  }
})