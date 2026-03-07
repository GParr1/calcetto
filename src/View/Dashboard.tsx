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
      {/* Tutte le partite */}
      <View style={{flexDirection:'row', gap:16}}>
      {emptyMatch && <Text style={{ color:COLORS.primaryText}}> Nessuna Coppa vinta</Text>}
      {!emptyMatch && matches.map((m) =>{
        return(
          <View key={m.id} {...wrapperConfig}>
            <Text style={{
              color:COLORS.primaryColor,
              fontSize: 16,
              fontWeight: 'bold'
            }}>Partita calcio a {m.tipo}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{
                color:COLORS.primaryText,
                fontSize: 16,
              }}>Campo:</Text>
              <Text style={{
                color:COLORS.primaryText,
                fontSize: 16,
                fontWeight: 'bold'
              }}>{m.campo}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{
                color:COLORS.primaryText,
                fontSize: 16,
              }}>Data::</Text>
              <Text style={{
                color:COLORS.primaryText,
                fontSize: 16,
                fontWeight: 'bold'
              }}>{formatDateTime(m.data).date}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{
                color:COLORS.primaryText,
                fontSize: 16,
              }}>Ora::</Text>
              <Text style={{
                color:COLORS.primaryText,
                fontSize: 16,
                fontWeight: 'bold'
              }}>{formatDateTime(m.data).time}</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={{ color:COLORS.primaryText}}>{m.players?.length ?? 0} iscritti</Text>
            </View>
            <View style={{flexDirection:'row', gap:8, flexWrap: 'wrap'}}>
            {m.players?.map((p, i) => (
              <View style={{flexDirection:'row', alignItems: 'center', borderColor:'white', borderWidth:1, width:'31%', justifyContent:'space-between'}}>
                <Text style={{ textAlign: 'center',  color:COLORS.primaryText,padding:8}} key={`player-${i}`}>{p.name ?? JSON.stringify(p)}</Text>
                {isAdmin && <Ionicons
                  name="close"
                  size={16}
                  color={COLORS.primaryText}
                  onPress={() => {
                    console.log('Rimuovi', p.name);
                  }}
                />}
              </View>
            ))}
            </View>
          </View>
        )
      })}
    </View>
    </View>)
  // return (
  //   <>
  //     <div className="mt-5">
  //       <Leaderboard />
  //
  //       {/* Tutte le partite */}
  //       <div className="row">
  //         {matches && matches.length > 0 ? (
  //           matches.map((m) => (
  //             <div key={m.id} className="card mb-3 shadow-sm">
  //               <div className="card-body">
  //                 <h6>{m.campo}</h6>
  //                 <p>
  //                   {new Date(m.data).toLocaleString()} – Calcio a {m.tipo}
  //                 </p>
  //                 <p>{m.players?.length ?? 0} iscritti</p>
  //                 {m.players?.map((p, i) => (
  //                   <p key={`player-${i}`}>{p.name ?? JSON.stringify(p)}</p>
  //                 ))}
  //               </div>
  //             </div>
  //           ))
  //         ) : (
  //           <p className="text-center">Nessuna partita trovata.</p>
  //         )}
  //       </div>
  //     </div>
  //
  //     {/* Dati utente loggato */}
  //     {user && Object.keys(user).length > 0 && (
  //       <div className="mt-4">
  //         <h5>Dati utente:</h5>
  //         {Object.entries(user).map(([key, value]) => (
  //           <p key={key}>
  //             <strong>{key}:</strong>{' '}
  //             {typeof value === 'object' ? JSON.stringify(value) : String(value)}
  //           </p>
  //         ))}
  //       </div>
  //     )}
  //   </>
  // )
}


export default Dashboard
