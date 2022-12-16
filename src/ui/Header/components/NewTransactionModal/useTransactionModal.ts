import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useFormat } from 'lib'
import { useCreateTransaction } from 'client'
import { ChangeEvent, useState } from 'react'

type TransactionFormData = {
  description: string
  value: number
  type: 'income' | 'outcome'
  origin?: string
}

const schema = yup.object().shape({
  description: yup.string().required(),
  type: yup.string().required(),
  value: yup.number().required(),
  origin: yup.string(),
})

interface useTransactionModalProps {
  monthId: string
}

export function useTransactionModal({ monthId }: useTransactionModalProps) {
  const { toFloat, toDateByString, toMaskDate } = useFormat()
  const [date, setDate] = useState('')
  const form = useForm<TransactionFormData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form

  const { createTransaction, isLoading } = useCreateTransaction({
    monthId,
  })

  function handleOnSubmit(data: TransactionFormData) {
    createTransaction({
      ...data,
      value: toFloat(data.value),
      date: toDateByString(date),
    })
    resetField('description')
    resetField('value')
    resetField('origin')
    setDate('')
  }

  function handleChangeDate(event: ChangeEvent<HTMLInputElement>) {
    setDate(toMaskDate(event.target.value))
  }

  return {
    FormProvider,
    form,
    setValue,
    trigger,
    watch,
    date,
    handleChangeDate,
    errors,
    isLoading,
    register,
    onSubmit: handleSubmit(handleOnSubmit),
  }
}
