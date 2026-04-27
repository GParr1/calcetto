import { Match } from 'types/match';
import React, { FC, useState } from 'react';
import { findInArrByUid } from 'utils/utils';
import { Text } from 'react-native';
import { Container } from 'components/core/Container/Container'
import {
  BorderStyle,
  COLORS,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx
} from 'components/core/Container/enum'
import { Accordion } from 'components/core/Accordion/Accordion'
import {
  borderRadiusSizes,
  btnSecondaryDefault,
  ContainerProps,
  sizes,
  sizesPx,
  UITextProps
} from 'styles'
import OverlayBackdrop from 'components/Modal/OverlayBackdrop'
import MatchDetail from 'components/Matches/MatchDetail/MatchDetail'
import { Ionicons } from '@expo/vector-icons'
import MatchContent from 'components/Matches/MatchContent'
import { DetailOverlay, MatchCardProps } from 'components/Matches/types'
import { IoniconsNames } from 'components/core/Button/types'
import UserAction from 'components/Matches/MatchActions/UserAction'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'
import AdminAction from 'components/Matches/MatchActions/AdminAction'


const MatchCard: FC<MatchCardProps> = ({ match, uid }) => {
  const userAuth = useSelector(getUser)

  const { campo, data, tipo, players } = match
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

  const matchDate = new Date(data)
  const isPast = matchDate < new Date()
  const ioniconsDetailsConfig = {
    name: 'people-outline' as IoniconsNames,
    size: 20,
    color: '#fff'
  }
  const matchContentConfig = {
    campo,
    data,
    tipo,
    players
  }

  const userActionConfig = {
    match,
    isPast,
    playerExists: !!playerExists,
    userAuth
  }
  const adminActionConfig = {
    match,
    isPast,
    playerExists
  }
  console.log(match)

  const accordionContainerConfig = {
    flexDirection: FlexDirection.ROW,
    flexAlignItems: FlexAlignItems.CENTER,
    padding: SizesPx.S,
    borderRadius: 999,
    flexJustifyContent: FlexJustifyContent.CENTER,
    color: COLORS.PRIMARY_TEXT,
    textTransform: UITextProps.UPPERCASE,
    backgroundColor: COLORS.SECONDARY_COLOR,
    borderColor: COLORS.PRIMARY_COLOR,
    borderWidth: 1,
    flexGap: SizesPx.S,
    onPress: async () => openDetailOverlay(match, closeDetailOverlay)

  }
  return (
    <Container role={'listitem'} {...matchCardContainer}>
      <Text
        style={[
          {
            textAlign: 'center',
            color: COLORS.PRIMARY_TEXT,
            fontWeight: 'bold'
          }
        ]}
      >
        {playerExists ? 'Sei già iscritto' : 'Non sei ancora iscritto'}
      </Text>
      <MatchContent {...matchContentConfig} />
      <Container {...accordionContainerConfig}>
        <Ionicons {...ioniconsDetailsConfig} />
        <Text>FORMAZIONE</Text>
      </Container>
      
      <UserAction {...userActionConfig} />

      {/* 🟣 Overlay / dettaglio partita */}
      {detailOverlay.show && (
        <OverlayBackdrop {...overlayConfig}>
          <MatchDetail match={match} mode={5} />
        </OverlayBackdrop>
      )}
      <Accordion title="Admin Setting">
        <AdminAction {...adminActionConfig} />
      </Accordion>
    </Container>
  )
}

export default MatchCard