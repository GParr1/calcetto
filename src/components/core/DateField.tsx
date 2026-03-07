import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from 'components/constantStyle';

interface DateFieldProps {
  label?: string;
  value?: string; // ISO string
  required?: boolean;
  onChange: (date: string) => void;
}

const DateField: React.FC<DateFieldProps> = ({
                                               label,
                                               value,
                                               required,
                                               onChange,
                                             }) => {
  const [show, setShow] = useState(false);

  const parsedDate = value ? new Date(value) : new Date();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={{ color: COLORS.primaryText }}>
          {label} {required && '*'}
        </Text>
      )}

      {/* WEB */}
      {Platform.OS === 'web' ? (
        <input
          type="date"
          lang="it-IT"
          placeholder="gg/mm/aaaa"
          value={
            value
              ? new Date(value).toISOString().split('T')[0]
              : ''
          }
          onChange={(e) => {
            const selected = new Date(e.target.value);
            onChange(selected.toISOString());
          }}
          style={{
            padding: 12,
            borderRadius: 6,
            border: '1px solid #ccc'
          }}
        />
      ) : (
        <>
          {/* MOBILE */}
          <Pressable style={styles.input} onPress={() => setShow(true)}>
            <Text style={{ color: COLORS.primaryText }}>
              {value
                ? parsedDate.toLocaleDateString()
                : 'Seleziona una data'}
            </Text>
          </Pressable>

          {show && (
            <DateTimePicker
              value={parsedDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShow(false);
                if (selectedDate) {
                  onChange(selectedDate.toISOString());
                }
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default DateField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
});