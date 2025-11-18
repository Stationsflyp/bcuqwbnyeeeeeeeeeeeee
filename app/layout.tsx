import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: 'OxcyBye',
  description: 'The last digital sanctuary left by Oxcy 666, founder and creator of OxcyShop Discord Server',
  icons: {
    icon: '/favicon.svg',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
