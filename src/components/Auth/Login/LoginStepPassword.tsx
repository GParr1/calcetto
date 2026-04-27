import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsiveStyle } from 'styles/styles.utils';
import Button from 'components/core/Button/Button';
import { borderRadiusSizes, btnDefault, btnSecondaryDefault, ContainerProps, textDefault } from 'styles';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import { Text, View } from 'react-native';
import GeneralForm from 'components/Form/GeneralForm';
import Link from 'components/core/Link';
import { maskEmail } from 'utils/utils';
import { COLORS } from 'components/constantStyle';
import Login from 'components/Auth/Login/Login'
import { LoginLabelsProps } from 'properties/authView'
import { ButtonType } from 'components/core/Button/enum'
import { ButtonProps, IoniconsNames } from 'components/core/Button/types'
import { FORM_PASSWORD_STEP, FromType } from 'structure/formUser'

interface LoginStepPasswordProps {
  handleBack: () =>  void
  email: string
  handleLogin: (obj: Record<string, any>) =>  Promise<void>
}

const LoginStepPassword: React.FC<LoginStepPasswordProps> = ({ handleBack, email, handleLogin }) => {
  const navigate = useNavigate()
  const { getResponsiveStyle } = useResponsiveStyle();
  const {labels} = LoginLabelsProps
  const headerAuthViewProps = {
    message: labels.insertPass
  }
  const responsiveFormContainer = getResponsiveStyle({
    alignItems: ['center'],
    width: ['100%'],
    padding: [16]
  })
  const btnBackConfig = {
    touchableOpacityConfig: {
      type: ButtonType.NONE,
      onPress: handleBack,
      style: {
        ...btnDefault,
        position: 'absolute',
        left:0,
        alignItems: ContainerProps.alignCenter,
        borderRadius: borderRadiusSizes.NONE,
        borderColor: COLORS.primaryText,
        borderWidth:1,
        zIndex:1
      },
      accessibilityLabel: labels.backButtonAccessibilityLabel,
    },
    label: labels.backButton,
    ioniconsConfig: {
      name: 'chevron-back' as IoniconsNames,
      size:20,
      color:"#fff"
    },
  } as ButtonProps

  return (
    <>
      {/* Pulsante Indietro */}
      <Button {...btnBackConfig} />
      {/* 🧭 Header */}
      <HeaderAuthView {...headerAuthViewProps} />
      <View style={{ ...responsiveFormContainer }}>
        <Text style={{ textAlign: 'center' }}>
          Inserisci la password di {maskEmail(email)}
        </Text>
        <GeneralForm
          formData={FromType.passwordStep}
          handleSubmit={handleLogin}
          labels={{ submitLabel: 'ACCEDI' }}
          obj={{ action: 'email', email }}
        />
      </View>
    </>
  )
}

export default LoginStepPassword
