import React from 'react'
import { ContainerProps, ResponsiveProp } from 'components/core/Container/types'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'

const C: React.FC<ContainerProps> = (props) => {
  const {
    children,
    style,
    width,
    height,
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

  const computedStyle = [
    width && { width },
    height && { height },
    padding && { padding },
    backgroundColor && { backgroundColor },
    border && { border },
    borderSize && { borderSize },
    borderColor && { borderColor },
    borderRadius && { borderRadius },
    zIndex && { zIndex },
    scale && { scale },
    // Flex properties
    flexAlignContent && { alignContent: flexAlignContent },
    flex && { flex },
    flexDirection && { flexDirection },
    flexJustifyContent && { justifyContent: flexJustifyContent },
    flexAlignContent && { alignContent: flexAlignContent },
    flexAlignItems && { alignItems: flexAlignItems },
    flexGrow && { flexGrow },
    flexShrink && { flexShrink },
    flexWrap && { flexWrap },
    flexGap && { gap: flexGap },

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