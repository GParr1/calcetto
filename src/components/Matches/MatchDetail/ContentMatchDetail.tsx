import React, { FC } from 'react'
import { ImageBackground } from 'react-native'
import { Assets } from 'assets/assets'
import Field from 'components/Matches/MatchDetail/Field'
import { ContentMatchDetailProps } from 'components/Matches/MatchDetail/types'

const ContentMatchDetail: FC<ContentMatchDetailProps> = ({ teamA, teamB }) => {
  const positionA = [
    { role: 'GK', top: '35%', left: '10%' },
    { role: 'DF', top: '5%', left: '30%' },
    { role: 'DF', top: '65%', left: '30%' },
    { role: 'MF', top: '35%', left: '20%' },
    { role: 'MF', top: '35%', left: '50%' }
  ]
  const positionB = [
    { role: 'GK', top: '35%', left: '83%' },
    { role: 'DF', top: '5%', left: '60%' },
    { role: 'DF', top: '65%', left: '60%' },
    { role: 'MF', top: '35%', left: '70%' },
    { role: 'MF', top: '35%', left: '50%' }
  ]
  return (
    <ImageBackground
      source={Assets.CAMPO_CALCIO_BG}
      style={{
        width: '100%',
        height: 500,
        overflow: 'hidden' // fondamentale
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
