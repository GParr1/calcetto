import React, { FC } from 'react'
import { findInArrByUid } from 'utils/utils'
import { Container } from 'components/core/Container/Container'
import { SizesPx } from 'components/core/Container/enum'
import AdminAction from 'components/Matches/MatchActions/AdminAction'
import { MatchActionsProps } from 'components/Matches/types'
import UserAction from 'components/Matches/MatchActions/UserAction'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'


const MatchActions: FC<MatchActionsProps> = ({ match }) => {
  const userAuth = useSelector(getUser)

  const { customerInfo } = userAuth
  const { id, players, data } = match
  const playerExists = findInArrByUid(
    players ?? [],
    userAuth.user?.uid ?? ''
  )

  // Controlla se la partita è nel passato
  const matchDate = new Date(data)
  const isPast = matchDate < new Date()
  console.log(
    'isPast',
    isPast,
    matchDate.toLocaleString(),
    new Date().toLocaleString()
  )
  const mainContainerConfig = {
    flexGap: SizesPx.S
  }
  const adminActionConfig = {
    match,
    isPast,
    playerExists,
  }

  return (
    <Container {...mainContainerConfig}>
      {/*Admin Controls*/}
      {
        /*{customerInfo?.isAdmin  &&*/
        <AdminAction {...adminActionConfig} />
      }
    </Container>
  )
}

export default MatchActions
