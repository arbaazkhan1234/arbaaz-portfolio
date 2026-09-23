import { useEffect, useRef, useState, type ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0)')
  const [transition, setTransition] = useState(inactiveTransition)

  useEffect(() => {
    const reset = () => {
      setTransition(inactiveTransition)
      setTransform('translate3d(0px, 0px, 0)')
    }

    const applyPull = (x: number, y: number) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const withinRange =
        x > rect.left - padding &&
        x < rect.right + padding &&
        y > rect.top - padding &&
        y < rect.bottom + padding

      if (withinRange) {
        const offsetX = (x - centerX) / strength
        const offsetY = (y - centerY) / strength
        setTransition(activeTransition)
        setTransform(`translate3d(${offsetX}px, ${offsetY}px, 0)`)
      } else {
        reset()
      }
    }

    const handleMouseMove = (e: MouseEvent) => applyPull(e.clientX, e.clientY)

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) applyPull(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', reset)
    window.addEventListener('touchcancel', reset)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', reset)
      window.removeEventListener('touchcancel', reset)
    }
  }, [padding, strength, activeTransition, inactiveTransition])

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform, transition, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
