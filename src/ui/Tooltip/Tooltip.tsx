import { ReactNode, ElementType, CSSProperties } from 'react'

import { BaseElement, Container, Indicator, Wrapper } from './styles'

export type TooltipProps = {
  message: string
  as?: ElementType
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
  style?: CSSProperties
  alwaysOnTop?: boolean
}

export function Tooltip({
  as,
  message,
  children,
  disabled = false,
  position = 'right',
  alwaysOnTop = false,
  style,
}: TooltipProps) {
  return (
    <BaseElement as={as} style={style}>
      {!disabled && (
        <Wrapper>
          <Container alwaysOnTop={alwaysOnTop} position={position}>
            {message}
          </Container>
          <Indicator alwaysOnTop={alwaysOnTop} position={position} />
        </Wrapper>
      )}
      {children}
    </BaseElement>
  )
}
