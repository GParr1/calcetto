import React from 'react'
import { Image, View } from 'react-native';
import { Assets } from 'assets/assets';
import { ContainerProps, sizesPx, TextAlign } from 'styles';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ImageProps } from 'react-native/Libraries/Image/Image';
import NativeText from 'components/core/NativeText';
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexJustifyContent,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'


interface HeaderAuthViewProps {
  message: string
}

const HeaderAuthView: React.FC<HeaderAuthViewProps> = ({ message }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const viewConfig = {
    width: SizeUnits.FULL,
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    gap: SizesRem.L
  }
  const textConfig = getResponsiveStyle({
    textAlign: [TextAlign.CENTER],
  })
  const imageProps = {
    source: Assets.logo,
    style:{ width: 120, height: 120 },
    resizeMode:"contain",
    accessibilityIgnoresInvertColors: true
  } as ImageProps
  return (
    <Container {...viewConfig}>
      <Image {...imageProps}/>
      <NativeText as={'h1'} {...textConfig} >{message}</NativeText>
    </Container>
)}

export default HeaderAuthView
