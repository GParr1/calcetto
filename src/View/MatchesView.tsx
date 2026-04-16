import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MatchList from 'components/Matches/MatchList'
import { getMatches } from 'state/support/selectors'
import { getAllMatches, getMatchesByPlayerId } from 'utils/firestoreUtils'
import { Match } from 'types/match';
import { User } from 'types/user';
import { View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { Container } from 'components/core/Container/Container'
import { FlexDirection, SizesPx } from 'components/core/Container/enum'
import { sizesPx } from 'styles'

interface MatchesViewProps {
  user: User
}

const MatchesView: React.FC<MatchesViewProps> = ({ user }) => {
  const matches = useSelector(getMatches) as Match[] // 👈 forza il tipo
  const uid = user?.userLogin?.uid || ''

  useEffect(() => {
    const fetchMatches = async () => {
      await getAllMatches()
    }
    fetchMatches()
  }, [])

  const matchesByPlayerId = getMatchesByPlayerId(matches, uid) as Match[]
  const responsiveMainContainer = {
    width:"95vw",
    flexDirection: FlexDirection.COLUMN,
    flexGap: SizesPx.XL,
  }

  const matchListConfig = {
    user,
    matches: matches ?? [],
    title: `Partite Disponibili (${matches?.length ?? 0})`,
    showAddMatch: true
  }

  const matchListByPayerConfig = {
    user,
    matches: matchesByPlayerId ?? [],
    title: 'Le tue partite',
    showAddMatch: true
  }
  return (
    <Container {...responsiveMainContainer}>
      <MatchList {...matchListConfig} />
      <MatchList {...matchListByPayerConfig} />
    </Container>
  )
}

export default MatchesView
