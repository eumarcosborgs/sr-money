import {
  QueryClientProvider,
  QueryClient,
  DefaultOptions,
  QueryCache,
} from 'react-query'

import { ThemeProvider } from 'styled-components'

import { theme } from 'config'
import { GlobalStyle, ToastContainer } from 'ui'

import { queryConfigDefault } from 'client'
import { Router } from 'lib'

export const queryClient = new QueryClient({
  defaultOptions: queryConfigDefault as DefaultOptions,
  queryCache: new QueryCache(),
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
        <ToastContainer />
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
