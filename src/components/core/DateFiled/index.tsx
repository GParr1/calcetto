import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from 'components/constantStyle';
import { daysInMonth, monthsIT, pad2, parseIncoming } from 'components/core/DateFiled/utils';

interface DateFieldProps {
  label?: string;
  value?: string; // ISO string (es. '2026-03-07' o '2026-03-07T00:00:00.000Z')
  required?: boolean;
  onChange: (date: string) => void; // ritorna 'YYYY-MM-DD'
}


const DateField: React.FC<DateFieldProps> = ({
                                               label,
                                               value,
                                               required,
                                               onChange,
                                             }) => {
  // Anni mostrati (modifica qui se vuoi un range diverso)
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear + 50;

  // Stato interno (0 = placeholder)
  const initial = useMemo(() => parseIncoming(value), [value]);
  const [year, setYear] = useState<number>(initial.y ?? 0);
  const [month, setMonth] = useState<number>(initial.m ?? 0); // 1..12
  const [day, setDay] = useState<number>(initial.d ?? 0);

  // Sincronizza stato se cambia value esterno
  useEffect(() => {
    const next = parseIncoming(value);
    setYear(next.y ?? 0);
    setMonth(next.m ?? 0);
    setDay(next.d ?? 0);
  }, [value]);

  // Opzioni
  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = maxYear; y >= minYear; y--) arr.push(y);
    return arr;
  }, [minYear, maxYear]);

  const months = useMemo(
    () => monthsIT.map((label, idx) => ({ label, value: idx + 1 })), // 1..12
    []
  );

  const maxDays = useMemo(() => {
    if (year > 0 && month > 0) return daysInMonth(year, month - 1);
    return 31;
  }, [year, month]);

  const days = useMemo(
    () => Array.from({ length: maxDays }, (_, i) => i + 1),
    [maxDays]
  );

  // Se riduci mese/anno (es. 31 → 30 o 28/29), normalizza il giorno
  useEffect(() => {
    if (day > 0 && day > maxDays) setDay(maxDays);
  }, [maxDays, day]);

  // Emetti valore SOLO quando i 3 campi sono selezionati
  useEffect(() => {
    if (year > 0 && month > 0 && day > 0) {
      const isoDateOnly = `${year}-${pad2(month)}-${pad2(day)}`; // ISO senza tempo
      onChange(isoDateOnly);
    }
    // Se manca qualcosa, non emetto nulla: il genitore mantiene l'ultimo valore valido
    // oppure puoi scegliere di emettere ''/null
  }, [year, month, day, onChange]);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={{ color: COLORS.primaryText, marginBottom: 6 }}>
          {label} {required && '*'}
        </Text>
      )}

      <View style={styles.row}>
        {/* Giorno */}
        <View style={styles.col}>
          <Text style={styles.smallLabel}>Giorno</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={day}
              onValueChange={(v) => setDay(v)}
              dropdownIconColor={COLORS.primaryText}
            >
              <Picker.Item label="—" value={0} />
              {days.map((d) => (
                <Picker.Item key={d} label={`${d}`} value={d} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Mese */}
        <View style={styles.col}>
          <Text style={styles.smallLabel}>Mese</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={month}
              onValueChange={(v) => setMonth(v)}
              dropdownIconColor={COLORS.primaryText}
            >
              <Picker.Item label="—" value={0} />
              {months.map((m) => (
                <Picker.Item key={m.value} label={m.label} value={m.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Anno */}
        <View style={styles.col}>
          <Text style={styles.smallLabel}>Anno</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={year}
              onValueChange={(v) => setYear(v)}
              dropdownIconColor={COLORS.primaryText}
            >
              <Picker.Item label="—" value={0} />
              {years.map((y) => (
                <Picker.Item key={y} label={`${y}`} value={y} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DateField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
  smallLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    // Padding visuale "simile" al tuo input originale
    // NB: Picker gestisce internamente l'area tappabile
  },
});