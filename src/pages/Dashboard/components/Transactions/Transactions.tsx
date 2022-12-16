import { useFormat } from 'lib'
import { useState } from 'react'

import { Transaction } from 'client/core/transactions/types'
import { useTransaction } from 'hooks'
import { DeleteTransactionModal, EmptyList, NotFoundTransaction } from '..'

import { SearchForm } from '../SearchForm'

import {
  Container,
  DeleteButton,
  PriceHighlight,
  TransactionsTable,
} from './styles'
import { Trash } from 'phosphor-react'
import { Tooltip } from 'ui'

export function Transactions() {
  const [transactionBeingDeleted, setTransactionBeingDeleted] =
    useState<Transaction>()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { toDate, decimalFromInt } = useFormat()
  const { filteredTransactions, isEmpty, searchTermValue, searchDateValue } =
    useTransaction()

  function handleOpenDeleteTransactionModal(transaction: Transaction) {
    setTransactionBeingDeleted(transaction)
    setIsModalVisible(true)
  }

  const notFoundTransaction =
    isEmpty && (searchTermValue.length > 1 || searchDateValue.length === 10)

  return (
    <Container>
      <SearchForm />

      {isEmpty && <EmptyList />}

      {notFoundTransaction && <NotFoundTransaction />}

      {transactionBeingDeleted && (
        <DeleteTransactionModal
          open={isModalVisible}
          onOpenChange={setIsModalVisible}
          transaction={transactionBeingDeleted}
        ></DeleteTransactionModal>
      )}

      <TransactionsTable>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td width="40%">{transaction.description}</td>
              <td width="10%">{transaction.origin}</td>
              <td>
                <PriceHighlight variant={transaction.type}>
                  {decimalFromInt(transaction.value * 100)}
                </PriceHighlight>
              </td>
              <td>{toDate(transaction.updated_at)}</td>
              <td>
                <Tooltip message="Deletar transação" position="top">
                  <DeleteButton
                    onClick={() =>
                      handleOpenDeleteTransactionModal(transaction)
                    }
                  >
                    <Trash size={24} />
                  </DeleteButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </TransactionsTable>
    </Container>
  )
}
