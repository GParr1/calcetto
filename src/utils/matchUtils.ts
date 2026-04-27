import {
  findInArrByCriteria,
  findInArrByUid,
  removeFromArrByCriteria
} from 'utils/utils'
import {
  deleteMatch,
  getAllMatches,
  saveMatch,
  updateMatch
} from 'utils/firestoreUtils'
import { Timestamp } from 'firebase/firestore'
import { AnalyzeMatch, Match, MatchResult, TeamBalance } from 'types/match'
import { User } from 'types/user'
import { Player } from 'types/player'

export const handleSaveTeam = async (match: Match, teamBalance: TeamBalance) => {
  try {
    const { id } = match
    const updated = {
      ...match,
      teamBalance
    }
    await updateMatch(id, updated)
    await getAllMatches()
  } catch (err) {
    console.error('Errore aggiunta:', err)
    alert('❌ Errore durante l’iscrizione.')
  }
}

export const handleSaveResult = async (match: Match, result: MatchResult) => {
  try {
    // // window.calcetto.toggleSpinner(true)
    const { id } = match
    const updated = {
      ...match,
      result
    }
    await updateMatch(id, updated)
    await getAllMatches()
    // // window.calcetto.toggleSpinner(false)
  } catch (err) {
    console.error('Errore aggiunta:', err)
    alert('❌ Errore durante l’iscrizione.')
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}
export const handleJoinMatch = async (match: Match, userAuth: User) => {
  try {
    const { id, tipo, players } = match
    const { user, customerInfo } = userAuth
    if (!customerInfo || !user || !id) {
      return
    }

    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${id}`)
      return
    }
    const isMaxPlayersMatch = checkMaxPlayersMatch(match)
    if (!isMaxPlayersMatch) {
      alert(
        `❌ Hai già raggiunto il numero massimo di giocatori per il calcio a ${tipo}.`
      )
      return
    }
    const playerExists = findInArrByUid(players ?? [], user.uid)
    if (playerExists) {
      return alert('Sei già iscritto!')
    }
    const { firstName, lastName, favoriteTeam, position, photoURL, overall } =
      customerInfo
    const matchPlayers = match?.players ?? ([] as Player[])

    const newPlayer = {
      id: user.uid,
      name: `${firstName} ${lastName} tt`,
      firstName,
      lastName,
      favoriteTeam,
      position,
      ...(photoURL && {photoURL}),
      //photoURL: photoURL,
      overall: overall ?? 60,
      isGuest: false
    }
    const updated = {
      ...match,
      players: [...matchPlayers, newPlayer]
    }

    await updateMatch(match.id, updated)

    await getAllMatches()
    return updated
  } catch (err) {
    console.error('Errore aggiunta:', err)
    alert('❌ Errore durante l’iscrizione.')
  } finally {
  }
}

export const getMatchById = (matchId:string, matches: Match[]) => {
  return findInArrByUid(matches, matchId)
}

export const handleRemoveMatch = async (uid: string, match: Match) => {
  try {
    if (!uid || !match.id) {
      return
    }
    const playerExists = findInArrByUid(match?.players ?? [], uid)
    if (!playerExists) {
      console.info('Il Giocatore non è nella lista')
      return
    }
    const updatedPlayers = match?.players?.filter((p: Player) => p.id !== uid) ?? []
    const updated = {
      ...match,
      players: updatedPlayers
    }
    await updateMatch(match.id, updated)
    await getAllMatches()
    return updated
  } catch (err) {
    console.error('Errore aggiunta guest:', err)
    alert('❌ Errore durante la rimozione.')
  }
}

export const handleJoinGuestMatch = async (
  matches:Match[] ,
  matchId: string,
  formObject: Player
) => {
  try {
    // // window.calcetto.toggleSpinner(true)

    const match = findInArrByUid(matches, matchId)
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`)
      return
    }
    const isMaxPlayersMatch = checkMaxPlayersMatch(match)
    if (!isMaxPlayersMatch) {
      alert(
        `❌ Hai già raggiunto il numero massimo di giocatori per il calcio a ${match.tipo}.`
      )
      return
    }
    const guestNumbers = match.players
      .filter((p:Player) => p.isGuest)
      .map((p:Player) => parseInt(p.id.replace('guest-', ''), 10))
      .filter((n:number) => !isNaN(n))
    const nextIdNumber =
      guestNumbers.length > 0 ? Math.max(...guestNumbers) + 1 : 1
    const newGuest = {
      ...formObject,
      id: `guest-${nextIdNumber}`,
      isGuest: true
    }

    const updated = {
      ...match,
      players: [...match.players, newGuest]
    }
    await updateMatch(matchId, updated)
    await getAllMatches()
    return updated
  } catch (err) {
    console.error('Errore aggiunta guest:', err)
    alert('❌ Errore durante l’aggiunta del guest.')
  }
}

export const handleRemoveGuestMatch = async (
  matches: Match[],
  matchId:string,
  formObject:Player
) => {
  try {
    // // window.calcetto.toggleSpinner(true)
    const match = findInArrByUid(matches, matchId)
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`)
      return
    }
    const { id, name } = formObject
    const criteria = { id }
    const guest = findInArrByCriteria(match.players, criteria)
    if (!guest) {
      alert(`❌ Nessun guest con il nome "${name}" trovato.`)
      return
    }

    const updatedPlayers = removeFromArrByCriteria(match.players, criteria)
    const updated = {
      ...match,
      players: updatedPlayers
    }
    await updateMatch(matchId, updated)
    alert(`✅ Guest "${name}" rimosso con successo.`)
    await getAllMatches()
    return updated
  } catch (err) {
    console.error('Errore rimozione guest:', err)
    alert('❌ Errore durante la rimozione del guest.')
  }
}
export const handleDeleteMatchUtils = async (
  matches: Match[],
  matchId: string
) => {
  try {
    const match = findInArrByUid(matches, matchId)
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`)
      return
    }
    if (window.confirm('Sei sicuro di voler eliminare questa partita?')) {
      try {
        await deleteMatch(matchId) // Aggiungi la funzione per eliminare la partita
        alert('✅ Partita eliminata con successo.')
        await getAllMatches()
      } catch (err) {
        console.error('Errore eliminazione partita:', err)
        alert('❌ Errore durante l’eliminazione della partita.')
      }
    }
  } catch (err) {
    console.error('Errore aggiunta guest:', err)
    alert('❌ Errore durante la rimozione della partita.')
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}
export const handleCreateMatchUtils = async (obj: Record<string, any>) => {
  try {
    const { campo, data, matchId, tipo } = obj

    const newMatch = {
      ...obj,
      campo, data, matchId, tipo,
      createdAt: new Date().toISOString(),
      // converto la stringa form.data in Timestamp
      dataTimestamp: Timestamp.fromDate(new Date(data)),
      players: [],
      status: 'open'
    }
    const id = await saveMatch(newMatch)
    !!id && (await getAllMatches())
  } catch (err) {
    console.error('Errore durante la creazione della partita:', err)
    alert('❌ Errore durante la creazione della partita.')
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}

export const checkMaxPlayersMatch = (match: Match) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16
  return (match?.players?.length ?? 0) < maxPlayers
}
// 🔹 Controlla se il numero massimo è raggiunto
export const checkStatusMatch = (match: Match) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16
  return ((match?.players?.length ?? 0 )>= maxPlayers) ? 'closed' : 'open'
}

export const buildDataPrediction = (
  prediction: AnalyzeMatch,
  team: 'teamA' | 'teamB'
) => {
  const { goals, passAccuracy, shots } = prediction
  const key = team === 'teamA' ? 'A' : 'B'
  return {
    name: `Squadra ${key}`,
    att: [
      {
        key: `goal-${key}`,
        label: 'Goal: ',
        value: goals[team]
      },
      {
        key: `pass-${key}`,
        label: 'Passaggi: ',
        value: `${passAccuracy[team]}%`
      },
      {
        key: `shots-${key}`,
        label: 'Tiri: ',
        value: shots[team]
      }
    ]
  }
}