'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const [currentSection, setCurrentSection] = useState(0)
    
    // Smooth spring animation for progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })
    
    // Calculate progress percentage (0-100)
    const progressPercentage = useTransform(smoothProgress, [0, 1], [0, 100])
    
    const sections = [
        'START',
        'DEPOSIT',
        'VAULTS', 
        'EARN',
        'REBALANCE',
        'MAXIMIZE',
        'INTRODUCING',
        '47 EAGLE',
        'EXPLORE'
    ]

    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latest) => {
            const section = Math.min(Math.floor(latest * sections.length), sections.length - 1)
            setCurrentSection(section)
        })
        
        return () => unsubscribe()
    }, [smoothProgress, sections.length])

    return (
        <div className="fixed top-1/2 right-8 -translate-y-1/2 z-40 flex flex-col items-end gap-4">
            {/* Progress bar */}
            <div className="relative w-1 h-64 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#d4af37] via-[#f5e89f] to-[#d4af37] rounded-full"
                    style={{
                        height: useTransform(smoothProgress, [0, 1], ['0%', '100%'])
                    }}
                >
                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37] to-transparent blur-xl opacity-50" />
                </motion.div>
                
                {/* Progress indicator dot */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f5e89f] shadow-lg shadow-[#d4af37]/50"
                    style={{
                        bottom: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
                        y: '-50%'
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-[#f5e89f] animate-ping opacity-75" />
                </motion.div>
            </div>
            
            {/* Section indicator */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-right"
            >
                <motion.div 
                    className="text-xs font-bold tracking-widest text-[#d4af37] mb-1"
                    key={currentSection}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {sections[currentSection]}
                </motion.div>
                <motion.div className="text-[10px] text-white/40 font-medium tabular-nums">
                    {progressPercentage.get().toFixed(0)}%
                </motion.div>
            </motion.div>
            
            {/* Section dots */}
            <div className="flex flex-col gap-2">
                {sections.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentSection 
                                ? 'bg-[#d4af37] scale-125 shadow-lg shadow-[#d4af37]/50' 
                                : index < currentSection
                                    ? 'bg-[#d4af37]/50'
                                    : 'bg-white/20'
                        }`}
                        onClick={() => {
                            const targetScroll = (index / (sections.length - 1)) * (document.documentElement.scrollHeight - window.innerHeight)
                            window.scrollTo({ top: targetScroll, behavior: 'smooth' })
                        }}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>
        </div>
    )
}

