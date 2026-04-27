import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doFirebaseLogin } from 'utils/authUtils'
import { emailRegex, phoneRegex } from 'utils/regex'
import { manageFirstLogin } from 'utils/utils'
import LoginStepEmail from 'components/Auth/Login/LoginStepEmail';
import LoginStepPassword from 'components/Auth/Login/LoginStepPassword';
import { LoginLabelsProps } from 'properties/authView'

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
  const { errors } = LoginLabelsProps
  const handleSetEmail = (obj:Record<string, any>) => {
    const emailOrPhone = obj.email?.trim()
    if (!emailOrPhone) {
      setError(errors.emailOrPhone)
      return
    }
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError(errors.invalidRegex)
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
        email: obj.email,
        password: obj.password
      })

      if (errorMessage) {
        setError(errorMessage)
      } else if (successMessage) {
        navigate(manageFirstLogin(), { replace: true })
      }
    } catch (err) {
      console.error(err)
      setError(errors.generic)
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
