import * as Dialog from '@radix-ui/react-dialog'
import { useDeleteTransaction } from 'client'
import { Transaction } from 'client/core/transactions/types'
import { useFormat } from 'lib'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  Newspaper,
  TerminalWindow,
} from 'phosphor-react'
import { Button, Input, Modal } from 'ui'
import {
  TransactionType,
  TransactionTypeButton,
} from 'ui/Header/components/NewTransactionModal/styles'
import { ButtonsContainer, Content } from './styles'

interface DeleteTransactionModalProps {
  transaction: Transaction
  open: boolean
  onOpenChange(open: boolean): void
}

export function DeleteTransactionModal({
  open,
  onOpenChange,
  transaction,
}: DeleteTransactionModalProps) {
  const { deleteTransaction, isLoading } = useDeleteTransaction()
  const { toDecimal } = useFormat()

  function handleCloseModal() {
    onOpenChange(false)
  }

  if (!transaction) return null

  function handleDeleteTransaction() {
    deleteTransaction(transaction.id)
    handleCloseModal()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Modal title="Nova transação">
        <Content>
          <Input
            disabled
            icon={CurrencyDollar}
            value={toDecimal(transaction.value * 100)}
          />
          <Input disabled icon={Newspaper} value={transaction.description} />
          <Input disabled icon={TerminalWindow} value={transaction.origin} />

          <TransactionType disabled value={transaction.type}>
            <TransactionTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <ButtonsContainer>
            <Button
              type="text"
              full={false}
              htmlType="submit"
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              type="text"
              full={false}
              htmlType="submit"
              variant="danger"
              loading={isLoading}
              onClick={handleDeleteTransaction}
            >
              Deletar
            </Button>
          </ButtonsContainer>
        </Content>
      </Modal>
    </Dialog.Root>
  )
}
