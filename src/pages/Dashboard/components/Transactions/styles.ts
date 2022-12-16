import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  overflow: auto;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme.colors['neutral-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) =>
    variant === 'income' ? theme.colors['green-300'] : theme.colors['red-300']};
`

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 0;
  outline: 0;

  svg {
    color: ${({ theme }) => theme.colors['red-500']};

    transition: color 0.2s ease-in;
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors['red-300']};
    }

    cursor: pointer;
  }
`
