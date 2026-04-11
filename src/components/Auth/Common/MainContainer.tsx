import React, { ReactNode } from 'react'
import { Role } from 'react-native'
import { Container } from 'components/core/Container/Container'
import {
  FlexAlignItems,
  FlexJustifyContent
} from 'components/core/Container/enum'

interface MainContainerProps {
  children: ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const mainContainerConfig = {
    role: 'main' as Role,
    flexAlignItems: FlexAlignItems.CENTER,
    justifyContent: FlexJustifyContent.CENTER
  }
  return (
    <Container {...mainContainerConfig}>
      {children}
    </Container>
  )
}

export default MainContainer
