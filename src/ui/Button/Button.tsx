import { ButtonHTMLAttributes, ReactNode } from 'react'

import { LoadIcon } from 'ui'

import { ButtonLink, Container } from './styles'

type NativeButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps extends Omit<NativeButtonProps, 'type'> {
  children: ReactNode
  type: 'icon' | 'text'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  htmlType?: 'button' | 'submit' | 'reset'
  loading?: boolean
  to?: string
  full?: boolean
}

export function Button({
  children,
  type,
  variant = 'primary',
  size = 'sm',
  htmlType = 'button',
  loading = false,
  disabled = false,
  to,
  full = type !== 'icon',
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled

  if (to) {
    return (
      <ButtonLink
        to={to}
        $full={full}
        $buttonType={type}
        disabled={isDisabled}
        variant={variant}
        size={size}
      >
        {children}
      </ButtonLink>
    )
  }

  return (
    <Container
      type={htmlType}
      $full={full}
      $buttonType={type}
      disabled={isDisabled}
      variant={variant}
      size={size}
      {...rest}
    >
      {loading ? <LoadIcon /> : children}
    </Container>
  )
}
