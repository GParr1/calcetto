import React from 'react'
import { View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps } from 'styles';
import { COLORS } from 'components/constantStyle';
import NativeText from 'components/core/NativeText';

const DividerLogin: React.FC = () => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const viewConfig = getResponsiveStyle({
    width: ['100%'],
    flexDirection: [ContainerProps.flexRow],
    justifyContent:[ ContainerProps.justifyCenter],
    alignItems: ['center'],
    gap: ['1rem'],
  })
  const viewLineConfig = getResponsiveStyle({
    flex: [1],
    height: [1],
    borderTop: [`${COLORS.secondaryColor} solid`]
  })
  const textConfig = getResponsiveStyle({
    color: [COLORS.primaryText]
  })
  return(
    <View style={{...viewConfig}}>
      <View style={{...viewLineConfig}} />
      <NativeText style={textConfig}>o</NativeText>
      <View style={{...viewLineConfig}} />
    </View>
  )
}

export default DividerLogin
