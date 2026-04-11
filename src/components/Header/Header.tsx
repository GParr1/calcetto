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
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  FlexWrap,
  SizesPx,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'
import Button, { ButtonType, IoniconsNames } from 'components/core/Button'
import { doSignOut } from 'utils/authUtils'
import { COLORS } from 'components/constantStyle'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { getResponsiveStyle } = useResponsiveStyle();

  const navContainerConfig=  getResponsiveStyle({
    flexDirection: [ContainerProps.flexRow],
    justifyContent: [ContainerProps.justifySpaceBetween],
    alignItems: [ContainerProps.alignCenter],
    padding: [sizesPx.L],
    width: ["100%"],
    flexWrap: ['wrap']
  })


  const headerConfig = {
    role: 'banner' as Role,
    flexDirection: FlexDirection.ROW,
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
  return (
    <>
      <Container {...headerConfig}>
        <HeaderLogo />
        <NavLink />
        <NavAction />
        {/* Mobile menu toggle */}
        <Button {...btnMobileConfig} />

        <MobileAction openMenu={() => setMenuOpen(!menuOpen)} />
      </Container>

      {/* Mobile menu content */}
      {menuOpen && <NavLink isMobile />}
    </>
  )
}

export default Header
