import { useQuery } from 'react-query'

import { pipe } from 'fp-ts/lib/function'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, mapLeft, fold } from 'fp-ts/TaskEither'
import { of } from 'fp-ts/Task'

import { api, decode } from 'client'

import { Month, monthsCodec } from '../types'

interface getMonthsProps {
  categoryId: string
}

async function getMonths({
  categoryId,
}: getMonthsProps): Promise<Month[] | null> {
  const url = '/months'

  const data = api.get<Month[]>(`${url}/${categoryId}`)

  const response = await pipe(
    tryCatch(() => data, toError),
    map((response) => response.data),
    mapLeft((error) => {
      throw new Error(error.message)
    }),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, monthsCodec), toError),
    fold(
      () => of(null),
      () => of(response.right),
    ),
  )()
}

export function useMonths({ categoryId }: getMonthsProps) {
  const {
    data = [],
    isError,
    ...rest
  } = useQuery({
    queryFn: () => getMonths({ categoryId }),
    queryKey: ['months', categoryId],
    enabled: !!categoryId,
  })

  return {
    months: data ?? [],
    isEmpty: isError ? false : data?.length === 0,
    isError,
    ...rest,
  }
}
