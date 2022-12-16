import create, { StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { tryCatch, fold } from 'fp-ts/TaskEither'

import { api, decode } from 'client'
import { DASHBOARD } from 'lib'

import { StoreState, SessionData, Session, sessionCodec } from '../types'

const initialState: Omit<StoreState, 'authenticate'> = {
  user_id: null,
  session_id: null,
  token: null,
  isAuthenticated: false,
}

type MyPersist = (
  config: StateCreator<StoreState>,
  options: PersistOptions<StoreState>,
) => StateCreator<StoreState>

const useStore = create<StoreState>(
  (persist as MyPersist)(
    (set) => ({
      ...initialState,
      authenticate: async (_username, _password) => {
        set({ isAuthenticated: true })
      },
    }),
    {
      name: '@sr-money:session',
    },
  ),
)

export function setToken(token: string) {
  return useStore.setState({
    token,
    isAuthenticated: true,
  })
}

export function setUserId(userId: string) {
  return useStore.setState({
    user_id: userId,
  })
}

export function clearToken() {
  useStore.setState(() => initialState)
}

export function getToken() {
  return useStore.getState().token
}

export function getSession() {
  return useStore.getState()
}

export function setSessionId(sessionId: string) {
  return useStore.setState({
    session_id: sessionId,
  })
}

export function useIsAuthenticated() {
  return useStore((state) => state.isAuthenticated)
}

export function useSessionStoraged() {
  return useStore((state) => state)
}

export function useSessionId() {
  return useStore((state) => state.session_id)
}

async function createSessionAuthenticate(params: SessionData) {
  const url = '/sessions'

  const data = await api
    .post<Session>(url, params)
    .then((response) => response.data)

  if (!data) return null

  return await pipe(
    tryCatch(() => decode(data, sessionCodec), toError),
    fold(
      () => of(null),
      () => of(data),
    ),
  )()
}

export function useSession() {
  const navigate = useNavigate()

  const { mutate: createSession, ...rest } = useMutation({
    mutationFn: createSessionAuthenticate,
    onSuccess: (session) => {
      if (!session) return

      const { user_id: userId, token, session_id: sessionId } = session

      useStore.setState({
        token,
        isAuthenticated: true,
        user_id: userId,
        session_id: sessionId,
      })

      api.defaults.headers.common.authorization = `Bearer ${token}`

      navigate(DASHBOARD)
    },
  })

  return {
    createSession,
    ...rest,
  }
}

export { useStore as sessionStore }
