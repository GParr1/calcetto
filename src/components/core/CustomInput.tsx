import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from 'components/constantStyle';
import { Picker } from '@react-native-picker/picker';

interface CIProps {
  type?: string
  name: string
  label?: string
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  required?: boolean;
  options?:Array<any>;
  defaultValue?:string;
  pattern?: RegExp;
}

const CI: React.FC<CIProps> = ({type,label,name,
                                                   placeholder,
                                                   value,
                                                   onChangeText,
                                 defaultValue ='',
  options =[],
                                                   secureTextEntry = false,
                                                   required = false,
                                                   pattern = /.*/,
                                                 }) => {
  const [error, setError] = useState<string | null>(null);

  // Funzione per validare il campo
  const validateInput = () => {
    if (required && value.trim() === '') {
      setError('This field is required');
      return false;
    }
    if (pattern && !pattern.test(value)) {
      setError('Invalid format');
      return false;
    }
    setError(null);
    return true;
  };
  if(type !== 'select') {
    return (
      <View style={{ gap:8, marginBottom: 16 }}>
        {label && <Text accessibilityLabel={label} style={{color:COLORS.primaryText}}>{label}</Text>}
        <TextInput
          style={styles.input}
          id={name}
          placeholder={placeholder}
          //placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          secureTextEntry={secureTextEntry}
          onBlur={validateInput}  // Validazione al momento del blur (quando il campo perde il focus)
        />
        {error && <Text accessibilityLabel={label} style={styles.errorText}>{error}</Text>}
      </View>
    );
  }else {
    return (
      <View style={{ gap:8,  marginBottom: 16 }}>
        {label && <Text style={{color:COLORS.primaryText}}>{label}</Text>}
        <Picker
          selectedValue={value}
          onValueChange={onChangeText}
          style={styles.input}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value}/>
          ))}
        </Picker>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
};



const styles = StyleSheet.create({
  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    borderRadius: SIZES.borderRadius,
    fontSize: SIZES.fontSize,
    backgroundColor: COLORS.secondaryBg,
    color: COLORS.primaryText,
    padding:SIZES.padding25

  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CI;
