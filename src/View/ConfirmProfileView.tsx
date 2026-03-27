import React, { useState, ChangeEvent, FormEvent } from 'react'
import { handleSaveFormUser } from 'utils/authUtils'
import CardBronze from 'components/FifaCard/CardBronze'
import { useNavigate } from 'react-router-dom'
import GeneralForm from 'components/Form/GeneralForm'
import { View, Text } from 'react-native';
import { ContainerProps } from 'styles';
import { useResponsiveStyle } from 'styles/styles.utils';
import { COLORS } from 'components/constantStyle';
import { CustomerInfo } from 'types/user';
import ImageModal from 'components/FifaCard/ImageModal';
import { dataURLtoFile } from 'components/FifaCard/utils';
import { uploadImage } from 'utils/utils';
import Loader from 'components/core/Loader';

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
  const { getResponsiveStyle } = useResponsiveStyle();
  const {customerInfo} = user
  const [dynamicValue, setDynamicValue] = useState<CustomerInfo>(customerInfo ?? {})
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  const responsiveMainContainer = getResponsiveStyle({
    flexDirection: ['row'],
    flexWrap: ['wrap'],
    paddingTop: [24],
    gap:[24],
    alignItems: [ContainerProps.alignCenter],
  })

  const trasformDinamicValue = () => {

  }
  // Gestione input dinamico
  const handleChange = (obj: Record<string, any>) => {
    setDynamicValue({...customerInfo,...obj})
  }



  // Gestione input dinamico
  const editImage = () => {
    setVisible(true)
    console.log('editImage')
  }

  // Gestione submit del form
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const base64 = dynamicValue.photoURL
      const file = dataURLtoFile(base64, 'profile.png')
      const { result } = await uploadImage({
        user,
        file,
        isDragAndDrop: false
      })
      const updateDynamicValue = {...dynamicValue, photoURL:result}

      const { errorMessage, successMessage } = await handleSaveFormUser(updateDynamicValue, customerInfo)
      if (successMessage) {
        navigate('/dashboard', { replace: true })
      } else if (errorMessage) {
        console.error(errorMessage)
      }
    }finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Loader visible={loading}/>
      {visible && <ImageModal visible={visible} setVisible={setVisible} handleChange={handleChange}/>}
      <View  style={{...responsiveMainContainer}}>

        <View style={{
          flex: 1,
          marginRight: 8,
          alignItems: 'center',
          minWidth: '45%',
        }}>
          <CardBronze scale={0.7} enableEdit={{ editImage }} dynamicValue={dynamicValue} />
        </View>
        <View style={{
          flex: 1,
          marginLeft: 8,
          minWidth: '45%',
        }}>
          <View style={{
            backgroundColor: COLORS.secondaryBg,
            gap: 24,
            paddingVertical: 24,
            alignItems: 'center',
            borderRadius: 8,
            borderColor: COLORS.primaryColor,
            paddingHorizontal: 16,
            shadowColor: 'rgba(7, 244, 104, 1)',
            shadowOpacity: 0.4,
            shadowRadius: 15,
          }}>
            <Text style={{ color:COLORS.primaryText, paddingHorizontal:16,
              fontSize: 28,
              fontWeight: 600,
            }} >Completa il tuo profilo</Text>

            <GeneralForm
              formId="formUser"
              handleChangeInput={handleChange}
              handleSubmit={handleSubmit}
              labels={{ submitLabel: 'SALVA' }}
              obj={customerInfo}
            />
          </View>
        </View>
      </View>
    </>

  )
}

export default ConfirmProfileView
