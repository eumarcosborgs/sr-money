import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors['neutral-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 1rem;
  }
`

export const SelectCategory = styled.select`
  background: transparent;
  border: 0.15rem solid ${({ theme }) => theme.colors['green-500']};
  color: ${({ theme }) => theme.colors['green-500']};
  box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.shadow['green-300']};
  border-radius: 6px;

  outline: none;
  padding: 0 1.5rem;

  font-size: ${({ theme }) => theme.fontSizes.disclaimer};
  font-weight: bold;
  transition: border-color 0.2s ease-in, background-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors['green-500']};
  }
`

export const SignOutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.75rem;

  border: 0.1rem solid ${({ theme }) => theme.colors['neutral-600']};
  border-radius: 6px;
  background: transparent;

  svg {
    color: ${({ theme }) => theme.colors.white};
    transition: color 0.2s ease-in;
  }

  &:hover {
    cursor: pointer;

    svg {
      color: ${({ theme }) => theme.colors['neutral-400']};
    }
  }
`
