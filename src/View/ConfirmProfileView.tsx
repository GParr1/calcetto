import React, { useState, ChangeEvent, FormEvent } from 'react'
import { handleSaveFormUser } from 'utils/authUtils'
import CardBronze from 'components/FifaCard/CardBronze'
import { useNavigate } from 'react-router-dom'
import GeneralForm from 'components/Form/GeneralForm'

/**
 * Tipizzazione parziale per l'oggetto utente.
 * Puoi estendere questa interfaccia in base alla struttura reale del tuo user object.
 */
interface User {
  id?: string
  name?: string
  email?: string
  customerInfo?: Record<string, any>
  userLogin?: Record<string, any>
  [key: string]: any
}

interface ConfirmProfileViewProps {
  user: User
}

/**
 * ConfirmProfileView
 * Permette all'utente di completare o modificare il proprio profilo.
 * Include una card di anteprima (CardBronze) e un form dinamico (GeneralForm).
 */
export const ConfirmProfileView: React.FC<ConfirmProfileViewProps> = ({ user }) => {
  const [dynamicValue, setDynamicValue] = useState<User>(user)
  const navigate = useNavigate()

  // Gestione input dinamico
  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    key: string,
    section: string = 'customerInfo'
  ) => {
    const value = evt.target.value
    setDynamicValue((prevValue) => ({
      ...prevValue,
      [section]: {
        ...prevValue[section],
        [key]: value,
      },
    }))
  }

  // Gestione submit del form
  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const { errorMessage, successMessage } = await handleSaveFormUser(evt, user)
    if (successMessage) {
      navigate('/dashboard', { replace: true })
    } else if (errorMessage) {
      console.error(errorMessage)
    }
  }

  return (
    <div className="d-flex flex-column w-100">
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <CardBronze enableEdit dynamicValue={dynamicValue} />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Completa il tuo profilo</h4>
              <GeneralForm
                formId="formUser"
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                labels={{ submitLabel: 'SALVA' }}
                obj={user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmProfileView
