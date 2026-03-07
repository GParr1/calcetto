import React from 'react';
import type { ComponentProps } from "react";
import { TouchableOpacity, Text, Pressable, Platform, PressableProps, Role } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { TouchableOpacityProps } from 'react-native/Libraries/Components/Touchable/TouchableOpacity';
import NativeText from 'components/core/NativeText';


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

export interface UITouchableOpacityProps extends TouchableOpacityProps {
  type: ButtonType
}
export type ButtonProps = {
  touchableOpacityConfig: UITouchableOpacityProps
  // touchableOpacityConfig:{
  //   type: ButtonType // Aggiungi il tipo del bottone (primary o secondary)
  //   onPress?: (event: GestureResponderEvent) => void;
  //   accessibilityLabel: string
  //   ioniconsConfig?:  IoniconsProps
  //
  // }
  label: string
  textConfig?: TextProps
  ioniconsConfig?: IoniconsProps
  //buttonSize?: ButtonSizes

  // endIcon?: string
  // //iconPosition?: ButtonIconPositions
  // disable?: boolean
  // //buttonTheme?: ButtonThemes
  // //buttonWidth?: ResponsiveProp<ButtonWidths>
  // linkUrl?: string
  // //linkTarget?: ButtonTargets
  // loading?: boolean
  // //onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void
}



const Button: React.FC<ButtonProps> = ({ touchableOpacityConfig, label, ioniconsConfig }) => {
  const touchableOpacityWithRoleConfig = {
    role: 'button' as Role,
    ...touchableOpacityConfig
  }
  return (
    <TouchableOpacity {...touchableOpacityWithRoleConfig}>
      {ioniconsConfig?.name && <Ionicons {...ioniconsConfig} />}
      <NativeText as={'span'}>{label}</NativeText>
    </TouchableOpacity>
  );
};

export default Button;
