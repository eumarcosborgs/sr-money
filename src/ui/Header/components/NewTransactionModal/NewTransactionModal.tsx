import { KeyboardEvent, useEffect, useMemo } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useMonth, useTransaction } from 'hooks'
import {
  ArrowCircleUp,
  ArrowCircleDown,
  Newspaper,
  TerminalWindow,
  CalendarBlank,
} from 'phosphor-react'

import { Button, Input, Modal } from 'ui'

import { useTransactionModal } from './useTransactionModal'

import {
  NewTransactionButton,
  TransactionType,
  TransactionTypeButton,
  NewTransactionForm,
} from './styles'
import { isOnlyNumbers } from 'lib'

type Option = {
  key: string
  value: string
}

export function NewTransactionModal() {
  const { monthIdSelected } = useMonth()
  const { filteredTransactions } = useTransaction()

  const options: Option[] = useMemo(() => {
    const originsNames = filteredTransactions.map(
      (transaction) => transaction.origin,
    )

    return [...new Set(originsNames)].map((option) => ({
      key: option,
      value: option,
    }))
  }, [filteredTransactions])

  const {
    FormProvider,
    form,
    onSubmit,
    register,
    errors,
    date,
    handleChangeDate,
    setValue,
    watch,
    trigger,
    isLoading,
  } = useTransactionModal({ monthId: monthIdSelected })

  const valueWatched = watch('type')

  const typeValue = (valueWatched || '') as string

  useEffect(() => {
    register('type')
  }, [register])

  function handleChangeType(value: string) {
    if (value === 'income' || value === 'outcome') {
      setValue('type', value)
      trigger('type')
    }
  }

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOnlyNumbers(event.key)) {
      event.preventDefault()
    }
  }

  const placeholderDateInput = `Exemplo ${new Date().toLocaleDateString(
    'pt-BR',
    {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
  )}`

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </Dialog.Trigger>

      <Modal title="Nova transação">
        <FormProvider {...form}>
          <NewTransactionForm onSubmit={onSubmit}>
            <Input.Amount
              required
              name="value"
              placeholder="Valor"
              error={errors.value?.message}
            />
            <Input
              required
              type="text"
              placeholder="Descrição"
              {...register('description')}
              icon={Newspaper}
              error={errors.description?.message}
            />
            <Input.Autocomplete
              options={options}
              name="origin"
              placeholder="Origem"
              icon={TerminalWindow}
              error={errors.origin?.message}
            />
            <Input
              placeholder={placeholderDateInput}
              icon={CalendarBlank}
              onChange={handleChangeDate}
              value={date}
              onKeyPress={handleOnKeyPress}
              maxLength={10}
            />

            <TransactionType
              name="type"
              onValueChange={handleChangeType}
              value={typeValue}
            >
              <TransactionTypeButton variant="income" value="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>

              <TransactionTypeButton variant="outcome" value="outcome">
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <Button
              type="text"
              full={false}
              htmlType="submit"
              loading={isLoading}
            >
              Cadastrar
            </Button>
          </NewTransactionForm>
        </FormProvider>
      </Modal>
    </Dialog.Root>
  )
}
