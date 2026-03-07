import React, { ReactNode } from 'react'
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps } from 'styles';
import { View } from 'react-native';

interface FooterContainerProps {
  children?: ReactNode
}

const FooterContainer: React.FC<FooterContainerProps> = ({ children }) => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const responsivePadding = getResponsiveStyle({
    alignItems: [ContainerProps.alignCenter],
    height:[100]
  })

  return <View role={'contentinfo'} style={{ ...responsivePadding }}>{children}</View>
}

export default FooterContainer
