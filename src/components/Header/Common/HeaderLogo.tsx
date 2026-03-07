import React from 'react'
import { Assets } from 'assets/assets';
import { Image, Text, View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps, Headings, sizesPx, textDefault, UITextProps } from 'styles';
import { ImageProps } from 'react-native/Libraries/Image/Image';
import { TextProps } from 'react-native/Libraries/Text/Text';

const HeaderLogo: React.FC = () => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const containerConfig = getResponsiveStyle({
    flexDirection: [ContainerProps.flexRow],
    alignItems: [ContainerProps.alignCenter],
    gap: [sizesPx.S]
  })

  const textConfig = {
    children: "MINILIGA",
    style: {
      ...textDefault,
      ...Headings.h1,
      flexGrow:1,
      textTransform: UITextProps.UPPERCASE
    }
  } as TextProps

  const imageConfig = {
    source:Assets.logo,
    style:{ width: 60, height: 60 },
    resizeMode:"contain",
    accessibilityIgnoresInvertColors:true
  } as ImageProps
  return(
    <View style={{...containerConfig}}>
      <Image {...imageConfig}/>
      <Text {...textConfig}/>
    </View>
  )
}

export default HeaderLogo
