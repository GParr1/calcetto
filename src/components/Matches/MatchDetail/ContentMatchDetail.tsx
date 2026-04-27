import React, { FC } from 'react'
import { ImageBackground, StyleProp } from 'react-native'
import { Assets } from 'assets/assets'
import Field from 'components/Matches/MatchDetail/Field'
import { ContentMatchDetailProps } from 'components/Matches/MatchDetail/types'
import { positionA, positionB } from 'components/Matches/MatchDetail/Constant'

const ContentMatchDetail: FC<ContentMatchDetailProps> = ({ teamA, teamB }) => {
  return (
    <ImageBackground
      source={Assets.CAMPO_CALCIO_BG}
      style={{
        width: '100%',
        height: 500,
        overflow: 'hidden'
      }}
      resizeMode="cover"
    >
      {teamA.map((p, index) => {
        if (!p) return
        const pos = positionA[index]
        return <Field pos={pos} player={p} />
      })}
      {teamB.map((p, index) => {
        if (!p) return
        const pos = positionB[index]
        return <Field pos={pos} player={p} />
      })}
    </ImageBackground>
  )
}
export default ContentMatchDetail
