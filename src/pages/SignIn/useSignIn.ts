import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useSession } from 'client'

type UserFormData = {
  username: string
  password: string
}

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

export function useSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const { createSession, isLoading } = useSession()

  function handleOnSubmit(data: UserFormData) {
    createSession(data)
  }

  return {
    errors,
    isLoading,
    register,
    onSubmit: handleSubmit(handleOnSubmit),
  }
}
