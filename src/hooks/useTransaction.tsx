import { useTransactions } from 'client'
import { Transaction } from 'client/core/transactions/types'
import { useMonth } from 'hooks'
import { useFormat } from 'lib'
import {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface TransactionContextData {
  isEmpty: boolean
  searchTermValue: string
  searchDateValue: string
  filteredTransactions: Transaction[]
  onChangeSearchTerm(event: ChangeEvent<HTMLInputElement>): void
  onChangeSearchDate(event: ChangeEvent<HTMLInputElement>): void
}

interface TransactionProviderProps {
  children: ReactNode
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData,
)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const { toDateByString, toMaskDate } = useFormat()

  const { monthIdSelected } = useMonth()
  const { transactions } = useTransactions({ monthId: monthIdSelected })
  const [searchTermValue, setSearchTermValue] = useState('')
  const [searchDateValue, setSearchDateValue] = useState('')

  const isDate = useCallback(
    (date: string) => {
      const updatedAt = new Date(date).toDateString()
      const searchDate = toDateByString(searchDateValue)

      if (!searchDate) {
        return false
      }

      if (updatedAt === searchDate.toDateString()) {
        return true
      }

      return false
    },
    [searchDateValue, toDateByString],
  )

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((contact) => {
        const hasDescriptionOrOrigin =
          contact.description
            .toLowerCase()
            .includes(searchTermValue.toLowerCase()) ||
          contact.origin.toLowerCase().includes(searchTermValue.toLowerCase())

        const hasSearchDate = searchDateValue.length === 10

        if (hasSearchDate) {
          if (hasDescriptionOrOrigin && isDate(contact.updated_at)) {
            return contact
          }
          return false
        }

        return hasDescriptionOrOrigin || false
      }),
    [transactions, searchTermValue, searchDateValue, isDate],
  )

  const handleChangeSearchTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTermValue(event.target.value)
    },
    [],
  )

  const handleChangeSearchDate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchDateValue(toMaskDate(event.target.value))
    },
    [toMaskDate],
  )

  const isEmpty = filteredTransactions.length === 0

  return (
    <TransactionContext.Provider
      value={{
        isEmpty,
        searchTermValue,
        filteredTransactions,
        onChangeSearchTerm: handleChangeSearchTerm,
        searchDateValue,
        onChangeSearchDate: handleChangeSearchDate,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction(): TransactionContextData {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error('useMonth must be used within an MonthProvider')
  }

  return context
}
