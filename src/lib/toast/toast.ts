import { eventManager } from 'lib'

export const toastEventManager = eventManager

interface toastProps {
  type: 'default' | 'success' | 'danger'
  text: string
  duration?: number
}

export function toast({ type, text, duration = 2000 }: toastProps) {
  toastEventManager.emit('addtoast', { type, text, duration })
}
