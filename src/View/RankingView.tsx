import React, { useEffect } from 'react'
import { getAllMatches } from 'utils/firestoreUtils'
import { useSelector } from 'react-redux'
import { getMatches } from 'state/support/selectors'
import { getUser } from 'state/auth/selectors'
import Leaderboard from 'components/Leaderboard/Leaderboard'
import { Match } from 'types/match';
import { User } from 'types/user';
import { Text, View } from 'react-native';
import { COLORS } from 'components/constantStyle';
import { useResponsiveStyle } from 'styles/styles.utils';
import { formatDateTime } from 'utils/utils';
import { Ionicons } from '@expo/vector-icons';

/**
 * Tipi base per Match e Player
 * Adatta questi tipi alla struttura effettiva del tuo database Firestore.
 */
interface Player {
  id?: string
  name?: string
    [key: string]: any
}

/**
 * Dashboard
 * Mostra la classifica (Leaderboard) e la lista delle partite
 * recuperate da Firestore, insieme ai dati dell’utente loggato.
 */
const RankingView: React.FC = () => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const matches: Match[] = useSelector(getMatches)

  const user: User = useSelector(getUser)
  const { customerInfo } = user
  const isAdmin = customerInfo?.isAdmin
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        await getAllMatches()
      } catch (error) {
        console.error('Errore durante il caricamento delle partite:', error)
      }
    }
    fetchMatches()
  }, [])

  const emptyMatch = matches.length === 0
  const wrapperConfig = {
    style: getResponsiveStyle({
      backgroundColor: [COLORS.secondaryBg],
      gap: [24],
      paddingVertical: [24],
      borderRadius: [8],
      borderColor: [COLORS.primaryColor],
      paddingHorizontal: [16],
      shadowColor: ['rgba(7, 244, 104, 1)'],
      shadowOpacity: [0.4],
      shadowRadius: [15],
    })
  }
  const responsiveMainContainer = getResponsiveStyle({
    flexDirection: ['column','column','column'],
    gap:[24],
    width: ['80vw']
  })
  return (
    <View style={{ ...responsiveMainContainer }}>
      <Leaderboard />
    </View>)

}


export default RankingView
