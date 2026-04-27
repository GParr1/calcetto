import React, { FC } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'
import { analyzeMatch, balanceTeams } from 'utils/utils'
import { MatchDetailProps } from 'components/Matches/types'
import { Container } from 'components/core/Container/Container'
import {
  COLORS,
  FlexDirection,
  SizesPx,
  SizeUnits
} from 'components/core/Container/enum'
import ContentMatchDetail from 'components/Matches/MatchDetail/ContentMatchDetail'
import { TableRow } from 'components/core/Table/TableRow'
import { Table } from 'components/core/Table/Table'
import { buildDataPrediction } from 'utils/matchUtils'



const MatchDetail: FC<MatchDetailProps> = ({ match, mode = 5 }) => {
  const { teamBalance } = match
  const { teamA, teamB } =teamBalance ? teamBalance : balanceTeams(match.players)
  const prediction = analyzeMatch(teamA, teamB)

  const containerConfig = {
    flexDirection: {
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    },
    flexGap: SizesPx.S
  }

  const predictionTeamA = buildDataPrediction(prediction,'teamA')
  const predictionTeamB = buildDataPrediction(prediction, 'teamB')
  return (
    <ScrollView contentContainerStyle={{ padding: SizesPx.M }}>
      <Text
        style={{
          color: COLORS.PRIMARY_TEXT,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 20
        }}
      >
        ⚽ Formazioni tattiche ({mode} vs {mode}): Probabile vincitore:
        <b>{prediction.winner}</b>
      </Text>

      <Container {...containerConfig}>
        <Container width={SizeUnits.FULL}>
          <Container flexDirection={FlexDirection.ROW}>
            <Container width={'50%'}>
              <Text style={[styles.teamHeader, { backgroundColor: '#1976D2' }]}>
                {predictionTeamA.name}
              </Text>
              <Table>
                {predictionTeamA.att.map((a) => (
                  <TableRow key={a.key} label={a.label} value={a.value} />
                ))}
              </Table>
            </Container>
            <Container width={'50%'}>
              <Text style={[styles.teamHeader, { backgroundColor: '#D32F2F' }]}>
                {predictionTeamB.name}
              </Text>
              <Table>
                {predictionTeamB.att.map((a) => (
                  <TableRow key={a.key} label={a.label} value={a.value} />
                ))}
              </Table>
            </Container>
          </Container>
          <ContentMatchDetail teamA={teamA} teamB={teamB} />
        </Container>
      </Container>
    </ScrollView>
  )
}

export default MatchDetail

const styles = StyleSheet.create({
  predictionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },





  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },

  teamContainer: {
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
    overflow: 'hidden' // fondamentale
  },
  imageHalfTop: {
    height: 1000, // il doppio dell'altezza del container
    top: 0
  },

  playerWrapper: {
    position: 'absolute',
    //top: 0,
    //left: '35%'
  }
})