import { ViewProps, AccessibilityRole } from 'react-native'
import {
  BorderStyle,
  COLORS,
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  FlexWrap,
  SizesPx,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'

export type Responsive<X> = { [key: string]: X }
export type ResponsiveProp<X> = X | Responsive<X> | X[]

export interface FlexComponentProps {
  flexDirection?: ResponsiveProp<FlexDirection>
  flexJustifyContent?: ResponsiveProp<FlexJustifyContent>
  flexAlignContent?: ResponsiveProp<FlexAlignContent>
  flexAlignItems?: ResponsiveProp<FlexAlignItems>
  flex?: number
  flexGrow?: ResponsiveProp<number>
  flexShrink?: ResponsiveProp<number>
  flexWrap?: ResponsiveProp<FlexWrap>
  flexGap?: ResponsiveProp<number | SizesPx | SizesRem>
}
export interface ViewportComponentProps {
  height?: ResponsiveProp<number | string | SizeUnits>
  minHeight?: ResponsiveProp<number | string | SizeUnits>
  maxHeight?: ResponsiveProp<number | string | SizeUnits>
  width?: ResponsiveProp<number | string | SizeUnits>
}
export interface BorderComponentProps {
  border?: ResponsiveProp<BorderStyle>
  borderSize?: number
  borderRadius?: number
  borderColor?: string
}
export interface PositionComponentProps {
  position?: ResponsiveProp<'absolute' | 'relative' | 'fixed'>
  top?: ResponsiveProp<number | SizesPx | SizesRem>
  left?: ResponsiveProp<number | SizesPx | SizesRem>
  right?: ResponsiveProp<number | SizesPx | SizesRem>
  bottom?: ResponsiveProp<number | SizesPx | SizesRem>
}
export interface ContainerProps
  extends ViewProps,
    PositionComponentProps,
    BorderComponentProps,
    ViewportComponentProps,
    FlexComponentProps {
  padding?: ResponsiveProp<number | SizesPx | SizesRem>
  overflow?: ResponsiveProp<'visible' | 'hidden' | 'scroll'>
  backgroundColor?: ResponsiveProp<string | COLORS>
  boxShadow?: ResponsiveProp<string>

  zIndex?: number
  scale?: number
  scaleX?: number
  scaleY?: number

  // React Native friendly
  onPress?: () => void
  children?: React.ReactNode
}
