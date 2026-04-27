import React from 'react'
import { COLORS, FlexAlignItems, FlexDirection, FlexJustifyContent, SizesPx } from 'components/core/Container/enum'
import { Modal, Pressable } from 'react-native'
import { Container } from 'components/core/Container/Container'
import TitleModal from 'components/Modal/TitleModal'
import { Ionicons } from '@expo/vector-icons'
import {  Player } from 'types/player'
import { Match } from 'types/match'
import { handleRemoveGuestMatch } from 'utils/matchUtils'
import { useSelector } from 'react-redux'
import { getMatches } from 'state/support/selectors'

interface MatchResultModalProps {
  matchId: string
  modalTitle?: string
  closeModal: () => void
  players: Player[]
}
const MatchResultModal: React.FC<MatchResultModalProps> = ({
  matchId,
  modalTitle,
  closeModal,
  players
}) => {
  const matches = useSelector(getMatches) as Match[] // 👈 forza il tipo

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

  const deletePlayer = async (player: Player) => {
    await handleRemoveGuestMatch(matches, matchId, player)
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
              boxShadow: `0px 0px 8px ${COLORS.PRIMARY_COLOR}`
            }}
          >
            {modalTitle && (
              <TitleModal modalTitle={modalTitle} closeModal={closeModal} />
            )}
            Lista players
            {players.map((p: Player) => {
              const containerConfig = {
                flexDirection: FlexDirection.ROW,
                flexAlignItems: FlexAlignItems.CENTER,
                flexJustifyContent: FlexJustifyContent.SPACE_BETWEEN
              }
              return (
                <Container {...containerConfig}>
                  {p?.name?.toUpperCase() ?? p?.firstName?.toUpperCase() ?? ''}

                  {/* Chiudi Modal */}
                  <Pressable onPress={async () => await deletePlayer(p)}>
                    <Ionicons
                      name="close"
                      size={22}
                      color={COLORS.PRIMARY_TEXT}
                    />
                  </Pressable>
                </Container>
              )
            })}
          </Container>
        </Container>
      </Modal>
    </>
  )
}

export default MatchResultModal