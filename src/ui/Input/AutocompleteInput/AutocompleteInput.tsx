import {
  useEffect,
  InputHTMLAttributes,
  ComponentType,
  ChangeEvent,
  useMemo,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { IconProps, WarningCircle } from 'phosphor-react'

import { useInput } from 'lib'

import {
  Container as ContainerInput,
  ErrorContainer as ErrorContainerInput,
} from '../styles'

import {
  BaseElement,
  Container,
  Indicator,
  Wrapper,
  OptionContainer,
  OptionList,
  OptionItem,
} from './styles'

type Option = {
  key: string
  value: string
}

export interface AutocompleteInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  error?: string
  defaultValue?: string
  icon: ComponentType<IconProps>
  options: Option[]
}

export function AutocompleteInput({
  name,
  id = name,
  error,
  options,
  icon: Icon,
  disabled = false,
  required = false,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: AutocompleteInputProps) {
  const { register, watch, trigger, setValue } = useFormContext()

  const value = watch(name)

  const formattedValue = (value || '') as string

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

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(name, event.currentTarget.value)
    trigger(name)

    onChange && onChange(event)
  }

  function handleOnChangeByOption(optionValue: string) {
    setValue(name, optionValue)
    trigger(name)
  }

  const optionsFiltered = useMemo(
    () =>
      options.filter((option) =>
        option.value.toLowerCase().startsWith(formattedValue.toLowerCase()),
      ),
    [options, formattedValue],
  )

  const disabledTooltip =
    formattedValue.length < 3 ||
    optionsFiltered.length <= 0 ||
    (optionsFiltered.length === 1 &&
      optionsFiltered[0].value === formattedValue)

  return (
    <BaseElement>
      {!disabledTooltip && (
        <Wrapper>
          <Container alwaysOnTop={true} position="bottom">
            <OptionContainer>
              <OptionList>
                {optionsFiltered.map((option) => (
                  <OptionItem
                    key={option.key}
                    onClick={() => handleOnChangeByOption(option.value)}
                  >
                    <span>{option.value}</span>
                  </OptionItem>
                ))}
              </OptionList>
            </OptionContainer>
          </Container>
          <Indicator alwaysOnTop={true} position="bottom" />
        </Wrapper>
      )}
      <>
        <ContainerInput
          isFilled={isFilled}
          isFocused={isFocused}
          isErrored={isErrored}
          isDisabled={disabled}
        >
          {Icon && <Icon size={22} />}
          <input
            id={id}
            name={name}
            aria-label={name}
            disabled={disabled}
            required={required}
            value={formattedValue}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onChange={handleOnChange}
            {...rest}
          />
        </ContainerInput>
        {error && (
          <ErrorContainerInput>
            <WarningCircle size={18} />
            <span>{errorMessage}</span>
          </ErrorContainerInput>
        )}
      </>
    </BaseElement>
  )
}
