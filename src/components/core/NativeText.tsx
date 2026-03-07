import { TextProps } from 'react-native/Libraries/Text/Text';
import React from 'react';
import { Platform, Text } from 'react-native';

export type NativeTextProps = TextProps & {
  as?: 'h1' | 'h5' | 'span' | 'p'; // Possiamo aggiungere i tag HTML come props
};

const NativeText: React.FC<NativeTextProps> = ({ as = 'span', style, children, ...props }) => {
  if (Platform.OS === 'web') {
    const Component = as;
    return <Component style={style} {...props}>{children}</Component>;
  }
  return <Text style={style} {...props}>{children}</Text>;
};

export default NativeText