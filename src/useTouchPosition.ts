import { useEffect, useState } from 'react'

export function useTouchPosition() {
  const [state, setState] = useState([0, 0])
  useEffect(() => {
    const handleEvent = (event: TouchEvent) => {
      setState([event.touches[0].pageX, event.touches[0].pageY])
    }
    window.addEventListener('touchmove', handleEvent)
    return () => window.removeEventListener('touchmove', handleEvent)
  }, [])
  return state
}
