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
import { Container } from 'components/core/Container/Container'
import { FlexDirection, SizesPx } from 'components/core/Container/enum'

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
const Dashboard: React.FC = () => {
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
      maxWidth: 322,
      minWidth: 322,
      backgroundColor: COLORS.secondaryBg,
      flexGap: 24,
      padding: 24,
      borderRadius: 8,
      borderColor: COLORS.primaryColor,
      shadowColor: 'rgba(7, 244, 104, 1)',
      shadowOpacity: 0.4,
      shadowRadius: 15,

  }
  const responsiveMainContainer = {
    flexDirection: FlexDirection.COLUMN,
    flexGap:SizesPx.XL,
    width: ['80vw']
  }
  const matchContainerConfig =  {
    flexDirection: FlexDirection.ROW,
flexGap: SizesPx.M
  }
  return (
    <Container {...responsiveMainContainer}>
      <Leaderboard />
      {/* Tutte le partite */}
      <Container {...matchContainerConfig}>
        {emptyMatch && (
          <Text style={{ color: COLORS.primaryText }}>
            {' '}
            Nessuna Partita creata
          </Text>
        )}
        {!emptyMatch &&
          matches.map((m) => {
            return (
              <Container key={m.id} {...wrapperConfig}>
                <Text
                  style={{
                    color: COLORS.primaryColor,
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}
                >
                  Partita calcio a {m.tipo}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primaryText,
                      fontSize: 16
                    }}
                  >
                    Campo:
                  </Text>
                  <Text
                    style={{
                      color: COLORS.primaryText,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    {m.campo}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primaryText,
                      fontSize: 16
                    }}
                  >
                    Data::
                  </Text>
                  <Text
                    style={{
                      color: COLORS.primaryText,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    {formatDateTime(m.data).date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primaryText,
                      fontSize: 16
                    }}
                  >
                    Ora::
                  </Text>
                  <Text
                    style={{
                      color: COLORS.primaryText,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    {formatDateTime(m.data).time}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: COLORS.primaryText }}>
                    {m.players?.length ?? 0} iscritti
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'column', gap: 8 }}
                >
                  {m.players?.map((p, i) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: 'white',
                        borderWidth: 1,
                        width: '31%',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: COLORS.primaryText,
                          padding: 8
                        }}
                        key={`player-${i}`}
                      >
                        {p.name ?? JSON.stringify(p)}
                      </Text>
                      {isAdmin && (
                        <Ionicons
                          name="close"
                          size={16}
                          color={COLORS.primaryText}
                          onPress={() => {
                            console.log('Rimuovi', p.name)
                          }}
                        />
                      )}
                    </View>
                  ))}
                </View>
              </Container>
            )
          })}
      </Container>
    </Container>
  )
}


export default Dashboard
