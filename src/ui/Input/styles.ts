import { theme } from 'config'
import styled, { css } from 'styled-components'

type Props = {
  isFilled: boolean
  isFocused: boolean
  isErrored: boolean
  isDisabled: boolean
}

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.8rem;

  svg {
    color: ${theme.colors['red-300']};
    margin-right: 0.8rem;
  }

  span {
    color: ${theme.colors['red-300']};
  }
`

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.15rem solid ${theme.colors['neutral-500']};
  border-radius: 0.5rem;
  transition: 300ms;
  width: 100%;

  > svg,
  .icon {
    margin-left: 1rem;
    color: ${theme.colors['neutral-500']};
    transition: 300ms;
  }

  &:hover {
    border: 0.15rem solid ${theme.colors['neutral-500']};

    > svg,
    .icon {
      color: ${theme.colors['green-500']};
    }
  }

  ${({ isFilled, isDisabled }) =>
    isFilled &&
    !isDisabled &&
    css`
      > svg {
        color: ${theme.colors['green-500']};
      }
    `};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 0.15rem solid ${theme.colors['green-500']};
      box-shadow: 0 0 0 0.1rem ${theme.shadow['green-300']};

      &:hover {
        border: 0.15rem solid ${theme.colors['green-500']};

        > svg,
        .icon {
          color: ${theme.colors['green-500']};
        }
      }

      > svg,
      .icon {
        color: ${theme.colors['green-300']};
      }
    `};

  ${({ isErrored, isFocused }) =>
    isErrored &&
    css`
      border: 0.15rem solid ${theme.colors['red-300']};

      ${isFocused &&
      css`
        box-shadow: 0 0 0 0.1rem ${theme.shadow['red-300']};

        &:hover {
          border: 0.15rem solid ${theme.colors['red-300']};

          > svg,
          .icon {
            color: ${theme.colors['red-300']};
          }
        }
      `}

      > svg, .icon {
        color: ${theme.colors['red-300']};
      }
    `};

  /* ${({ isDisabled }) =>
    isDisabled &&
    css`
      background: ${theme.colors['neutral-200']};
      cursor: no-drop;

      input {
        cursor: no-drop;
      }

      &:hover {
        border: 0.15rem solid ${theme.colors['neutral-500']};

        > svg,
        .icon {
          color: ${theme.colors['neutral-500']};
        }
      }
    `} */

  input,
  textarea {
    flex: 1;
    border: 0;
    background: transparent;
    padding: 1rem 1.5rem;
    color: ${theme.colors['neutral-500']};
    font-size: ${theme.fontSizes.disclaimer};
    border-radius: 0.5rem;

    &::placeholder {
      color: ${theme.colors['neutral-500']};
    }
  }

  textarea {
    resize: none;
    padding: 0 1.5rem;
    margin: 2rem 0;
  }

  &[type='date']::-webkit-calendar-picker-indicator {
    opacity: 1;
    display: block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    position: absolute;
    left: -20%;
  }

  // These for the & field container and date text
  &::-webkit-datetime-edit-fields-wrapper {
    position: relative;
    left: 5%;
  }
  &::-webkit-datetime-edit {
    position: relative;
    left: 5%;
  }
`
