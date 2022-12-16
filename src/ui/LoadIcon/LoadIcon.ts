import styled, { keyframes } from 'styled-components'
import { CircleNotch, IconProps } from 'phosphor-react'

const loading = keyframes`
  0% {
    transform: rotate(0)
  }

  100% {
    transform: rotate(360deg)
  }
`

export const LoadIcon = styled(CircleNotch).attrs<IconProps>((props) => ({
  size: props.size || 18,
  'aria-label': 'loading',
  ...props,
}))`
  animation: ${loading} 1.2s ease-in-out infinite;
`
