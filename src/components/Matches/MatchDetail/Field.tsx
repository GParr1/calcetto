import React, { FC } from 'react'
import { Container } from 'components/core/Container/Container'
import { DimensionValue } from 'react-native'
import CardBronze from 'components/FifaCard/CardBronze'
import { FieldProps } from 'components/Matches/MatchDetail/types'

const Field: FC<FieldProps> = ({ player, pos }) => (
  <Container
    key={player.id}
    style={{
      position: 'absolute',
      top: pos.top as DimensionValue,
      left: pos.left as DimensionValue
    }}
  >
    <CardBronze scale={0.2} dynamicValue={ player } />
  </Container>
)
export default Field