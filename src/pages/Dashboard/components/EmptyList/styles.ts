import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  svg {
    color: ${({ theme }) => theme.colors['neutral-600']};
  }

  p {
    margin-top: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;

    strong {
      color: ${({ theme }) => theme.colors['green-500']};
    }
  }
`
