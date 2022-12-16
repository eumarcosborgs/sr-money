import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { Button, Input, Modal } from 'ui'

import { useCategoryModal } from './useCategoryModal'

import { NewCategoryForm, NewCategoryButton } from './styles'
import { User } from 'phosphor-react'

export function NewCategoryModal() {
  const [open, setOpen] = useState(false)
  const { register, onSubmit, errors, isLoading } = useCategoryModal({
    onCloseModal,
  })

  function onCloseModal() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <NewCategoryButton>Nova categoria</NewCategoryButton>
      </Dialog.Trigger>

      <Modal title="Nova transação">
        <NewCategoryForm onSubmit={onSubmit}>
          <Input
            required
            placeholder="Nome"
            {...register('name')}
            icon={User}
            error={errors.name?.message}
          />

          <Button
            type="text"
            full={false}
            htmlType="submit"
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </NewCategoryForm>
      </Modal>
    </Dialog.Root>
  )
}
