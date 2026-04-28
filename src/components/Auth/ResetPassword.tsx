import React, { useEffect, useState } from 'react'
import { doConfirmPasswordReset, doResetPassword, doVerifyPasswordResetCode } from 'utils/authUtils'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GeneralForm from 'components/Form/GeneralForm'
import { cleanUrlParamiter } from 'utils/utils'
import { COLORS } from 'components/constantStyle'
import { Container } from 'components/core/Container/Container'
import { ModalInfoComponent } from 'components/Modal/ModalInfo'
import {
  FlexAlignItems,
  SizesPx,
  SizesRem,
  SizeUnits
} from 'components/core/Container/enum'
import {
  FORM_EMAIL_STEP,
  FORM_PASSWORD_STEP,
  FromType
} from 'structure/formUser'

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

    doVerifyPasswordResetCode( code ).then((result) => {
      const { errorMessage, successMessage } = result
      cleanUrlParamiter()
      if (errorMessage) setError(errorMessage)
      if (successMessage) setOobCode(code)
    })
  }, [searchParams])

  const handleResetPassword = async (obj:Record<string, any>) => {
    const {email} = obj
    if (!email) {
      setError("Email vuota! Inserisci l'email")
      return
    }
    const { errorMessage, successMessage } = await doResetPassword(email)
    if (errorMessage) setError(errorMessage)
    if (successMessage) setSuccess(successMessage)
  }

  const handleConfirmPasswordReset = async (obj: Record<string, any>) => {
    const { password } = obj
    const { errorMessage, successMessage } = await doConfirmPasswordReset(
      oobCode,
      password
    )
    if (errorMessage) setError(errorMessage)
    if (successMessage) setSuccess(successMessage)
    setTimeout(() => navigate('/login'), 2000)
  }

  const container = {
    flexAlignItems: FlexAlignItems.CENTER,
    gap: SizesRem.L,
    width: SizeUnits.FULL,
    backgroundColor: COLORS.secondaryBg,
    padding: SizesPx.L
  }
  const modalProps = {
    modalTitle: error ? 'Errore' : 'Password Reset',
    type: error ? 'error' : 'success',
    message: error ? error : success,
    closeModal: () => (error ? setError('') : setSuccess(''))
  }

  return (
    <Container {...container}>
      {!oobCode && (
        <GeneralForm
          formData={FromType.emailStep}
          handleSubmit={handleResetPassword}
          obj={{}}
        />
      )}

      {oobCode && (
        <GeneralForm
          formData={FromType.passwordStep}
          handleSubmit={handleConfirmPasswordReset}
          obj={{}}
        />
      )}
      {(error || success) && <ModalInfoComponent {...modalProps} />}
    </Container>
  )
}

export default ResetPassword
