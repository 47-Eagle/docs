'use client'

import Nav from '@/components/ui/nav'
import { motion } from 'framer-motion'
import {
    Activity,
    ArrowUpRight,
    BarChart3,
    DollarSign,
    LineChart,
    RefreshCcw,
    Target,
    Timer,
    TrendingUp,
    Zap
} from 'lucide-react'
import VaultVisualization from '../components/vault-visualization'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
}

export default function DashboardPage() {
    return (
        <>
            <Nav />
            <main className="min-h-screen text-white p-8 pt-24">
                <motion.div
                    className="max-w-7xl mx-auto relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="text-4xl font-bold text-white/90 flex items-center">
                            <BarChart3 className="w-8 h-8 mr-4 text-indigo-500" />
                            Analytics Dashboard
                        </h1>
                        <motion.button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 
                                     hover:bg-indigo-500/20 transition-colors border border-indigo-500/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Refresh Data
                        </motion.button>
                    </div>

                    {/* Vault Visualization */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="mb-12"
                    >
                        <VaultVisualization />
                    </motion.div>

                    {/* Quick Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-sm text-white/60 mb-1">24h Change</p>
                            <p className="text-lg font-semibold text-green-400 flex items-center">
                                +12.5%
                                <ArrowUpRight className="w-4 h-4 ml-1" />
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-sm text-white/60 mb-1">Active Users</p>
                            <p className="text-lg font-semibold text-white/90">2,405</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-sm text-white/60 mb-1">Network Status</p>
                            <p className="text-lg font-semibold text-emerald-400">Optimal</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-sm text-white/60 mb-1">System Load</p>
                            <p className="text-lg font-semibold text-white/90">42%</p>
                        </div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Trading Stats */}
                        <motion.div
                            variants={item}
                            className="bg-white/[0.02] backdrop-blur-lg rounded-xl p-6 border border-white/[0.08]
                                     hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-lg hover:shadow-indigo-500/10
                                     transition-all duration-300 ease-out"
                        >
                            <h2 className="text-xl font-semibold mb-6 text-white/90 flex items-center">
                                <Activity className="w-5 h-5 mr-3 text-indigo-500" />
                                COOKIE/GODDOG Stats
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <RefreshCcw className="w-4 h-4 mr-2 text-indigo-500/70" />
                                        Total Liquidity
                                    </p>
                                    <p className="text-2xl font-bold text-white/90">
                                        500,000 COOKIE
                                        <span className="text-sm text-white/40 ml-2">+</span>
                                        <span className="text-sm text-white/40 ml-2">2.5M GODDOG</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <TrendingUp className="w-4 h-4 mr-2 text-emerald-500/70" />
                                        24h Volume
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-400">
                                        $300,000
                                        <span className="text-sm text-white/40 ml-2">volume</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <DollarSign className="w-4 h-4 mr-2 text-blue-500/70" />
                                        Pool Dynamics
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-white/80">
                                        <li>Concentrated liquidity around ranges</li>
                                        <li>High price impact for large trades</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Current Opportunities */}
                        <motion.div
                            variants={item}
                            className="bg-white/[0.02] backdrop-blur-lg rounded-xl p-6 border border-white/[0.08]
                                     hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-lg hover:shadow-blue-500/10
                                     transition-all duration-300 ease-out"
                        >
                            <h2 className="text-xl font-semibold mb-6 text-white/90 flex items-center">
                                <Target className="w-5 h-5 mr-3 text-blue-500" />
                                Active Opportunities
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <Zap className="w-4 h-4 mr-2 text-blue-500/70" />
                                        Available Pairs
                                    </p>
                                    <p className="text-2xl font-bold text-white/90">
                                        15
                                        <span className="text-sm text-white/40 ml-2">pairs</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <DollarSign className="w-4 h-4 mr-2 text-emerald-500/70" />
                                        Potential Profit
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-400">
                                        $2,450
                                        <span className="text-sm text-white/40 ml-2">estimated</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Performance */}
                        <motion.div
                            variants={item}
                            className="bg-white/[0.02] backdrop-blur-lg rounded-xl p-6 border border-white/[0.08]
                                     hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-lg hover:shadow-emerald-500/10
                                     transition-all duration-300 ease-out"
                        >
                            <h2 className="text-xl font-semibold mb-6 text-white/90 flex items-center">
                                <LineChart className="w-5 h-5 mr-3 text-emerald-500" />
                                Performance Metrics
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <Timer className="w-4 h-4 mr-2 text-emerald-500/70" />
                                        24h Profit
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-400">
                                        +$12,345
                                        <span className="text-sm text-white/40 ml-2">profit</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/60 flex items-center mb-2">
                                        <BarChart3 className="w-4 h-4 mr-2 text-blue-500/70" />
                                        Total Volume
                                    </p>
                                    <p className="text-2xl font-bold text-white/90">
                                        $1.2M
                                        <span className="text-sm text-white/40 ml-2">volume</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
        </>
    )
} 