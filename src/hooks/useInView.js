import { useEffect, useRef, useState } from 'react'

export function useInView(margin = '-80px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window),
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.08, rootMargin: margin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [margin])

  return [ref, inView]
}

export function reveal(
  inView,
  { x = 0, y = 0, duration = 700, delay = 0 } = {},
) {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(${x}px, ${y}px, 0)`,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  }
}
