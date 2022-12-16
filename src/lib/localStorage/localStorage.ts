import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type StoreState = {
  categoryId: string
  monthId: string
}

const initialState: StoreState = {
  categoryId: '',
  monthId: '',
}

type MyPersist = (
  config: StateCreator<StoreState>,
  options: PersistOptions<StoreState>,
) => StateCreator<StoreState>

const useStore = create<StoreState>(
  (persist as MyPersist)(
    () => ({
      ...initialState,
    }),
    {
      name: '@sr-money:storage',
    },
  ),
)

export function setCategoryId(categoryId: string) {
  return useStore.setState({
    categoryId,
  })
}

export function setMonthId(monthId: string) {
  return useStore.setState({
    monthId,
  })
}

export function getCategoryId() {
  return useStore.getState().categoryId
}

export function getMonthId() {
  return useStore.getState().monthId
}

export function setStorage(data: StoreState) {
  return useStore.setState(data)
}

export function getStorage() {
  return useStore.getState()
}

export function clearStorage() {
  useStore.setState(() => initialState)
}
