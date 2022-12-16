import axios, { AxiosError } from 'axios'
import type { DefaultOptions } from 'react-query'

import { baseURL } from 'config'
import { clearStorage, toast } from 'lib'

import type { ApiError, FailedRequestQueue } from './types'
import {
  getSession,
  getToken,
  setSessionId,
  setToken,
  clearToken,
} from './core'

let isRefreshing = false
let failedRequestQueue: FailedRequestQueue[] = []

export const api = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
    'Accept-Language': 'pt-BR',
  },
})

function onError(error: ApiError) {
  if (error.response?.data) {
    toast({
      text: error.response?.data?.message,
      type: 'danger',
    })
  } else {
    toast({
      text: error.message,
      type: 'danger',
    })
  }
}

export const queryConfigDefault: DefaultOptions<ApiError> = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: false,
    onError,
  },
}

api.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const { session_id: sessionId, user_id: userId } = getSession()

    const originalConfig: any = error.config

    if (
      error.response?.status === 401 &&
      error.response.data.status === 'token.expired'
    ) {
      if (!isRefreshing) {
        isRefreshing = true

        api
          .put('/sessions/refresh', {
            user_id: userId,
            session_id: sessionId,
          })
          .then((response) => {
            const { token, session_id: sessionId } = response.data

            api.defaults.headers.common.authorization = `Bearer ${token}`
            setToken(token)
            setSessionId(sessionId)

            failedRequestQueue.forEach((request) => request.onSuccess(token))
            failedRequestQueue = []
          })
          .catch((err) => {
            failedRequestQueue.forEach((request) => request.onFailure(err))
            failedRequestQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            if (originalConfig.headers) {
              originalConfig.headers.authorization = `Bearer ${token}`
              setToken(token)

              resolve(api(originalConfig))
            }
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    } else if (
      (error.response?.status === 401 || error.response?.status === 404) &&
      (error.response.data.status === 'token.invalid' ||
        error.response.data.status === 'user.invalid' ||
        error.response.data.status === 'session.invalid' ||
        error.response.data.status === 'session.expired')
    ) {
      toast({
        type: 'danger',
        text: 'Session expired',
      })
      clearToken()
      clearStorage()
    } else {
      return Promise.reject(error)
    }
  },
)

api.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const responseStatus = error?.response?.status ?? 0

    if (responseStatus >= 500) {
      toast({
        text: 'There was an error communicating with our server',
        type: 'danger',
      })
    }

    return Promise.reject(error)
  },
)
