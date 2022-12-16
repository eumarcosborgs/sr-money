import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ButtonProps } from './Button'

type ButtonType = 'icon' | 'text'

interface ContainerProps extends Pick<ButtonProps, 'size' | 'variant'> {
  $full: boolean
  disabled?: boolean
  $buttonType?: ButtonType
}

const types = {
  icon: css`
    padding: 0;
  `,
  text: css`
    background: transparent;
    border: 0;
    box-shadow: 0;
    padding: 0;

    &:hover {
      opacity: 1;
      box-shadow: none;
    }
  `,
}

const sizes = (type?: ButtonType) => ({
  sm: css`
    padding: 0.8rem 1.6rem;
    font-size: ${({ theme }) => theme.fontSizes.small};

    ${type === 'icon' &&
    css`
      min-width: 3.2rem;
      height: 3.2rem;
    `}
  `,
  md: css`
    padding: 1.2rem 3.2rem;

    ${type === 'icon' &&
    css`
      min-width: 4.2rem;
      height: 4.2rem;
    `}
  `,
  lg: css`
    padding: 1.8rem 4.2rem;

    ${type === 'icon' &&
    css`
      min-width: 5.2rem;
      height: 5.2rem;
    `}
  `,
})

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors['green-500']};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors['green-300']};
    border: 0.1rem solid ${({ theme }) => theme.colors['green-500']};

    &:hover {
      opacity: 1;
      box-shadow: none;
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors['neutral-500']};
    border: 0.1rem solid ${({ theme }) => theme.colors['neutral-500']};

    &:hover {
      opacity: 1;
      box-shadow: none;
      filter: brightness(0.6);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors['neutral-500']};

    &:hover {
      opacity: 1;
      box-shadow: none;
      background: ${({ theme }) => theme.colors['neutral-100']};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors['red-500']};
    border: 0.1rem solid ${({ theme }) => theme.colors['red-500']};

    &:hover {
      box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.shadow['red-500']};
    }
  `,
}

const button = ({
  $full,
  size = 'sm',
  variant = 'primary',
  $buttonType,
}: ContainerProps) => css`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.disclaimer};
  transition: 300ms;
  border: 0.1rem solid transparent;
  width: 60%;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.colors['green-500']};
  }

  &:disabled {
    cursor: no-drop;
    color: ${({ theme }) => theme.colors['neutral-500']};
    background: ${({ theme }) => theme.colors['neutral-200']};
    border-color: ${({ theme }) => theme.colors['neutral-300']};

    &:hover {
      box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.shadow['neutral-500']};
    }
  }

  ${$full &&
  css`
    width: 100%;
  `};

  ${$buttonType && types[$buttonType]};
  ${variants[variant]};
  ${sizes($buttonType)[size]};
`

export const Container = styled.button<ContainerProps>`
  ${({ $full, size, variant, $buttonType }) =>
    button({ $full, $buttonType, size, variant })}
`

export const ButtonLink = styled(Link)<ContainerProps>`
  text-decoration: none;

  ${({ $full, size, variant, $buttonType }) =>
    button({ $full, $buttonType, size, variant })}
`
