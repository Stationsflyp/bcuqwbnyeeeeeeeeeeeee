'use client'

import { useEffect, useRef, useState } from 'react'

interface Milestone {
  title: string
  description: string
  year: string
}

const milestones: Milestone[] = [
  { title: 'The Birth of OxcyShop', description: 'A vision became reality. The first server launched.', year: '2020' },
  { title: 'First Members & First Tools', description: 'Community growth. Initial tooling released.', year: '2021' },
  { title: 'Achievements & Rebuilds', description: 'Scaling up. Overcoming challenges. Evolution.', year: '2022' },
  { title: 'Peak Innovation', description: 'Maximum impact. Pushing boundaries. Legacy cemented.', year: '2023' },
  { title: 'Final Shutdown Moment', description: 'All good things must end. The final commit.', year: '2024' },
]

export default function LegacyTimeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems(prev => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary mb-3 sm:mb-4">
          OXCY LEGACY ARCHIVE
        </h2>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-12 sm:mb-16">Holographic Timeline</p>

        <div className="relative space-y-12 sm:space-y-16">
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2" />

          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`relative transition-all duration-1000 ${
                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className={`flex-1 w-full sm:w-auto text-center sm:text-left ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/30 rounded-lg p-4 sm:p-6 backdrop-blur-sm hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 float-animation">
                    <div className="text-xs text-secondary mb-2">{milestone.year}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2">{milestone.title}</h3>
                    <p className="text-sm md:text-base text-foreground/70">{milestone.description}</p>
                  </div>
                </div>

                <div className="relative flex-shrink-0 hidden sm:block">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-75" />
                </div>

                <div className="flex-1 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
