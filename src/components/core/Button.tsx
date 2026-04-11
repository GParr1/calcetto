import React from 'react';
import type { ComponentProps } from "react";
import { TouchableOpacity, Text, Pressable, Platform, PressableProps, Role } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { TouchableOpacityProps } from 'react-native/Libraries/Components/Touchable/TouchableOpacity';
import NativeText from 'components/core/NativeText';
import { useResponsiveStyle } from 'styles/styles.utils'


export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TAG = 'tag',
  NONE = 'none',
  SUBMIT = 'submit'
}
export type IoniconsNames = ComponentProps<typeof Ionicons>["name"]

export type IoniconsProps = {
  name: IoniconsNames
  size?: number,
  color?: string
}

export interface UITouchableOpacityProps {
  type: ButtonType
  style?: any
}
export type ButtonProps = {
  touchableOpacityConfig: UITouchableOpacityProps
  label: string
  textConfig?: TextProps
  ioniconsConfig?: IoniconsProps
}

const Button: React.FC<ButtonProps> = ({
  touchableOpacityConfig,
  label,
  ioniconsConfig
}) => {
  const { getResponsiveStyle } = useResponsiveStyle()

  const { style, ...restTouchable } = touchableOpacityConfig

  const responsiveStyle = getResponsiveStyle(style || {})

  const touchableOpacityWithRoleConfig = {
    role: 'button' as Role,
    ...touchableOpacityConfig
  }

  return (
    <TouchableOpacity {...touchableOpacityWithRoleConfig}>
      {ioniconsConfig?.name && <Ionicons {...ioniconsConfig} />}
      <NativeText as={'span'}>{label}</NativeText>
    </TouchableOpacity>
  )
}

export default Button;
