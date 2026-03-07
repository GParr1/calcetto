import React, { FC, useMemo } from 'react';
import { View, Text, Image, ImageSourcePropType, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { getCustomerIndo } from 'state/auth/selectors';
import { getCardTier } from 'utils/utils';
import { ATTRIBUTES } from 'utils/Constant';
import { CustomerInfo } from 'types/user';
import { Assets, Teams } from 'assets/assets';
import { useResponsiveStyle } from 'styles/styles.utils';
import { ImageBackgroundProps, ImageProps } from 'react-native/Libraries/Image/Image';
import StatsComponent from 'components/FifaCard/StatsComponent';

interface CardBronzeProps {
  enableEdit?: boolean;
  dynamicValue?: CustomerInfo;
  previewImg?: string;
  scale: number
  style?: object;
}

const CardBronze: FC<CardBronzeProps> = ({
                                                 enableEdit = false,
                                                 dynamicValue,
                                                 previewImg,
                                                 scale = 1,
                                                 style = {},
                                               }) => {
  const { getResponsiveStyle } = useResponsiveStyle();

  const stateCustomerInfo = useSelector(getCustomerIndo) || {};
  const customerInfo = dynamicValue || stateCustomerInfo;


  const playerImage: string = previewImg ?? customerInfo.photoURL

  const stats = useMemo(
    () =>
      ATTRIBUTES.map((attr, idx) => ({
        ...attr,
        value: customerInfo?.attributes?.[attr.key] || 11,
        col: idx % 2 === 0 ? 1 : 2,
        row: Math.floor(idx / 2) + 1,
      })),
    [customerInfo]
  );

  const fullName =
    customerInfo.firstName || customerInfo.lastName
      ? `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim()
      : customerInfo.displayName || '';

  const cardBackground: ImageSourcePropType = getCardTier(customerInfo.overall || 60);

  const imageBGConfig = {
    source:cardBackground,
    style: getResponsiveStyle({
      width: [515*scale],
      height: [695*scale],
      alignSelf: ['center'],
      padding: [16]
    }),
    resizeMode:"cover"
  } as ImageBackgroundProps

  const imagePlayerConfig = {
    source: playerImage ? {
      uri: playerImage
    } : Assets.DEFAULT_PHOTO,
    style:getResponsiveStyle({
      position: ['absolute'],
      top: ['14%'],
      right: ['10%'],
      width: ['55%'],
      height: ['52%'],
    })
  } as ImageProps

  const imageNationConfig = {
    source:{ uri: 'https://futcardsfifa.com/app/uploads/2020/10/ITALIA-1.png' },
    style:getResponsiveStyle({
      position: ['absolute'],
      top: ['89.2%'],
      left: ['31.8%'],
      width: ['11.5%'],
      height: ['4.4%'],
    }),
    resizeMode:"contain"
  } as ImageProps

  const imageFavoriteTeamConfig = {
    source: Teams.roma ,
    style:getResponsiveStyle({
      position: ['absolute'],
      top: ['88.6%'],
      left: ['55.4%'],
      width: ['11.5%'],
      height: ['5.7%'],
    }),
    resizeMode:"contain"
  } as ImageProps

  const imageFavoriteTeamEmptyConfig = {
    style:getResponsiveStyle({
      position: ['absolute'],
      top: ['88.6%'],
      left: ['55.4%'],
      width: ['11.5%'],
      height: ['5.7%'],
      borderWidth: [1],
      borderColor: ['#000'],
      borderStyle: ['dashed'],
    }),
  }

  const overallConfig = {
    children: customerInfo.overall ?? 60,
    style:getResponsiveStyle({
      position: ['absolute'],
      top: ['10%'],
      left: ['12%'],
      fontSize: [76*scale],
      fontWeight: ['700']
    }),
  }
  const nameContainerConfig = {
    style:getResponsiveStyle({
      left:['10%'],
      right:['10%'],
      top:['67%'],
      position: ['absolute'],
      width: ['80%'],
      height: ['9%'],
      justifyContent: ['center'],
      alignItems: ['center']
    }),
  }

  const posizioneConfig = {
    children: customerInfo.position ?? 'ATT',
    style:getResponsiveStyle({
      position: ['absolute'],
      top: ['21.5%'],
      left: ['14.2%'],
      fontSize: [40*scale],
      width: ['11.65%'],
      fontWeight: ['500']
    }),
  }
  const nameConfig = {
    children: fullName,
    style:getResponsiveStyle({
      fontFamily: ["'Montserrat', Arial, sans-serif"],
      textAlign: ['center'],
      textTransform: ['uppercase'],
      fontWeight: [800],
      lineHeight:[1.1],
      color:['#3f1200'],
      fontSize: [32*scale],
    }),
  }

  return (
    <ImageBackground {...imageBGConfig}>
      {/* Foto giocatore */}
      <Image {...imagePlayerConfig}/>
      {/* Nazione */}
      <Image {...imageNationConfig}/>
      {/* Club */}
      {customerInfo.favoriteTeam ? (
        <Image {...imageFavoriteTeamConfig} />
      ) : (
        <View {...imageFavoriteTeamEmptyConfig} />
      )}
      {/* Overall */}
      <Text {...overallConfig}/>
      {/* posizione */}
      <Text {...posizioneConfig}/>
      {/* Nome */}
      <View {...nameContainerConfig}>
        <Text {...nameConfig}/>
      </View>
      {/* Attributi */}
      <StatsComponent stats={stats} scale={scale}/>
    </ImageBackground>
  );
};



// Funzione helper per posizionamento statistiche
const getStatPosition = (idx: number) => {
  const positions = [
    { top: '81%', right: '81%' },
    { top: '81%', right: '67%' },
    { top: '81%', right: '54%' },
    { top: '81%', right: '38%' },
    { top: '81%', right: '24%' },
    { top: '81%', right: '11%' },
  ];
  return positions[idx] || {};
};

export default CardBronze;
