import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from 'components/constantStyle';
import { Container } from 'components/core/Container/Container'
import { SizesPx } from 'components/core/Container/enum'
import { CIProps } from 'components/core/Inputs/types'


const CI: React.FC<CIProps> = ({
  label,
  name,
  placeholder,
  value,
  onChangeText,
  defaultValue = '',
  secureTextEntry = false,
  required = false,
  pattern = /.*/,
  errorText
}) => {

  const [error, setError] = useState<string | undefined>(errorText)

  // Funzione per validare il campo
  const validateInput = () => {
    if (required && value.trim() === '') {
      setError('This field is required')
      return false
    }
    if (pattern && !pattern.test(value)) {
      setError('Invalid format')
      return false
    }
    setError(undefined)
    return true
  }
  const containerInput = {
    flexGap: SizesPx.S,
    margin: SizesPx.S
  }
    return (
      <Container {...containerInput}>
        {label && (
          <Text
            accessibilityLabel={label}
            style={{ color: COLORS.primaryText }}
          >
            {label}
          </Text>
        )}
        <TextInput
          style={{
            height: SIZES.inputHeight,
            borderWidth: 1,
            borderColor: COLORS.primaryColor,
            borderRadius: SIZES.borderRadius,
            fontSize: SIZES.fontSize,
            backgroundColor: COLORS.secondaryBg,
            color: COLORS.primaryText,
            padding: SIZES.padding25
          }}
          id={name}
          placeholder={placeholder}
          //placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          secureTextEntry={secureTextEntry}
          onBlur={validateInput} // Validazione al momento del blur (quando il campo perde il focus)
        />
        {error && (
          <Text
            accessibilityLabel={label}
            style={{ color: 'red', fontSize: 12, marginTop: 5 }}
          >
            {error}
          </Text>
        )}
      </Container>
    )
}


export {CI as Input};
