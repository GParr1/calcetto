import React, { useState } from 'react';
import { View } from 'react-native';
import Login from 'components/Auth/Login/Login'
import RegisterTwoSteps from 'components/Auth/Register/Register'
import { useResponsiveStyle } from 'styles/styles.utils';
import { ContainerProps } from 'styles';
import ModalInfo from 'components/Modal/ModalInfo';

interface AuthViewProps {
  register?: boolean
}

/**
 * AuthView
 * Visualizza il componente di login o di registrazione in base alla prop `register`.
 * - `register = true` → mostra il form di registrazione
 * - `register = false | undefined` → mostra il form di login
 */
export const AuthView: React.FC<AuthViewProps> = ({ register = false }) => {
  const { getResponsiveStyle } = useResponsiveStyle();
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const responsiveMainContainer = getResponsiveStyle({
    flexDirection: ['column'],
    gap:[24],
    alignItems: [ContainerProps.alignCenter],
    width: ['100%','100%','50%']
  })
  const modalProps = {
    title: error ? "Errore" : '',
    type: error ? 'error': 'success',
    message: error ? error : success,
    closeModal: () => error ? setError('') : setSuccess('')
  }

  const registerTwoStepsProps = { setSuccess, setError}
  const loginProps = { setSuccess, setError}
  return  (
    <View role={'region'} style={{ ...responsiveMainContainer }}>
      {register ?
        <RegisterTwoSteps {...registerTwoStepsProps}/> :
        <Login {...loginProps} />}
      {error || success && (
        <ModalInfo {...modalProps} />
      )}
    </View>
  )
}

export default AuthView
