import { StyleSheet } from 'react-native';
import { COLORS } from 'components/constantStyle';

export type Size =
  | 'sizeFull'
  | 'sizeXL'
  | 'sizeL'
  | 'sizeM'
  | 'sizeS'
  | 'sizeXS'
  | 'sizeMini';

export const sizes: Record<Size, number> = {
  sizeFull: 100,
  sizeXL: 90,
  sizeL: 80,
  sizeM: 70,
  sizeS: 60,
  sizeXS: 50,
  sizeMini: 40,
};


export const sizesRem: Record<string, number> = {
  XL: 2.5,
  L: 2,
  M: 1,
  S: 0.5,
  NONE: 0,
};
export const sizesPx: Record<string, number> = {
  XL: 24,
  L: 16,
  M: 12,
  S: 8,
  NONE: 0,
};
export type TextColor =
  | 'Dark'
  | 'Ligth'


//container props
export enum ContainerProps  {
  flexRow= 'row',
  flexColumn='column',
  alignCenter= 'center',
  alignFlexStart= 'flex-start',
  alignFlexEnd='flex-end',
  alignStretch='stretch',
  justifyCenter= 'center' ,
justifyFlexStart= 'flex-start' ,
justifyFlexEnd= 'flex-end' ,
justifySpaceBetween= 'space-between' ,
justifySpaceAround= 'space-around' ,
justifySpaceEvenly= 'space-evenly' ,
}
export enum TextAlign  {
  CENTER= 'center' ,
  LEFT= 'left' ,
  RIGHT='right' ,
}
export enum UITextProps {
  UPPERCASE= 'uppercase' ,
LOWERCASE= 'lowercase' ,
CAPITALIZE= 'capitalize',
}

// Border radius comuni
export type BorderRadiusSize = 'radiusFull' | 'radiusXL' | 'radiusL' | 'radiusM' | 'radiusS';

// Align
export type AlignItemsType = 'center' | 'flex-start' | 'flex-end' | 'stretch';
export type JustifyContentType = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

export enum borderRadiusSizes  {
  radiusFull= 999,
  radiusXL= 24,
  radiusL=16,
  radiusM=12,
  radiusS= 8,
  NONE= 0,
};



export const stileSheet = StyleSheet.create({
  // ===== zIndex/elevation(Android) =====
  elevation1: { elevation: 1 },
  elevation5: { elevation: 5 },
  zIndex10: { zIndex: 10 },
  zIndex50: { zIndex: 50 },
  // ===== opacity =====
  opacity10: { opacity: 0.1 },
  opacity50: { opacity: 0.5 },
  opacity100: { opacity: 1 },
  // ===== OverFlow =====
  overflowHidden: { overflow: 'hidden' },
  overflowVisible: { overflow: 'visible' },
  // ===== Border =====
  border1: { borderWidth: 1 },
  border2: { borderWidth: 2 },
  borderPrimary: { borderColor: '#07f468' },
  borderSecondary: { borderColor: '#323232' },
  // ===== Border radius =====
  radiusFull: { borderRadius: borderRadiusSizes.radiusFull },
  radiusXL: { borderRadius: borderRadiusSizes.radiusXL },
  radiusL: { borderRadius: borderRadiusSizes.radiusL },
  radiusM: { borderRadius: borderRadiusSizes.radiusM },
  radiusS: { borderRadius: borderRadiusSizes.radiusS },
  // ===== Padding general =====
  pXL: { padding: sizesPx.XL },
  pL: { padding: sizesPx.L },
  pM: { padding: sizesPx.M},
  pS: { padding: sizesPx.S },
  p0: { padding: sizesPx.NONE },
  // ===== Padding Vertical =====
  pvXL: { paddingVertical: sizesPx.XL },
  pvL: { paddingVertical: sizesPx.L },
  pvM: { paddingVertical: sizesPx.M },
  pvS: { paddingVertical: sizesPx.S },
  pv0: { paddingVertical: sizesPx.NONE },
  // ===== Padding Horizontal =====
  phXL: { paddingHorizontal: sizesPx.XL },
  phL: { paddingHorizontal: sizesPx.L },
  phM: { paddingHorizontal: sizesPx.M },
  phS: { paddingHorizontal: sizesPx.S },
  ph0: { paddingHorizontal: sizesPx.NONE },
  // ===== Margin Vertical =====
  mvXL: { marginVertical: sizesPx.XL },
  mvL: { marginVertical: sizesPx.L },
  mvM: { marginVertical: sizesPx.M },
  mvS: { marginVertical: sizesPx.S},
  mv0: { marginVertical: sizesPx.NONE},
  // ===== Justify Content =====
  justifyCenter: { justifyContent: 'center' },
  justifyFlexStart: { justifyContent: 'flex-start' },
  justifyFlexEnd: { justifyContent: 'flex-end' },
  justifySpaceBetween: { justifyContent: 'space-between' },
  justifySpaceAround: { justifyContent: 'space-around' },
  justifySpaceEvenly: { justifyContent: 'space-evenly' },
  // ===== Align Items =====
  alignCenter: { alignItems: 'center' },
  alignFlexStart: { alignItems: 'flex-start' },
  alignFlexEnd: { alignItems: 'flex-end' },
  alignStretch: { alignItems: 'stretch' },
  // ===== width Items =====
  widthFull: { width: `${sizes.sizeFull}%`},
  widthXL: { width: `${sizes.sizeXL}%`},
  widthL: { width: `${sizes.sizeL}%`},
  widthM: { width: `${sizes.sizeM}%`},
  widthS: { width: `${sizes.sizeS}%`},
  widthXS: { width: `${sizes.sizeXS}%`},
  widthMini: { width: `${sizes.sizeMini}%`},
  // ===== Align Items =====
  heightFull: { height: `${sizes.sizeFull}%`},
  heightXL: { height: `${sizes.sizeXL}%`},
  heightL: { height: `${sizes.sizeL}%`},
  heightM: { height: `${sizes.sizeM}%`},
  heightS: { height: `${sizes.sizeS}%`},
  heightXS: { height: `${sizes.sizeXS}%`},
  heightMini: { height: `${sizes.sizeMini}%`},
  // ===== Flex  =====
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  // ===== Text Align =====
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  // ===== Colors =====
  textPrimary: { color: '#07f468' },
  textSecondary: { color: '#323232' },
  bgPrimary: { backgroundColor: '#07f468' },
  bgSecondary: { backgroundColor: '#323232' },
  bgWhite: { backgroundColor: '#fff' },
  bgBlack: { backgroundColor: '#000' },
  // ===== Font sizes =====
  textXL: { fontSize: 24 },
  textL: { fontSize: 20 },
  textM: { fontSize: 16 },
  textS: { fontSize: 14 },
  textXS: { fontSize: 12 },
  // ===== Font weights =====
  fontBold: { fontWeight: 'bold' },
  fontSemiBold: { fontWeight: '600' },
  fontMedium: { fontWeight: '500' },
  fontRegular: { fontWeight: '400' },
  // ===== Text Transform =====
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
  // ===== Margin sizes =====
  mhXL: { marginHorizontal: sizesPx.XL},
  mhL: { marginHorizontal: sizesPx.L },
  mhM: { marginHorizontal: sizesPx.M},
  mhS: { marginHorizontal: sizesPx.S},
  mh0: { marginHorizontal: sizesPx.NONE},
});

export const textDefault = {
  color: COLORS.primaryText,
  fontSize: 16,
}

export const Headings ={
  // ===== Headings =====
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: '600' },
  h4: { fontSize: 20, fontWeight: '600' },
  h5: { fontSize: 18, fontWeight: '500' },
  h6: { fontSize: 16, fontWeight: '500' },

}

export const btnDefault = {
  flexDirection: ContainerProps.flexRow,
  alignItems: ContainerProps.alignCenter,
  padding: sizesPx.S,
  borderRadius: borderRadiusSizes.radiusFull,
  justifyContent: ContainerProps.justifyCenter,
  color: COLORS.primaryText,
  fontWeight: 'bold',
  //alignSelf: 'flex-start',
}
export const btnPrimaryDefault = {
  ...btnDefault,
  backgroundColor: COLORS.primaryBgBtn,
  textTransform: UITextProps.UPPERCASE,
  width: `${sizes.sizeL}%`,
}
export const btnNavLinkDefault = {
  color: COLORS.primaryText,
  transition: 'all 0.2s ease',
  alignItems: ContainerProps.alignCenter,
  borderRadius: borderRadiusSizes.radiusFull,
  borderWidth:1,
  borderColor: COLORS.primaryText,
  paddingHorizontal: '0.75rem',
  paddingVertical: '0.375rem',

  //boxShadow: '0px 2px 9px 0px rgba(0, 0, 0, 0.06)',
}
export const btnSecondaryDefault = {
  ...btnDefault,
  width: `${sizes.sizeL}%`,
  textTransform: UITextProps.UPPERCASE,
  backgroundColor: COLORS.secondaryColor,
  borderColor:COLORS.primaryColor, // Utilizza il colore primario per il bordo
  borderWidth: 1,
}

// //btn
//   button: {
//     borderRadius: 999, // Correlato a var(--bs-btn-border-radius)
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width:'70%'
//     //transition: 'all 0.2s ease', // Questa transizione non funziona in React Native, è solo informativa.
//   },
// button: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#007bff',
//   paddingVertical: 10,
//   paddingHorizontal: 15,
//   borderRadius: 8,
//   alignSelf: 'flex-start',
// },
//  primary: {
//     backgroundColor: 'rgb(7, 244, 104)', // Utilizza il colore primario come `--primary-bg-btn`
//     borderColor: 'rgb(7, 244, 104)', // Utilizza il colore primario per il bordo
//     borderWidth: 1,
//   },
//   secondary: {
//     backgroundColor: 'rgb(50, 50, 50)', // Colore secondario
//     borderColor: 'rgb(7, 244, 104)', // Colore secondario per il bordo
//     borderWidth: 1,
//   },
//   none:{
//
//   },
//   submit:{
//
//   },

// textPrimaryBold: {
//   color: 'rgb(250, 250, 250)', // Utilizzeremo il bianco per il testo per i bottoni primari e secondari
//   fontSize: 16,
//   fontWeight: 'bold',
// },