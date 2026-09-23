import Magnet from './Magnet'
import ContactButton from './ContactButton'
import FadeIn from './FadeIn'

const PORTRAIT_SRC =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

export default function FooterHeroSection() {
  return (
    <footer
      id="contact"
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0C0C0C]"
      style={{ fontFamily: 'var(--font-kanit)' }}
    >
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="overflow-hidden">
          <FadeIn delay={0.15} y={40}>
            <h1
              className="hero-heading mt-6 w-full whitespace-nowrap font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-5 text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
            >
              i&apos;m arbaaz
            </h1>
          </FadeIn>
        </div>

        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
        >
          <FadeIn delay={0.6} y={30}>
            <img src={PORTRAIT_SRC} alt="Arbaaz" className="w-full" />
          </FadeIn>
        </Magnet>

        <div className="mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
          <FadeIn
            delay={0.35}
            y={20}
            as="p"
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a web developer driven by crafting striking and unforgettable projects
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton href="mailto:arbazrana440@gmail.com" />
          </FadeIn>
        </div>
      </div>
    </footer>
  )
}
