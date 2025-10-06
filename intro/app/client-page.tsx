"use client"

import { useEffect } from 'react'

export default function ClientPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = '#030014'
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-[#030014]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-violet-200/80 text-xl font-light">Loading...</div>
      </div>
    </div>
  )
} 