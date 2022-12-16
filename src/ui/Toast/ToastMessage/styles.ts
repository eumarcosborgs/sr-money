import styled, { keyframes, css } from 'styled-components'

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0px);
  }

  to {
    opacity: 0;
    transform: translateX(100px);
  }
`

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors['neutral-500']};
  `,
  success: css`
    background: ${({ theme }) => theme.colors['green-500']};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors['red-500']};
  `,
}

interface ContainerProps {
  isLeaving: boolean
  type: 'default' | 'success' | 'danger'
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem 2rem;
  color: #fff;

  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  animation: ${messageIn} 0.3s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${messageOut} 0.3s;
    `}

  cursor: pointer;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  svg {
    margin-right: 0.5rem;
  }

  & + & {
    margin-top: 0.75rem;
  }
`
