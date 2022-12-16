import * as t from 'io-ts'
import { idCodec } from 'types'

export const month = t.type({
  id: idCodec,
  name: t.string,
  category_id: idCodec,
  created_at: t.string,
  updated_at: t.string,
})

export const monthsCodec = t.array(month)

export type Month = t.TypeOf<typeof month>
