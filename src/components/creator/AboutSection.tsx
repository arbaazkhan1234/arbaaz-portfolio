import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const ASSETS_BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'

const ABOUT_TEXT =
  "With more than 3 years of experience across web development and design, i focus on full-stack apps, AI automation, and user experience, i truly enjoy working with teams that aim to stand out and ship real products. Let's build something incredible together!"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
      style={{ fontFamily: 'var(--font-kanit)' }}
    >
      <FadeIn
        as="img"
        src={`${ASSETS_BASE}/moon_icon.11395d36.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
      />
      <FadeIn
        as="img"
        src={`${ASSETS_BASE}/p59_1.4659672e.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
      />
      <FadeIn
        as="img"
        src={`${ASSETS_BASE}/lego_icon-1.703bb594.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
      />
      <FadeIn
        as="img"
        src={`${ASSETS_BASE}/Group_134-1.2e04f3ce.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
      />

      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-center font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
