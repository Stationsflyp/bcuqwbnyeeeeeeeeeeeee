'use client'

import { useEffect, useState } from 'react'

export default function IntroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 transition-all duration-2000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Glitch effect title */}
        <div className="relative">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 glitch-effect">
            Welcome...
          </h2>
          <div className="absolute inset-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary opacity-30 blur-sm glitch-effect" style={{ animationDelay: '0.1s' }}>
            Welcome...
          </div>
        </div>

        {/* Fading text */}
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 fade-in">
          <p className="text-balance">
            {'This is the final echo of Oxcy 666.'}
          </p>
          <p className="text-balance text-secondary">
            {'Founder of OxcyShop — Discord Legacy Project'}
          </p>
          <p className="text-balance text-muted-foreground">
            {'Logging out from the developer world forever…'}
          </p>
        </div>

        {/* Breathing effect line */}
        <div className="w-full max-w-md mx-auto h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
