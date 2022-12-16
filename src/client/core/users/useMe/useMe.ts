import { useQuery } from 'react-query'

import { api, useSessionStoraged } from 'client'

import type { UseMeResponse } from '../types'

export function getMe() {
  return api.get<UseMeResponse>('/users').then((response) => response.data)
}

export function useMe() {
  const { token, user_id: userId } = useSessionStoraged()

  const isEnabled = !!token && !!userId

  const { data, ...rest } = useQuery({
    enabled: isEnabled,
    queryKey: ['user', { user_id: userId }],
    queryFn: getMe,
  })

  return {
    user: data?.user,
    ...rest,
  }
}
