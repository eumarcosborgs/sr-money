import { Header, Summary } from 'ui'
import { Transactions } from './components'

export function Dashboard() {
  return (
    <>
      <Header />
      <Summary />

      <Transactions />
    </>
  )
}
