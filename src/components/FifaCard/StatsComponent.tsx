import { User } from 'types/user';
import React, { FC } from 'react';
import { useResponsiveStyle } from 'styles/styles.utils';
import { Text, View } from 'react-native';

interface StatsPops {
  key: string,
  label: string,
  value: string
}

interface StatsComponentProps {
  stats: StatsPops[]
  dynamicValue?: User | null;
  previewImg?: string;
  style?: object;
  scale: number
}
const StatsComponent: FC<StatsComponentProps> = ({stats, scale})  => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const attributiContainerConfig = {
    style:getResponsiveStyle({
      position: ['absolute'],
      flexDirection: ['row'],
      justifyContent: ['space-between'],
      left: ['8%'],
      right: ['8%'],
      top: ['76%'],
    }),
  }
  return <View {...attributiContainerConfig}>
    {stats.map((stat) => {
      const {key, label, value} = stat
      const containerConfig = {
        key: key,
        style: getResponsiveStyle({
          flexDirection: ['column'],
          alignItems: ['center'],
        })
      }
      const labelConfig = {
        children: label,
        style: getResponsiveStyle({
          fontFamily: ['Montserrat'],
          fontWeight: ['900'],
          fontSize: [32*scale],
          color: ['#3f1200'],
          letterSpacing: [0.5],
        })
      }
      const valueConfig = {
        children: value,
        style: getResponsiveStyle({
          fontFamily: ['Montserrat'],
          fontWeight: ['800'],
          fontSize: [36*scale],
          color: ['#3f1200'],
          marginRight: [8],
        })
      }

      return(
        <View {...containerConfig}>
          <Text {...labelConfig}/>
          <Text {...valueConfig}/>
        </View>
      )
    })}
  </View>
}
export default StatsComponent