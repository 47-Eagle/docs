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
        [index * 0.25, (index + 1) * 0.25],
        ['0vh', '-100vh']
    )
    const opacity = useTransform(
        progress,
        [(index - 0.5) * 0.25, index * 0.25, (index + 0.5) * 0.25],
        [0, 1, 0]
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

export default function AboutPage() {
    const containerRef = useRef(null)
    const [mounted, setMounted] = useState(false)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="fixed inset-0 bg-black" />
    }

    return (
        <>
            <div className="h-[500vh]" ref={containerRef}>
                {/* Welcome Scene */}
                <Scene progress={scrollYProgress} index={0}>
                    <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
                        <h1 className="text-8xl font-bold text-white leading-tight">
                            Welcome to
                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                {" "}Our Story{" "}
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300">
                            Scroll to begin the journey
                        </p>
                    </div>
                </Scene>

                {/* Mission Scene */}
                <Scene progress={scrollYProgress} index={1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4">
                        <div className="space-y-8">
                            <h2 className="text-6xl font-bold text-white">
                                Our
                                <span className="text-blue-500"> Mission</span>
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                We're on a mission to democratize access to sophisticated trading
                                strategies. Our platform bridges the gap between institutional and
                                retail traders through cutting-edge technology.
                            </p>
                        </div>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8"
                        >
                            <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-6xl">🎯</motion.div>
                            </div>
                        </motion.div>
                    </div>
                </Scene>

                {/* Innovation Scene */}
                <Scene progress={scrollYProgress} index={2}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8"
                        >
                            <div className="aspect-square rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 8, repeat: Infinity }}
                                    className="text-6xl">💡</motion.div>
                            </div>
                        </motion.div>
                        <div className="space-y-8">
                            <h2 className="text-6xl font-bold text-white">
                                Constant
                                <span className="text-green-500"> Innovation</span>
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Our team of experts continuously pushes the boundaries of what's
                                possible in algorithmic trading. We're always evolving, always
                                improving.
                            </p>
                        </div>
                    </div>
                </Scene>

                {/* Team Scene */}
                <Scene progress={scrollYProgress} index={3}>
                    <div className="text-center space-y-12 max-w-7xl mx-auto px-4">
                        <h2 className="text-6xl font-bold text-white">
                            Backed by
                            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                                {" "}Experts{" "}
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: "👨‍💻", title: "Engineers", desc: "World-class developers" },
                                { icon: "📊", title: "Analysts", desc: "Market specialists" },
                                { icon: "🔒", title: "Security", desc: "Blockchain experts" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 hover:bg-black/40 transition-colors"
                                >
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-300">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Scene>

                {/* Final Scene */}
                <Scene progress={scrollYProgress} index={4}>
                    <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
                        <h2 className="text-6xl font-bold text-white">
                            Join Our
                            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                                {" "}Journey{" "}
                            </span>
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-12 py-4 rounded-full text-xl font-semibold mt-8"
                        >
                            Get Started Now
                        </motion.button>
                    </div>
                </Scene>
            </div>
        </>
    )
} 