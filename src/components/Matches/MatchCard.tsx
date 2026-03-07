import { User } from 'types/user';
import { Match } from 'types/match';
import React, { FC } from 'react';
import { findInArrByUid } from 'utils/utils';
import { Image, Text, View } from 'react-native';
import { COLORS } from 'components/constantStyle';
import { Assets } from 'assets/assets';
import MatchActions from 'components/Matches/MatchActions';
import { ModalMode } from 'components/Matches/MatchList';

interface MatchCardProps {
  match: Match

  uid: string
  user: User
  handleJoin: (match: string) => void
  openModal: (mode: ModalMode, matchId: string | null) => void


}

const MatchCard : FC<MatchCardProps> = ( {match, uid, user, handleJoin, openModal}) => {
  const {campo, data, tipo, players} = match
  const playerExists = findInArrByUid(
    players,
    uid
  )
  const textStyleConfig = {
    style:{color: COLORS.primaryText}
  }
  const ContentCard: FC = () => (
    <View style={{gap:8}}>
      <Text {...textStyleConfig}>Campo: <b>{campo}</b></Text>
      <Text {...textStyleConfig}>Data: {new Date(data).toLocaleString()}</Text>
      <Text {...textStyleConfig}>Calcio a {tipo}</Text>
      <Text {...textStyleConfig}>
        <b>{players.length}</b> iscritti,
        {playerExists && <b> Sei già iscritto</b>}
        {!playerExists && <b> Non sei ancora iscritto</b>}
      </Text>
    </View>

  )
  return (
    <View role={'listitem'} style={{borderWidth:1, borderColor: COLORS.primaryColor, borderRadius: 24, padding:16}}>
      <View style={{alignItems:'center'}}>
        <Image source={Assets.CAMPO_CALCIO_BG} style={{ width: '100%', height: 120 }}/>
      </View>
      <ContentCard/>
      <MatchActions
        match={match}
        user={user}
        handleJoin={handleJoin}
        //handleRemove={handleRemove}
        //handleModalAddGuest={handleModalAddGuest}
        //handleModalRemoveGuest={handleModalRemoveGuest}
        //handleDeleteMatch={handleDeleteMatch}
        openModal={openModal}
      />
    </View>
  )
}

export default MatchCard