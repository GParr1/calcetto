import React from 'react'
import { Pressable, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NativeText from 'components/core/NativeText'
import { ButtonProps } from 'components/core/Button/types'
import { styleByType } from 'components/core/Button/utils'

const Button: React.FC<ButtonProps> = ({
  touchableOpacityConfig,
  label,
  ioniconsConfig
}) => {

  const { type, style, ...restTouchable } = touchableOpacityConfig

  const computedStyle = [{ ...styleByType(type) }, style].filter(
    Boolean
  ) as StyleProp<ViewStyle>

  const touchableOpacityWithRoleConfig = {
    ...restTouchable,
    style: computedStyle,

  }
  const content = (
    <>
      {ioniconsConfig?.name && <Ionicons {...ioniconsConfig} />}
      <NativeText as={'span'}>{label}</NativeText>
    </>)


  return (
    <TouchableOpacity role={'button'} {...touchableOpacityWithRoleConfig}>
      {content}
    </TouchableOpacity>
  )
}

export default Button
