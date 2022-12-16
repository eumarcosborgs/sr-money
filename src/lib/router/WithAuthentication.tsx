import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { CategoryProvider, MonthProvider, TransactionProvider } from 'hooks'

import { SIGN_IN } from 'lib'
import { useIsAuthenticated } from 'client'

type Props = {
  children: ReactNode
}

export function WithAuthentication({ children }: Props) {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to={SIGN_IN} />
  }

  return (
    <CategoryProvider>
      <MonthProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </MonthProvider>
    </CategoryProvider>
  )
}
