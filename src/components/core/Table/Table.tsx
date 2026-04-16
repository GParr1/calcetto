import React from 'react'
import { Container } from 'components/core/Container/Container'
import { FlexDirection, SizesPx } from 'components/core/Container/enum'
import { TableProps } from 'components/core/Table/types'

const T: React.FC<TableProps> = ({ children, containerStyle }) => {
  const tableConfig = {
    flexDirection: FlexDirection.COLUMN,
    gap: SizesPx.S,
    ...containerStyle
  }

  return (
    <Container role={'table'} {...tableConfig}>
      {children}
    </Container>
  )
}

export { T as Table }
