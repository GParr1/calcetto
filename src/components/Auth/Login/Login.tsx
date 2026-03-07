import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doFirebaseLogin } from 'utils/authUtils'
import { emailRegex, phoneRegex } from 'utils/regex'
import { manageFirstLogin } from 'utils/utils'
import LoginStepEmail from 'components/Auth/Login/LoginStepEmail';
import LoginStepPassword from 'components/Auth/Login/LoginStepPassword';

interface LoginProps {
  setError: (error: string) => void
  setSuccess: (error: string) => void
}
/**
 * Component Login 2 Step (email → password)
 */
const Login: React.FC<LoginProps> = ({setError,setSuccess}) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const handleSetEmail = (obj:Record<string, any>) => {
    const emailOrPhone = obj.email?.trim()
    if (!emailOrPhone) {
      setError("Inserisci un numero di telefono o un'email.")
      return
    }
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Formato non valido. Inserisci un'email o un numero corretto.")
      return
    }
    setError('')
    setEmail(emailOrPhone)
    setStep(2)
  }
  const handleLogin = async (obj: Record<string, any>) => {
    try {
      const { errorMessage, successMessage } = await doFirebaseLogin({
        action: obj.action,
        options: { email: obj.email, password: obj.password }
      })

      if (errorMessage) {
        setError(errorMessage)
      } else if (successMessage) {
        navigate(manageFirstLogin(), { replace: true })
      }
    } catch (err) {
      console.error('Errore durante il login:', err)
      setError('Errore imprevisto durante il login.')
    }
  }

  const handleBack = () => setStep(1)

  const loginStepEmailProps = {
    handleLogin,
    handleSetEmail
  }
  const loginStepPasswordProps = {
    handleLogin,
    handleBack,
    email
  }
  return (
    <>
      {step === 1 && (
        <LoginStepEmail {...loginStepEmailProps}/>
      )}
      {step === 2 && (
        <LoginStepPassword {...loginStepPasswordProps}/>
      )}
    </>
  )
}

export default Login
