'use client'

import { useEffect } from 'react'
import IntroSection from '@/components/intro-section'
import Logo3D from '@/components/logo-3d'
import FarewellTerminal from '@/components/farewell-terminal'
import LegacyTimeline from '@/components/legacy-timeline'
import MemoryRoom from '@/components/memory-room'
import FinalMessage from '@/components/final-message'
import ParticleField from '@/components/particle-field'
import LiveVisitorCounter from '@/components/live-visitor-counter'
import CodeProtection from '@/components/code-protection'

export default function Home() {
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
    }
    
    const disableCopy = (e: ClipboardEvent) => {
      e.preventDefault()
    }
    
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault()
      }
    }
    
    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('copy', disableCopy)
    document.addEventListener('keydown', disableKeyboardShortcuts)
    
    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('copy', disableCopy)
      document.removeEventListener('keydown', disableKeyboardShortcuts)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-black">
      <CodeProtection />
      <ParticleField />
      
      <LiveVisitorCounter />

      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        <Logo3D />
      </div>

      <IntroSection />
      <FarewellTerminal />
      <LegacyTimeline />
      <MemoryRoom />
      <FinalMessage />
    </main>
  )
}
