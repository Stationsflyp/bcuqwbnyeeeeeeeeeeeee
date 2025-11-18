'use client'

import { useEffect } from 'react'

export default function CodeProtection() {
  useEffect(() => {
    // Disable right-click
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }
    
    // Disable text selection and copy
    const disableCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }
    
    // Disable keyboard shortcuts
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+S, Ctrl+U, Ctrl+C, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault()
        return false
      }
    }
    
    // Anti-DevTools detection
    const checkDevTools = () => {
      const threshold = 160
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.innerHTML = '<div style="background:#000;color:#00aaff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;font-size:24px;">Access Denied</div>'
      }
    }
    
    // Obfuscate HTML source
    const obfuscateSource = () => {
      // Add fake hidden content to confuse scrapers
      const fakeContent = document.createElement('div')
      fakeContent.style.display = 'none'
      fakeContent.innerHTML = `
        <!-- ENCRYPTED CONTENT -->
        <!-- This source code is protected and obfuscated -->
        <!-- Attempting to copy or steal this code will result in broken functionality -->
        <!-- Original: OXCY 666 PROPRIETARY CODE -->
        ${'X'.repeat(1000)}
      `
      document.body.appendChild(fakeContent)
    }
    
    // Disable drag events
    const disableDrag = (e: DragEvent) => {
      e.preventDefault()
      return false
    }
    
    // Disable selection
    const disableSelection = () => {
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
    }
    
    // Apply protections
    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('copy', disableCopy)
    document.addEventListener('cut', disableCopy)
    document.addEventListener('keydown', disableKeyboardShortcuts)
    document.addEventListener('dragstart', disableDrag)
    window.addEventListener('resize', checkDevTools)
    
    disableSelection()
    obfuscateSource()
    checkDevTools()
    
    // Check periodically
    const interval = setInterval(checkDevTools, 1000)
    
    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('copy', disableCopy)
      document.removeEventListener('cut', disableCopy)
      document.removeEventListener('keydown', disableKeyboardShortcuts)
      document.removeEventListener('dragstart', disableDrag)
      window.removeEventListener('resize', checkDevTools)
      clearInterval(interval)
    }
  }, [])

  return null
}
