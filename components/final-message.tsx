'use client'

import { useEffect, useState } from 'react'

export default function FinalMessage() {
  const [showMessage, setShowMessage] = useState(false)
  const [showConsole, setShowConsole] = useState(false)

  useEffect(() => {
    const messageTimer = setTimeout(() => setShowMessage(true), 500)
    const consoleTimer = setTimeout(() => setShowConsole(true), 3000)
    return () => {
      clearTimeout(messageTimer)
      clearTimeout(consoleTimer)
    }
  }, [])

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-4xl w-full text-center space-y-12 sm:space-y-16">
        {/* Main message */}
        <div className={`transition-all duration-2000 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-6 sm:mb-8 text-balance leading-tight">
              {'This isn\'t the end —'}
              <br />
              {'only the last update.'}
            </h2>
            <div className="absolute inset-0 text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-secondary opacity-20 blur-md glitch-effect">
              {'This isn\'t the end —'}
              <br />
              {'only the last update.'}
            </div>
          </div>
          
          <p className="text-lg sm:text-2xl md:text-3xl text-foreground/60 mt-6 sm:mt-8">
            — Oxcy 666
          </p>
        </div>

        {/* Console */}
        {showConsole && (
          <div className="bg-black/90 border-2 border-primary rounded-lg p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary/30 fade-in">
            <div className="text-xs sm:text-sm md:text-base text-left space-y-1.5 sm:space-y-2">
              <div className="text-secondary">{'> finalizing_session();'}</div>
              <div className="text-muted-foreground">{'// Closing all threads...'}</div>
              <div className="text-green-400">{'✓ Memories saved'}</div>
              <div className="text-green-400">{'✓ Legacy preserved'}</div>
              <div className="text-green-400">{'✓ Community cherished'}</div>
              <div className="text-primary mt-4">{'> exit_oxcyshop();'}</div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-foreground">{'oxcy666@legacy:~$'}</span>
                <div className="w-2 h-4 bg-primary cursor-blink" />
              </div>
            </div>
          </div>
        )}

        {/* Final flourish */}
        <div className="space-y-3 sm:space-y-4 opacity-60">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            Forever archived in cyberspace
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </div>

        {/* Binary rain effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/20 text-xs opacity-50 sm:opacity-100"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `particleFloat ${10 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                ['--drift' as string]: `${(Math.random() - 0.5) * 100}px`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
