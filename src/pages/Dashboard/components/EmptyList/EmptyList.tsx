import { NotePencil } from 'phosphor-react'

import { Container } from './styles'

export function EmptyList() {
  return (
    <Container>
      <NotePencil size={64} />
      <p>
        Você ainda não tem nenhuma transação cadastrada! <br /> Clique no botão
        <strong> ”Nova transação”</strong> à cima para cadastrar a sua primeira!
      </p>
    </Container>
  )
}
