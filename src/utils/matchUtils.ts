import {
  filterInArrByCriteria,
  findInArrByCriteria,
  findInArrByUid,
  getObjFromForm
} from 'utils/utils'
import {
  deleteMatch,
  getAllMatches,
  saveMatch,
  updateMatch
} from 'utils/firestoreUtils'
import { DEFAULT_PHOTO } from 'utils/Constant'
import { Timestamp } from 'firebase/firestore'
import { Match, MatchResult, TeamBalance } from 'types/match'
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
      ...result
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
export const handleJoinMatch = async (
  matches: Match[],
  matchId: string,
  user: User
) => {
  try {
    if (!user.customerInfo || !user.userLogin) {
      return
    }
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
    const playerExists = findInArrByUid(
      match.players,
      user.userLogin.uid ?? ''
    )
    if (playerExists) {
      return alert('Sei già iscritto!')
    }
    const {firstName, lastName, favoriteTeam, position, photoURL, overall} = user.customerInfo
    const updated = {
      ...match,
      players: [
        ...match.players,
        {
          id: user.userLogin.uid,
          firstName: firstName,
          lastName:lastName,
          favoriteTeam: favoriteTeam,
          position: position,
          photoURL:photoURL,
          overall: overall || 60
        }
      ]
    }
    await updateMatch(matchId, updated)
    await getAllMatches()
    // // window.calcetto.toggleSpinner(false)
    return updated
  } catch (err) {
    console.error('Errore aggiunta:', err)
    alert('❌ Errore durante l’iscrizione.')
  } finally {
    // // window.calcetto.toggleSpinner(false)
  }
}

export const handleRemoveMatch = async (
  matches: Match[],
  matchId: string,
  user: User
) => {
  try {
    if (!user.userLogin) {
      return
    }
    const uid = user.userLogin.uid ?? ''
    // // window.calcetto.toggleSpinner(true)
    const match = findInArrByUid(matches, matchId)
    if (!match) {
      alert(`❌ Non ho trovato la partit id: ${matchId}`)
      return
    }
    const playerExists = findInArrByUid(match.players, uid)
    if (!playerExists) {
      return
    }
    const updatedPlayers = match.players.filter(
      (p: Player) => p.id !== uid
    )
    const updated = {
      ...match,
      players: updatedPlayers
    }
    await updateMatch(matchId, updated)
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
      id: `guest-${nextIdNumber}`,
      firstName: formObject.guestName,
      photoURL: DEFAULT_PHOTO,
      overall: parseInt(formObject.guestOverall, 10),
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
    const { guestName } = formObject
    const criteria = { name: guestName, isGuest: true }
    const guest = findInArrByCriteria(match.players, criteria)
    if (!guest) {
      alert(`❌ Nessun guest con il nome "${guestName}" trovato.`)
      return
    }

    const updatedPlayers = filterInArrByCriteria(match.players, criteria)
    const updated = {
      ...match,
      players: updatedPlayers
    }
    await updateMatch(matchId, updated)
    alert(`✅ Guest "${guestName}" rimosso con successo.`)
    await getAllMatches()
    return updated
  } catch (err) {
    console.error('Errore rimozione guest:', err)
    alert('❌ Errore durante la rimozione del guest.')
  }
}
export const handleDeleteMatchUtils = async (matches:Match[], matchId:string ) => {
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
export const handleCreateMatchUtils = async (evt) => {
  try {
    const formData = new FormData(evt.target)
    const formObject = getObjFromForm({ formData })
    const newMatch = {
      ...formObject,
      createdAt: new Date().toISOString(),
      // converto la stringa form.data in Timestamp
      dataTimestamp: Timestamp.fromDate(new Date(formObject.data)),
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

export const checkMaxPlayersMatch = (match :Match) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16
  return match.players.length < maxPlayers
}
// 🔹 Controlla se il numero massimo è raggiunto
export const checkStatusMatch = (match:Match ) => {
  const maxPlayers = match.tipo === '5' ? 10 : 16
  return match.players.length >= maxPlayers ? 'closed' : 'open'
}
