import { auth, db, facebookProvider, googleProvider } from '../../firebaseConfig'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  verifyPasswordResetCode
} from 'firebase/auth'
import { store } from 'state/store'
import { login,logout } from 'state/auth/reducer'
import { CustomerInfo, User,PlayerAttributes } from 'src/types'
import { AuthUpdateProfileParams, FirebaseLoginParams, UserSummary, Result } from './authType';
import { confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';
import {getObjFormFromEvt,calculateAttributes,calculatePlayerOverall} from "utils/utils"

export const fetchDocProfile = async (
  userUid: string
): Promise<CustomerInfo | {}> => {
  try {
    const userDocRef = doc(db, 'users', userUid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const doc = userDocSnap.data() as CustomerInfo
      await store.dispatch(login({ customerInfo: doc })) // Salva su Redux
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
export const authUpdateProfile = async (
  userObj: User
): Promise<Result> => {
  try {
    const { userLogin, customerInfo } = userObj
    const user = auth.currentUser
    if (!user) throw new Error('Nessun utente autenticato')

    if (!userLogin.displayName) {
      await updateProfile(user, {
        displayName: `${customerInfo.firstName} ${customerInfo.lastName}`
      })
    }

    await setDoc(
      doc(db, 'users', userLogin.uid),
      { ...customerInfo },
      { merge: true } // merge evita di sovrascrivere completamente il documento
    )

    await fetchUserData({ currentUser: userLogin })
    return { successMessage: true }
  } catch (err) {
    console.error('authUpdateProfile:', err)
    return { errorMessage: 'Non sono riuscito a aggiornare il profilo' }
  }
}

export const doSignOut = async (): Promise<boolean> => {
  // // window.calcetto.toggleSpinner(true)

  try {
    await auth.signOut().catch((error) => console.error('Logout error', error))
    store.dispatch(logout())
    return true
  } catch (err) {
    console.error('doSignOut:', err)
    return false
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}
export const handleSaveFormUser = async (
  evt: React.FormEvent<HTMLFormElement>,
  user: User
): Promise<Result> => {
  // // window.calcetto.toggleSpinner(true)
  try {
    evt.preventDefault()
    const formObject = getObjFormFromEvt(evt)
    const isNewUser = formObject.isNewUser === 'true'
    const position = formObject.position || ''

    const attributes = calculateAttributes({
      height: formObject.height,
      birthDate: formObject.birthDate,
      position
    })

    const overall = calculatePlayerOverall(attributes) // sostituito starterCard[0].attributes per sicurezza

    console.log(JSON.stringify(formObject, null, 2))

    const userObj = {
      userLogin: { ...user.userLogin },
      customerInfo: {
        ...user.customerInfo,
        ...formObject,
        ...(!isNewUser && { attributes }),
        overall
      }
    }

    console.log('Dati inseriti:', userObj)

    const { errorMessage, successMessage } = await authUpdateProfile(userObj)
    return { errorMessage, successMessage }
  } catch (e: any) {
    return { errorMessage: e?.message || String(e) }
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}

export const fetchUserData = async ({ currentUser }: { currentUser: any }) => {
  const docRef = doc(db, 'users', currentUser.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Get Data to DB')
    store.dispatch(
      login({ userLogin: currentUser, customerInfo: docSnap.data() as CustomerInfo })
    )
  } else {
    console.log('Get Data to Login')
    store.dispatch(login({ userLogin: currentUser, customerInfo: {} }))
  }
}
export const doConfirmPasswordReset = async ({ oobCode, newPassword }) => {
  // // window.calcetto.toggleSpinner(true)
  try {
    await confirmPasswordReset(auth, oobCode, newPassword)
    return { successMessage: 'La password è stata aggiornata con successo.' }
  } catch (error) {
    let errorMessage = getFirebaseErrorMessage(error)
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`)
    return { errorMessage }
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}
export const doResetPassword = async ({ email }) => {
  // // window.calcetto.toggleSpinner(true)
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      successMessage: 'Ti abbiamo inviato una mail per reimpostare la password.'
    }
  } catch (error) {
    let errorMessage = getFirebaseErrorMessage(error)
    console.error(`'Errore code: ${error.code}, messagre: ${error.message}`)
    return { errorMessage }
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}
export const doVerifyPasswordResetCode = async ({
                                                  code
                                                }: {
  code: string
}): Promise<Result> => {
  // // window.calcetto.toggleSpinner(true)
  try {
    const result = await verifyPasswordResetCode(auth, code)
    return { successMessage: !!result }
  } catch (error: any) {
    const errorMessage = 'Il link di reset è scaduto o non valido.'
    console.error(`Errore code: ${error?.code}, message: ${error?.message}`)
    return { errorMessage }
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}

export const doFirebaseLogin = async ({
                                        action,
                                        options
                                      }: FirebaseLoginParams): Promise<Result> => {
  //window?.calcetto?.toggleSpinner(true)
  try {
    let result: any

    if (action === 'email') {
      if (!options?.email || !options?.password)
        throw new Error('Email e password richieste')
      result = await signInWithEmailAndPassword(
        auth,
        options.email,
        options.password
      )
    } else if (action === 'google') {
      result = await signInWithPopup(auth, googleProvider)
    } else if (action === 'facebook') {
      result = await signInWithPopup(auth, facebookProvider)
    } else {
      throw new Error(`Provider non supportato: ${action}`)
    }

    const userLogin = result.user
    await store.dispatch(login({ userLogin }))
    await fetchDocProfile(userLogin.uid)
    console.log('✅ Accesso riuscito:', userLogin)
    return { successMessage: userLogin }
  } catch (error: any) {
    const errorMessage = getFirebaseErrorMessage(error)
    console.error('❌ Errore login:', error?.code, errorMessage)
    return { errorMessage }
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}
export const getFirebaseErrorMessage = (error: any): string => {
  if (!error || !error.code) return 'Si è verificato un errore imprevisto.'

  switch (error.code) {
    case 'auth/invalid-email':
      return "L'indirizzo email inserito non è valido o risulta già registrato."
    case 'auth/user-disabled':
      return 'Questo account è stato disabilitato.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email o password non corretta.'
    case 'auth/network-request-failed':
      return 'Errore di rete. Controlla la connessione.'
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

interface CreateUserParams {
  account: {
    email: string
    password: string
    [key: string]: any
  }
  customerInfo: CustomerInfo
}

interface FirebaseResponse {
  successMessage?: User
  errorMessage?: string
}

export const doCreateUserWithEmailAndPassword = async ({
                                                         account,
                                                         customerInfo
                                                       }: CreateUserParams): Promise<Result> => {
  // // window.calcetto.toggleSpinner(true)
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      account.email,
      account.password
    )

    const { errorMessage } = await authUpdateProfile({userLogin:result.user,customerInfo})
    if (errorMessage) return { errorMessage }

    return { successMessage: !!result.user }
  } catch (error: any) {
    const errorMessage = getFirebaseErrorMessage(error)
    console.error(`Errore code: ${error?.code}, message: ${error?.message}`)
    return { errorMessage }
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}

export const DEFAULT_PHOTO = '/app1/assets/default-avatar.png'

export const fetchAllUsers = async (limitCount = 50): Promise<UserSummary[]> => {
  // // window.calcetto.toggleSpinner(true)
  try {
    const usersCollection = collection(db, 'users')
    const q = query(usersCollection, orderBy('overall', 'desc'), limit(limitCount))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        photoURL: data.photoURL || DEFAULT_PHOTO,
        overall: data.overall || 54,
        position: data.position || ''
      }
    })
  } catch (error) {
    console.error('Errore nel recupero del profilo:', error)
    return []
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}