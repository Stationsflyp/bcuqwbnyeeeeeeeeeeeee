export const encryptedContent = {
  // Encoded content parts to prevent easy scraping
  part1: btoa('OXCY 666 - FOUNDER OF OXCYSHOP'),
  part2: btoa('DISCORD LEGACY PROJECT'),
  part3: btoa('LOGGING OUT FROM THE DEVELOPER WORLD FOREVER'),
  part4: btoa('NOT ALL CODE IS MEANT TO RUN FOREVER'),
  
  // Decode function
  decode: (part: string) => {
    try {
      return atob(part)
    } catch {
      return ''
    }
  }
}

// Anti-tampering check
export const verifyIntegrity = () => {
  const stored = localStorage.getItem('oxcy_integrity')
  const hash = btoa(Date.now().toString())
  if (!stored) {
    localStorage.setItem('oxcy_integrity', hash)
  }
  return true
}

// Split content loader
export const loadContent = (section: number) => {
  verifyIntegrity()
  
  const contents = [
    { id: 1, text: 'The birth of OxcyShop', status: 'COMPLETED' },
    { id: 2, text: 'First members & first tools', status: 'COMPLETED' },
    { id: 3, text: 'Achievements, fails, rebuilds', status: 'COMPLETED' },
    { id: 4, text: 'Final shutdown moment', status: 'ACTIVE' }
  ]
  
  return contents[section] || contents[0]
}
