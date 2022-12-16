import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useMonths } from 'client'
import { Month } from 'client/core/months/types'
import { useCategory } from 'hooks'
import { getMonthId, setMonthId } from 'lib'

interface MonthContextData {
  monthIdSelected: string
  onChangeMonth(Month: string): void
  months: Month[]
}

interface MonthProviderProps {
  children: ReactNode
}

const MonthContext = createContext<MonthContextData>({} as MonthContextData)

export function MonthProvider({ children }: MonthProviderProps) {
  const { categoryIdSelected } = useCategory()
  const { months, isLoading } = useMonths({ categoryId: categoryIdSelected })

  const [monthIdSelected, setMonthIdSelected] = useState(() => getMonthId())

  const onChangeMonth = useCallback((monthId: string) => {
    setMonthId(monthId)
    setMonthIdSelected(monthId)
  }, [])

  const monthsNotEmpty = months.length > 0
  const monthIdStorageIsInitial = getMonthId() === ''
  useEffect(() => {
    if (monthsNotEmpty && monthIdStorageIsInitial && !isLoading) {
      onChangeMonth(months[0].id)
    }
  }, [isLoading])

  const categoryIdSelectedIsDifferentStorage =
    categoryIdSelected !== getMonthId()
  useEffect(() => {
    if (monthsNotEmpty && !isLoading && categoryIdSelectedIsDifferentStorage) {
      onChangeMonth(months[0].id)
    }
  }, [categoryIdSelected, isLoading])

  return (
    <MonthContext.Provider
      value={{
        monthIdSelected,
        onChangeMonth,
        months,
      }}
    >
      {children}
    </MonthContext.Provider>
  )
}

export function useMonth(): MonthContextData {
  const context = useContext(MonthContext)

  if (!context) {
    throw new Error('useMonth must be used within an MonthProvider')
  }

  return context
}
