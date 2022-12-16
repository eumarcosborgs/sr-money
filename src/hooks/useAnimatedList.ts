import { useState, useCallback, useRef, createRef, useEffect } from 'react'

interface useAnimatedListProps {
  initialValue?: any[]
}

type ItemProps = any

export function useAnimatedList({ initialValue = [] }: useAnimatedListProps) {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] =
    useState(initialValue)
  const [items, setItems] = useState<ItemProps[]>([])

  const animatedRefs = useRef(new Map())
  const animationEndListeners = useRef(new Map())

  const handleRemoveItem = useCallback((itemId: string) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, itemId])
  }, [])

  const handleAnimationEnd = useCallback((itemId: string) => {
    const removeListener = animationEndListeners.current.get(itemId)
    removeListener()

    animationEndListeners.current.delete(itemId)
    animatedRefs.current.delete(itemId)

    setItems((prevState) => prevState.filter((item) => item.id !== itemId))
    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((id) => id !== itemId),
    )
  }, [])

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId)
      const animatedElement = animatedRef?.current
      const alreadyHasListener = animationEndListeners.current.has(itemId)

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId)
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd)
        }

        animatedElement.addEventListener('animationend', onAnimationEnd)
        animationEndListeners.current.set(itemId, removeListener)
      }
    })
  }, [handleAnimationEnd, pendingRemovalItemsIds])

  useEffect(() => {
    const removeListeners = animationEndListeners.current
    return () => {
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [])

  const getAnimatedRef = useCallback((item: ItemProps) => {
    let animatedRef = animatedRefs.current.get(item.id)

    if (!animatedRef) {
      // animatedRef = { current: null }; // Mesma coisa que createRef()
      animatedRef = createRef()
      animatedRefs.current.set(item.id, animatedRef)
    }

    return animatedRef
  }, [])

  const renderList = useCallback(
    (renderItem: ItemProps) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id)
        const animatedRef = getAnimatedRef(item)

        return renderItem(item, { isLeaving, animatedRef })
      }),
    [getAnimatedRef, items, pendingRemovalItemsIds],
  )

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  }
}
