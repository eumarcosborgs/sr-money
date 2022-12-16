import { RefObject, memo } from 'react'
import { CheckCircle, XCircle } from 'phosphor-react'

import { useToastMessage } from './useToastMessage'
import { MessageType } from '../ToastContainer/useToastContainer'

import { Container } from './styles'

interface ToastMessageComponentProps {
  message: MessageType
  onRemoveMessage(messageId: string): void
  isLeaving: boolean
  animatedRef: RefObject<HTMLDivElement>
}

function ToastMessageComponent({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}: ToastMessageComponentProps) {
  const { handleRemoveToast } = useToastMessage({ onRemoveMessage, message })

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <XCircle size={24} />}
      {message.type === 'success' && <CheckCircle size={24} />}
      <strong>{message.text}</strong>
    </Container>
  )
}

const ToastMessage = memo(ToastMessageComponent)

export { ToastMessage }
