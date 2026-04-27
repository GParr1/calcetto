import React from 'react'
import { useResponsiveStyle } from 'styles/styles.utils';
import { COLORS } from 'components/constantStyle';
import NativeText from 'components/core/NativeText';
import { Container } from 'components/core/Container/Container'
import {
  BorderStyle,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent, SizesPx,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'

const DividerLogin: React.FC = () => {

  const viewConfig = {
    width: SizeUnits.FULL,
    flexDirection: FlexDirection.ROW,
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    gap: SizesRem.L
  }
  const viewLineConfig = {
    flex: 1,
    border: BorderStyle.SOLID,
    borderSize: 1,
    borderColor: COLORS.secondaryColor
  }
  const textConfig = {
    margin: SizesPx.M,
    color: COLORS.primaryText
  }
  return (
    <Container {...viewConfig}>
      <Container {...viewLineConfig} />
      <NativeText style={textConfig}>o</NativeText>
      <Container {...viewLineConfig} />
    </Container>
  )
}

export default DividerLogin
