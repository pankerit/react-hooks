import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [state, setState] = useState([0, 0])
  useEffect(() => {
    const handleEvent = (event: MouseEvent) => {
      setState([event.clientX, event.clientY])
    }
    window.addEventListener('mousemove', handleEvent)
    return () => window.removeEventListener('mousemove', handleEvent)
  }, [])
  return state
}
