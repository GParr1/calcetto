import React, { FormEvent, useEffect, useState } from 'react';
import {
  doConfirmPasswordReset,
  doResetPassword,
  doVerifyPasswordResetCode
} from 'utils/authUtils'
import { useSearchParams, useNavigate } from 'react-router-dom'
import HeaderAuthView from 'components/Auth/Common/HeaderAuthView'
import GeneralForm from 'components/Form/GeneralForm'
import { cleanUrlParamiter, getObjFormFromEvt } from 'utils/utils'
import ModalError from 'components/Modal/ModalInfo'
import { FormObject } from 'types/form'
import { Text, View } from 'react-native';
import { sizesPx, textDefault } from 'styles';
import { COLORS } from 'components/constantStyle';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [oobCode, setOobCode] = useState<string>('')

  // Step 1: verifica il codice
  useEffect(() => {
    const code = searchParams.get('oobCode')
    if (!code) return

    doVerifyPasswordResetCode({ code }).then((result) => {
      const { errorMessage, successMessage } = result
      cleanUrlParamiter()
      if (errorMessage) setError(errorMessage)
      if (successMessage) setOobCode(code)
    })
  }, [searchParams])

  const handleResetPassword = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const credential: FormObject = getObjFormFromEvt(evt)
    if (!credential.email) {
      setError("Email vuota! Inserisci l'email")
      return
    }
    const { errorMessage, successMessage } = await doResetPassword({
      email: credential.email
    })
    if (errorMessage) setError(errorMessage)
    if (successMessage) setSuccess(successMessage)
  }

  const handleConfirmPasswordReset = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const credential: FormObject = getObjFormFromEvt(evt)
    const { errorMessage, successMessage } = await doConfirmPasswordReset({
      oobCode,
      newPassword: credential.password
    })
    if (errorMessage) setError(errorMessage)
    if (successMessage) setSuccess(successMessage)
    setTimeout(() => navigate('/login'), 2000)
  }
  const headerAuthViewProps = {
    message: 'Recupero della password'
  }
  const textConfig= {
    children: "Inserisci l'indirizzo e-mail, l'ID o il numero di telefono dell'account\n" +
      "per cui vuoi modificare o impostare una password.",
    style: {
      ...textDefault,
      marginLeft: 5,
    }
  }
  const container = {
    style: {
      backgroundColor: COLORS.secondaryBg,
      padding: sizesPx.XL
    }
  }
  return (
    <>
      <HeaderAuthView {...headerAuthViewProps}/>
      <Text {...textConfig}/>
      <View {...container}>
        {!oobCode && (
          <GeneralForm
            formId="resetPassword"
            handleSubmitEvt={handleResetPassword}
            obj={{}}
          />
        )}

        {oobCode && (
          <GeneralForm
            formId="resetPassword-step-password"
            handleSubmitEvt={handleConfirmPasswordReset}
            obj={{}}
          />
        )}

        {error && (
          <ModalError
            title="Errore"
            type="error"
            message={error}
            closeModal={() => setError('')}
          />
        )}

        {success && (
          <ModalError
            title="Password Reset"
            type="success"
            message={success}
            closeModal={() => setSuccess('')}
          />
        )}
      </View>
    </>
  )
}

export default ResetPassword
