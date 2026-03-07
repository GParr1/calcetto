import React from 'react'
import { View } from 'react-native';
import { useResponsiveStyle } from 'styles/styles.utils';
import { btnSecondaryDefault, ContainerProps, UITextProps } from 'styles';
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button';

interface SocialLoginProps {
  handleLogin: (obj: { action: string }) => Promise<void>
}

const SocialLogin: React.FC<SocialLoginProps> = ({ handleLogin }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const viewConfig = getResponsiveStyle({
    width: ['100%'],
    flexDirection: [ContainerProps.flexRow],
    justifyContent:[ ContainerProps.justifyCenter],
    alignItems: ['center'],
    gap: ['1rem']
  })

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
      <View style={{...viewConfig}}>
        <Button {...btnGoogleConfig}/>
        <Button {...btnFacebookConfig}/>
      </View>

  )
}

export default SocialLogin
