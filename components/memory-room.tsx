'use client'

const memories = [
  { type: 'screenshot', content: 'First server message', color: 'from-primary/20 to-secondary/10' },
  { type: 'code', content: 'def initialize():\n    self.legacy = True', color: 'from-secondary/20 to-primary/10' },
  { type: 'quote', content: '"Oxcy changed everything for us"', color: 'from-primary/20 to-purple-500/10' },
  { type: 'snippet', content: '> User joined #general\n> 1,000+ members online', color: 'from-secondary/20 to-cyan-500/10' },
  { type: 'concept', content: 'Unreleased Project: OxcyCore 2.0', color: 'from-cyan-500/20 to-primary/10' },
  { type: 'fragment', content: 'Thank you Oxcy, you\'re a legend', color: 'from-purple-500/20 to-secondary/10' },
]

export default function MemoryRoom() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary mb-3 sm:mb-4">
          EMOTIONAL MEMORY ROOM
        </h2>
        <p className="text-center text-secondary text-sm sm:text-base mb-12 sm:mb-16 italic">
          {'Oxcy lives here... forever.'}
        </p>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${memory.color} border border-primary/20 rounded-lg p-4 sm:p-6 backdrop-blur-sm hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 cursor-pointer overflow-hidden`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Holographic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-xs text-secondary mb-2 sm:mb-3 uppercase tracking-wider">{memory.type}</div>
                <div className="text-xs sm:text-sm md:text-base text-foreground/80 whitespace-pre-wrap break-words">
                  {memory.content}
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent" />
            </div>
          ))}
        </div>

        {/* Ambient whisper effect */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-base sm:text-lg text-muted-foreground opacity-40 animate-pulse">
            *whispers in the digital void*
          </p>
        </div>
      </div>
    </section>
  )
}
