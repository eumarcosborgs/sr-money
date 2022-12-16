import { CurrencyDollar, WarningCircle } from 'phosphor-react'
import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
} from 'react'
import { useFormContext } from 'react-hook-form'

import { isOnlyNumbers, useFormat, useInput } from 'lib'

import { Container, ErrorContainer } from '../styles'

function inputNumberParser(value?: string): string {
  return value ? value.replace(/\W/g, '') : ''
}

export type AmountInputProps = {
  name: string
  error?: string
  defaultValue?: string
} & InputHTMLAttributes<HTMLInputElement>

export function AmountInput({
  name,
  id = name,
  error,
  disabled = false,
  required = false,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: AmountInputProps) {
  const { register, watch, trigger, setValue } = useFormContext()
  const { toDecimal } = useFormat()

  const value = watch(name)

  const {
    isFocused,
    isFilled,
    isErrored,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
  } = useInput({
    defaultValue: value,
    error,
    onBlur,
    onFocus,
  })

  useEffect(() => {
    register(name)
  }, [name, register])

  const formattedValue = value ? toDecimal(inputNumberParser(value)) : ''

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOnlyNumbers(event.key)) {
      event.preventDefault()
    }
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    const amount = inputNumberParser(value)

    setValue(name, amount)
    trigger(name)

    onChange && onChange(event)
  }

  return (
    <>
      <Container
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
        isDisabled={disabled}
      >
        <CurrencyDollar size={22} />
        <input
          id={id}
          name={name}
          aria-label={name}
          disabled={disabled}
          required={required}
          value={formattedValue}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyPress={handleOnKeyPress}
          onChange={handleOnChange}
          {...rest}
        />
      </Container>
      {error && (
        <ErrorContainer>
          <WarningCircle size={18} />
          <span>{errorMessage}</span>
        </ErrorContainer>
      )}
    </>
  )
}
