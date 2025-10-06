'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const TextReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.25, 0.25, 0, 1] }}
    >
        {children}
    </motion.div>
)

const Scene = ({ children, progress, index }: { children: React.ReactNode; progress: any; index: number }) => {
    const y = useTransform(
        progress,
        [index * 0.15, (index + 1) * 0.15],
        ['0vh', '-100vh'],
        { clamp: false }
    )
    const opacity = useTransform(
        progress,
        [(index - 0.5) * 0.15, index * 0.15, (index + 0.5) * 0.15],
        [0, 1, 0],
        { clamp: false }
    )

    return (
        <motion.div
            style={{ y, opacity }}
            className="h-screen w-full fixed top-0 left-0 flex items-center justify-center"
        >
            {children}
        </motion.div>
    )
}

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono bg-[#0a0a0a]/80 backdrop-blur-sm p-6 rounded-xl text-sm text-emerald-400 overflow-x-auto border border-white/5 shadow-2xl">
        {children}
    </div>
)

export default function HomePage() {
    const containerRef = useRef(null)
    const [mounted, setMounted] = useState(false)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMounted(true)
            document.documentElement.style.scrollBehavior = 'smooth'
            document.body.style.backgroundColor = '#030014'
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.documentElement.style.scrollBehavior = 'auto'
            }
        }
    }, [])

    if (!mounted) {
        return <div className="fixed inset-0 bg-[#030014]" />
    }

    return (
        <div className="bg-[#030014] min-h-screen">
            <div className="relative h-[600vh]" ref={containerRef}>
                <div className="fixed inset-0 bg-gradient-to-b from-[#030014] via-[#02000f] to-[#010008]" />

                {/* Introduction Scene */}
                <Scene progress={scrollYProgress} index={0}>
                    <div className="text-center space-y-8 max-w-4xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h1 className="text-8xl font-bold text-white/90 leading-tight tracking-tight">
                                Single-Sided
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    {" "}Uniswap V3 LP{" "}
                                </span>
                            </h1>
                        </TextReveal>
                        <TextReveal delay={0.2}>
                            <p className="text-2xl text-violet-200/70 font-light">
                                The numbers they didn't know you didn't know you needed to see.
                            </p>
                        </TextReveal>
                    </div>
                </Scene>

                {/* Overview Scene */}
                <Scene progress={scrollYProgress} index={1}>
                    <div className="space-y-12 max-w-4xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <p className="text-xl text-violet-200/70 leading-relaxed">
                                The world of decentralized finance (DeFi) is constantly evolving, with new innovations transforming how we think about liquidity, trading, and earning fees. One of the standout features of Uniswap V3 is its single-sided liquidity pools, which have lowered barriers for liquidity providers (LPs) and opened up new opportunities for earnings.
                            </p>
                        </TextReveal>
                    </div>
                </Scene>

                {/* Key Stats Scene */}
                <Scene progress={scrollYProgress} index={2}>
                    <div className="space-y-12 max-w-7xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h2 className="text-5xl font-bold text-white/90 tracking-tight text-center mb-12">
                                Key
                                <span className="text-violet-400"> Stats</span>
                            </h2>
                        </TextReveal>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Pooled Assets",
                                    value: "$662.23",
                                    details: "Total value of assets in the pool"
                                },
                                {
                                    title: "Total PnL",
                                    value: "$1,015.14",
                                    details: "Profit and Loss"
                                },
                                {
                                    title: "Total APR",
                                    value: ">999,999%",
                                    details: "Annual Percentage Rate"
                                }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-white/90 mb-2">{stat.title}</h3>
                                    <p className="text-3xl font-bold text-violet-400 mb-4">{stat.value}</p>
                                    <p className="text-violet-200/70 font-light">{stat.details}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Scene>

                {/* Continue Reading Scene */}
                <Scene progress={scrollYProgress} index={3}>
                    <div className="text-center space-y-8 max-w-4xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h2 className="text-6xl font-bold text-white/90 tracking-tight">
                                Continue to
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    {" "}Part 2{" "}
                                </span>
                            </h2>
                        </TextReveal>
                        <TextReveal delay={0.2}>
                            <p className="text-xl text-violet-200/70 leading-relaxed font-light">
                                In Part 2, we'll explore the triangular relationship between pools and dive deeper
                                into arbitrage mechanics.
                            </p>
                        </TextReveal>
                        <TextReveal delay={0.4}>
                            <motion.a
                                href="/blog/beyond-the-numbers-part-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-gradient-to-r from-violet-500 to-cyan-500 text-white/90 px-12 py-4 rounded-full text-xl font-semibold mt-8 shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-shadow"
                            >
                                Read Part 2
                            </motion.a>
                        </TextReveal>
                    </div>
                </Scene>
            </div>
        </div>
    )
} 