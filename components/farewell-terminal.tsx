'use client'

import { useEffect, useState } from 'react'

export default function FarewellTerminal() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  const terminalLines = [
    '[SYSTEM LOG - OXCY666_LAST_SESSION]',
    '',
    'status: retired_by_choice',
    'origin: OxcyShop Discord Server',
    'legacy: code, community, innovation',
    '',
    'message: Thank you for believing in me.',
    '',
    '> Processing final thoughts...',
    '> Saving memories to eternal storage...',
    '> Closing all connections...',
    '',
    '✓ Session archived successfully',
    ''
  ]

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, terminalLines[currentLine]])
        setCurrentLine(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [currentLine])

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-4xl w-full">
        {/* Terminal window */}
        <div className="bg-black/80 border-2 border-primary rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl shadow-primary/20">
          {/* Terminal header */}
          <div className="bg-primary/10 border-b border-primary px-3 sm:px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-primary">oxcy666@legacy:~$</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 sm:p-6 text-xs sm:text-sm md:text-base space-y-1.5 sm:space-y-2 min-h-[300px] sm:min-h-[400px]">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.includes('✓') ? 'text-green-400' :
                  line.includes('status:') || line.includes('origin:') || line.includes('legacy:') ? 'text-secondary' :
                  line.includes('message:') ? 'text-primary font-bold' :
                  line.includes('>') ? 'text-muted-foreground' :
                  line.includes('[SYSTEM') ? 'text-primary' :
                  'text-foreground'
                }`}
              >
                {line || '\u00A0'}
              </div>
            ))}
            {currentLine < terminalLines.length && (
              <div className="inline-block w-2 h-4 bg-primary cursor-blink" />
            )}
          </div>
        </div>

        {/* Quote below terminal */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <blockquote className="text-lg sm:text-2xl md:text-3xl text-muted-foreground italic opacity-60">
            {'Not all code is meant to run forever.'}
          </blockquote>
        </div>
      </div>
    </section>
  )
}
