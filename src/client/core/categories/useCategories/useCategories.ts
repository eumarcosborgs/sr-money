import { useQuery } from 'react-query'

import { pipe } from 'fp-ts/lib/function'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, mapLeft, fold } from 'fp-ts/TaskEither'
import { of } from 'fp-ts/Task'

import { api, decode } from 'client'

import { categoriesCodec, Category } from '../types'

async function getCategories(): Promise<Category[] | null> {
  const url = '/categories'

  const response = await pipe(
    tryCatch(() => api.get<Category[]>(url), toError),
    map((response) => response.data),
    mapLeft((error) => {
      throw new Error(error.message)
    }),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, categoriesCodec), toError),
    fold(
      () => of(null),
      () => of(response.right),
    ),
  )()
}

export function useCategories() {
  const {
    data = [],
    isError,
    ...rest
  } = useQuery({
    queryFn: getCategories,
    queryKey: 'categories',
  })

  return {
    categories: data ?? [],
    isEmpty: isError ? false : data?.length === 0,
    isError,
    ...rest,
  }
}
