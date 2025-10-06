'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import TriangleViz from './triangle-viz';

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
    const [currentScrollProgress, setCurrentScrollProgress] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMounted(true)
            // Add smooth scroll behavior to html element
            document.documentElement.style.scrollBehavior = 'smooth'
            // Ensure dark background
            document.body.style.backgroundColor = '#030014'
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.documentElement.style.scrollBehavior = 'auto'
            }
        }
    }, [])

    // Update the scroll progress value
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setCurrentScrollProgress(latest)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    if (!mounted) {
        return <div className="fixed inset-0 bg-[#030014]" />
    }

    return (
        <div className="bg-[#030014] min-h-screen">
            <div className="relative h-[1000vh]" ref={containerRef}>
                <div className="fixed inset-0 bg-gradient-to-b from-[#030014] via-[#02000f] to-[#010008]" />

                {/* Introduction Scene */}
                <Scene progress={scrollYProgress} index={0}>
                    <div className="text-center space-y-8 max-w-4xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h1 className="text-8xl font-bold text-white/90 leading-tight tracking-tight">
                                Beyond the
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    {" "}Numbers{" "}
                                </span>
                            </h1>
                        </TextReveal>
                        <TextReveal delay={0.2}>
                            <p className="text-2xl text-violet-200/70 font-light">
                                A Case Study of COOKIE, oooOOO, and ETH Pools - Part 2
                            </p>
                        </TextReveal>
                        <TextReveal delay={0.4}>
                            <p className="text-lg text-violet-300/50 font-light max-w-2xl mx-auto">
                                In Part 1, we explored single-sided liquidity. Now, we'll dive deeper into the dynamics
                                of Uniswap V3, focusing on the triangular relationship between pools.
                            </p>
                        </TextReveal>
                    </div>
                </Scene>

                {/* Triangular Framework Scene */}
                <Scene progress={scrollYProgress} index={1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 relative z-10">
                        <div className="space-y-8">
                            <TextReveal>
                                <h2 className="text-6xl font-bold text-white/90 tracking-tight">
                                    The Triangular
                                    <span className="text-violet-400"> Framework</span>
                                </h2>
                            </TextReveal>
                            <TextReveal delay={0.2}>
                                <p className="text-xl text-violet-200/70 leading-relaxed font-light">
                                    Visualize COOKIE, oooOOO, and ETH as vertices of a triangle. Each edge represents
                                    a Uniswap V3 pool with unique dynamics and characteristics.
                                </p>
                            </TextReveal>
                            <TextReveal delay={0.4}>
                                <CodeBlock>
                                    {"// ETH/COOKIE Pool Configuration\n"}
                                    {"const ethCookiePool = {\n"}
                                    {"  liquidity: '100 ETH + 500,000 COOKIE',\n"}
                                    {"  volume24h: '$300,000',\n"}
                                    {"  keyDynamics: [\n"}
                                    {"    'Concentrated liquidity around specific ranges',\n"}
                                    {"    'High price impact for large trades'\n"}
                                    {"  ]\n"}
                                    {"}"}
                                </CodeBlock>
                            </TextReveal>
                        </div>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                        >
                            <div className="aspect-square rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center">
                                <TriangleViz scrollProgress={currentScrollProgress} />
                            </div>
                        </motion.div>
                    </div>
                </Scene>

                {/* Pool Details Scene */}
                <Scene progress={scrollYProgress} index={2}>
                    <div className="space-y-12 max-w-7xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h2 className="text-5xl font-bold text-white/90 tracking-tight text-center mb-12">
                                Pool
                                <span className="text-cyan-400"> Dynamics</span>
                            </h2>
                        </TextReveal>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "ETH/COOKIE Pool",
                                    liquidity: "100 ETH + 500,000 COOKIE",
                                    volume: "$300,000",
                                    dynamics: [
                                        "Concentrated liquidity forms around specific ranges",
                                        "Volatile tokens amplify LP fees but increase risk"
                                    ]
                                },
                                {
                                    title: "ETH/oooOOO Pool",
                                    liquidity: "2 ETH + 8,000,000 oooOOO",
                                    volume: "$10,000",
                                    dynamics: [
                                        "Less volatility with pegged or predictable trends",
                                        "Large trades create arbitrage opportunities"
                                    ]
                                },
                                {
                                    title: "COOKIE/oooOOO Pool",
                                    liquidity: "500,000 COOKIE + 2.5M oooOOO",
                                    volume: "Variable",
                                    dynamics: [
                                        "Newer pairs lack deep liquidity",
                                        "Price lags present arbitrage opportunities"
                                    ]
                                }
                            ].map((pool, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-white/90 mb-4">{pool.title}</h3>
                                    <div className="space-y-4 text-violet-200/70 font-light">
                                        <p><span className="text-cyan-400">Liquidity:</span> {pool.liquidity}</p>
                                        <p><span className="text-cyan-400">24h Volume:</span> {pool.volume}</p>
                                        <div className="pt-4 border-t border-white/5">
                                            <p className="text-sm text-white/90 mb-2">Key Dynamics:</p>
                                            <ul className="list-disc list-inside space-y-2">
                                                {pool.dynamics.map((d, j) => (
                                                    <li key={j} className="text-sm">{d}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Scene>

                {/* Arbitrage Mechanics Scene */}
                <Scene progress={scrollYProgress} index={3}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 relative z-10">
                        <div className="space-y-8">
                            <TextReveal>
                                <h2 className="text-6xl font-bold text-white/90 tracking-tight">
                                    Arbitrage
                                    <span className="text-cyan-400"> Mechanics</span>
                                </h2>
                            </TextReveal>
                            <TextReveal delay={0.2}>
                                <p className="text-xl text-violet-200/70 leading-relaxed font-light">
                                    Arbitrage exploits price mismatches across pools. Let's explore the two main paths
                                    that traders can take to capture these opportunities.
                                </p>
                            </TextReveal>
                            <TextReveal delay={0.4}>
                                <CodeBlock>
                                    {"// Path A: ETH → COOKIE → oooOOO → ETH\n"}
                                    {"const arbitragePath = {\n"}
                                    {"  steps: [\n"}
                                    {"    { from: 'ETH', to: 'COOKIE', pool: 'ETH/COOKIE' },\n"}
                                    {"    { from: 'COOKIE', to: 'oooOOO', pool: 'COOKIE/oooOOO' },\n"}
                                    {"    { from: 'oooOOO', to: 'ETH', pool: 'oooOOO/ETH' }\n"}
                                    {"  ],\n"}
                                    {"  profitThreshold: '0.1%',\n"}
                                    {"  gasEstimate: '250000 units'\n"}
                                    {"}"}
                                </CodeBlock>
                            </TextReveal>
                        </div>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                        >
                            <div className="aspect-square rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity }
                                    }}
                                    className="relative w-48 h-48"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-40 h-40 border-2 border-cyan-500/30 rounded-full" />
                                        <div className="absolute w-40 h-40 border-2 border-violet-500/30 rounded-full rotate-60" />
                                        <div className="absolute w-40 h-40 border-2 border-emerald-500/30 rounded-full rotate-120" />
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </Scene>

                {/* Key Insights Scene */}
                <Scene progress={scrollYProgress} index={4}>
                    <div className="space-y-12 max-w-7xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h2 className="text-5xl font-bold text-white/90 tracking-tight text-center mb-12">
                                Key
                                <span className="text-violet-400"> Insights</span>
                            </h2>
                        </TextReveal>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "ETH as Anchor",
                                    points: [
                                        "Deep liquidity handles large trades",
                                        "Stabilizes COOKIE and oooOOO prices",
                                        "Reduces overall system volatility"
                                    ]
                                },
                                {
                                    title: "Price Impact",
                                    points: [
                                        "Concentrated liquidity magnifies changes",
                                        "Large trades create imbalances",
                                        "Perfect for arbitrage opportunities"
                                    ]
                                },
                                {
                                    title: "Volume Effects",
                                    points: [
                                        "Triangular trades boost all pools",
                                        "Consistent fees for LPs",
                                        "Improved market efficiency"
                                    ]
                                }
                            ].map((insight, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-white/90 mb-4">{insight.title}</h3>
                                    <ul className="space-y-3 text-violet-200/70 font-light">
                                        {insight.points.map((point, j) => (
                                            <li key={j} className="flex items-start">
                                                <span className="text-cyan-400 mr-2">•</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Scene>

                {/* LP Analytics Scene */}
                <Scene progress={scrollYProgress} index={5}>
                    <div className="space-y-12 max-w-7xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h2 className="text-5xl font-bold text-white/90 tracking-tight text-center mb-12">
                                LP
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    {" "}Analytics{" "}
                                </span>
                            </h2>
                        </TextReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                            >
                                <h3 className="text-2xl font-bold text-white/90 mb-6">Fee Generation</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-violet-200/70">Daily Average Fees</span>
                                        <span className="text-cyan-400 font-mono">$26.24</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-violet-200/70">Uncollected Fees</span>
                                        <span className="text-cyan-400 font-mono">$353.13</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-violet-200/70">Fee APR (Spike)</span>
                                        <span className="text-cyan-400 font-mono">{'>'}999,999%</span>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                            >
                                <h3 className="text-2xl font-bold text-white/90 mb-6">Governance & Bribes</h3>
                                <div className="space-y-4 text-violet-200/70 font-light">
                                    <p>
                                        In Solidly-like protocols, fees generated by pools can accumulate and distribute
                                        as bribes to voters (e.g., bHERMES gauges).
                                    </p>
                                    <div className="pt-4 border-t border-white/5">
                                        <CodeBlock>
                                            {"// Gauge Rewards Example\n"}
                                            {"const gaugeRewards = {\n"}
                                            {"  poolFees: '$353.13',\n"}
                                            {"  bribeAmount: '$176.57',\n"}
                                            {"  distributionFreq: 'weekly'\n"}
                                            {"}"}
                                        </CodeBlock>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Scene>

                {/* Looking Ahead Scene */}
                <Scene progress={scrollYProgress} index={6}>
                    <div className="text-center space-y-8 max-w-4xl mx-auto px-4 relative z-10">
                        <TextReveal>
                            <h2 className="text-6xl font-bold text-white/90 tracking-tight">
                                Looking
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    {" "}Ahead{" "}
                                </span>
                            </h2>
                        </TextReveal>
                        <TextReveal delay={0.2}>
                            <p className="text-xl text-violet-200/70 leading-relaxed font-light">
                                As COOKIE and oooOOO pools expand, we anticipate deeper liquidity and more
                                sophisticated arbitrage opportunities.
                            </p>
                        </TextReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                            >
                                <h3 className="text-2xl font-bold text-white/90 mb-4">More Arbitrage Loops</h3>
                                <p className="text-violet-200/70 font-light">
                                    Integrations with other protocols could create new opportunities for
                                    cross-protocol arbitrage and deeper liquidity pools.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-[#0a0a0a]/50 backdrop-blur-lg rounded-2xl p-8 border border-white/5 shadow-2xl"
                            >
                                <h3 className="text-2xl font-bold text-white/90 mb-4">Automation Tools</h3>
                                <p className="text-violet-200/70 font-light">
                                    Advanced analytics dashboards and automated trading bots will help LPs
                                    optimize their strategies in real-time.
                                </p>
                            </motion.div>
                        </div>
                        <TextReveal delay={0.4}>
                            <div className="mt-12 text-violet-200/50 font-light">
                                Stay tuned for Part 3, where we'll analyze profitability scenarios,
                                LP risks, and deeper arbitrage mechanics!
                            </div>
                        </TextReveal>
                        <TextReveal delay={0.6}>
                            <motion.a
                                href="/dashboard"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-gradient-to-r from-violet-500 to-cyan-500 text-white/90 px-12 py-4 rounded-full text-xl font-semibold mt-8 shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-shadow"
                            >
                                Explore Analytics
                            </motion.a>
                        </TextReveal>
                    </div>
                </Scene>

            </div>
        </div>
    )
} 