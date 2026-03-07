import React from 'react'
import ResetPassword from 'components/Auth/ResetPassword'
import { View } from 'react-native';
import { ContainerProps } from 'styles';

// ✅ Tipizzazione del componente
const ResetPasswordView: React.FC = () => {
  const containerConfig = {
    flexDirection: ContainerProps.flexColumn,
    alignItems: ContainerProps.alignCenter,
    justifyContent: ContainerProps.justifyCenter,
    width: '60%'
  }
  return (
      <View {...containerConfig}>
        <ResetPassword />
      </View>
  )
}
export default ResetPasswordView

