import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useCreateCategory } from 'client'

type CategoryFormData = {
  name: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
})

interface useCategoryModalProps {
  onCloseModal(): void
}

export function useCategoryModal({ onCloseModal }: useCategoryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const { createCategory, isLoading } = useCreateCategory({
    onSuccess: () => {
      onCloseModal()
    },
  })

  function handleOnSubmit(data: CategoryFormData) {
    createCategory(data)
  }

  return {
    errors,
    isLoading,
    register,
    onSubmit: handleSubmit(handleOnSubmit),
  }
}
