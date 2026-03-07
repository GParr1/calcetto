import React, { FC, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView, DimensionValue,
} from 'react-native';

import { analyzeMatch, balanceTeams } from 'utils/utils';
import { Animated } from 'react-native'
import CardBronze from 'components/FifaCard/CardBronze'
import { Match } from 'types/match';
import { Player } from 'types/player';

const { width } = Dimensions.get('window')

interface MatchDetailProps {
  match: Match
  mode: 5 | 8
}
const MatchDetail: FC<MatchDetailProps>  = ({ match, mode = 5 }) => {
  const { teamBalance } = match
  //const teamA = teamBalance.teamA ?? null
  //const teamB = teamBalance.teamB ?? null
  const { teamA, teamB } = balanceTeams(match.players)
  const prediction = analyzeMatch(teamA, teamB)

  const formations = {
    5: [
      { role: 'GK', top: '80%', left: '50%' },
      { role: 'DF', top: '60%', left: '20%' },
      { role: 'DF', top: '60%', left: '80%' },
      { role: 'MF', top: '20%', left: '35%' },
      { role: 'MF', top: '20%', left: '65%' }
    ],
    8: [
      { role: 'GK', top: '85%', left: '50%' },
      { role: 'DF', top: '70%', left: '20%' },
      { role: 'DF', top: '70%', left: '50%' },
      { role: 'DF', top: '70%', left: '80%' },
      { role: 'MF', top: '50%', left: '30%' },
      { role: 'MF', top: '50%', left: '70%' },
      { role: 'FW', top: '25%', left: '40%' },
      { role: 'FW', top: '25%', left: '60%' }
    ]
  }
  const renderField = (team: Player[], side: 'top' | 'bottom') => {
    const field = formations[5]
    const players = [...team].sort((a, b) => b.overall - a.overall)

    const FIELD_HEIGHT = 500
const position =[{ role: 'GK', top: '80%', left: '50%' },
    { role: 'DF', top: '60%', left: '20%' },
    { role: 'DF', top: '60%', left: '80%' },
    { role: 'MF', top: '20%', left: '35%' },
    { role: 'MF', top: '20%', left: '65%' }]
    return (
      <ImageBackground
        source={require('../../assets/1137.jpg')}
        style={[
          styles.field,
          side === 'bottom' && { transform: [{ scaleY: -1 }] }
        ]}
        imageStyle={[
          {height: 1000},
          side === 'bottom' && { top: -FIELD_HEIGHT }
        ]}
        resizeMode="cover"
      >
        {field.map((pos, index) => {
          const player = players[index]
          if (!player) return null
          return (
            <View
              key={player.id}
              style={[
                styles.playerWrapper,
                {
                  top: position[index].top as DimensionValue,
                  left: position[index].left as DimensionValue,
                }
              ]}
            >
            <CardBronze
              scale={0.2}
              dynamicValue={{ customerInfo: player }}
            />
            </View>
          )
        })}
      </ImageBackground>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*{prediction && (*/}
      {/*  <View style={styles.predictionBox}>*/}
      {/*    <Text style={styles.predictionTitle}>*/}
      {/*      🔮 Previsione risultato*/}
      {/*    </Text>*/}

      {/*    <Text style={styles.score}>*/}
      {/*      Squadra A {prediction.goals.teamA} - {prediction.goals.teamB} Squadra B*/}
      {/*    </Text>*/}

      {/*    <Text style={styles.stat}>*/}
      {/*      Possesso: {prediction.possession.teamA}% - {prediction.possession.teamB}%*/}
      {/*    </Text>*/}

      {/*    <Text style={styles.stat}>*/}
      {/*      Passaggi riusciti: {prediction.passAccuracy.teamA}% - {prediction.passAccuracy.teamB}%*/}
      {/*    </Text>*/}

      {/*    <Text style={styles.stat}>*/}
      {/*      Tiri: {prediction.shots.teamA} ({prediction.shotsOnTarget.teamA} in porta) -*/}
      {/*      {prediction.shots.teamB} ({prediction.shotsOnTarget.teamB} in porta)*/}
      {/*    </Text>*/}

      {/*    <Text style={styles.winner}>*/}
      {/*      🏆 Probabile vincitore: {prediction.winner}*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*)}*/}

      <Text style={styles.title}>
        ⚽ Formazioni tattiche ({mode} vs {mode})
      </Text>

      <View style={{flexDirection:'row', gap: 8}}>
        <View style={styles.teamContainer}>
          <Text style={[styles.teamHeader, { backgroundColor: '#1976D2' }]}>
            Squadra A
          </Text>
          {renderField(teamA, 'top')}
        </View>

        <View style={styles.teamContainer}>
          <Text style={[styles.teamHeader, { backgroundColor: '#D32F2F' }]}>
            Squadra B
          </Text>
          {renderField(teamB, 'bottom')}
        </View>
      </View>

    </ScrollView>
  )
}

export default MatchDetail

const styles = StyleSheet.create({
  container: {
    padding: 16
  },

  predictionBox: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },

  predictionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },

  score: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },

  stat: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#666'
  },

  winner: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 8,
    color: 'green'
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },

  teamContainer: {
    width: '50%',
    padding: 30
  },

  teamHeader: {
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: 'center'
  },

  field: {
    width: '100%',
    height: 500,
    overflow: 'hidden', // fondamentale
  },
  imageHalfTop: {
    height: 1000,      // il doppio dell'altezza del container
    top: 0
  },

  playerWrapper: {
    position: 'absolute',
    top: 0, left: '35%'
  }
})