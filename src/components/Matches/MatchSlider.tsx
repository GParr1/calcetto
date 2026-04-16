import React, { FC } from 'react';
import 'swiper/css'
import {  Text } from 'react-native';
import Button, { ButtonProps, ButtonType, IoniconsNames } from 'components/core/Button';
import { btnSecondaryDefault, UITextProps } from 'styles';
import { COLORS } from 'components/constantStyle';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { useResponsiveStyle } from 'styles/styles.utils';
import MatchCard from 'components/Matches/MatchCard';
import { Container } from 'components/core/Container/Container'
import { FlexAlignItems, FlexDirection, SizesPx } from 'components/core/Container/enum'
import { ScrollContainer } from 'components/core/ScrollContainer/ScrollContainer'
import { useResponsiveValue } from 'components/core/utils'
import { MatchSliderProps } from 'components/Matches/types'

const MatchSlider: FC<MatchSliderProps> = ({
  matches,
  title,
  showAddMatch = false,
  user,
  handleRemove,
  openModal,
  handleModalAddGuest,
  handleModalRemoveGuest,
  handleDeleteMatch
}) => {
  const { getResponsiveStyle } = useResponsiveStyle()

  const btnAddMatchConfig = {
    touchableOpacityConfig: {
      type: ButtonType.SECONDARY,
      onPress: async () => openModal('createMatch'),
      accessibilityLabel: 'Crea Account',
      style: {
        ...btnSecondaryDefault,
        width: 'auto',
        textTransform: UITextProps.CAPITALIZE,
        fontWeight: '400',
        gap: 8
      }
    },
    ioniconsConfig: {
      name: 'create' as IoniconsNames,
      size: 20,
      color: '#fff'
    },
    label: 'Crea una nuova partita'
  } as ButtonProps

  const sectionTitleConfig = {
    children: title,
    style: {
      textAlign: 'center',
      color: COLORS.primaryText,
      paddingHorizontal: 16,
      fontSize: 28,
      fontWeight: 600
    }
  } as TextProps

  const wrapperConfig = {
    flexDirection: useResponsiveValue({
      mobile: FlexDirection.COLUMN,
      tablet: FlexDirection.ROW,
      desktop: FlexDirection.ROW
    }),
    backgroundColor: COLORS.secondaryBg,
    flexGap: SizesPx.XL,
    padding: SizesPx.L,
    flexAlignItems: FlexAlignItems.CENTER,
    borderRadius: SizesPx.XL,
    borderColor: COLORS.primaryColor,
    shadowColor: 'rgba(7, 244, 104, 1)',
    shadowOpacity: 0.4,
    shadowRadius: 15
  }
  const horizontal = useResponsiveValue({
    mobile: false,
    tablet: true,
    desktop: true
  })

  const scrollContainerConfig = {
    horizontal,
    contentContainerStyle: { paddingHorizontal: 8, gap: 8 }
  }
  return (
    <>
      <Text {...sectionTitleConfig} />
      <Container {...wrapperConfig}>
        <Container>
          <Button {...btnAddMatchConfig} />
        </Container>
        <ScrollContainer {...scrollContainerConfig}>
          {matches.map((item) => (
            <MatchCard
              match={item}
              user={user}
              openModal={openModal}
              uid={user.userLogin?.uid ?? ''}
            />
          ))}
        </ScrollContainer>
      </Container>
    </>
  )
}

export default MatchSlider
