import { ChangeEvent } from 'react'

import { useCategory } from 'hooks'
import { useSignOut } from 'client'
import { NewTransactionModal, NewCategoryModal } from './components'

import {
  HeaderContainer,
  HeaderContent,
  SelectCategory,
  SignOutButton,
} from './styles'
import { ArrowCircleLeft } from 'phosphor-react'
import { Tooltip } from 'ui/Tooltip'

export function Header() {
  const { categoryIdSelected, categories, onChangeCategory } = useCategory()
  const { signOut } = useSignOut()

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    onChangeCategory(event.target.value)
  }

  function handleSignOut() {
    signOut()
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <h1>SR Money</h1>

        <div>
          <SelectCategory
            value={categoryIdSelected}
            onChange={handleCategoryChange}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((categoryValue) => (
              <option key={categoryValue.id} value={categoryValue.id}>
                {categoryValue.name}
              </option>
            ))}
          </SelectCategory>

          <NewCategoryModal />

          <NewTransactionModal />

          <Tooltip message="Sair da aplicação" position="bottom">
            <SignOutButton onClick={handleSignOut}>
              <ArrowCircleLeft className="signOut" size={32} />
            </SignOutButton>
          </Tooltip>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
