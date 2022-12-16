type EventListenerObject = object
type EventListener = (event: any) => void

type Listener = Map<string, EventListener[]>

class EventManager {
  private listeners: Listener
  constructor() {
    this.listeners = new Map<string, EventListener[]>()
  }

  on(event: string, listener: EventListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    this.listeners.get(event)?.push(listener)
  }

  emit(event: string, payload: EventListenerObject) {
    if (!this.listeners.has(event)) {
      return
    }

    this.listeners.get(event)?.forEach((listener) => {
      listener(payload)
    })
  }

  removeListener(event: string, listenerToRemove: EventListener) {
    const listeners = this.listeners.get(event)

    if (!listeners) {
      return
    }

    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    )

    this.listeners.set(event, filteredListeners)
  }
}

const eventManager = new EventManager()

export { eventManager }
