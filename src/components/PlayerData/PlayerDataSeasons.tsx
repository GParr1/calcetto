import React, { FC } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { COLORS } from 'components/constantStyle';
import { useResponsiveStyle } from 'styles/styles.utils';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { PlayerDataCardSeasonsProps } from 'components/PlayerData/type';

const PlayerDataCardSeasons: FC<PlayerDataCardSeasonsProps> = ({ title, seasons }) => {
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
  const textConfig = {
    children: title,
    style: getResponsiveStyle({
      textAlign:['center'],
      fontSize: [28],
      fontWeight: [600],
      color: [COLORS.primaryText],
    })
  } as TextProps

  const wrapperTableConfig = {
    style: getResponsiveStyle({
      flexDirection: ['column','column','row'],
      alignItems: ['center'],
      justifyContent:[ 'space-between'],
      width: ['100%'],
      gap: [24],
      height:['50vh','50vh','auto'],
      overflowY: ['auto']
    })
  }
     const emptySeasons = seasons.length === 0
    return (
      <View {...wrapperConfig}>
        {emptySeasons && <Text style={{ color:COLORS.primaryText}}> Nessuna Statistica</Text>}
        {!emptySeasons &&
          <>
            <Text {...textConfig} />
            <View {...wrapperTableConfig}>
              {seasons.map(([year, stats]) => {
          const tableConfig = {
            key: year,
            role: 'table',
            style: getResponsiveStyle({
              alignItems: ['center'],
              borderColor: [COLORS.primaryColor],
              borderWidth: [1],
              borderRadius: [16],
              width: ['100%', '100%', 'auto'],

            }),
          } as ViewProps;
          const rowgroupConfig = {
            role: 'rowgroup',
            style: getResponsiveStyle({
              paddingHorizontal: [14],
              paddingVertical: [10],
              width: ['100%'],
            }),
          } as ViewProps;
          const headerTextConfig = {
            children: `Stagione ${year}`,
            style: getResponsiveStyle({
              fontSize: [16],
              fontWeight: ['700'],
              color: [COLORS.primaryColor],
            }),
          };
          const rowStyleConfig = getResponsiveStyle({
            flexDirection: ['row'],
            justifyContent: ['space-between'],
            borderTopWidth: [1],
            borderBottomWidth: [1],
            borderColor: ['#eee'],
          });
          const cellStyleConfig = getResponsiveStyle({
            paddingVertical: [10],
            paddingHorizontal: [14],
            color: [COLORS.primaryText],
          });
          //<p className="text-center text-muted">Nessun dato disponibile</p>
          return (
            <View {...tableConfig}>
              <View {...rowgroupConfig}>
                <Text {...headerTextConfig} />
              </View>
              <View {...rowgroupConfig}>
                <View style={{ ...rowStyleConfig }} role={'row'}>
                  <Text style={{ ...cellStyleConfig }} role={'cell'}>
                    Partite giocate:
                  </Text>
                  <Text style={{ ...cellStyleConfig, fontWeight: '700' }} role={'cell'}>
                    {stats.partite ?? 0}
                  </Text>
                </View>
                <View style={{ ...rowStyleConfig }} role={'row'}>
                  <Text style={{ ...cellStyleConfig }} role={'cell'}>
                    Gol:
                  </Text>
                  <Text style={{ ...cellStyleConfig, fontWeight: '700' }} role={'cell'}>
                    {stats.gol ?? 0}
                  </Text>
                </View>

                <View style={{ ...rowStyleConfig, borderBottomWidth: 0 }} role={'row'}>
                  <Text style={{ ...cellStyleConfig }} role={'cell'}>
                    Assist:
                  </Text>
                  <Text style={{ ...cellStyleConfig, fontWeight: '700' }} role={'cell'}>
                    {stats.assist ?? 0}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
            </View>
          </>
        }
      </View>
    )
}


export default PlayerDataCardSeasons
