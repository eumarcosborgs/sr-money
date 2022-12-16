import { ChangeEvent, KeyboardEvent } from 'react'

import { Input } from 'ui'

import { Container, SelectMonth } from './styles'
import { CalendarBlank, MagnifyingGlass } from 'phosphor-react'
import { useMonth, useTransaction } from 'hooks'
import { isOnlyNumbers } from 'lib'

export function SearchForm() {
  const { monthIdSelected, months, onChangeMonth } = useMonth()
  const {
    onChangeSearchTerm,
    searchTermValue,
    searchDateValue,
    onChangeSearchDate,
  } = useTransaction()

  function handleChangeMonthIdSelected(event: ChangeEvent<HTMLSelectElement>) {
    onChangeMonth(event.target.value)
  }

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOnlyNumbers(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <Container>
      <Input
        placeholder="Busque por transações"
        icon={MagnifyingGlass}
        onChange={onChangeSearchTerm}
        value={searchTermValue}
      />

      <Input
        icon={CalendarBlank}
        onChange={onChangeSearchDate}
        value={searchDateValue}
        onKeyPress={handleOnKeyPress}
        maxLength={10}
      />

      <SelectMonth
        value={monthIdSelected}
        onChange={handleChangeMonthIdSelected}
      >
        <option value="">Selecione um mês</option>
        {months.map((month) => (
          <option key={month.id} value={month.id}>
            {month.name}
          </option>
        ))}
      </SelectMonth>
    </Container>
  )
}
