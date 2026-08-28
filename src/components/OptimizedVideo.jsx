import { memo, useEffect, useRef, useState } from 'react'

const OptimizedVideo = memo(function OptimizedVideo({
  src,
  poster,
  className = '',
  priority = false,
}) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(
    priority && !prefersReducedMotion,
  )
  const [isVisible, setIsVisible] = useState(
    priority && !prefersReducedMotion,
  )

  useEffect(() => {
    const video = videoRef.current
    const container = video?.parentElement
    if (!video || !container || priority || prefersReducedMotion) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) setShouldLoad(true)
      },
      { threshold: 0.05, rootMargin: '240px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [prefersReducedMotion, priority])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    if (priority || isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isVisible, priority, shouldLoad])

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      autoPlay={priority && !prefersReducedMotion}
      preload={priority ? 'metadata' : 'none'}
      poster={poster}
      src={shouldLoad ? src : undefined}
      aria-hidden="true"
      tabIndex={-1}
    />
  )
})

export default OptimizedVideo
