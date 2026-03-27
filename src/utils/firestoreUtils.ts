import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { doSetMatches } from 'state/support/operations'
import { checkStatusMatch } from 'utils/matchUtils'
import { balanceTeams } from 'utils/utils'
import { Match, MatchInfo } from 'types/match'

export const getDocUserId = (uid: string) => {
  return doc(db, 'users', uid)
}
export const getDocMatchId = (matchId: string) => {
  return doc(db, 'matches', matchId)
}
export const getDocSnapUserId = async (uid: string) => {
  return await getDoc(getDocUserId(uid))
}
export const getDocsAllByPath = async (path: string) => {
  return await getDocs(collection(db, path))
}

export const saveMatch = async (match: Match) => {
  const ref = doc(collection(db, 'matches'))
  await setDoc(ref, match)
  return ref.id
}

export const deleteMatch = async (matchId: string) => {
  try {
    const matchRef = getDocMatchId(matchId) // Ottieni il riferimento al documento della partita
    await deleteDoc(matchRef) // Elimina il documento corrispondente
    console.log(`Partita con ID ${matchId} eliminata con successo.`)
  } catch (error) {
    console.error("Errore durante l'eliminazione della partita:", error)
    throw new Error("Errore durante l'eliminazione della partita.")
  }
}

export const getAllMatches = async () => {
  const snapshot = await getDocsAllByPath("matches")
  const listMatches = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  await doSetMatches(listMatches)
}
export const getMatchesByPlayerId = (matches: Match[], playerId:string) => {
  return matches.filter((match) =>
    match.players?.some((player) => player.id === playerId)
  )
}
export const getFutureMatches = async () => {
  const today = new Date()
  const q = query(
    collection(db, 'matches'),
    where('dataTimestamp', '>', today), // campo Timestamp
    orderBy('dataTimestamp', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const getPastMatches = async () => {
  const now = new Date().toISOString()
  const q = query(
    collection(db, 'matches'),
    where('data', '<', now),
    orderBy('data', 'desc') // ordina dalla più recente alla più vecchia
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const updateMatch = async (matchId:string, data: any) => {
  const status = checkStatusMatch({ match: data })
  const { teamA, teamB } = balanceTeams(data.players)
  data = { ...data, status, teamBalance: { teamA, teamB } }
  const ref = getDocMatchId(matchId)
  await updateDoc(ref, data)
}
