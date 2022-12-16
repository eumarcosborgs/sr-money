import { useMutation, useQueryClient } from 'react-query'
import { api } from 'client/client'

type Options = {
  onError?: () => void
  onSuccess?: () => void
}

export function useDeleteTransaction({ onSuccess, onError }: Options = {}) {
  const queryClient = useQueryClient()

  const { mutate: deleteTransaction, ...rest } = useMutation<
    unknown,
    unknown,
    string
  >({
    onError,
    mutationFn: (transactionId) => api.delete(`/transactions/${transactionId}`),
    onSuccess: async () => {
      onSuccess && onSuccess()

      await queryClient.invalidateQueries('transactions')
    },
  })

  return {
    deleteTransaction,
    ...rest,
  }
}
