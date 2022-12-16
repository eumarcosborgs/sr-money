import { useMutation, useQueryClient } from 'react-query'
import { api } from 'client/client'

import { CategoryFormParams } from '../types'

type Options = {
  onSuccess?: () => void
}

export function useCreateCategory({ onSuccess }: Options = {}) {
  const queryClient = useQueryClient()

  const { mutate: createCategory, ...rest } = useMutation<
    unknown,
    unknown,
    CategoryFormParams
  >({
    mutationFn: (data) => api.post('/categories', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('categories')

      onSuccess && onSuccess()
    },
  })

  return {
    createCategory,
    ...rest,
  }
}
