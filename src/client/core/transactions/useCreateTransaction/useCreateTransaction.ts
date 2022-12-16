import { useMutation, useQueryClient } from 'react-query'
import { api } from 'client/client'

import { TransactionFormParams } from '../types'

type Options = {
  monthId: string
  onSuccess?: () => void
}

export function useCreateTransaction({ monthId, onSuccess }: Options) {
  const queryClient = useQueryClient()

  const { mutate: createTransaction, ...rest } = useMutation<
    unknown,
    unknown,
    TransactionFormParams
  >({
    mutationFn: (data) => api.post(`/transactions/${monthId}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('transactions')

      onSuccess && onSuccess()
    },
  })

  return {
    createTransaction,
    ...rest,
  }
}
