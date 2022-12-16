import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  body {
    background: ${({ theme }) => theme.colors['neutral-800']};
    color: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;

    &::-webkit-scrollbar {
      width: 1rem; /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: transparent; /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        theme.colors['neutral-300']}; /* color of the scroll thumb */
      border-radius: 8px; /* roundness of the scroll thumb */
    }
  }

  body, input, textarea, button {
    font: 400 1rem 'Roboto', sans-serif;
  }
`
