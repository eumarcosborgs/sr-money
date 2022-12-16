import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'

import { useFormat } from 'lib'

import { SummaryCard, SummaryContainer } from './styles'
import { useTransaction } from 'hooks'

interface TotalLiquid {
  type: 'income' | 'outcome'
  value: number
}

export function Summary() {
  const { decimalFromInt } = useFormat()
  const { filteredTransactions: transactions } = useTransaction()

  const totalIncome = transactions.reduce(
    (accumulator, transaction) =>
      transaction.type === 'income'
        ? accumulator + transaction.value
        : accumulator,
    0,
  )

  const totalOutcome = transactions.reduce(
    (accumulator, transaction) =>
      transaction.type === 'outcome'
        ? accumulator + transaction.value
        : accumulator,
    0,
  )

  const totalLiquid: TotalLiquid = {
    value: totalIncome - totalOutcome,
    type: totalIncome - totalOutcome >= 0 ? 'income' : 'outcome',
  }

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{decimalFromInt(totalIncome * 100)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{decimalFromInt(totalOutcome * 100)}</strong>
      </SummaryCard>
      <SummaryCard variant={totalLiquid.type}>
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{decimalFromInt(totalLiquid.value * 100)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
