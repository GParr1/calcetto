import React, { FC, useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { COLORS } from 'components/constantStyle'
import {
  daysInMonth,
  monthsIT,
  pad2,
  parseIncoming
} from 'components/core/Inputs/utils'
import { Container } from 'components/core/Container/Container'
import { FlexDirection, SizesPx } from 'components/core/Container/enum'
import { SelectInput } from 'components/core/Inputs/SelectInput'
import { DateFieldProps } from 'components/core/Inputs/types'


const DF: FC<DateFieldProps> = ({
  label,
  value,
  required,
  onChange,
  errorText
}) => {
  // Anni mostrati (modifica qui se vuoi un range diverso)
  const currentYear = new Date().getFullYear()
  const minYear = 1900
  const maxYear = currentYear + 50

  // Stato interno (0 = placeholder)
  const initial = useMemo(() => parseIncoming(value), [value])
  const [year, setYear] = useState<number>(initial.y ?? 0)
  const [month, setMonth] = useState<number>(initial.m ?? 0) // 1..12
  const [day, setDay] = useState<number>(initial.d ?? 0)

  // Sincronizza stato se cambia value esterno
  useEffect(() => {
    const next = parseIncoming(value)
    setYear(next.y ?? 0)
    setMonth(next.m ?? 0)
    setDay(next.d ?? 0)
  }, [value])

  // Opzioni
  const years = useMemo(() => {
    const arr: number[] = []
    for (let y = maxYear; y >= minYear; y--) arr.push(y)
    return arr
  }, [minYear, maxYear])

  const months = useMemo(
    () => monthsIT.map((label, idx) => ({ label, value: idx + 1 })), // 1..12
    []
  )

  const maxDays = useMemo(() => {
    if (year > 0 && month > 0) return daysInMonth(year, month - 1)
    return 31
  }, [year, month])

  const days = useMemo(
    () => Array.from({ length: maxDays }, (_, i) => i + 1),
    [maxDays]
  )

  // Se riduci mese/anno (es. 31 → 30 o 28/29), normalizza il giorno
  useEffect(() => {
    if (day > 0 && day > maxDays) setDay(maxDays)
  }, [maxDays, day])

  // Emetti valore SOLO quando i 3 campi sono selezionati
  useEffect(() => {
    if (year > 0 && month > 0 && day > 0) {
      const isoDateOnly = `${year}-${pad2(month)}-${pad2(day)}` // ISO senza tempo
      onChange(isoDateOnly)
    }
    // Se manca qualcosa, non emetto nulla: il genitore mantiene l'ultimo valore valido
    // oppure puoi scegliere di emettere ''/null
  }, [year, month, day, onChange])
  const containerConfig = {
    margin: SizesPx.S,
    flexGap: SizesPx.S
  }
  const dateFieldContainer = {
    flexDirection: FlexDirection.ROW,
    flexGap: SizesPx.M
  }

  return (
    <Container {...containerConfig}>
      {label && (
        <Text style={{ color: COLORS.primaryText }}>
          {label} {required && '*'}
        </Text>
      )}

      <Container {...dateFieldContainer}>
        {/* Giorno */}
        <SelectInput
          items={days}
          value={day}
          onValueChange={setDay}
          label={'Giorno'}
        />
        <SelectInput
          items={months}
          value={month}
          onValueChange={setMonth}
          label={'Mese'}
        />
        <SelectInput
          items={years}
          value={year}
          onValueChange={setYear}
          label={'Anno'}
        />
      </Container>
      {errorText && <Text>{errorText}</Text>}
    </Container>
  )
}

export { DF as DateField }
