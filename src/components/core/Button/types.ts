import { ComponentProps } from 'react'
import { ButtonType } from 'components/core/Button/enum'
import { Ionicons } from '@expo/vector-icons'
import { TextProps } from 'react-native/Libraries/Text/Text'
import { TouchableOpacityProps } from 'react-native/Libraries/Components/Touchable/TouchableOpacity'

export type IoniconsNames = ComponentProps<typeof Ionicons>['name']

export type IoniconsProps = {
  name: IoniconsNames
  size?: number
  color?: string
}

export interface UITouchableOpacityProps extends TouchableOpacityProps {
  type: ButtonType
  style?: any
}
export type ButtonProps = {
  touchableOpacityConfig: UITouchableOpacityProps
  label: string
  textConfig?: TextProps
  ioniconsConfig?: IoniconsProps
}