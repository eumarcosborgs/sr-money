import React, { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard, SignIn } from 'pages'
import { DASHBOARD, SIGN_IN } from 'lib'

import { WithAuthentication } from './WithAuthentication'
import { WithNotAuthentication } from './WithNotAuthentication'

type Props = {
  isPrivate?: boolean
  children: ReactElement
}

function AppRoute({ isPrivate = false, children }: Props) {
  if (isPrivate) {
    return <WithAuthentication>{children}</WithAuthentication>
  }

  return <WithNotAuthentication>{children}</WithNotAuthentication>
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={SIGN_IN}
          element={
            <AppRoute>
              <SignIn />
            </AppRoute>
          }
        />

        <Route
          path={DASHBOARD}
          element={
            <AppRoute isPrivate>
              <Dashboard />
            </AppRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
