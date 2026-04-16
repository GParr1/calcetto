import { Match } from 'types/match';
import React, { FC, useState } from 'react';
import { findInArrByUid } from 'utils/utils';
import { Text } from 'react-native';
import MatchActions from 'components/Matches/MatchActions';
import { Container } from 'components/core/Container/Container'
import { BorderStyle, COLORS, SizesPx } from 'components/core/Container/enum'
import { Accordion } from 'components/core/Accordion/Accordion'
import {  IoniconsNames } from 'components/core/Button'
import { btnSecondaryDefault, UITextProps } from 'styles'
import OverlayBackdrop from 'components/Modal/OverlayBackdrop'
import MatchDetail from 'components/Matches/MatchDetail/MatchDetail'
import { Ionicons } from '@expo/vector-icons'
import MatchContent from 'components/Matches/MatchContent'
import { DetailOverlay, MatchCardProps } from 'components/Matches/types'


const MatchCard : FC<MatchCardProps> = ( {match, uid, user, openModal}) => {
  const {campo, data, tipo, players} = match
  const playerExists = findInArrByUid(players ?? [], uid)
  const [detailOverlay, setDetailOverlay] = useState<DetailOverlay>({
    show: false,
    match: null,
    closeDetailOverlay: null
  })
  const openDetailOverlay = (match: Match, closeDetailOverlay: () => void) => {
    setDetailOverlay({ show: true, match, closeDetailOverlay })
  }
  const closeDetailOverlay = () => {
    setDetailOverlay({ show: false, match: null, closeDetailOverlay: null })
  }
  const matchCardContainer = {
    backgroundColor: COLORS.PRIMARY_BG,
    border: BorderStyle.SOLID,
    borderColor: COLORS.PRIMARY_COLOR,
    borderSize: 1,
    borderRadius: SizesPx.XL,
    padding: SizesPx.L,
    flexGap: SizesPx.L
  }

  const overlayConfig = {
    visible: detailOverlay.show,
    closeOverlay: () =>
      setDetailOverlay({ show: false, match: null, closeDetailOverlay: null })
  }

  const ioniconsDetailsConfig = {
    name: 'people-outline' as IoniconsNames,
    size: 20,
    color: '#fff'
  }
    const matchContentConfig= {
      campo,
      data,
      tipo,players
    }
  return (
    <Container role={'listitem'} {...matchCardContainer}>
      <Text
        style={[
          { textAlign: 'center', color: COLORS.PRIMARY_TEXT, fontWeight: 'bold' }
        ]}
      >
        {playerExists ? 'Sei già iscritto' : 'Non sei ancora iscritto'}
      </Text>
      <MatchContent {...matchContentConfig} />
      <Container
        onPress={async () => openDetailOverlay(match, closeDetailOverlay)}
        style={{
          ...btnSecondaryDefault,
          width: 'auto',
          textTransform: 'capitalize',
          fontWeight: '400',
          gap: 8
        }}
      >
        <Ionicons {...ioniconsDetailsConfig} />
        <Text>Formazione</Text>
      </Container>
      {/* 🟣 Overlay / dettaglio partita */}
      {detailOverlay.show && (
        <OverlayBackdrop {...overlayConfig}>
          <MatchDetail match={match} mode={5} />
        </OverlayBackdrop>
      )}
      <Accordion title="Dettagli partita">
        <MatchActions
          match={match}
          user={user}
          //handleModalAddGuest={handleModalAddGuest}
          //handleModalRemoveGuest={handleModalRemoveGuest}
          //handleDeleteMatch={handleDeleteMatch}
          openModal={openModal}
        />
      </Accordion>
    </Container>
  )
}

export default MatchCard