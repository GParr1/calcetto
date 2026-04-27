import { useWindowDimensions } from 'react-native';

type RNStyleValue = string | number;
type RNStyleObject = { [key: string]: RNStyleValue };

export const BREAKPOINTS = {
  xs: 0,     // extra-small
  sm: 600,   // small
  md: 900,   // medium
  lg: 1200,  // large
  xl: 1536,  // extra-large
} as const;

export const useResponsiveStyle = () => {
  const { width: screenWidth } = useWindowDimensions();
  const breakpoints = Object.values(BREAKPOINTS); // [0, 375, 768, 1024, 1440]

  /**
   * Restituisce un oggetto di stile responsive basato sulla larghezza dello schermo.
   * Supporta più proprietà contemporaneamente.
   * @param stylesObj Oggetto in cui ogni chiave è una proprietà di stile e il valore è un array di valori per breakpoint.
   */
  const getResponsiveStyle = (stylesObj: Record<string, RNStyleValue[]>): RNStyleObject => {
    const result: RNStyleObject = {};

    Object.entries(stylesObj).forEach(([prop, values]) => {
      if (!values || values.length === 0) return;

      // Scegli l'indice giusto in base ai breakpoints
      let index = 0;
      for (let i = 0; i < breakpoints.length; i++) {
        if (screenWidth >= breakpoints[i]) {
          index = i;
        } else {
          break;
        }
      }

      // fallback se values è più corto dei breakpoints
      index = Math.min(index, values.length - 1);

      result[prop] = values[index];
    });

    return result;
  };

  return { getResponsiveStyle, breakpoints };
};
