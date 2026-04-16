import React from 'react'
import { Pressable, Text } from 'react-native'
import { Container } from 'components/core/Container/Container'
import {
  COLORS,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx,
  SizeUnits
} from 'components/core/Container/enum'

import { AccordionProps } from './types'
import { btnSecondaryDefault, textDefault } from 'styles'
import { Ionicons } from '@expo/vector-icons'

const A: React.FC<AccordionProps> = ({
  title,
  children,
  containerStyle,
  titleStyle = textDefault,
  defaultOpen = false
}) => {
  const [open, setOpen] = React.useState(defaultOpen)

  const accordionConfig = {
    flexDirection: FlexDirection.COLUMN,
    flexGap: SizesPx.S,
    ...containerStyle
  }

  return (
    <Container {...accordionConfig}>
      {/* HEADER */}
      <Pressable
        style={{
          ...btnSecondaryDefault,
          width: 'auto',
          justifyContent: 'space-between',
          gap: 8
        }}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Container
          width={SizeUnits.FULL}
          flexDirection={FlexDirection.ROW}
          flexJustifyContent={FlexJustifyContent.SPACE_BETWEEN}
          flexAlignItems={FlexAlignItems.CENTER}
        >
          <Text style={[{ fontWeight: '600' }, titleStyle]}>{title}</Text>
          <Ionicons
            size={20}
            color={COLORS.PRIMARY_TEXT}
            name={open ? 'chevron-up' : 'chevron-down'}
          />
        </Container>
      </Pressable>

      {/* CONTENT */}
      {open && (
        <Container flexDirection={FlexDirection.COLUMN} flexGap={SizesPx.S}>
          {children}
        </Container>
      )}
    </Container>
  )
}

export { A as Accordion }
