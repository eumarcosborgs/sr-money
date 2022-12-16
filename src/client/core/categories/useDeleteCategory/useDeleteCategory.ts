import { useMutation, useQueryClient } from 'react-query'
import { api } from 'client/client'

type Options = {
  onError?: () => void
  onSuccess?: () => void
}

export function useDeleteCategory({ onSuccess, onError }: Options = {}) {
  const queryClient = useQueryClient()

  const { mutate: deleteCategory, ...rest } = useMutation<
    unknown,
    unknown,
    unknown
  >({
    onError,
    mutationFn: (categoryId) => api.delete(`/categories/${categoryId}`),
    onSuccess: async () => {
      onSuccess && onSuccess()

      await queryClient.invalidateQueries('categories')
    },
  })

  return {
    deleteCategory,
    ...rest,
  }
}
