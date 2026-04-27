import React from 'react'
import { ScrollView, StyleProp, ViewStyle } from 'react-native'
import type { ScrollContainerProps } from './types'

const SC: React.FC<ScrollContainerProps> = ({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  ...rest
}) => {
  const computedContentStyle = [
    { flexGrow: 1 },
    contentContainerStyle
  ] as StyleProp<ViewStyle>

  const scrollContainerConfig = {
    contentContainerStyle: computedContentStyle,
    showsVerticalScrollIndicator,
    showsHorizontalScrollIndicator,
    ...rest
  }
  return (
    <ScrollView {...scrollContainerConfig}>
      {children}
    </ScrollView>
  )
}

export { SC as ScrollContainer }
