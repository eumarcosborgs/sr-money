import { useQuery } from 'react-query'

import { pipe } from 'fp-ts/lib/function'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, mapLeft, fold } from 'fp-ts/TaskEither'
import { of } from 'fp-ts/Task'

import { api, decode } from 'client'

import { Transaction, transactionsCodec } from '../types'

interface getTransactionsProps {
  monthId: string
}

async function getTransactions({
  monthId,
}: getTransactionsProps): Promise<Transaction[] | null> {
  const url = '/transactions'

  const data = api.get<Transaction[]>(`${url}/${monthId}`)

  const response = await pipe(
    tryCatch(() => data, toError),
    map((response) => response.data),
    mapLeft((error) => {
      throw new Error(error.message)
    }),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, transactionsCodec), toError),
    fold(
      () => of(null),
      () => of(response.right),
    ),
  )()
}

export function useTransactions({ monthId }: getTransactionsProps) {
  const {
    data = [],
    isError,
    ...rest
  } = useQuery({
    queryFn: () => getTransactions({ monthId }),
    queryKey: ['transactions', monthId],
    enabled: !!monthId,
  })

  return {
    transactions: data ?? [],
    isEmpty: isError ? false : data?.length === 0,
    isError,
    ...rest,
  }
}
