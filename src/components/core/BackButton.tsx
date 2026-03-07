import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface BackButtonProps {
  handleBack: (event: GestureResponderEvent) => void;
}

const BackButton: React.FC<BackButtonProps> = ({ handleBack }) => {
  const touchableOpacityConfig= {
    onPress:handleBack,
    style: styles.button,
    testID: "back-btn",
    accessibilityLabel:"Torna indietro"
  }
  const ionicons = {
    size:20,
    color:"#fff"
  }
  const textConfig= {
    children: 'Indietro',
    style: styles.text
  }
  return (
    <TouchableOpacity {...touchableOpacityConfig}>
      <Ionicons {...ionicons}  name={'chevron-back'} />
      <Text {...textConfig}/>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default BackButton;
