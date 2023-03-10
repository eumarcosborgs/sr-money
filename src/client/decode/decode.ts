import { pipe } from 'fp-ts/function'
import { fromEither, mapLeft } from 'fp-ts/TaskEither'
import { Decoder } from 'io-ts'

import { toast } from 'lib'

export async function decode<T, A>(value: T, decoder: Decoder<unknown, A>) {
  return pipe(
    value,
    decoder.decode,
    fromEither,
    mapLeft((errors) => {
      toast({
        text: 'An error occurred while handling the data! Try again.',
        type: 'danger',
      })

      throw new Error(getErrorMessage(errors))
    }),
  )()
}

function getErrorMessage(errors: unknown): string {
  return Array.isArray(errors) ? errors[0].message : ''
}
