import FadeIn from './FadeIn'

const SERVICE_ITEMS = [
  {
    n: '01',
    name: 'Full-Stack Development',
    desc: 'Building production-grade web apps end to end — from React and Next.js frontends to Node.js, Supabase, and PostgreSQL backends.',
  },
  {
    n: '02',
    name: 'AI Automation',
    desc: 'Designing and deploying LLM-powered pipelines with n8n, Claude, GPT, and Gemini APIs — webhook triggers, triage, and validation built in.',
  },
  {
    n: '03',
    name: 'UI/UX Design',
    desc: 'Crafting pixel-perfect, responsive interfaces and component design systems, turning Figma handoffs into production-ready code.',
  },
  {
    n: '04',
    name: 'Mobile Apps',
    desc: 'Shipping cross-platform iOS and Android apps in Flutter, with Firebase integration and real-time features.',
  },
  {
    n: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ fontFamily: 'var(--font-kanit)' }}
    >
      <FadeIn>
        <h2
          className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICE_ITEMS.map((item, i) => (
          <FadeIn
            key={item.n}
            delay={i * 0.1}
            className="flex items-start gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-10 sm:py-10 md:py-12"
          >
            <span
              className="shrink-0 font-black text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
            >
              {item.n}
            </span>
            <div className="flex flex-col gap-2 pt-2 sm:gap-3 sm:pt-4">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {item.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
