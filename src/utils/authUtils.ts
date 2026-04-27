import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset
} from 'firebase/auth'
import { auth, db, facebookProvider, googleProvider } from '../firebaseConfig'
import { login, logout } from 'state/auth/reducer'
import { store } from 'state/store'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import { starterCard } from '../structure/starterCard'
import { calculateAttributes, calculatePlayerOverall } from 'utils/utils'
import { CustomerInfo, UserLogin } from 'types/user'
import { getDocSnapUserId, getDocUserId } from 'utils/firestoreUtils'



export const fetchDocProfile = async (uid: string) => {
  try {
    const userDocSnap = await getDocSnapUserId(uid)
    if (userDocSnap.exists()) {
      const doc = userDocSnap.data()
      await store.dispatch(login({ customerInfo: doc })) //Save on Redux
      return doc
    } else {
      console.warn('Profilo utente non trovato in Firestore DataBase.')
      return {}
    }
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error)
    return {}
  }
}

export const authUpdateProfile = async (customerInfoUpdate:CustomerInfo) => {
  try {
    const { currentUser } = auth
    if (!currentUser) {
      return { errorMessage: 'currentUser Not Found' }
    }
    const { uid  } = currentUser
    if (!uid) {
      return { errorMessage: 'Uid Not Found' }
    }
    await setDoc(
      getDocUserId(uid),
      {
        ...customerInfoUpdate
      },
      { merge: true }
    )
    await fetchUserData(uid)
    return { successMessage: true }
  } catch (err) {
    console.error('authUpdateProfile:', err)
    return { errorMessage: 'Non sono riuscito a aggiornare il profilo' }
  }
}
export const doSignOut = async () => {
  try {
    await signOut(auth).catch((error: any) => console.error('Logout error', error))
    store.dispatch(logout())
    return true
  } catch (err) {
    console.error('doSignOut:', err)
    return false
  } finally {
  }
}
export const handleSaveFormUser = async (obj: CustomerInfo, customerInfo: CustomerInfo) => {
  try {
    const { isNewUser, position, height, birthDate } = obj
    const formObject = obj

    const attributes = calculateAttributes({
      height,
      birthDate,
      position
    })
    const overall = calculatePlayerOverall(starterCard[0].attributes)
    // Stampa l'oggetto JSON
    console.log(JSON.stringify(formObject, null, 2))
    const customerInfoUpdate = {
      ...customerInfo,
      ...formObject,
      ...(!isNewUser && { attributes }),
      overall
    }
    console.log('Dati inseriti:', customerInfoUpdate)
    const { errorMessage, successMessage } =
      await authUpdateProfile(customerInfoUpdate)
    return { errorMessage, successMessage }
  } catch (e) {
    return { errorMessage: e }
  } finally {
  }
}
const fetchUserData = async (uid:string) => {
  const docSnap = await getDocSnapUserId(uid)
  if (docSnap.exists()) {
    console.log('Get Data to DB')
    store.dispatch(
      login({ customerInfo: docSnap.data() })
    )
  } else {
    console.log('Get Data to Login')
  }
}
export const doConfirmPasswordReset = async (oobCode: string, newPassword: string ) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword)
    return { successMessage: 'La password è stata aggiornata con successo.' }
  } catch (error: any) {
    let errorMessage = getFirebaseErrorMessage(error)
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`)
    return { errorMessage }
  }
}
export const doResetPassword = async ( email: string ) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      successMessage: 'Ti abbiamo inviato una mail per reimpostare la password.'
    }
  } catch (error: any) {
    let errorMessage = getFirebaseErrorMessage(error)
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`)
    return { errorMessage }
  } finally {
  }
}

export const doVerifyPasswordResetCode = async (code: string) => {
  try {
    const result = await verifyPasswordResetCode(auth, code)
    return { successMessage: result }
  } catch (error: any) {
    let errorMessage = 'Il link di reset è scaduto o non valido.' //getFirebaseErrorMessage(error);
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`)
    return { errorMessage }
  } finally {
  }
}
export interface DoFirebaseLoginParms {
  action: string
  email?: string
  password?: string
}
const getLoginResponse = async (props: DoFirebaseLoginParms) =>  {
  const { action, email, password } = props
  if (action === 'email' && email && password) {
    return  await signInWithEmailAndPassword(auth, email, password)
  } else if (action === 'google') {
    return await signInWithPopup(auth, googleProvider)
  } else if (action === 'facebook') {
    return await signInWithPopup(auth, facebookProvider)
  }
}

export const doFirebaseLogin = async (props: DoFirebaseLoginParms) => {
  try {
    const response = await getLoginResponse(props)
    if(response){
      const { user } = response
      await store.dispatch(login({ user }))
      await fetchDocProfile(user.uid)
      console.log('✅ Accesso riuscito:', user)
      return { successMessage: user }
    }else {
      console.log('❌ Errore login')
      return { errorMessage: "Errore login" } // se sei in React
    }
  } catch (error: any) {
    const errorMessage = getFirebaseErrorMessage(error.code)
    console.error('❌ Errore login:', error.code, errorMessage)
    return { errorMessage } // se sei in React
  }
}

const getFirebaseErrorMessage = (errorCode: string) => {
  if (!errorCode) {
    return 'Si è verificato un errore imprevisto.'
  }

  switch (errorCode) {
    // Errori comuni
    case 'auth/invalid-email':
      return "L'indirizzo email inserito non è valido o risulta già registrato."
    case 'auth/user-disabled':
      return 'Questo account è stato disabilitato.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email o password non corretta.'
    case 'auth/network-request-failed':
      return 'Errore di rete. Controlla la connessione.'

    // Errori tipici dei provider (Google, Facebook, ecc.)
    case 'auth/popup-closed-by-user':
      return 'Hai chiuso la finestra di accesso.'
    case 'auth/popup-blocked':
      return 'Il browser ha bloccato la finestra di accesso.'
    case 'auth/cancelled-popup-request':
      return 'Richiesta di accesso annullata.'
    case 'auth/account-exists-with-different-credential':
      return 'L’email è già associata a un altro metodo di accesso.'
    case 'auth/operation-not-allowed':
      return 'Metodo di login disabilitato.'
    case 'auth/too-many-requests':
      return 'Troppe richieste. Riprova più tardi.'
    case 'auth/requires-recent-login':
      return 'Devi effettuare nuovamente il login per completare questa operazione.'
    case 'auth/credential-already-in-use':
      return 'Questa credenziale è già collegata a un altro account.'
    case 'auth/invalid-credential':
      return 'Credenziale non valida.'
    case 'auth/provider-already-linked':
      return 'Questo provider è già collegato al tuo account.'
    default:
      return 'Errore di autenticazione. Riprova più tardi.'
  }
}

export const fetchAllUsers = async (limitCount = 50) => {
  try {
    const usersCollection = collection(db, 'users')
    // Ordina per overall (discendente) e limita il numero
    const q = query(
      usersCollection,
      orderBy('overall', 'desc'),
      limit(limitCount)
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      const {firstName, lastName, photoURL,overall,position,isAdmin} = data
      return {
        id: doc.id,
        firstName: firstName ?? '' ,
        lastName: lastName ?? '',
        photoURL: photoURL ?? '',
        overall: overall ?? 54,
        position: position ?? '',
      }
    })
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error)
  }
}
