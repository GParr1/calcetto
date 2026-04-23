// Flex direction options
export enum FlexDirection {
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN = 'column',
  COLUMN_REVERSE = 'column-reverse'
}

// Justify content options
export enum FlexJustifyContent {
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly'
}

// Align items options
export enum FlexAlignItems {
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  BASELINE = 'baseline',
  STRETCH = 'stretch'
}

// Align content options
export enum FlexAlignContent {
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  STRETCH = 'stretch'
}

// Flex wrap options
export enum FlexWrap {
  NOWRAP = 'nowrap',
  WRAP = 'wrap',
  WRAP_REVERSE = 'wrap-reverse'
}

// Full size / viewport units enum
export enum SizeUnits {
  FULL = '100%', // 100% width/height
  VIEW_HEIGHT = '100vh', // full viewport height
  VIEW_WIDTH = '100vw', // full viewport width
  _8 = '80%'
}

// Enum per i type of bord
export enum BorderStyle {
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted',
  DOUBLE = 'double',
  NONE = 'none'
}

export enum COLORS {
  PRIMARY_BG = 'rgb(21, 22, 22)',
  SECONDARY_BG = 'rgb(50, 50, 50)',
  PRIMARY_TEXT = 'rgb(250, 250, 250)',
  PRIMARY_COLOR = 'rgb(7, 244, 104)',
  SECONDARY_COLOR = 'rgb(75, 75, 75)',
  DISABLED_COLOR = 'rgb(90, 90, 90)',
  PRIMARY_BG_BTN = 'rgb(7, 244, 104)',
  SECONDARY_BG_BTN = 'rgb(50, 50, 50)'
}

export enum SizesPx {
  XL = 24,
  L = 16,
  M = 12,
  S = 8,
  NONE = 0
}
export enum SizesRem {
  XL = '1.5rem', // 24px ≈ 1.5rem
  L = '1rem', // 16px ≈ 1rem
  M = '0.75rem', // 12px ≈ 0.75rem
  S = '0.5rem', // 8px ≈ 0.5rem
  NONE = '0rem'
}
export enum DisplayContainer {
  NONE='none',
  FLEX= 'flex'
}
