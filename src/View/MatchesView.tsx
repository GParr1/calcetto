import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MatchList from 'components/Matches/MatchList'
import { getMatches } from 'state/support/selectors'
import { getAllMatches, getMatchesByPlayerId } from 'utils/firestoreUtils'
import { Match } from 'types/match';
import { User } from 'types/user';
import { View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';

interface MatchesViewProps {
  user: User
}

const MatchesView: React.FC<MatchesViewProps> = ({ user }) => {
  const matches = useSelector(getMatches) as Match[] // 👈 forza il tipo
  const uid = user?.userLogin?.uid || ''
  const { getResponsiveStyle } = useResponsiveStyle();

  useEffect(() => {
    const fetchMatches = async () => {
      await getAllMatches()
    }
    fetchMatches()
  }, [])

  const matchesByPlayerId = getMatchesByPlayerId(matches, uid) as Match[]
  const responsiveMainContainer = getResponsiveStyle({
    flexDirection: ['column','column','column'],
    gap:[24],
    width: ['80vw']
  })
  return (
    <View style={{ ...responsiveMainContainer }}>
      <MatchList
        user={user}
        matches={matches || []}
        title={`Partite Disponibili (${matches?.length ?? 0})`}
        showAddMatch
      />
      <MatchList
        user={user}
        matches={matchesByPlayerId || []}
        title="Le tue partite"
      />
    </View>
  )
}

export default MatchesView
