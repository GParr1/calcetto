import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyleProp } from 'react-native';
import { btnNavLinkDefault } from 'styles';
import Button from 'components/core/Button/Button';
import { Container } from 'components/core/Container/Container'
import {
  DisplayContainer,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx,
} from 'components/core/Container/enum'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import NavAction from 'components/Header/Common/NavAction'
import { ButtonType } from 'components/core/Button/enum'

interface NavLinkProps {
  isMobile?: boolean
}

/** Desktop buttons */
const NavLink: React.FC<NavLinkProps> = ({
                                           isMobile = false,
                                         }) => {
  const navigate = useNavigate()

  const containerConfig = {
    display: isMobile
      ? DisplayContainer.FLEX
      : {
          mobile: DisplayContainer.NONE,
          tablet: DisplayContainer.FLEX,
          desktop: DisplayContainer.FLEX
        },
    ...(!isMobile && {flex: 1}),
    flexDirection: {
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    },
    flexJustifyContent: FlexJustifyContent.CENTER,
    marginTop: [SizesPx.S, SizesPx.S, SizesPx.NONE],
    padding: [SizesPx.M, SizesPx.M, SizesPx.NONE],
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
