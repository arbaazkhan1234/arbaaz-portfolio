import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'

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
    col1: ['/projects/daylight-1.jpg', '/projects/daylight-2.jpg'],
    col2: '/projects/daylight-3.jpg',
  },
  {
    n: '02',
    category: 'Client',
    name: 'Cleo',
    live: 'https://web.meetcleo.com',
    col1: ['/projects/cleo-1.jpg', '/projects/cleo-2.jpg'],
    col2: '/projects/cleo-3.jpg',
  },
  {
    n: '03',
    category: 'Client',
    name: 'Risk',
    live: 'https://risk.film/works',
    col1: ['/projects/risk-1.jpg', '/projects/risk-2.jpg'],
    col2: '/projects/risk-3.jpg',
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
