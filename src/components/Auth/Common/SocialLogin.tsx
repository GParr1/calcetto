import React from 'react'
import { btnSecondaryDefault, ContainerProps, sizes, UITextProps } from 'styles';
import Button from 'components/core/Button/Button';
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'
import { COLORS } from 'components/constantStyle'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'

interface SocialLoginProps {
  handleLogin: (obj: { action: string }) => Promise<void>
}

const SocialLogin: React.FC<SocialLoginProps> = ({ handleLogin }) => {

  const viewConfig = {
    width: SizeUnits.FULL,
    flexDirection: FlexDirection.ROW,
    flexJustifyContent: FlexJustifyContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    flexGap: SizesRem.L
  }

  const btnGoogleConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => await handleLogin({ action: 'google' }),
      accessibilityLabel: "Crea Account",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'logo-google' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Google',
  } as ButtonProps

  const btnFacebookConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => await handleLogin({ action: 'facebook' }),
      accessibilityLabel: "Crea Account",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'logo-facebook' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Facebook',
  } as ButtonProps
  return(
      <Container {...viewConfig}>
        <Button {...btnGoogleConfig}/>
        <Button {...btnFacebookConfig}/>
      </Container>

  )
}

export default SocialLogin
