import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

const SENSITIVITY = 0.8
const EMAIL = 'arbazrana440@gmail.com'
const EASE = [0.16, 1, 0.3, 1] as const

const PILLS = [
  'Pitch me an idea',
  'Hire me full-time',
  'Send a quick hello',
  'See how I work',
]

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function CursorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 3l6.7 17 2-7.3L20 10.7 4 3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ScrubHint({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center [@media(hover:none)]:!hidden sm:flex md:bottom-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-3 rounded-full bg-black/60 px-5 py-2.5 text-white backdrop-blur-sm">
            <motion.span
              className="flex"
              animate={{ x: [-4, 0, -4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronIcon direction="left" />
            </motion.span>

            <motion.span
              className="flex items-center gap-2 text-[13px] font-medium"
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CursorIcon />
              Move your mouse
            </motion.span>

            <motion.span
              className="flex"
              animate={{ x: [4, 0, 4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronIcon direction="right" />
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function AriaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [pillsVisible, setPillsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const hintDismissedRef = useRef(false)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const shouldAnimate = !reduceMotion

  const { displayed, done } = useTypewriter(
    "Glad you stopped in. I like solving real problems more than shipping more code than necessary. So, what are we building?",
    38,
    600,
    revealed,
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlaying = () => {
      video.pause()
    }

    video.addEventListener('playing', handlePlaying)
    video.play().catch(() => {})

    return () => video.removeEventListener('playing', handlePlaying)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed) return
    const timeout = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(timeout)
  }, [revealed])

  useEffect(() => {
    if (!revealed) return
    const timeout = setTimeout(() => {
      if (!hintDismissedRef.current) setShowHint(true)
    }, 1600)
    return () => clearTimeout(timeout)
  }, [revealed])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let prevX: number | null = null

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    const applySeek = () => {
      if (!seekingRef.current) {
        seekingRef.current = true
        video.currentTime = targetTimeRef.current
      }
    }

    const scrubBy = (delta: number) => {
      if (!video.duration) return
      if (!hintDismissedRef.current && Math.abs(delta) > 3) {
        hintDismissedRef.current = true
        setShowHint(false)
      }
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = clamp(targetTimeRef.current + offset, 0, video.duration)
      applySeek()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!inView || !video.duration) return
      if (prevX === null) {
        prevX = e.clientX
        return
      }
      const delta = e.clientX - prevX
      prevX = e.clientX
      scrubBy(delta)
    }

    const onSeeked = () => {
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        video.currentTime = targetTimeRef.current
      } else {
        seekingRef.current = false
      }
    }

    let touchStartX: number | null = null
    let touchStartY: number | null = null
    let touchPrevX: number | null = null
    let gestureAxis: 'x' | 'y' | null = null

    const onTouchStart = (e: TouchEvent) => {
      if (!inView) return
      const t = e.touches[0]
      touchStartX = t.clientX
      touchStartY = t.clientY
      touchPrevX = t.clientX
      gestureAxis = null
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!inView || touchStartX === null || touchStartY === null) return
      const t = e.touches[0]
      const dx = t.clientX - touchStartX
      const dy = t.clientY - touchStartY

      if (gestureAxis === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        gestureAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      }

      if (gestureAxis === 'x') {
        e.preventDefault()
        const delta = t.clientX - (touchPrevX ?? t.clientX)
        touchPrevX = t.clientX
        scrubBy(delta)
      }
    }

    const onTouchEnd = () => {
      touchStartX = null
      touchStartY = null
      touchPrevX = null
      gestureAxis = null
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)
    video.addEventListener('seeked', onSeeked)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [inView])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative flex h-[100svh] min-h-[560px] w-full flex-col justify-end overflow-hidden bg-black px-5 pb-12 sm:px-8 sm:pb-0 md:justify-center md:px-10"
      style={{ fontFamily: 'var(--font-body-mf)' }}
    >
      <motion.video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        muted
        autoPlay
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
        initial={shouldAnimate ? { opacity: 0, scale: 1.06 } : false}
        animate={revealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 3, ease: EASE }}
      />

      {/* Blend seam with the hero above so the two sections read as one scene */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent sm:h-28" />

      <ScrubHint visible={showHint} />

      <div className="relative z-10 max-w-xl">
        <motion.p
          className="pointer-events-none mb-5 select-none text-white sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            filter: 'blur(4px)',
          }}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          Hey there, meet{' '}
          <span style={{ fontFamily: 'var(--font-heading-mf)' }}>A.R.I.A,</span>
          <br />
          Arbaaz's Adaptive Response Interface Agent
        </motion.p>

        <motion.p
          className="mb-5 text-white sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: 54,
          }}
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          {displayed}
          {!done && (
            <span
              className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-blink bg-white align-middle"
              aria-hidden="true"
            />
          )}
        </motion.p>

        <div className="flex flex-wrap gap-y-1">
          {PILLS.map((label, i) => (
            <motion.button
              key={label}
              type="button"
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-300 ease-out hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              initial={shouldAnimate ? { opacity: 0, y: -80, scale: 1.25 } : false}
              animate={pillsVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 700, damping: 17, mass: 0.7, delay: i * 0.12 }}
            >
              {label}
            </motion.button>
          ))}

          <motion.button
            type="button"
            onClick={handleCopy}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-300 ease-out hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
            initial={shouldAnimate ? { opacity: 0, y: -80, scale: 1.25 } : false}
            animate={pillsVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 700,
              damping: 17,
              mass: 0.7,
              delay: PILLS.length * 0.12,
            }}
          >
            <span>
              {copied ? 'Copied!' : 'Reach me: '}
              {!copied && <span className="underline underline-offset-1">{EMAIL}</span>}
            </span>
            <CopyIcon />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
