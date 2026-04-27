import React from 'react'
import { Container } from 'components/core/Container/Container'
import {
  DisplayContainer,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx,
  SizesRem
} from 'components/core/Container/enum'
import { borderRadiusSizes, ContainerProps } from 'styles'
import Button from 'components/core/Button/Button'
import { doSignOut } from 'utils/authUtils'
import { COLORS } from 'components/constantStyle'
import { ButtonType } from 'components/core/Button/enum'
import { IoniconsNames } from 'components/core/Button/types'

interface NavActionProps {
  isMobile?: boolean
}
const NavAction: React.FC<NavActionProps> = ({ isMobile = false }) => {
  const containerConfig = {
    display: isMobile
      ? DisplayContainer.FLEX
      : {
          mobile: DisplayContainer.NONE,
          tablet: DisplayContainer.FLEX,
          desktop: DisplayContainer.FLEX
        },
    flexDirection: FlexDirection.ROW,
    flexJustifyContent: FlexJustifyContent.FLEX_END,
    ...(!isMobile && { flex: 1 }),
    alignItems: ContainerProps.alignCenter,
    flexGap: SizesPx.S
  }

  const styleButton = {
    color: COLORS.primaryText,
    transition: 'all 0.2s ease',
    alignItems: FlexAlignItems.CENTER,
    borderRadius: borderRadiusSizes.radiusFull,
    borderWidth: 1,
    paddingHorizontal: SizesRem.M,
    paddingVertical: SizesRem.S,
    boxShadow: `0px 4px 10px ${COLORS.primaryColor}`
  }

  const btnSettingConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => console.log('setting'),
      style: styleButton,
      accessibilityLabel: 'Go to dashboard'
    },
    ioniconsConfig: {
      name: 'settings-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: ''
  }
  const btnLogoutConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: async () => await doSignOut(),
      style: styleButton,
      accessibilityLabel: 'Go to dashboard'
    },
    ioniconsConfig: {
      name: 'log-in-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: ''
  }
  return (
    <Container {...containerConfig}>
      <Button {...btnSettingConfig} />
      <Button {...btnLogoutConfig} />
    </Container>
  )
}

export default NavAction
