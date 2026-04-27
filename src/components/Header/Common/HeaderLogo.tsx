import React from 'react'
import { Assets } from 'assets/assets';
import { Image, Text, View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps, Headings, sizesPx, textDefault, UITextProps } from 'styles';
import { ImageProps } from 'react-native/Libraries/Image/Image';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { Container } from 'components/core/Container/Container'
import { FlexDirection, FlexJustifyContent, SizesPx } from 'components/core/Container/enum'

const HeaderLogo: React.FC = () => {

  const containerConfig = {
    flexDirection: FlexDirection.ROW,
    flex: 1,
    alignItems: ContainerProps.alignCenter,
    flexGap: SizesPx.S
  }

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
    <Container {...containerConfig}>
      <Image {...imageConfig}/>
      <Text {...textConfig}/>
    </Container>
  )
}

export default HeaderLogo
