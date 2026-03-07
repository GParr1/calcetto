import React from 'react';
import { Platform, TextInput, StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, commonButtonStyles, SIZES } from 'components/constantStyle'; // Per React Native
//import { Select } from 'react-select'; // Se vuoi usare react-select per Web

interface InputProps {
  type: string;
  label?: string;
  name: string;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<any> | any, name: string) => void;
}

const Input: React.FC<InputProps> = ({
                                       type,
                                       label,
                                       name,
                                       pattern,
                                       placeholder,
                                       required,
                                       options = [],
                                       defaultValue,
                                       onChange
                                     }) => {
  // Rendering condizionale in base alla piattaforma
  if (Platform.OS === 'web') {
    if (type === 'select') {
      return (
        <View style={styles.inputContainer}>
          {label && <label htmlFor={name} className="form-label">{label}</label>}
          <select
            name={name}
            id={name}
            className="form-control"
            defaultValue={defaultValue}
            required={required}
            onChange={(e) => onChange(e, name)}
          >
            <option value="">Seleziona</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </View>
      );
    }

    return (
      <View style={styles.inputContainer}>
        {label && <label htmlFor={name} className="form-label">{label}</label>}
        <input
          type={type}
          name={name}
          id={name}
          className="form-control"
          placeholder={placeholder}
          pattern={pattern}
          defaultValue={defaultValue}
          required={required}
          onChange={(e) => onChange(e, name)}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChangeText={(value) => onChange({ target: { value } }, name)}
        />
      </View>
    );
  }

  // React Native rendering
  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}
      {type === 'select' && (
        <Picker
          selectedValue={defaultValue}
          onValueChange={(value: any) => onChange({ target: { value } }, name)}
        >
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      )}
      {type !== 'select' && (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChangeText={(value) => onChange({ target: { value } }, name)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16
  },
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
});

export default Input;
