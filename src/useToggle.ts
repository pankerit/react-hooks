import { useState } from 'react'

export function useToggle(initState = false) {
  const [state, setState] = useState(initState)
  const setToggle = (toggle: boolean = !state) => {
    setState(toggle)
  }
  return [state, setToggle] as const
}
