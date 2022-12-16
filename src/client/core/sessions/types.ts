import * as t from 'io-ts'
import { idCodec } from 'types'

export const sessionCodec = t.type({
  token: t.string,
  user_id: idCodec,
  session_id: idCodec,
})

export type Session = t.TypeOf<typeof sessionCodec>

export type SessionData = {
  username: string
  password: string
}

export type StoreState = {
  token: string | null
  user_id: string | null
  session_id: string | null
  isAuthenticated: boolean
  authenticate: (username: string, password: string) => Promise<void>
}
