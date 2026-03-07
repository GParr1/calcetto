import React from 'react';
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView';
import { Text, View } from 'react-native';
import GeneralForm from 'components/Form/GeneralForm';
import Link from 'components/core/Link';
import { useResponsiveStyle } from 'styles/styles.utils';
import { btnDefault, TextAlign, textDefault } from 'styles';
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button';
import { FormObject } from 'types/form';

interface RegisterStepEmailPasswordProps {
  handleBack: () =>  void
  handleRegister: (obj: Record<string, any>) =>  Promise<void>
  formObjectStep1: FormObject | {}

}
const RegisterStepEmailPassword: React.FC<RegisterStepEmailPasswordProps> = ({ handleBack, handleRegister, formObjectStep1 }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const headerAuthViewProps = {
    message: 'Crea un account'
  }

  const testConfigProps = {
    children: [
      'Hai già un account? ',
      <Link
        key="login-link"
        to="/welcome"
        toApp="Login"
        label="Accedi"
        testID="login-link"
      />
    ],
    style: {
      ...textDefault,
      textAlign: TextAlign.CENTER,
    }
  }
  const btnBackConfig = {
    touchableOpacityConfig: {
      type: ButtonType.NONE,
      onPress: handleBack,
      style: {
        ...btnDefault,
      },
      accessibilityLabel: "Torna indietro",
    },
    label:'Indietro',
    ioniconsConfig: {
      name: 'chevron-back' as IoniconsNames,
      size:20,
      color:"#fff"
    },
  } as ButtonProps
  return(
    <>
      <Button {...btnBackConfig} />
      <HeaderAuthView {...headerAuthViewProps}/>
      <View style={{width: '100%',alignItems: 'center', padding: 16,}}>
        <GeneralForm
          formId="register-step-2"
          handleSubmit={handleRegister}
          obj={formObjectStep1}
        />
        <Text {...testConfigProps}/>
      </View>
    </>
  )
}

export default RegisterStepEmailPassword