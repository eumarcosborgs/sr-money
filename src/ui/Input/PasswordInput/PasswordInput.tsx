import React, {
  useState,
  InputHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { IconProps, Eye, EyeClosed } from 'phosphor-react'

import { Input } from 'ui'

import { Button } from './styles'

type Props = {
  error?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

const ForwardPasswordInput: ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = ({ ...rest }: Props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const type = isPasswordVisible ? 'text' : 'password'

  function handleOnClick() {
    setIsPasswordVisible((prevState) => !prevState)
  }

  function ControlButton(props: IconProps) {
    return (
      <Button
        type="button"
        onClick={handleOnClick}
        aria-label="ControlPasswordType"
      >
        {isPasswordVisible ? (
          <Eye className="icon" {...props} />
        ) : (
          <EyeClosed className="icon" {...props} />
        )}
      </Button>
    )
  }

  return <Input ref={ref} type={type} icon={ControlButton} {...rest} />
}

export const PasswordInput = forwardRef(ForwardPasswordInput)
