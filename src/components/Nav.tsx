import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/Arbaaz_Alam_Resume.pdf', download: 'Arbaaz_Alam_Resume.pdf' },
]

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-4 w-5 flex-col justify-between">
      <span
        className="block h-px w-full bg-[#f6f2ea] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open ? 'translateY(7.5px) rotate(45deg)' : 'none',
        }}
      />
      <span
        className="block h-px w-full bg-[#f6f2ea] transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="block h-px w-full bg-[#f6f2ea] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
        }}
      />
    </div>
  )
}

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    lastY.current = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY.current

      if (currentY < 80) {
        setHidden(false)
      } else if (delta > 4) {
        setHidden(true)
        setMenuOpen(false)
      } else if (delta < -4) {
        setHidden(false)
      }

      lastY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center"
      animate={{ y: hidden ? '-130%' : '0%' }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-full rounded-b-2xl bg-black/95 px-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
        <ul className="no-scrollbar hidden items-center gap-6 overflow-x-auto whitespace-nowrap px-6 py-3 sm:flex sm:gap-10 sm:px-9 sm:py-3.5">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="shrink-0">
              <a
                href={link.href}
                download={link.download}
                className="group relative inline-block text-[13px] font-medium tracking-wide text-[#f6f2ea]/70 transition-opacity duration-300 hover:opacity-100 hover:text-[#f6f2ea] sm:text-[14px]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f6f2ea] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex items-center justify-center px-6 py-3.5 sm:hidden"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mt-2 w-[min(80vw,260px)] overflow-hidden rounded-2xl bg-black/95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] sm:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    download={link.download}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-3.5 text-center text-[15px] font-medium tracking-wide text-[#f6f2ea]/80 transition-colors duration-200 hover:text-[#f6f2ea]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
