import { FileSearch } from 'phosphor-react'

import { Container } from './styles'

export function NotFoundTransaction() {
  return (
    <Container>
      <FileSearch size={64} />
      <p>
        <strong>Nenhuma transação encontrada</strong>
      </p>
    </Container>
  )
}
