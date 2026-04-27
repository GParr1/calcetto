import React from 'react'
import { Text } from 'react-native'
import {
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  SizesPx
} from 'components/core/Container/enum'
import { Container } from 'components/core/Container/Container'
import { TableRowProps } from 'components/core/Table/types'
import { COLORS } from 'components/constantStyle'


const TR: React.FC<TableRowProps> = ({
  label,
  value,
  containerStyle,
  labelStyle,
  valueStyle
}) => {
  const tableRowConfig = {
    flexDirection: FlexDirection.ROW,
    flex:1,
    flexJustifyContent: FlexJustifyContent.SPACE_BETWEEN,
    flexAlignItems: FlexAlignItems.CENTER,
    padding: SizesPx.S,
      ...containerStyle
  }
  return (
    <Container role={'row'} {...tableRowConfig}>
      {label && (
        <Text
          style={[{ fontWeight: '500', color: COLORS.primaryText }, labelStyle]}
        >
          {label}
        </Text>
      )}

      {typeof value === 'string' || typeof value === 'number' ? (
        <Text
          style={[
            {
              textAlign: 'right',
              color: COLORS.primaryText,
              fontWeight: 'bold'
            },
            valueStyle
          ]}
        >
          {value}
        </Text>
      ) : value }
    </Container>
  )
}
export { TR as TableRow }

