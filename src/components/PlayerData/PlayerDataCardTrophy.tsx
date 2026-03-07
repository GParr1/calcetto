import React, { FC } from 'react';
import { Text, View} from 'react-native';
import { COLORS } from 'components/constantStyle';
import { useResponsiveStyle } from 'styles/styles.utils';
import { Ionicons } from '@expo/vector-icons';
import { PlayerDataCardTrophyProps } from 'components/PlayerData/type';

const PlayerDataCardTrophy: FC<PlayerDataCardTrophyProps> = ({ trophy }) => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const wrapperConfig = {
    style: getResponsiveStyle({
      backgroundColor: [COLORS.secondaryBg],
      gap: [24],
      paddingVertical: [24],
      alignItems: ['center'],
      borderRadius: [8],
      borderColor: [COLORS.primaryColor],
      paddingHorizontal: [16],
      shadowColor: ['rgba(7, 244, 104, 1)'],
      shadowOpacity: [0.4],
      shadowRadius: [15],
    })
  }

  const wrapperTrophyConfig = {
    style: getResponsiveStyle({
      flexDirection: ['Column'],
      alignItems: ['center'],
      justifyContent:[ 'center'],
      width: ['100%'],
      gap: [0]
    })
  }
  const emptyTrophy = trophy.length === 0
  return (
    <View {...wrapperConfig}>
      {emptyTrophy &&
        <Text style={{ color:COLORS.primaryText}}> Nessuna Coppa vinta</Text>
      }
        {!emptyTrophy && trophy.map( t => {
          return (
            <View style={{
            width: '100%',
              flexDirection:'row',
              alignItems: 'center',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#eee'
          }}>
              <Ionicons name="trophy-sharp" size={48} color="#07F468"
                        style={{padding: 16}}/>
              <Text style={{ color:COLORS.primaryText, paddingHorizontal:16,
                fontSize: 28,
                fontWeight: 600,
              }}>{t.name}</Text>
            </View>
          )
        })}
    </View>
  )

}


export default PlayerDataCardTrophy
