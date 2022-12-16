import { useEffect } from 'react'

import { toastEventManager } from 'lib'
import { useAnimatedList } from 'hooks'

export type MessageType = {
  id: string
  type: 'default' | 'success' | 'danger'
  text: string
  duration: number
}

export function useToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList({})

  useEffect(() => {
    function handleAddToast({ type, text, duration }: MessageType) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: `${Math.random() * (1000 - 1) + 1}`,
          type,
          text,
          duration,
        },
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [setMessages])

  return {
    messages,
    handleRemoveMessage: handleRemoveItem,
    renderList,
  }
}
