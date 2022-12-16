import styled from 'styled-components'
import {
  BaseElement as BaseElementTooltip,
  Wrapper as WrapperTooltip,
  Container as ContainerTooltip,
  Indicator as IndicatorTooltip,
} from 'ui/Tooltip/styles'

export const BaseElement = styled(BaseElementTooltip)`
  width: 100%;
`

export const Wrapper = styled(WrapperTooltip)``

export const Container = styled(ContainerTooltip)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.disclaimer};
  background: ${({ theme }) => theme.colors['neutral-700']};
  border: 0.1rem solid ${({ theme }) => theme.colors['neutral-700']};
  padding: 1rem;
`

export const Indicator = styled(IndicatorTooltip)`
  background: ${({ theme }) => theme.colors['neutral-700']};
  border: 0.1rem solid ${({ theme }) => theme.colors['neutral-700']};
`
export const OptionContainer = styled.div`
  max-height: 10rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1rem; /* width of the entire scrollbar */
    border: 0.1rem solid ${({ theme }) => theme.colors['neutral-900']};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors['neutral-300']}; /* color of the scroll thumb */
    border-radius: 12px; /* roundness of the scroll thumb */
  }
`

export const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  list-style-type: none;
  gap: 0.75rem;
`

export const OptionItem = styled.li`
  padding: 0.5rem 0.75rem;
  border: 0.1rem solid ${({ theme }) => theme.colors['neutral-900']};
  border-radius: 6px;

  cursor: pointer;
`
