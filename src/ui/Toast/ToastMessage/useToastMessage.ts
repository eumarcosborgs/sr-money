import { useEffect } from 'react'
import { MessageType } from '../ToastContainer/useToastContainer'

interface useToastMessageProps {
  onRemoveMessage(itemId: string): void
  message: MessageType
}

export function useToastMessage({
  onRemoveMessage,
  message,
}: useToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 7000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [message, onRemoveMessage])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return {
    handleRemoveToast,
  }
}
