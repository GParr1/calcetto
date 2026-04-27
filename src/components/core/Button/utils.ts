import { ButtonType } from 'components/core/Button/enum'
import React from 'react'
import { ButtonProps } from 'components/core/Button/types'
import { useResponsiveStyle } from 'styles/styles.utils'
import {
  COLORS,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx,
  SizeUnits
} from 'components/core/Container/enum'
import {
  borderRadiusSizes,
  btnDefault,
  ContainerProps,
  UITextProps
} from 'styles'

const DefaultStyle = {
  flexDirection: FlexDirection.ROW,
  alignItems: FlexAlignItems.CENTER,
  padding: SizesPx.S,
  borderRadius: 999,
  justifyContent: FlexJustifyContent.CENTER,
  color: COLORS.PRIMARY_TEXT,
  fontWeight: 'bold'
}
export const styleByType = (type:ButtonType) => {
  switch (type) {
    case ButtonType.PRIMARY: {
      return {
        ...DefaultStyle,
        width: SizeUnits._8,
        textTransform: UITextProps.UPPERCASE,
        backgroundColor: COLORS.SECONDARY_COLOR,
        borderColor: COLORS.PRIMARY_COLOR,
        borderWidth: 1
      }
    }
    case ButtonType.SECONDARY: {
      return {
        ...DefaultStyle,
        backgroundColor: COLORS.PRIMARY_BG_BTN,
        textTransform: UITextProps.UPPERCASE,
        width: SizeUnits._8
      }
    }
    case ButtonType.TAG: {
      return {
        color: COLORS.PRIMARY_TEXT,
        transition: 'all 0.2s ease',
        alignItems: FlexAlignItems.CENTER,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY_TEXT,
        paddingHorizontal: '0.75rem',
        paddingVertical: '0.375rem'
      }
    }
    case ButtonType.NONE: {
      return {
        ...btnDefault,
        position: 'absolute',
        left:0,
        borderRadius: 0,
        borderColor: COLORS.PRIMARY_TEXT,
        borderWidth:1,
        zIndex:1
      }
    }
    default:
      return {
        ...DefaultStyle
      }
  }
}
