import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'

const mshot = (url: string, w = 1000) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}`

interface Project {
  n: string
  category: string
  name: string
  live: string
  col1: [string, string]
  col2: string
}

const PROJECTS: Project[] = [
  {
    n: '01',
    category: 'Client',
    name: 'Daylight',
    live: 'https://godaylight.com/',
    col1: [mshot('https://godaylight.com/product'), mshot('https://godaylight.com/brand')],
    col2: mshot('https://godaylight.com/', 1200),
  },
  {
    n: '02',
    category: 'Client',
    name: 'Cleo',
    live: 'https://web.meetcleo.com',
    col1: [
      'https://www.datocms-assets.com/157778/1769568837-j-favorite.png?auto=format&fit=max&w=900',
      'https://www.datocms-assets.com/157778/1770240296-cleo_weisenhof_shot_12_094-v003-1.png?auto=format&fit=max&w=900',
    ],
    col2: 'https://www.datocms-assets.com/157778/1770240497-cleo_lions-ark_shot_24_004-v005-4.png?auto=format&fit=max&w=1200',
  },
  {
    n: '03',
    category: 'Client',
    name: 'Risk',
    live: 'https://risk.film/works',
    col1: [mshot('https://risk.film/about'), mshot('https://risk.film/work/we-took-the-time')],
    col2: mshot('https://risk.film/', 1200),
  },
]

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={containerRef} className="sticky top-24 h-[85vh] md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative flex h-full flex-col overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex shrink-0 flex-wrap items-start justify-between gap-4">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="shrink-0 font-black text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 110px)', lineHeight: 1 }}
            >
              {project.n}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <span
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton href={project.live} />
        </div>

        <div className="mt-6 flex min-h-0 flex-1 gap-3 sm:mt-8">
          <div className="flex w-[40%] min-h-0 flex-col gap-3">
            <div className="min-h-0 flex-[0.4] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
              <img
                src={project.col1[0]}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-h-0 flex-[0.6] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
              <img
                src={project.col1[1]}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="min-h-0 w-[60%] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
            <img
              src={project.col2}
              alt={`${project.name} preview`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28"
      style={{ fontFamily: 'var(--font-kanit)' }}
    >
      <FadeIn>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.n} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  )
}
