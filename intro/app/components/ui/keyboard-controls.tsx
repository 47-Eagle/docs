'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface KeyboardShortcut {
    key: string;
    description: string;
}

export default function KeyboardControls() {
    const [showHelp, setShowHelp] = useState(false)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    
    const shortcuts: KeyboardShortcut[] = [
        { key: '↑ / ↓', description: 'Scroll up/down' },
        { key: 'Space', description: 'Fast forward' },
        { key: 'Home', description: 'Go to start' },
        { key: 'End', description: 'Go to end' },
        { key: '?', description: 'Show this help' },
    ]

    useEffect(() => {
        let spacebarPressed = false
        let konamiCode: string[] = []
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

        const handleKeyDown = (e: KeyboardEvent) => {
            // Konami code easter egg
            konamiCode.push(e.key)
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift()
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                setShowEasterEgg(true)
                konamiCode = []
                setTimeout(() => setShowEasterEgg(false), 5000)
                
                // Trigger special effect
                document.body.style.animation = 'rainbow 2s linear infinite'
                setTimeout(() => {
                    document.body.style.animation = ''
                }, 5000)
            }

            // Toggle help with '?'
            if (e.key === '?' || e.key === '/') {
                e.preventDefault()
                setShowHelp(prev => !prev)
            }
            
            // Spacebar to fast forward (hold)
            if (e.code === 'Space' && !spacebarPressed) {
                e.preventDefault()
                spacebarPressed = true
                window.dispatchEvent(new CustomEvent('fastforward', { detail: true }))
            }
            
            // Home key - scroll to top
            if (e.key === 'Home') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            
            // End key - scroll to bottom
            if (e.key === 'End') {
                e.preventDefault()
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
            }
            
            // Arrow keys for smooth scrolling
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' })
            }
            
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                window.scrollBy({ top: -window.innerHeight * 0.5, behavior: 'smooth' })
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                spacebarPressed = false
                window.dispatchEvent(new CustomEvent('fastforward', { detail: false }))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <>
            {/* Help button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setShowHelp(prev => !prev)}
                className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 backdrop-blur-sm flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <span className="text-xl font-bold group-hover:rotate-12 transition-transform duration-300">?</span>
            </motion.button>

            {/* Help panel */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                    opacity: showHelp ? 1 : 0,
                    x: showHelp ? 0 : 100,
                    pointerEvents: showHelp ? 'auto' : 'none'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-24 right-8 z-40 bg-black/90 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-6 min-w-[280px]"
            >
                <h3 className="text-[#d4af37] font-bold text-lg mb-4 tracking-wide">Keyboard Shortcuts</h3>
                <div className="space-y-3">
                    {shortcuts.map((shortcut, index) => (
                        <motion.div
                            key={shortcut.key}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between gap-4"
                        >
                            <kbd className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/80 min-w-[60px] text-center">
                                {shortcut.key}
                            </kbd>
                            <span className="text-xs text-white/60 flex-1">{shortcut.description}</span>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] text-white/40 text-center">
                        Try the Konami Code 🎮
                    </p>
                </div>
            </motion.div>

            {/* Easter egg notification */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                    opacity: showEasterEgg ? 1 : 0,
                    scale: showEasterEgg ? 1 : 0.8,
                    y: showEasterEgg ? 0 : 20
                }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-[#d4af37] to-[#f5e89f] p-8 rounded-2xl shadow-2xl shadow-[#d4af37]/50"
            >
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl mb-4"
                    >
                        🦅
                    </motion.div>
                    <h2 className="text-2xl font-black text-black mb-2">EAGLE MODE ACTIVATED!</h2>
                    <p className="text-black/70 text-sm">You found the secret! 🎉</p>
                </div>
            </motion.div>

            <style jsx global>{`
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `}</style>
        </>
    )
}

