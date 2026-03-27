import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsiveStyle } from 'styles/styles.utils';
import Button, { ButtonProps, ButtonType } from 'components/core/Button';
import { btnSecondaryDefault, ContainerProps, textDefault } from 'styles';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import SocialLogin from 'components/Auth/Common/SocialLogin';
import DividerLogin from 'components/Auth/Common/DividerLogin';
import { View } from 'react-native';
import GeneralForm from 'components/Form/GeneralForm';
import Link, { LinkProps } from 'components/core/Link';
import { LoginLabelsProps } from 'properties/authView'
import { DoFirebaseLoginParms } from 'utils/authUtils'

interface LoginStepEmailProps {
  handleLogin: (obj: DoFirebaseLoginParms) => Promise<void>
  handleSetEmail: (obj: Record<string, any>) => void
}
const LoginStepEmail: React.FC<LoginStepEmailProps> = ({ handleLogin, handleSetEmail }) => {
  const navigate = useNavigate()
  const { getResponsiveStyle } = useResponsiveStyle();
  const { labels } = LoginLabelsProps
  const headerAuthViewProps = {
    message: labels.welcome
  }
  const responsiveFormContainer = getResponsiveStyle({
    alignItems: ['center'],
    gap: ['0rem','0rem','1rem'],
    width: ['100%'],
  })
  const responsiveActionContainer = getResponsiveStyle({
    alignItems: ['center'],
    width: ['70%'],
    padding: [16]
  })
  const btnCreateAccountConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: () => navigate('/create-account', { replace: true }),
      accessibilityLabel: labels.btnCreateAccount,
      style: {
        ...btnSecondaryDefault
      }
    },
    label: labels.btnCreateAccount
  } as ButtonProps

  const linkConfig = {
    to:'/reset-password',
    toApp:"ResetPassword",
    label: labels.resetPass,
  } as LinkProps
  return (
    <>
      {/* 🧭 Header */}
      <View role={'region'} style={{ ...responsiveFormContainer }}>
        <HeaderAuthView {...headerAuthViewProps}/>
        <SocialLogin handleLogin={handleLogin} />
      </View>

      <DividerLogin />
      <View role={'region'} style={{ ...responsiveFormContainer }}>
        <GeneralForm
          formId="email-step"
          handleSubmit={handleSetEmail}
          labels={{ submitLabel: 'AVANTI' }}
          obj={{}}
        />
      </View>
      <View role={'region'} style={{ ...responsiveActionContainer }}>
        <Button {...btnCreateAccountConfig}/>
        <Link {...linkConfig}/>
      </View>
    </>
  )
}

export default LoginStepEmail
