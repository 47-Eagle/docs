'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030014] to-transparent opacity-90" />
            <div className="relative max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-24">
                    <Link
                        href="/"
                        className="text-white/90 font-medium text-lg tracking-wider hover:text-white transition-colors"
                    >
                        EAGLE
                        <span className="text-[#d4af37] ml-1.5">Insights</span>
                    </Link>

                    <div className="flex items-center space-x-12">
                        <Link
                            href="/"
                            className={cn(
                                'text-white/70 hover:text-white transition-colors text-sm tracking-wide',
                                pathname === '/' && 'text-white font-medium'
                            )}
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className={cn(
                                'text-white/70 hover:text-white transition-colors text-sm tracking-wide',
                                pathname === '/blog' && 'text-white font-medium'
                            )}
                        >
                            Blog
                        </Link>
                        <a
                            href="https://docs.47eagle.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center"
                        >
                            <div className="relative flex items-center gap-2 px-4 py-2 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/30 hover:border-[#d4af37]/50 transition-all duration-200">
                                <span className="text-[13px] text-[#d4af37] font-medium">
                                    Documentation
                                </span>
                                <svg
                                    className="w-3.5 h-3.5 text-[#d4af37]/70 group-hover:translate-x-0.5 transition-transform duration-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
} 