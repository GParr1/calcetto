import React, { FC } from 'react';
import 'swiper/css'
import { User} from 'types/user'
import {Match} from 'types/match'
import { ScrollView, Text, View } from 'react-native';
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button';
import { btnSecondaryDefault, UITextProps } from 'styles';
import { COLORS } from 'components/constantStyle';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { useResponsiveStyle } from 'styles/styles.utils';
import MatchCard from 'components/Matches/MatchCard';
import { ModalMode } from 'components/Matches/MatchList';

interface MatchSliderProps {
  matches: Match[]
  title: string
  showAddMatch?: boolean
  user: User
  handleJoin: (match: string) => void
  handleRemove: (match: string) => void
  openModal: (mode: ModalMode, matchId: string | null) => void

  handleModalAddGuest: (match: string) => void
  handleModalRemoveGuest: (match: string) => void
  handleDeleteMatch: (match: string) => void
}


const MatchSlider: FC<MatchSliderProps> = ({
                                                   matches,
                                                   title,
                                                   showAddMatch = false,
                                                   user,
                                                   handleJoin,
                                                   handleRemove,
                                                   openModal,
                                                   handleModalAddGuest,
                                                   handleModalRemoveGuest,
                                                   handleDeleteMatch
                                                 }) => {

  const { getResponsiveStyle } = useResponsiveStyle();

  const btnAddMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => openModal('createMatch'),
      accessibilityLabel: "Crea Account",
      style:{
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'create' as IoniconsNames,
      size:20,
      color:"#fff"
    },
    label:'Crea una nuova partita',
  } as ButtonProps

  const sectionTitleConfig = {
    children: title,
    style:{
      color:COLORS.primaryText,
      paddingHorizontal:16,
      fontSize: 28,
      fontWeight: 600,
    }
  } as TextProps

  const wrapperConfig = {
    style: getResponsiveStyle({
      backgroundColor: [COLORS.secondaryBg],
      gap: [24],
      paddingVertical: [24],
      alignItems: ['center'],
      borderRadius: [8],
      borderColor: [COLORS.primaryColor],
      paddingHorizontal: [16],
      shadowColor: ['rgba(7, 244, 104, 1)'],
      shadowOpacity: [0.4],
      shadowRadius: [15],
    })
  }

  return (
    <div className="match-slider-container">
      {showAddMatch && (
        <View style={{width:'50%'}}>
          <Button {...btnAddMatchConfig}/>
        </View>
      )}

      <Text {...sectionTitleConfig}/>
      <View {...wrapperConfig}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, gap: 8 }}
        >
          {matches.map((item) => (
              <MatchCard
                match={item}
                user={user}
                handleJoin={handleJoin}
                openModal={openModal}
                uid={user.userLogin?.uid ?? ""}
              />
          ))}
        </ScrollView>
      </View>
    </div>
  )
}

export default MatchSlider
