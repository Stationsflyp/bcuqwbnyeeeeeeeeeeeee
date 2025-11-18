'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

export default function LiveVisitorCounter() {
  const [totalVisits, setTotalVisits] = useState<number>(0)
  const [currentOnline, setCurrentOnline] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeCounter = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const data = await response.json()
          setTotalVisits(data.totalVisits)
          setCurrentOnline(data.currentOnline)
        } else {
          // Fallback if API fails
          const getResponse = await fetch('/api/visitors')
          if (getResponse.ok) {
            const data = await getResponse.json()
            setTotalVisits(data.totalVisits)
            setCurrentOnline(data.currentOnline)
          }
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error initializing counter:', error)
        // Fallback values
        setTotalVisits(42)
        setCurrentOnline(3)
        setIsLoading(false)
      }
    }

    initializeCounter()

    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/visitors')
        if (response.ok) {
          const data = await response.json()
          setCurrentOnline(data.currentOnline)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2">
      {/* Total Visits Counter */}
      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/20">
        <div className="relative">
          <Eye className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
          <div className="absolute inset-0 blur-md bg-cyan-400/50" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] md:text-xs text-cyan-400/70 font-mono uppercase tracking-wider">
            Total Views
          </span>
          <span className="text-base md:text-lg font-bold text-cyan-400 font-mono tabular-nums">
            {totalVisits}
          </span>
        </div>
      </div>

      {/* Current Online Counter */}
      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg shadow-lg shadow-green-500/20 animate-pulse-slow">
        <div className="relative">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 animate-pulse" />
          <div className="absolute inset-0 blur-sm bg-green-400/50 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] md:text-xs text-green-400/70 font-mono uppercase tracking-wider">
            Online Now
          </span>
          <span className="text-base md:text-lg font-bold text-green-400 font-mono tabular-nums">
            {currentOnline}
          </span>
        </div>
      </div>
    </div>
  )
}
