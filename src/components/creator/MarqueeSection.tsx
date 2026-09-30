import { useEffect, useRef, useState } from 'react'

function MarqueeImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      loading="eager"
      fetchPriority="low"
      onLoad={() => setLoaded(true)}
      className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover transition-opacity duration-500 ease-out"
      style={{ opacity: loaded ? 1 : 0 }}
    />
  )
}

const IMAGES = [
  '/marquee/space-voyage.jpg',
  '/marquee/codenest.jpg',
  '/marquee/vex-ventures.jpg',
  '/marquee/stellar-ai-v2.jpg',
  '/marquee/asme.jpg',
  '/marquee/transform-data.jpg',
  '/marquee/vitara.jpg',
  '/marquee/terra.jpg',
  '/marquee/skyelite.jpg',
  '/marquee/aethera.jpg',
  '/marquee/designpro.jpg',
  '/marquee/stellar-ai.jpg',
  '/marquee/xportfolio.jpg',
  '/marquee/orbit-web3.jpg',
  '/marquee/nexora.jpg',
  '/marquee/evr-ventures.jpg',
  '/marquee/planet-orbit.jpg',
  '/marquee/new-era.jpg',
  '/marquee/wealth.jpg',
  '/marquee/luminex.jpg',
]

const ROW1 = IMAGES.slice(0, 10)
const ROW2 = IMAGES.slice(10)

const tripled = (arr: string[]) => [...arr, ...arr, ...arr]

function Row({ images, translate }: { images: string[]; translate: string }) {
  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${translate})`, willChange: 'transform' }}
    >
      {images.map((src, i) => (
        <MarqueeImage key={i} src={src} />
      ))}
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const row1Images = tripled(ROW1)
  const row2Images = tripled(ROW2)

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ fontFamily: 'var(--font-kanit)' }}
    >
      <div className="flex flex-col gap-3">
        <Row images={row1Images} translate={`calc(-100%/3 + ${offset - 200}px)`} />
        <Row images={row2Images} translate={`calc(-100%/3 + ${-(offset - 200)}px)`} />
      </div>
    </section>
  )
}
