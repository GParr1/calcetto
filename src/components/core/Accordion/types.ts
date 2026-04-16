import { ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { ContainerProps } from 'components/core/Container/types'

export interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  containerStyle?: ContainerProps
  titleStyle?: StyleProp<TextStyle>
}
