import React, { useState } from 'react'
import HeaderLogo from './Common/HeaderLogo'
import NavLink from './Common/NavLink'
import NavAction from './Common/NavAction'
import MobileAction from './Common/MobileAction'
import { Role, View } from 'react-native';
import { borderRadiusSizes, ContainerProps, sizesPx } from 'styles';
import { useResponsiveStyle } from 'styles/styles.utils';
import { Container } from 'components/core/Container/Container'
import {
  DisplayContainer,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  FlexWrap,
  SizesPx,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'
import Button from 'components/core/Button/Button'
import { COLORS } from 'components/constantStyle'
import OverlayBackdrop from 'components/Modal/OverlayBackdrop'
import { ButtonType } from 'components/core/Button/enum'
import { IoniconsNames } from 'components/core/Button/types'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const headerConfig = {
    role: 'banner' as Role,
    flexDirection: {
      mobile: FlexDirection.ROW,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    },
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    padding: SizesPx.L,
    width: SizeUnits.FULL,
    flexWrap: FlexWrap.WRAP
  }

  const styleButton = {
    display:'flex',
    color: COLORS.primaryText,
    transition: 'all 0.2s ease',
    alignItems: FlexAlignItems.CENTER,
    borderRadius: borderRadiusSizes.radiusFull,
    borderWidth: 1,
    paddingHorizontal: SizesRem.M,
    paddingVertical: SizesRem.S,
    boxShadow: `0px 4px 10px ${COLORS.primaryColor}`
  }

  const btnMobileConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => setMenuOpen(!menuOpen),
      style: styleButton,
      accessibilityLabel: 'Go to dashboard'
    },
    ioniconsConfig: {
      name: 'menu-outline' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: ''
  }
  const subMenuContainer = {
    flexGap:SizesPx.XL,
  }
  const mobileButton ={
    display: {
      mobile: DisplayContainer.FLEX,
      tablet: DisplayContainer.NONE,
      desktop: DisplayContainer.NONE
    }
  }
  return (
    <>
      <Container {...headerConfig}>
        <HeaderLogo />
        <NavLink />
        <NavAction />
        {/* Mobile menu toggle */}
        <Container {...mobileButton}>
          <Button {...btnMobileConfig} />
        </Container>
      </Container>
      {menuOpen && (
        <OverlayBackdrop
          visible={menuOpen}
          closeOverlay={() => setMenuOpen(!menuOpen)}
        >
          <Container {...subMenuContainer}>
            <NavLink isMobile />
            <NavAction isMobile />
          </Container>
        </OverlayBackdrop>
      )}
    </>
  )
}

export default Header
