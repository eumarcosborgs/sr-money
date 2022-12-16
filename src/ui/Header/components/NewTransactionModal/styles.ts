import styled from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${({ theme }) => theme.colors['green-500']};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.disclaimer};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.colors['green-500']};
  }
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${({ theme }) => theme.colors['neutral-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${({ theme }) => theme.colors.white};

  svg {
    color: ${({ theme, variant }) =>
      variant === 'income'
        ? theme.colors['green-300']
        : theme.colors['red-300']};
  }

  &[data-state='unchecked']:hover {
    background: ${({ theme }) => theme.colors['neutral-600']};
    transition: background-color 0.2s;
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme, variant }) =>
      variant === 'income'
        ? theme.colors['green-500']
        : theme.colors['red-500']};

    svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`

export const NewTransactionForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
