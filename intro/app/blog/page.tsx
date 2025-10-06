'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const articles = [
    {
        id: 1,
        title: "Single-Sided Uniswap V3 LP",
        description: "The numbers they didn't know you didn't know you needed to see. Exploring the hidden opportunities in single-sided liquidity pools.",
        date: "2024-01-12",
        url: "/blog/beyond-the-numbers-part-1",
        isExternal: false
    },
    {
        id: 2,
        title: "Beyond the Numbers: A Case Study of COOKIE, oooOOO, and ETH Pools - Part 2",
        description: "Diving deeper into the dynamics of Uniswap V3, focusing on the triangular relationship between pools.",
        date: "2024-01-13",
        url: "/blog/beyond-the-numbers-part-2",
        isExternal: false
    }
]

export default function BlogPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 relative z-10"
        >
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white/90">
                    Blog
                </h1>
                <p className="text-xl text-violet-200/70 relative z-10">
                    The numbers they didn't know you didn't know you needed to see. Exploring the hidden opportunities in single-sided liquidity pools.
                </p>
            </div>

            <div className="space-y-8 mt-8">
                {articles.map((article, i) => (
                    <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <Link
                            href={article.url}
                            className="block p-8 rounded-2xl bg-[#0a0a0a]/50 backdrop-blur-lg border border-white/5 hover:bg-white/10 transition-colors shadow-2xl"
                        >
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-white/90">
                                    {article.title}
                                    {article.isExternal && (
                                        <span className="ml-2 text-sm text-violet-400">↗</span>
                                    )}
                                </h2>
                                <p className="text-lg text-violet-200/70">{article.description}</p>
                                <time className="block text-sm text-violet-300/50">{article.date}</time>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    )
} 