import React from 'react'
import { Image, View } from 'react-native';
import { Assets } from 'assets/assets';
import { ContainerProps, sizesPx, TextAlign } from 'styles';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ImageProps } from 'react-native/Libraries/Image/Image';
import NativeText from 'components/core/NativeText';


interface HeaderAuthViewProps {
  message: string
}

const HeaderAuthView: React.FC<HeaderAuthViewProps> = ({ message }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const viewConfig = getResponsiveStyle({
    width: ['100%'],
    justifyContent:[ ContainerProps.justifyCenter],
    alignItems: ['center'],
    gap: ['1rem']
  })
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
    <View style={{...viewConfig}}>
      <Image {...imageProps}/>
      <NativeText as={'h1'} {...textConfig} >{message}</NativeText>
    </View>
)}

export default HeaderAuthView
