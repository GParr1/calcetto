import { v4 as uuidv4 } from 'uuid'
import { BRONZE_CARD_BG, GOLD_CARD_BG, SILVER_CARD_BG } from 'utils/Constant'
import {
  FORM_ADD_GUEST,
  FORM_CREATE_MATCH,
  FORM_EMAIL_STEP,
  FORM_PASSWORD_STEP,
  FORM_REGISTER_STEP_1,
  FORM_REGISTER_STEP_2,
  FORM_REMOVE_GUEST,
  FORMUSER
} from '../structure/formUser'
import { authUpdateProfile } from 'utils/authUtils'
import {
  Player,
  PlayerAttributes,
  GoalkeeperAttributes,
  TeamBalance,
  MatchAnalysis,
  FormId,
  FormStructure,
  FormObject,
  GetObjFromFormParams,
  UploadImageParams,
  UploadImageResult,
  CalculateAttributesParams,
  Attributes
} from 'src/types'
import { store } from 'state/store'
import { RootState } from 'state/store'
import { getUser } from 'state/auth/selectors'
import { Assets } from 'assets/assets';
import { ImageSourcePropType } from 'react-native';

/* ------------------- Utils Generali ------------------- */

/**
 * Restituisce giorno e ora separati da una data
 * @param value string | Date
 * @param locale default 'it-IT'
 */
export const formatDateTime = (
  value: string | Date,
  locale: string = 'it-IT'
): { date: string; time: string } => {
  const dateObj = new Date(value)

  return {
    date: dateObj.toLocaleDateString(locale),
    time: dateObj.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
/**
 * Rimuove eventuali parametri dall'URL mantenendo solo il path
 */
export const cleanUrlParamiter = (): void => {
  const url = new URL(window.location.href)
  window.history.replaceState({}, '', url.pathname)
}

/**
 * Maschera un'email mostrando solo le prime 2 lettere
 */
export const maskEmail = (email: string): string => {
  const [name, domain] = email.split('@')
  if (!name || !domain) return email
  return `${name.slice(0, 2)}${'*'.repeat(5)}@${domain}`
}

/**
 * Gestisce il redirect al primo login
 */
export const manageFirstLogin = (): string => {
  const user = {customerInfo:{}}//getUser(store.getState())
  return user.customerInfo ? '/profile' : '/confirm-profile'
}

/* ------------------- Form ------------------- */

/**
 * Restituisce la struttura di un form dato il suo id
 */
export const getFormStructure = (formId: FormId): FormStructure => {
  switch (formId) {
    case 'formUser': return FORMUSER
    case 'email-step':
    case 'resetPassword': return FORM_EMAIL_STEP
    case 'password-step':
    case 'resetPassword-step-password': return FORM_PASSWORD_STEP
    case 'register-step-1': return FORM_REGISTER_STEP_1
    case 'register-step-2': return FORM_REGISTER_STEP_2
    case 'createMatch': return FORM_CREATE_MATCH
    case 'addGuest': return FORM_ADD_GUEST
    case 'removeGuest': return FORM_REMOVE_GUEST
    default: return { fields: [] }
  }
}

/**
 * Converte FormData in oggetto e gestisce la data di nascita
 */
const manageBirthDateDay = ({ formObject }: { formObject: FormObject }): void => {
  if (formObject.birthDate_day && formObject.birthDate_month && formObject.birthDate_year) {
    formObject.birthDate = `${formObject.birthDate_day.padStart(2, '0')}/${formObject.birthDate_month.padStart(2, '0')}/${formObject.birthDate_year}`
    delete formObject.birthDate_day
    delete formObject.birthDate_month
    delete formObject.birthDate_year
  }
}
export const getObjFromForm = ({ formData }: GetObjFromFormParams): FormObject => {
  const formObject: FormObject = {}

  formData.forEach((value, key) => {
    if (formObject[key]) {
      Array.isArray(formObject[key]) ? formObject[key].push(value) : formObject[key] = [formObject[key], value]
    } else {
      formObject[key] = value
    }
  })

  manageBirthDateDay({ formObject })
  return formObject
}

export const getObjFormFromEvt = (evt: React.FormEvent<HTMLFormElement> | any): Record<string, any> => {
  return evt.target instanceof HTMLFormElement ? getObjFromForm({ formData: new FormData(evt.target) }) : {}
}

/* ------------------- Player & Team ------------------- */

/**
 * Calcola l'overall di un giocatore outfield
 */
export const calculatePlayerOverall = (attrs: Attributes): number => {
  const { VEL, TIR, PAS, DRI, DIF, FIS } = attrs
  return Math.round((VEL + TIR + PAS + DRI + DIF + FIS) / 6)
}

/**
 * Calcola l'overall di un portiere
 */
export const calculateGoalkeeperOverall = (attrs: GoalkeeperAttributes): number => {
  const { PAR, RIF, POS, VEL, TEC, RES } = attrs
  return Math.round(PAR * 0.3 + RIF * 0.25 + POS * 0.2 + VEL * 0.1 + TEC * 0.1 + RES * 0.05)
}

/**
 * Divide i giocatori in 2 squadre equilibrate
 */
export const balanceTeams = (players: Player[] = []): TeamBalance => {
  if (!players.length) return { teamA: [], teamB: [] }
  const sorted = [...players].sort((a, b) => b.overall - a.overall)
  const teamA: Player[] = []
  const teamB: Player[] = []
  sorted.forEach(p => {
    const sumA = teamA.reduce((s, x) => s + x.overall, 0)
    const sumB = teamB.reduce((s, x) => s + x.overall, 0)
    sumA <= sumB ? teamA.push(p) : teamB.push(p)
  })
  return { teamA, teamB }
}

/**
 * Restituisce gli id dei giocatori di una squadra
 */
export const getTeamIds = (team: Player[] = []): string[] => team.map(p => p.id)

/**
 * Analizza una partita tra due squadre
 */
export const analyzeMatch = (teamA: Player[], teamB: Player[]): MatchAnalysis | null => {
  if (!teamA.length || !teamB.length) return null
  const avgA = teamA.reduce((s, x) => s + x.overall, 0) / teamA.length
  const avgB = teamB.reduce((s, x) => s + x.overall, 0) / teamB.length
  const totalAvg = avgA + avgB
  const possessionA = Math.round((avgA / totalAvg) * 100)
  const possessionB = 100 - possessionA
  const passAccuracyA = Math.round(Math.random() * 25 + 70 * (avgA / 90))
  const passAccuracyB = Math.round(Math.random() * 25 + 70 * (avgB / 90))
  const shotsA = Math.max(1, Math.round(Math.random() * 7 + 3 * (avgA / 90)))
  const shotsB = Math.max(1, Math.round(Math.random() * 7 + 3 * (avgB / 90)))
  const shotsOnTargetA = Math.round(shotsA * (0.5 + Math.random() * 0.2))
  const shotsOnTargetB = Math.round(shotsB * (0.5 + Math.random() * 0.2))
  const expectedGoalsA = Math.round(shotsOnTargetA * (avgA / (avgA + avgB)) * (0.6 + Math.random() * 0.2))
  const expectedGoalsB = Math.round(shotsOnTargetB * (avgB / (avgA + avgB)) * (0.6 + Math.random() * 0.2))
  const winner: 'Squadra A' | 'Squadra B' | 'Pareggio' =
    expectedGoalsA > expectedGoalsB ? 'Squadra A' : expectedGoalsB > expectedGoalsA ? 'Squadra B' : 'Pareggio'

  return {
    possession: { teamA: possessionA, teamB: possessionB },
    passAccuracy: { teamA: passAccuracyA, teamB: passAccuracyB },
    shots: { teamA: shotsA, teamB: shotsB },
    shotsOnTarget: { teamA: shotsOnTargetA, teamB: shotsOnTargetB },
    goals: { teamA: expectedGoalsA, teamB: expectedGoalsB },
    winner
  }
}

/**
 * Trova un giocatore per uid
 */
export const findInArrByUid = (arr: Player[], uid: string): Player | undefined =>
  arr.find(p => p.id === uid)

/**
 * Trova un giocatore in base a criteri
 */
export const findInArrByCriteria = (arr: Player[], criteria: Partial<Player>): Player | undefined =>
  arr.find(p => Object.keys(criteria).every(key => p[key as keyof Player] === criteria[key as keyof Player]))

/**
 * Filtra giocatori in base a criteri
 */
export const filterInArrByCriteria = (arr: Player[], criteria: Partial<Player>): Player[] =>
  arr.filter(p => Object.keys(criteria).every(key => p[key as keyof Player] === criteria[key as keyof Player]))

/**
 * Genera due squadre bilanciate in base all'overall
 */
export const generaSquadreBilanciate = (giocatori: Player[], tipo = 5): TeamBalance => {
  const shuffled = [...giocatori].sort(() => Math.random() - 0.5)
  const sorted = shuffled.sort((a, b) => b.overall - a.overall)
  const teamA: Player[] = []
  const teamB: Player[] = []
  sorted.forEach((p, i) => {
    if (teamA.length < tipo / 2 && (i % 2 === 0 || teamB.length >= tipo / 2)) teamA.push(p)
    else teamB.push(p)
  })
  return { teamA, teamB }
}

/* ------------------- Card ------------------- */

export const getCardTier = (overall: number): ImageSourcePropType  => {
  if (overall < 65) return Assets.BRONZE_CARD_BG
  if (overall < 80) return Assets.SILVER_CARD_BG
  return Assets.GOLD_CARD_BG
}
// export const removeBackground = async imgFile => {
//   if (!window.removeBgPipeline) {
//     console.error('Il modello non è stato inizializzato');
//     return null;
//   }
//
//   // Converti File in un URL
//   const imgUrl = URL.createObjectURL(imgFile);
//
//   try {
//     // Esegui la rimozione dello sfondo
//     const result = await window.removeBgPipeline(imgUrl);
//
//     // `result` contiene il canvas o immagine processata
//     // Converti in Blob/File
//     const canvas = result[0].maskCanvas; // dipende dal modello
//     return new Promise(resolve => {
//       canvas.toBlob(blob => {
//         resolve(new File([blob], `cleaned-${Date.now()}.png`, { type: 'image/png' }));
//       });
//     });
//   } catch (error) {
//     console.error('Errore nella rimozione dello sfondo:', error);
//     return null;
//   }
// };

// export const removeBackground = async (imgFile: File): Promise<File | null> => {
//   try {
//     const imageElement = await new Promise<HTMLImageElement>((resolve, reject) => {
//       const img = new Image()
//       img.src = URL.createObjectURL(imgFile)
//       img.crossOrigin = 'anonymous'
//       img.onload = () => resolve(img)
//       img.onerror = reject
//     })
//
//     // Segmenta la persona (mask = 1 per persona, 0 per sfondo)
//     // @ts-ignore: window.net potrebbe non avere tipizzazione
//     const segmentation = await window.net.segmentPerson(imageElement, {
//       internalResolution: 'high',
//       segmentationThreshold: 0.7, // più stringente, sfondo più pulito
//       maxDetections: 1
//     })
//
//     const canvas = document.createElement('canvas')
//     canvas.width = imageElement.width
//     canvas.height = imageElement.height
//     const ctx = canvas.getContext('2d')
//     if (!ctx) throw new Error('Impossibile ottenere il contesto del canvas')
//
//     ctx.drawImage(imageElement, 0, 0)
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//     const pixel = imageData.data
//
//     for (let i = 0; i < segmentation.data.length; i++) {
//       if (segmentation.data[i] === 0) {
//         pixel[i * 4 + 3] = 0 // Sfondo trasparente
//       }
//     }
//     ctx.putImageData(imageData, 0, 0)
//
//     const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
//     if (!blob) return null
//
//     return new File([blob], `cleaned-${Date.now()}.png`, { type: 'image/png' })
//   } catch (err) {
//     console.error('Errore nella rimozione sfondo locale:', err)
//     return null
//   }
// }


// export const removeBackground = async (imgFile) => {
//   try {
//     const response = await fetch('https://api.remove.bg/v1.0/removebg', {
//       method: 'POST',
//       headers: {
//         'X-Api-Key': 'i4L41YsoE4jvHSofw5RcWNZM', // <-- API key
//       },
//       body: formData,
//     });
//
//     if (!response.ok) {
//       console.error('Errore nella chiamata a remove.bg', response.statusText);
//       return null;
//     }
//
//     const blob = await response.blob();
//     return new File([blob], `cleaned-${Date.now()}.png`, {
//       type: 'image/png',
//     });
//   } catch (error) {
//     console.error('Errore nella rimozione dello sfondo:', error);
//     return null;
//   }
// };

/* ------------------- Background & Upload ------------------- */

export const removeBackground = async (imgFile: File): Promise<File | null> => {
  try {
    const imageElement = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(imgFile)
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
    })
    // @ts-ignore
    const segmentation = await window.net.segmentPerson(imageElement, { internalResolution: 'high', segmentationThreshold: 0.7, maxDetections: 1 })
    const canvas = document.createElement('canvas')
    canvas.width = imageElement.width
    canvas.height = imageElement.height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Impossibile ottenere il contesto del canvas')
    ctx.drawImage(imageElement, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixel = imageData.data
    for (let i = 0; i < segmentation.data.length; i++) {
      if (segmentation.data[i] === 0) {
        pixel[i * 4 + 3] = 0 // Sfondo trasparente
      }
    }
    ctx.putImageData(imageData, 0, 0)

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return null

    return new File([blob], `cleaned-${Date.now()}.png`, { type: 'image/png' })
  } catch (err) {
    console.error('Errore nella rimozione sfondo locale:', err)
    return null
  }
}


/**
 * Upload dell'immagine su Cloudinary e aggiornamento profilo
 */
export const uploadImage = async ({
                                    user,
                                    file,
                                    isDragAndDrop
                                  }: UploadImageParams): Promise<UploadImageResult> => {
  // window.calcetto.toggleSpinner(true)
  try {
    const { userLogin, customerInfo } = user
    const cleanedFile = isDragAndDrop ? await removeBackground(file) : file
    const uploadFile = cleanedFile || file

    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('upload_preset', 'app-calcetto')
    formData.append('folder', 'profilePictures')
    formData.append('public_id', `${userLogin.uid}-${uuidv4()}`)

    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/dehfdnxul/image/upload`
    const response = await fetch(UPLOAD_URL, { method: 'POST', body: formData })

    if (!response.ok) {
      console.error('Errore nella chiamata upload image', response.statusText)
      return { errorMessage: 'Upload fallito' }
    }

    const data: { secure_url: string } = await response.json()
    const updatedUser = {
      ...user,
      userLogin,
      customerInfo: { ...customerInfo, photoURL: data.secure_url }
    }

    const { errorMessage } = await authUpdateProfile(updatedUser)
    if (errorMessage) return { errorMessage }

    return { successMessage: 'Profilo aggiornato con successo!' }
  } catch (error) {
    console.error('Errore nell\'upload dell\'immagine:', error)
    return { errorMessage: 'Upload fallito' }
  } finally {
    // window.calcetto.toggleSpinner(false)
  }
}

/* ------------------- Calcolo Attributi Giocatore ------------------- */

/**
 * Calcola gli attributi di un giocatore in base a altezza, età e ruolo
 */
export function calculateAttributes({
                                      height,
                                      birthDate,
                                      position
                                    }: CalculateAttributesParams): Attributes {
  const birth = new Date(birthDate)
  const age = Math.max(15, Math.min(45, new Date().getFullYear() - birth.getFullYear()))
  const heightFactor = Math.max(0, Math.min(1, (height - 150) / 50))
  const isGoalkeeper = position === 'POR'

  const base: Attributes = isGoalkeeper
    ? { VEL: 30, TIR: 20, PAS: 40, DRI: 35, DIF: 40, FIS: 60, RES: 55, TEC: 45, POS: 65, VIZ: 60, RIF: 70, PAR: 75 }
    : { VEL: 60, TIR: 55, PAS: 55, DRI: 60, DIF: 50, FIS: 55, RES: 60, TEC: 55, POS: 55, VIZ: 55, RIF: 50, PAR: 25 }

  const ageFactor = age < 20 ? 1.1 : age > 35 ? 0.9 : 1
  const physFactor = 1 + (heightFactor - 0.5) * 0.2

  const positionBonus: Attributes = ({
    ATT: { TIR: 10, DRI: 5, VEL: 5 },
    DC: { DIF: 10, FIS: 8, VEL: -5 },
    CC: { PAS: 10, RES: 5, TEC: 5 },
    AD: { VEL: 8, DRI: 8, TIR: 3 },
    AS: { VEL: 8, DRI: 8, TIR: 3 },
    POR: { PAR: 15, RIF: 10, POS: 5 }
  }[position] || {})

  return Object.fromEntries(
    Object.entries(base).map(([key, value]) => {
      const bonus = positionBonus[key] || 0
      const random = Math.random() * 4 - 2
      const adjusted = value * ageFactor * physFactor + bonus + random
      return [key, Math.round(Math.max(20, Math.min(99, adjusted)))]
    })
  )
}