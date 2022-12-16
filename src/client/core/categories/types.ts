import * as t from 'io-ts'
import { idCodec } from 'types'

export const category = t.type({
  id: idCodec,
  name: t.string,
  user_id: idCodec,
  created_at: t.string,
  updated_at: t.string,
})

export const categoriesCodec = t.array(category)

export type Category = t.TypeOf<typeof category>

export type CategoryFormParams = {} & Omit<
  Category,
  'id' | 'created_at' | 'updated_at' | 'user_id'
>
