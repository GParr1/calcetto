import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { ContainerProps } from 'components/core/Container/types'

export interface TableRowProps {
  label: string
  value?: React.ReactNode
  containerStyle?: ContainerProps
  labelStyle?: StyleProp<TextStyle>
  valueStyle?: StyleProp<TextStyle>
}
export interface TableProps {
  children: React.ReactNode
  containerStyle?: ContainerProps
}