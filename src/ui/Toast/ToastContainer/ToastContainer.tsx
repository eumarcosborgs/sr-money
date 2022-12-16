import { RefObject } from 'react'

import { ToastMessage } from 'ui'

import { useToastContainer, MessageType } from './useToastContainer'

import { Container } from './styles'

interface renderListProps {
  isLeaving: boolean
  animatedRef: RefObject<HTMLDivElement>
}

export function ToastContainer() {
  const { handleRemoveMessage, renderList } = useToastContainer()

  return (
    <Container>
      {renderList(
        (message: MessageType, { isLeaving, animatedRef }: renderListProps) => (
          <ToastMessage
            key={message.id}
            message={message}
            onRemoveMessage={handleRemoveMessage}
            isLeaving={isLeaving}
            animatedRef={animatedRef}
          />
        ),
      )}
    </Container>
  )
}
