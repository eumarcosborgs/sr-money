import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useCategories } from 'client'
import { Category } from 'client/core/categories/types'
import { getCategoryId, setCategoryId } from 'lib'

interface CategoryContextData {
  categoryIdSelected: string
  onChangeCategory(category: string): void
  categories: Category[]
}

interface CategoryProviderProps {
  children: ReactNode
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData,
)

export function CategoryProvider({ children }: CategoryProviderProps) {
  const { categories, isLoading } = useCategories()
  const [categoryIdSelected, setCategoryIdSelected] = useState(() =>
    getCategoryId(),
  )

  const onChangeCategory = useCallback((categoryId: string) => {
    setCategoryId(categoryId)
    setCategoryIdSelected(categoryId)
  }, [])

  useEffect(() => {
    if (categories.length > 0 && !isLoading && getCategoryId() === '') {
      onChangeCategory(categories[0].id)
    }
  })

  return (
    <CategoryContext.Provider
      value={{
        categoryIdSelected,
        onChangeCategory,
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory(): CategoryContextData {
  const context = useContext(CategoryContext)

  if (!context) {
    throw new Error('useCategory must be used within an CategoryProvider')
  }

  return context
}
