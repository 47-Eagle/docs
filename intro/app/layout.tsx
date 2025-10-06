'use client'
import { Inter } from 'next/font/google'
import { ScrollProvider } from './components/three/tunnel'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030014] text-white antialiased selection:bg-indigo-500/90 selection:text-white`}>
        <div className="fixed inset-0 bg-[#030014]" />
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  )
}
