'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const sections = [
    { title: 'DEPOSIT', subtitle: 'Your Assets' },
    { title: 'OMNICHAIN', subtitle: 'Vaults' },
    { title: 'EARN', subtitle: 'On One Chain' },
    { title: 'EARN MORE', subtitle: 'On Another' },
    { title: 'SIMULTANEOUSLY', subtitle: 'Across Networks' },
    { title: 'AUTO', subtitle: 'Rebalancing' },
    { title: 'MAXIMIZE', subtitle: 'Returns' },
    { title: '47 EAGLE', subtitle: 'The Future' },
]

export default function SectionTransitions() {
    const { scrollYProgress } = useScroll()
    const [currentSection, setCurrentSection] = useState(0)

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            const section = Math.floor(latest * (sections.length + 1))
            setCurrentSection(Math.min(section, sections.length - 1))
        })
        
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <>
            {sections.map((section, index) => {
                const isActive = index === currentSection
                const isPast = index < currentSection
                
                return (
                    <motion.div
                        key={section.title}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-center"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : (isPast ? 0.8 : 1.2),
                            filter: isActive ? 'blur(0px)' : 'blur(10px)',
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{
                                y: isActive ? 0 : 20,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: 'easeOut',
                                delay: 0.1
                            }}
                        >
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
                                <motion.span
                                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] via-[#f5e89f] to-[#d4af37]"
                                    animate={{
                                        backgroundPosition: isActive ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear'
                                    }}
                                    style={{
                                        backgroundSize: '200% 200%',
                                    }}
                                >
                                    {section.title}
                                </motion.span>
                            </h2>
                            <motion.p
                                className="text-xl md:text-2xl text-white/60 tracking-wide"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3
                                }}
                            >
                                {section.subtitle}
                            </motion.p>
                        </motion.div>
                        
                        {/* Animated lines */}
                        <div className="absolute inset-0 -z-10">
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"
                                    style={{
                                        width: '100%',
                                        top: `${25 * (i + 1)}%`,
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{
                                        scaleX: isActive ? 1 : 0,
                                        opacity: isActive ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2 + i * 0.1,
                                        ease: 'easeOut'
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )
            })}
        </>
    )
}

