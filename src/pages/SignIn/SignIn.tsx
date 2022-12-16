import { IdentificationCard } from 'phosphor-react'

import { Button, Input } from 'ui'

import { useSignIn } from './useSignIn'

import { Container, Wrapper } from './styles'

export function SignIn() {
  const { errors, onSubmit, register, isLoading } = useSignIn()

  return (
    <Wrapper>
      <Container>
        <form onSubmit={onSubmit}>
          <Input
            required
            id="username"
            type="text"
            placeholder="Username"
            icon={IdentificationCard}
            error={errors?.username?.message}
            {...register('username')}
          />
          <Input.Password
            required
            id="password"
            placeholder="Secret password"
            {...register('password')}
            maxLength={12}
            minLength={6}
            error={errors?.password?.message}
          />

          <Button type="text" htmlType="submit" loading={isLoading}>
            SignIn
          </Button>
        </form>
      </Container>
    </Wrapper>
  )
}
