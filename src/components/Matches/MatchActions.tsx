import React, { useState } from 'react'
import { findInArrByUid } from 'utils/utils'
import { SVGClose } from 'components/SVG/SVGClose'
import { checkMaxPlayersMatch, handleSaveResult } from 'utils/matchUtils'
import {User} from 'types/user';
import {Match} from 'types/match';
import OverlayBackdrop from 'components/Modal/OverlayBackdrop'
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button';
import { btnSecondaryDefault, UITextProps } from 'styles';
import { Text, TextInput, View } from 'react-native';
import { COLORS } from 'components/constantStyle';
import { ModalMode } from 'components/Matches/MatchList';

interface MatchActionsProps {
  match: Match
  user: User
  handleJoin: (matchId: string) => void
  openModal: (mode: ModalMode, matchId: string | null) => void


  // handleRemove: (matchId: string) => void
    // handleDeleteMatch: (matchId: string) => void
    // openDetailOverlay: (match: Match, closeDetail: () => void) => void
    // closeDetailOverlay: () => void
    // openModal: (modalType: 'addGuest' | 'removeGuest', matchId: string) => void
}

// ✅ Tipi per overlay dettaglio
interface DetailOverlay {
  show: boolean
  match: Match | null
  closeDetailOverlay: (() => void) | null
}
const MatchActions: React.FC<MatchActionsProps> = ({
                                                     match,
                                                     user,
                                                     handleJoin,
                                                     //handleRemove,
                                                     //handleDeleteMatch,
                                                     openModal
                                                   }) => {
  // Stato per overlay di dettaglio
  const [detailOverlay, setDetailOverlay] = useState<DetailOverlay>({
    show: false,
    match: null,
    closeDetailOverlay: null,
  })
  const {customerInfo} = user
  // 🔍 Overlay di dettaglio partita
  const openDetailOverlay = (match: Match, closeDetailOverlay: () => void) => {
    setDetailOverlay({ show: true, match, closeDetailOverlay })
  }
  const closeDetailOverlay = () => {
    setDetailOverlay({ show: false, match: null, closeDetailOverlay: null })
  }
  const { id, players, status, data } = match
  const playerExists = findInArrByUid(players, user.userLogin?.uid ?? '')
  const isMaxPlayers = checkMaxPlayersMatch({ match })

  // Stato locale per risultato
  const [goalsA, setGoalsA] = useState<string>('')
  const [goalsB, setGoalsB] = useState<string>('')

  // Controlla se la partita è nel passato
  const matchDate = new Date(data)
  const isPast = new Date(data).toLocaleString()< new Date().toLocaleString()

  const handleSubmitResult = async () => {
    if (goalsA === '' || goalsB === '') return alert('Inserisci entrambi i gol')
    await handleSaveResult({
      match,
      result: { goalsA: Number(goalsA), goalsB: Number(goalsB) }
    })
  }


  const btnAddMeMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => handleJoin(id),
      accessibilityLabel: "Add me",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      //"add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'add-circle-sharp' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Iscriviti',
  } as ButtonProps
  const btnAddGuestMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => openModal('addGuest', id),
      disabled: isMaxPlayers,
      accessibilityLabel: "Add Guest",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      //"add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'add-circle-sharp' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Add Guest',
  } as ButtonProps
  const btnGetDetailsMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => openDetailOverlay(match, closeDetailOverlay),
      accessibilityLabel: "Formazione",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      //"add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'people-outline' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Formazione',
  } as ButtonProps

  const btnRemoveMeMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => console.log("handleRemove(id)"),
      disabled: !playerExists,
      accessibilityLabel: "Remove Me",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      //| "bag-remove" | "bag-remove-outline" | "bag-remove-sharp" | "bag-sharp"
      // "add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'close-circle-outline' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Eliminami',
  } as ButtonProps

  const btnRemoveGuestMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => console.log("openModal('removeGuest', id)"),
      disabled: !playerExists,
      accessibilityLabel: "Remove Guest",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      //| "bag-remove" | "bag-remove-outline" | "bag-remove-sharp" | "bag-sharp"
      // "add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'person-remove-outline' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Elimina Guest',
  } as ButtonProps
  const btnRemoveMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => console.log("handleDeleteMatch(id)"),
      disabled: !playerExists,
      accessibilityLabel: "Remove Match",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      //| "bag-remove" | "bag-remove-outline" | "bag-remove-sharp" | "bag-sharp"
      // "add" | "add-circle" | "add-circle-outline" | "add-circle-sharp" | "add-outline" | "add-sharp
      name: 'ban-outline' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Elimina Partita',
  } as ButtonProps

  const btnSaveResultConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => handleSubmitResult,
      disabled: !playerExists,
      accessibilityLabel: "Remove Match",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    label:'Salva',
  } as ButtonProps
  return (
    <>
    <View style={{gap:8}}>
      {/* Inserimento risultato */}

      {/* Pulsanti iscrizione */}
        {!isPast  && !playerExists && <Button {...btnAddMeMatchConfig}/>}
        {!isPast && playerExists && <Button {...btnRemoveMeMatchConfig}/>}

      {/* Dettagli Formazione */}
      <Button {...btnGetDetailsMatchConfig}/>

      {/*Admin Controls*/}
      {/*{customerInfo?.isAdmin  &&*/
        <>
        {/* Guest */}
          {//!isPast &&
            <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button {...btnAddGuestMatchConfig} />
            <Button {...btnRemoveGuestMatchConfig} />
          </View>}

        <Button {...btnRemoveMatchConfig}/>

        {isPast && (
          <>
            <Text style={{color:COLORS.primaryText}} children={'Inserisci Risultato'}/>
            <View style={{flexDirection:'row', gap:8}}>
              <TextInput
                keyboardType="numeric"
                placeholder="Gol Squadra A"
                value={goalsA}
                onChangeText={setGoalsA}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16
                }}
              />
              <TextInput
                keyboardType="numeric"
                placeholder="Gol Squadra A"
                value={goalsA}
                onChangeText={setGoalsB}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16
                }}
              />
            </View>
            <Button {...btnSaveResultConfig}/>

          </>
        )}
        </>
      }

    </View>
      {/* 🟣 Overlay / dettaglio partita */}
      {detailOverlay.show && (
        <OverlayBackdrop
          visible={true}
          match={detailOverlay.match}
          closeOverlay={closeDetailOverlay}
        />
      )}
      </>
  )
}

export default MatchActions
