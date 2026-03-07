import React from 'react'
import { RedirectOnLogin } from 'utils/RedirectOnLogin'
import CardBronze from 'components/FifaCard/CardBronze'
import { useSelector } from 'react-redux';
import { getUser } from 'state/auth/selectors';
import { View, ViewProps } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps } from 'styles';
import PlayerDataCardSeasons from 'components/PlayerData/PlayerDataSeasons';
import PlayerDataCardTrophy from 'components/PlayerData/PlayerDataCardTrophy';
import { Stats, Trophy } from 'components/PlayerData/type';
import { User } from 'types/user';

interface StatsByYear {
  [year: string]: Stats
}

const mockStats: StatsByYear = {
  2022: { partite: 25, gol: 10, assist: 8 },
  2023: { partite: 30, gol: 15, assist: 12 },
  2024: { partite: 28, gol: 9, assist: 10 },
}

const mockCoppe: Trophy[] = [
  { name: 'Coppa Primavera' },
  { name: 'Torneo Estivo' }
]

const MyAccountView: React.FC = () => {
  const user: User = useSelector(getUser);
  const { getResponsiveStyle } = useResponsiveStyle();
  if (!user) {
    return <RedirectOnLogin />
  }
  const responsiveMainContainer = getResponsiveStyle({
    flexDirection: ['column','column','row'],
    gap:[24],
  })
  const responsiveRowContainer = getResponsiveStyle({
    flexDirection: ['column'],
    gap:[24],
    alignItems: [ContainerProps.alignCenter],
  })

  const  statsViewContainer = {
    role: 'region',
    style: getResponsiveStyle({
      width: ['80vw','80vw', 'auto'],
      flexDirection: ['column'],
      gap:[24],
      marginHorizontal:[24,24,0],
      paddingVertical: [0,0,16]
    })
  } as ViewProps

  return (
      <View style={{...responsiveMainContainer}}>
        <View style={{...responsiveRowContainer}}>
          <CardBronze enableEdit scale={0.7} />
        </View>
        <View {...statsViewContainer}>
          <PlayerDataCardTrophy trophy={[]}/>
          <PlayerDataCardSeasons
            title="Statistiche Personali"
            seasons={[]}
          />
          <PlayerDataCardTrophy trophy={mockCoppe}/>
          <PlayerDataCardSeasons
            title="Statistiche Personali"
            seasons={Object.entries(mockStats as Record<string, Stats>)}
          />
        </View>
      </View>

  )
}
export default MyAccountView
