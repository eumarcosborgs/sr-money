import styled from 'styled-components'

export const NewCategoryButton = styled.button`
  height: 50px;
  border: 0;
  background: ${({ theme }) => theme.colors['green-500']};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.disclaimer};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.colors['green-500']};
  }
`

export const NewCategoryForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
