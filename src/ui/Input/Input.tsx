import {
  ComponentType,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { IconProps, WarningCircle } from 'phosphor-react'

import { useInput } from 'lib'

import { AmountInput } from './AmountInput'
import { PasswordInput } from './PasswordInput'

import { Container, ErrorContainer } from './styles'
import { AutocompleteInput } from './AutocompleteInput'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: ForwardedRef<HTMLInputElement>
  error?: string
  icon: ComponentType<IconProps>
}

type InputCompoundComponent = {
  Amount: typeof AmountInput
  Password: typeof PasswordInput
  Autocomplete: typeof AutocompleteInput
} & ForwardRefExoticComponent<InputProps>

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    defaultValue,
    error,
    icon: Icon,
    name,
    id = name,
    disabled = false,
    required = false,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) => {
  const {
    isFilled,
    isFocused,
    isErrored,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
  } = useInput({
    defaultValue,
    error,
    onBlur,
    onFocus,
  })

  return (
    <>
      <Container
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
        isDisabled={disabled}
      >
        {Icon && <Icon size={22} />}

        <input
          id={id}
          ref={ref}
          name={name}
          aria-label={name}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          role="textbox"
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

export const Input = forwardRef(ForwardInput) as InputCompoundComponent

Input.Amount = AmountInput
Input.Password = PasswordInput
Input.Autocomplete = AutocompleteInput
