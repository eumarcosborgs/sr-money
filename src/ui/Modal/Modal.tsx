import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { ReactNode } from 'react'
import { Overlay, CloseButton, Content } from './styles'

interface ModalProps {
  title: string
  children: ReactNode
}

export function Modal({ title, children }: ModalProps) {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>{title}</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        {children}
      </Content>
    </Dialog.Portal>
  )
}
