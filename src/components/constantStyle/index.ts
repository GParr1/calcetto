// src/constants/styles.ts

// Definizione dei colori
export const COLORS = {
  primaryBg: 'rgb(21, 22, 22)', // background principale
  secondaryBg: 'rgb(50, 50, 50)', // background secondario
  primaryText: 'rgb(250, 250, 250)', // colore del testo principale
  primaryColor: 'rgb(7, 244, 104)', // colore primario
  secondaryColor: 'rgb(75, 75, 75)', // colore secondario
  disabledColor: 'rgb(90, 90, 90)', // colore disabilitato
  primaryBgBtn: 'rgb(7, 244, 104)', // background pulsante primario
  secondaryBgBtn: 'rgb(50, 50, 50)', // background pulsante secondario
};


// Definizione delle dimensioni (padding, bordi, ecc.)
export const SIZES = {
  borderRadius: 999, // Bordo arrotondato per i pulsanti
  buttonPaddingVertical: 12,
  buttonPaddingHorizontal: 20,
  inputHeight: 40,
  inputPaddingHorizontal: 10,
  fontSize: 16,
  padding0:0,
  padding5:5,
  padding10:10,
  padding15:15,
  padding20:20,
  padding25:25,
};

// Transizioni per gli effetti
export const TRANSITIONS = {
  borderColor: 'border-color 0.2s ease-in-out',
  boxShadow: 'box-shadow 0.2s ease-in-out',
};

// Definizione degli stili comuni
export const commonButtonStyles = {
  backgroundColor: COLORS.primaryColor,
  paddingVertical: SIZES.buttonPaddingVertical,
  paddingHorizontal: SIZES.buttonPaddingHorizontal,
  borderRadius: SIZES.borderRadius,
  borderWidth: 1,
  borderColor: COLORS.primaryColor,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: SIZES.fontSize,
  display:'flex',
  transition: `${TRANSITIONS.borderColor}, ${TRANSITIONS.boxShadow}`,
};

// Stile per i pulsanti disabilitati
export const disabledButtonStyles = {
  backgroundColor: COLORS.secondaryBg,
  borderColor: COLORS.secondaryColor,
  color: COLORS.disabledColor,
};

// Stili per le Card
export const cardStyles = {
  backgroundColor: COLORS.secondaryBg,
  color: COLORS.primaryText,
  borderColor: `rgba(${COLORS.primaryColor.slice(4, -1)})`,
  borderRadius: 20,
  boxShadow: `0 0 10px rgba(${COLORS.primaryColor.slice(4, -1)}, 0.15)`,
};
