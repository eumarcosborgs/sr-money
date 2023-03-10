import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'

import { api, ApiError } from 'client'
import { clearStorage, SIGN_IN } from 'lib'

import { clearToken, useSessionId } from '../useSession'

export function useSignOut() {
  const navigate = useNavigate()
  const sessionId = useSessionId()

  const queryClient = useQueryClient()

  const { mutate: signOut, ...rest } = useMutation<unknown, ApiError>({
    mutationFn: () => api.delete(`/sessions/${sessionId}`),
    onSuccess: async () => {
      delete api.defaults.headers.common.authorization

      clearToken()
      clearStorage()
      navigate(SIGN_IN)

      await queryClient.invalidateQueries()
    },
    onError: async () => {
      delete api.defaults.headers.common.authorization

      clearToken()
      clearStorage()
      navigate(SIGN_IN)

      await queryClient.invalidateQueries()
    },
  })

  return {
    signOut,
    ...rest,
  }
}
