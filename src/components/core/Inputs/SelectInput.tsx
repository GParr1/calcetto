import React, { FC } from 'react'
import { Container } from 'components/core/Container/Container'
import { COLORS, SizesPx } from 'components/core/Container/enum'
import { Picker } from '@react-native-picker/picker'
import {Text} from 'react-native'
import { DateSelectProps } from 'components/core/Inputs/types'


const SI: FC<DateSelectProps> = ({
  label,
  items,
  value,
  onValueChange
}) => {
  const textConfig = {
    accessibilityLabel:label,
    style: {
      color: COLORS.PRIMARY_TEXT
    }
  }
  const containerInput = {
    flexGap: SizesPx.S,
    margin: SizesPx.S
  }
  return (
    <Container {...containerInput}>
      {label && <Text {...textConfig}>{label}</Text>}
      <Container overflow={'hidden'}>
        <Picker
          selectedValue={value}
          onValueChange={(v) => onValueChange(v)}
          dropdownIconColor={COLORS.PRIMARY_TEXT}
          style={{
            borderColor: COLORS.PRIMARY_COLOR,
            borderRadius: 999,
            backgroundColor: 'trasparent'
          }}
        >
          <Picker.Item label="—" value={0} />
          {items.map((i, index) =>
            typeof i === 'number' ? (
              <Picker.Item key={i} label={String(i)} value={i} />
            ) : (
              <Picker.Item key={i.value} label={i.label} value={i.value} />
            )
          )}
        </Picker>
      </Container>
    </Container>
  )
}
export { SI as SelectInput }