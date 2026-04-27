import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from 'state/auth/selectors'

// Definiamo il tipo per le props del componente
interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useSelector(getUser) || null

  return user ? <>{children}</> : <Navigate to="/welcome" replace />
}

export default PrivateRoute
