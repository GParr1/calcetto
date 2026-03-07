import React, { useState } from 'react'
import HeaderLogo from './Common/HeaderLogo'
import NavLink from './Common/NavLink'
import NavAction from './Common/NavAction'
import MobileAction from './Common/MobileAction'
import { View } from 'react-native';
import { ContainerProps, sizesPx } from 'styles';
import { useResponsiveStyle } from 'styles/styles.utils';

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

  const navConfig= {
    classBtn: 'btn'
  }



//role={'heading'} -> h1
  return (
    <>
      <View role={'banner'} style={{...navContainerConfig}}>
        <HeaderLogo />
        <NavLink {...navConfig} />
        <NavAction />
        {/* Mobile menu toggle */}
        <MobileAction openMenu={() => setMenuOpen(!menuOpen)} />
      </View>

      {/* Mobile menu content */}
      {menuOpen && (
        <NavLink
          isMobile
          classBtn="btn btn-sm w-100 mb-2"
        />
      )}
    </>
  )
}

export default Header
