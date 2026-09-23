import { useReducedMotion, motion } from 'framer-motion'

const BRAND = 'Arbaaz'

const EASE = [0.16, 1, 0.3, 1] as const

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="stroke-current"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Heading({ shouldAnimate }: { shouldAnimate: boolean }) {
  const words = BRAND.split(' ')

  return (
    <h1
      className="select-none font-medium text-[#f6f2ea]"
      style={{
        fontSize: 'clamp(3.5rem, 13vw, 10.5rem)',
        lineHeight: 0.88,
        letterSpacing: '-0.04em',
      }}
    >
      {words.map((word, i) => (
        <span key={word} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={shouldAnimate ? { y: '110%', opacity: 0 } : false}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = !reduceMotion

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: 'scale(1.01)', objectPosition: 'center' }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Cinematic gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-12 md:px-12 md:pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-6">
          <div className="md:col-span-8">
            <Heading shouldAnimate={shouldAnimate} />
          </div>

          <div className="group/cta md:col-span-4 md:justify-self-end md:pb-2">
            <motion.p
              className="max-w-xs text-[15px] leading-relaxed text-black transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:text-white sm:max-w-sm sm:text-base [@media(hover:none)]:text-white/90"
              initial={shouldAnimate ? { opacity: 0, y: 26 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.48, ease: EASE }}
            >
              Full-stack web developer and designer crafting pixel-perfect
              interfaces in React and Next.js — building SaaS platforms,
              apps, and full-stack web products used by real people.
            </motion.p>

            <motion.div
              className="mt-6"
              initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-between gap-3 rounded-full bg-black px-5 py-2.5 text-[14px] font-medium text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition-[background-color,color,gap,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:gap-5 group-hover/cta:bg-white group-hover/cta:text-black active:scale-[0.97] active:duration-150 sm:px-6 sm:py-3 sm:text-[15px] [@media(hover:none)]:gap-5 [@media(hover:none)]:bg-white [@media(hover:none)]:text-black"
              >
                <span>View my work</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:bg-black group-hover/cta:text-white [@media(hover:none)]:bg-black [@media(hover:none)]:text-white sm:h-8 sm:w-8">
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:-rotate-[33deg] [@media(hover:none)]:-rotate-[33deg]">
                    <ArrowIcon />
                  </span>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#intro"
        aria-label="Scroll to next section"
        className="group absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[#f6f2ea]/60 transition-colors duration-300 hover:text-[#f6f2ea] sm:flex"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: EASE }}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.span
          className="block"
          animate={shouldAnimate ? { y: [0, 6, 0] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-current"
            aria-hidden="true"
          >
            <path
              d="M12 4v16m0 0l-6-6m6 6l6-6"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.a>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  )
}
