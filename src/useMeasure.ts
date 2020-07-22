import { useState, useEffect, useLayoutEffect, useRef, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export interface ContentRect {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  left: number
  bottom: number
}

export function useMeasure(ref: RefObject<HTMLElement>): ContentRect {
  const frame = useRef(0)
  const [rect, set] = useState<ContentRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

  const observer = useRef(
    new ResizeObserver((entries) => {
      const entry = entries[0]

      if (entry) {
        cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => {
          if (ref.current) set(ref.current.getBoundingClientRect())
        })
      }
    }),
  )

  useEffect(() => {
    const observ = observer.current
    observ.disconnect()

    if (ref.current) {
      observ.observe(ref.current)
    }
    return () => {
      observ.disconnect()
    }
  }, [ref])

  return rect
}

export function useMeasureOnce(ref: RefObject<HTMLElement>): ContentRect {
  const [rect, set] = useState<ContentRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

  useLayoutEffect(() => {
    if (ref.current) {
      set(ref.current.getBoundingClientRect())
    }
  }, [ref])

  return rect
}
