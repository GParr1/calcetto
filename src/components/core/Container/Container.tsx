import React from 'react'
import { ContainerProps } from 'components/core/Container/types'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import { mapResponsiveValues, useResponsiveValue } from 'components/core/utils'

const C: React.FC<ContainerProps> = (props) => {
  const {
    children,
    style,
    display,
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    overflow,
    padding,
    backgroundColor,
    border,
    borderSize,
    borderColor,
    borderRadius,
    zIndex,
    scale,
    flex,
    flexDirection,
    flexJustifyContent,
    flexAlignContent,
    flexAlignItems,
    flexGrow,
    flexShrink,
    flexWrap,
    flexGap,
    onPress,
    ...rest
  } = props
  if (display) {
    console.log(
      'ì',
      mapResponsiveValues(display, (v) => ({ display: v }))
    )
  }
  const computedStyle = [
    display && { display: useResponsiveValue(display) },
    width && { width: useResponsiveValue(width) },
    overflow && { overflow: useResponsiveValue(overflow) },
    maxWidth && { maxWidth },
    minWidth && { minWidth },
    maxHeight && { maxHeight },
    minHeight && { minHeight },
    height && { height },
    padding && { padding },
    borderSize && { borderSize },
    borderColor && { borderColor },
    borderRadius && { borderRadius },
    zIndex && { zIndex },
    scale && { scale },
    // Flex properties
    backgroundColor && { backgroundColor },
    border && { border: useResponsiveValue(border) },
    flex && { flex: useResponsiveValue(flex) },
    flexDirection && { flexDirection: useResponsiveValue(flexDirection) },
    flexAlignContent && { alignContent: useResponsiveValue(flexAlignContent) },
    flexJustifyContent && {
      justifyContent: useResponsiveValue(flexJustifyContent)
    },
    flexAlignItems && { alignItems: useResponsiveValue(flexAlignItems) },
    flexGrow && { flexGrow: useResponsiveValue(flexGrow) },
    flexShrink && { flexShrink: useResponsiveValue(flexShrink) },
    flexWrap && { flexWrap: useResponsiveValue(flexWrap) },
    flexGap && { gap: useResponsiveValue(flexGap) },

    style
  ].filter(Boolean) as StyleProp<ViewStyle>



  const content = (
    <View style={computedStyle} {...rest}>
      {children}
    </View>
  )

  // Se cliccabile → usa Pressable
  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>
  }

  return content
}
export { C as Container }