import React, { ReactNode } from 'react'
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps } from 'styles';
import { View } from 'react-native';

interface MainContainerProps {
  children: ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const responsivePadding = getResponsiveStyle({
    alignItems: [ContainerProps.alignCenter],
  })

  return <View role={'main'} style={{ ...responsivePadding }}>{children}</View>
}

export default MainContainer
