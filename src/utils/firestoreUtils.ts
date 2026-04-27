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
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { doSetMatches } from 'state/support/operations'
import { checkStatusMatch } from 'utils/matchUtils'
import { balanceTeams } from 'utils/utils'
import { Match } from 'types/match'

/* ---------------------------------- */
/* 🔹 Helpers */
/* ---------------------------------- */

const usersRef = collection(db, 'users')
const matchesRef = collection(db, 'matches')

export const getUserRef = (uid: string) => doc(usersRef, uid)
export const getMatchRef = (id: string) => doc(matchesRef, id)

/* ---------------------------------- */
/* 🔹 READ */
/* ---------------------------------- */

export const getUser = async (uid: string) => {
  const snap = await getDoc(getUserRef(uid))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export const getAllMatches = async (): Promise<Match[]> => {
  const snapshot = await getDocs(matchesRef)

  const matches = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Match[]

  doSetMatches(matches)
  return matches
}

export const getFutureMatches = async (): Promise<Match[]> => {
  const now = Timestamp.now()

  const q = query(
    matchesRef,
    where('dataTimestamp', '>', now),
    orderBy('dataTimestamp', 'asc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Match[]
}

export const getPastMatches = async (): Promise<Match[]> => {
  const now = Timestamp.now()

  const q = query(
    matchesRef,
    where('dataTimestamp', '<', now),
    orderBy('dataTimestamp', 'desc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Match[]
}

/* ---------------------------------- */
/* 🔹 WRITE */
/* ---------------------------------- */

export const saveMatch = async (match: Match) => {
  const ref = doc(matchesRef)
  await setDoc(ref, match)
  return ref.id
}

export const updateMatch = async (matchId: string, match: Match) => {
  const status = checkStatusMatch(match)
  const { teamA, teamB } = balanceTeams(match.players || [])

  const updatedMatch: Partial<Match> = {
    ...match,
    status,
    teamBalance: { teamA, teamB }
  }

  await updateDoc(getMatchRef(matchId), updatedMatch)
}

export const deleteMatch = async (matchId: string) => {
  await deleteDoc(getMatchRef(matchId))
}

/* ---------------------------------- */
/* 🔹 UTILS */
/* ---------------------------------- */

export const getMatchesByPlayerId = (matches: Match[], playerId: string) => {
  return matches.filter((match) =>
    match.players?.some((p) => p.id === playerId)
  )
}

export const getDocSnapUserId = async (uid: string) => {
  return await getDoc(getDocUserId(uid))
}
export const getDocMatchId = (matchId: string) => {
  return doc(db, 'matches', matchId)
}
export const getDocUserId = (uid: string) => {
  return doc(db, 'users', uid)
}