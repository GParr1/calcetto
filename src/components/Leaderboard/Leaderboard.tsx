import React, { useEffect, useState } from 'react'
import CardBronze from 'components/FifaCard/CardBronze'
import { fetchAllUsers } from 'utils/authUtils'
import { CustomerInfo } from 'types/user';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from 'components/constantStyle';


const Leaderboard: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      const customersInfo = await fetchAllUsers(50)
      setCustomers(customersInfo || [])
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    )
  }
  const emptyCustomers = customers.length === 0
  if (emptyCustomers) {
    return (
      <div className="alert alert-info text-center mt-4">
        Nessun giocatore trovato.
      </div>
    )
  }

  const [first, second, third] = customers
  const wrapperRowConfig = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  }

  const rankingTextConfig = {
    width: '8%',
    textAlign: 'center',
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: "600",
  }

  const badgeContainerConfig = {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const nameTextConfig = {
    width: '42%',
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: "500",
  }

  const positionTextConfig = {
    width: '15%',
    textAlign: 'center',
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: "500",
    textTransform: 'uppercase',
  }

  const overallTextConfig = {
    width: '15%',
    textAlign: 'center',
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: "600",
  }

  return (
    <View>
      <View role={'region'}>
        {/* Header */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Ionicons name="trophy-sharp" size={48} color="#07F468"
                    style={{padding: 16}}/>
          <Text style={{ color:COLORS.primaryText, paddingHorizontal:16,
            fontSize: 28,
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>Classifica</Text>
          <Ionicons name="trophy-sharp" size={48} color="#07F468"
                    style={{padding: 16}}/>
        </View>
        <View  style={{flexDirection:'row', alignItems:'center'}}>
          {second && (
            <View>
              <CardBronze dynamicValue={second} scale={0.4} />
            </View>
          )}
          {first && (
            <View >
              <CardBronze dynamicValue={first} scale={0.5}/>
            </View>
          )}
          {third && (
            <View>
              <CardBronze dynamicValue={third} scale={0.3} />
            </View>
          )}
        </View>
      </View>
      {/* Classifica Completa */}
      <View role={'region'}>
        {/* Header */}
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={{ color:COLORS.primaryText, paddingHorizontal:16,
            fontSize: 28,
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>Classifica Completa</Text>
        </View>
        <View  style={{flexDirection:'column', alignItems:'center'}}>
          <View style={{...wrapperRowConfig}}>
            <Text style={{...rankingTextConfig}}>#</Text>
            <Text style={{...badgeContainerConfig}}></Text>
            <Text style={{...nameTextConfig}}>Nome</Text>
            <Text style={{...positionTextConfig}}>Pos</Text>
            <Text style={{...overallTextConfig}}>Overall</Text>
          </View>
          {customers.map((c, index) => (
            <View key={c.lastName} style={{...wrapperRowConfig}}>
              <Text style={{...rankingTextConfig}}>{index + 1}</Text>
              <View style={{...badgeContainerConfig}}>
              <CardBronze dynamicValue={c} scale={0.1}/>
            </View>
              <Text style={{...nameTextConfig}}>{c.firstName} {c.lastName}</Text>
              <Text style={{ ...positionTextConfig}}>{c.position}</Text>
              <Text style={{ ...overallTextConfig}}>{c.overall}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Leaderboard
