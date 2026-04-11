import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from 'components/Header/Common/LogoutBtn'
import { StyleProp, View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { btnNavLinkDefault, btnPrimaryDefault, ContainerProps, textDefault } from 'styles';
import Button, { ButtonType } from 'components/core/Button';
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexDirection, FlexJustifyContent,
  SizesPx,
  SizeUnits
} from 'components/core/Container/enum'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import NavAction from 'components/Header/Common/NavAction'

interface NavLinkProps {
  isMobile?: boolean
}

/** Desktop buttons */
const NavLink: React.FC<NavLinkProps> = ({
                                           isMobile = false,
                                         }) => {
  const navigate = useNavigate()

  const containerConfig = {
    display: 'flex',
    flex: 1,
    flexDirection: FlexDirection.ROW,
    flexJustifyContent: FlexJustifyContent.CENTER,
    marginTop: [SizesPx.S, SizesPx.S, SizesPx.NONE],
    padding: [SizesPx.M, SizesPx.M, SizesPx.NONE],
    width: [SizeUnits.FULL, SizeUnits.FULL, 'auto'],
    alignItems: FlexAlignItems.CENTER,
    flexGap: SizesPx.S
  }
  const styleButton = {
    ...btnNavLinkDefault
  } as StyleProp<ViewStyle>
  const btnHomeConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => navigate('/dashboard'),
      style: styleButton,
      accessibilityLabel: 'Go to dashboard'
    },
    label: 'Home'
  }
  const btnProfileConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => navigate('/profile'),
      style: styleButton,
      accessibilityLabel: 'Go to Profile'
    },
    label: 'Profilo'
  }
  const btnMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.TAG,
      onPress: () => navigate('/partite'),
      style: styleButton,
      accessibilityLabel: 'Go to Match'
    },
    label: 'Partite'
  }
  return (
    <Container role={'navigation'} {...containerConfig}>
      {isMobile && <NavAction />}
      <Button {...btnHomeConfig} />
      <Button {...btnProfileConfig} />
      <Button {...btnMatchConfig} />
    </Container>
  )
}

export default NavLink
