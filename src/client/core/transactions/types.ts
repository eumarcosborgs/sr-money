import * as t from 'io-ts'
import { keyObject } from 'lib'
import { idCodec } from 'types'

const TYPES = ['income', 'outcome'] as const

export const transaction = t.type({
  id: idCodec,
  value: t.number,
  type: t.keyof(keyObject(TYPES)),
  description: t.string,
  month_id: idCodec,
  origin: t.string,
  created_at: t.string,
  updated_at: t.string,
})

export const transactionsCodec = t.array(transaction)

export type Transaction = t.TypeOf<typeof transaction>

export type TransactionFormParams = {
  origin?: string
  date?: Date
} & Omit<
  Transaction,
  'id' | 'month_id' | 'created_at' | 'updated_at' | 'origin'
>
