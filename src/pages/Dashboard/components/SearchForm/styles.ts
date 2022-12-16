import styled from 'styled-components'

export const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  div + div {
    width: 40%;
  }
`

export const SelectMonth = styled.select`
  background: transparent;
  border: 0.15rem solid ${({ theme }) => theme.colors['green-500']};
  color: ${({ theme }) => theme.colors['green-500']};
  box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.shadow['green-300']};
  border-radius: 6px;

  outline: none;
  padding: 1rem 1.5rem;

  font-size: ${({ theme }) => theme.fontSizes.disclaimer};
  font-weight: bold;
  transition: border-color 0.2s ease-in, background-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors['green-500']};
  }
`
