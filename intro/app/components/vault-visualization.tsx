"use client"

import { Html, Line, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useCallback, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, LineChart, Line as RechartsLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import * as THREE from 'three'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Slider } from "../../components/ui/slider"

const CURRENT_TICK_oooOOO = Math.floor(Math.log(2131000) / Math.log(1.0001))
const CURRENT_TICK_COOKIE = Math.floor(Math.log(6489.94211) / Math.log(1.0001))
const WETH_DECIMALS = 18
const oooOOO_DECIMALS = 18
const COOKIE_DECIMALS = 18
const oooOOO_PRICE = 0.00001
const COOKIE_PRICE = 1 / 6489.94211

const formatNumber = (num: number, decimals: number = 2) => {
    if (typeof num !== 'number') return '0'
    if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K'
    return num.toFixed(decimals)
}

const formatPercent = (num: number) => `${(num ?? 0).toFixed(1)}%`

const tickToPrice = (tick: number, basePrice: number) => {
    return Math.pow(1.0001, tick) * basePrice
}

interface StatCardProps {
    title: string
    value: string | number
    subValue?: string | null
    color?: string
}

const StatCard = ({ title, value, subValue = null, color = "text-foreground" }: StatCardProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
        </CardContent>
    </Card>
)

interface LiquidityData {
    name: string
    start: number
    end: number
    weight: number
    color: string
    tickLower: number
    tickUpper: number
}

interface LiquidityCurveChartProps {
    liquidityData: LiquidityData[]
    basePrice: number
}

interface CurveDataPoint {
    price: number
    liquidity: number
}

const LiquidityCurveChart = ({ liquidityData, basePrice }: LiquidityCurveChartProps) => {
    const generateCurveData = (): CurveDataPoint[] => {
        if (!Array.isArray(liquidityData) || liquidityData.length === 0) {
            console.error("Invalid liquidity data for curve chart");
            return [];
        }
        const data: CurveDataPoint[] = []
        for (let i = -50000; i <= 50000; i += 1000) {
            const price = tickToPrice(CURRENT_TICK_oooOOO + i, basePrice)
            let totalLiquidity = 0
            liquidityData.forEach(position => {
                const lowerPrice = tickToPrice(position.tickLower, basePrice)
                const upperPrice = tickToPrice(position.tickUpper, basePrice)
                if (price >= lowerPrice && price <= upperPrice) {
                    totalLiquidity += position.weight
                }
            })
            data.push({ price, liquidity: totalLiquidity })
        }
        return data
    }

    const curveData = generateCurveData()

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={curveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="price"
                    type="number"
                    scale="log"
                    domain={['auto', 'auto']}
                    tickFormatter={(value: number | string) => `$${formatNumber(Number(value))}`}
                />
                <YAxis />
                <Tooltip
                    formatter={(value: number | string, name: string) => [formatNumber(Number(value)), name]}
                    labelFormatter={(label: number | string) => `Price: $${formatNumber(Number(label))}`}
                />
                <Legend />
                <RechartsLine type="monotone" dataKey="liquidity" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}

const calculateLiquidityCurve = (
    liquidityData: LiquidityData[],
    numPoints: number = 100,
    currentTick: number,
    basePrice: number
) => {
    if (!Array.isArray(liquidityData) || liquidityData.length === 0) {
        console.error("Invalid liquidity data for curve calculation");
        return [];
    }
    const minPrice = Math.min(...liquidityData.map(d => tickToPrice(d.tickLower, basePrice)))
    const maxPrice = Math.max(...liquidityData.map(d => tickToPrice(d.tickUpper, basePrice)))
    const step = (maxPrice - minPrice) / (numPoints - 1)

    return Array.from({ length: numPoints }, (_, i) => {
        const price = minPrice + i * step
        const tick = Math.floor(Math.log(price / basePrice) / Math.log(1.0001))
        let liquidity = 0
        liquidityData.forEach(position => {
            if (tick >= position.tickLower && tick <= position.tickUpper) {
                liquidity += position.weight
            }
        })
        return { price, liquidity }
    })
}

interface LiquidityDistributionChartProps {
    liquidityData: LiquidityData[]
    currentTick: number
    basePrice: number
}

const LiquidityDistributionChart = ({ liquidityData, currentTick, basePrice }: LiquidityDistributionChartProps) => {
    const curveData = calculateLiquidityCurve(liquidityData, 100, currentTick, basePrice)

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={curveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="price"
                    type="number"
                    scale="log"
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${formatNumber(value)}`}
                />
                <YAxis />
                <Tooltip
                    formatter={(value: number, name) => [formatNumber(value), 'Liquidity']}
                    labelFormatter={(label) => `Price: $${formatNumber(label)}`}
                />
                <Area type="monotone" dataKey="liquidity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ error, errorInfo })
        console.error("Caught an error:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }

        return this.props.children
    }
}

interface SimpleLiquidityVisualizationProps {
    liquidityDataoooOOO: LiquidityData[]
    liquidityDataCOOKIE: LiquidityData[]
}

interface Vector3Like {
    clone: () => Vector3Like
    sub: (v: Vector3Like) => Vector3Like
    add: (v: Vector3Like) => Vector3Like
    multiplyScalar: (s: number) => Vector3Like
    normalize: () => Vector3Like
    length: () => number
    toArray: () => [number, number, number]
    x: number
    y: number
    z: number
}

const SimpleLiquidityVisualization = ({ liquidityDataoooOOO, liquidityDataCOOKIE }: SimpleLiquidityVisualizationProps) => {
    const size = 20
    const ethPosition = new THREE.Vector3(0, 0, 0)
    const oooooPosition = new THREE.Vector3(7, 4, 0)
    const cookiePosition = new THREE.Vector3(-4, -3, -5)

    if (!Array.isArray(liquidityDataoooOOO) || !Array.isArray(liquidityDataCOOKIE) ||
        liquidityDataoooOOO.length === 0 || liquidityDataCOOKIE.length === 0) {
        console.error("Invalid or empty liquidity data", { liquidityDataoooOOO, liquidityDataCOOKIE });
        return <div className="text-red-500">Error: Invalid liquidity data. Please try again.</div>;
    }

    const createOrderBars = (
        start: Vector3Like,
        end: Vector3Like,
        liquidityData: LiquidityData[]
    ) => {
        const direction = end.clone().sub(start)
        const midpoint = start.clone().add(end).multiplyScalar(0.5)
        const perpendicular = new THREE.Vector3(-direction.y, direction.x, direction.z).normalize()
        const barWidth = direction.length() / 10
        const maxHeight = direction.length() / 4

        return liquidityData.map((data, index) => {
            if (data.name === "Full Range") {
                // Render full range as a line along the main segment
                return (
                    <Line
                        key={data.name}
                        points={[start.toArray(), end.toArray()]}
                        color={data.color}
                        lineWidth={5}
                    />
                )
            } else {
                // Render base order and limit order as transparent bars
                const barHeight = (data.weight / 100) * maxHeight
                const barPosition = midpoint.clone().add(perpendicular.clone().multiplyScalar(barHeight / 2))

                return (
                    <mesh key={data.name} position={barPosition.toArray()}>
                        <boxGeometry args={[barWidth, barHeight, barWidth]} />
                        <meshStandardMaterial color={data.color} transparent opacity={0.6} />
                    </mesh>
                )
            }
        })
    }

    return (
        <Canvas camera={{ position: [15, 15, 15], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />

            {/* ETH Node */}
            <mesh position={ethPosition.toArray()}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#3498db" />
            </mesh>
            <Html position={ethPosition.toArray()}>
                <div className="bg-black bg-opacity-50 text-white p-2 rounded">ETH</div>
            </Html>

            {/* oooOOO Node */}
            <mesh position={oooooPosition.toArray()}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#2ecc71" />
            </mesh>
            <Html position={oooooPosition.toArray()}>
                <div className="bg-black bg-opacity-50 text-white p-2 rounded">oooOOO</div>
            </Html>

            {/* COOKIE Node */}
            <mesh position={cookiePosition.toArray()}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#e74c3c" />
            </mesh>
            <Html position={cookiePosition.toArray()}>
                <div className="bg-black bg-opacity-50 text-white p-2 rounded">COOKIE</div>
            </Html>

            {/* oooOOO/ETH Line and Order Bars */}
            <Line
                points={[ethPosition.toArray(), oooooPosition.toArray()]}
                color="#2ecc71"
                lineWidth={2}
            />
            {createOrderBars(ethPosition, oooooPosition, liquidityDataoooOOO)}

            {/* COOKIE/ETH Line and Order Bars */}
            <Line
                points={[ethPosition.toArray(), cookiePosition.toArray()]}
                color="#e74c3c"
                lineWidth={2}
            />
            {createOrderBars(ethPosition, cookiePosition, liquidityDataCOOKIE)}

            <gridHelper args={[size, size, 0x202020, 0x404040]} />
        </Canvas>
    )
}

const VaultVisualization = () => {
    const [fullRangeWeightoooOOO, setFullRangeWeightoooOOO] = useState(24.42)
    const [baseOrderWeightoooOOO, setBaseOrderWeightoooOOO] = useState(49.58)
    const [limitOrderWeightoooOOO, setLimitOrderWeightoooOOO] = useState(26.00)

    const [fullRangeWeightCOOKIE, setFullRangeWeightCOOKIE] = useState(33.33)
    const [baseOrderWeightCOOKIE, setBaseOrderWeightCOOKIE] = useState(33.33)
    const [limitOrderWeightCOOKIE, setLimitOrderWeightCOOKIE] = useState(33.34)

    const handleFullRangeWeightChangeoooOOO = useCallback((value: number[]) => {
        setFullRangeWeightoooOOO(value[0])
        const remaining = 100 - value[0]
        const ratio = baseOrderWeightoooOOO / (baseOrderWeightoooOOO + limitOrderWeightoooOOO)
        setBaseOrderWeightoooOOO(remaining * ratio)
        setLimitOrderWeightoooOOO(remaining * (1 - ratio))
    }, [baseOrderWeightoooOOO, limitOrderWeightoooOOO])

    const handleBaseOrderWeightChangeoooOOO = useCallback((value: number[]) => {
        setBaseOrderWeightoooOOO(value[0])
        const remaining = 100 - fullRangeWeightoooOOO - value[0]
        setLimitOrderWeightoooOOO(Math.max(0, remaining))
    }, [fullRangeWeightoooOOO])

    const handleLimitOrderWeightChangeoooOOO = useCallback((value: number[]) => {
        setLimitOrderWeightoooOOO(value[0])
        const remaining = 100 - fullRangeWeightoooOOO - value[0]
        setBaseOrderWeightoooOOO(Math.max(0, remaining))
    }, [fullRangeWeightoooOOO])

    const handleFullRangeWeightChangeCOOKIE = useCallback((value: number[]) => {
        setFullRangeWeightCOOKIE(value[0])
        const remaining = 100 - value[0]
        const ratio = baseOrderWeightCOOKIE / (baseOrderWeightCOOKIE + limitOrderWeightCOOKIE)
        setBaseOrderWeightCOOKIE(remaining * ratio)
        setLimitOrderWeightCOOKIE(remaining * (1 - ratio))
    }, [baseOrderWeightCOOKIE, limitOrderWeightCOOKIE])

    const handleBaseOrderWeightChangeCOOKIE = useCallback((value: number[]) => {
        setBaseOrderWeightCOOKIE(value[0])
        const remaining = 100 - fullRangeWeightCOOKIE - value[0]
        setLimitOrderWeightCOOKIE(Math.max(0, remaining))
    }, [fullRangeWeightCOOKIE])

    const handleLimitOrderWeightChangeCOOKIE = useCallback((value: number[]) => {
        setLimitOrderWeightCOOKIE(value[0])
        const remaining = 100 - fullRangeWeightCOOKIE - value[0]
        setBaseOrderWeightCOOKIE(Math.max(0, remaining))
    }, [fullRangeWeightCOOKIE])

    const liquidityDataoooOOO = useMemo(() => {
        if (typeof fullRangeWeightoooOOO !== 'number' || typeof baseOrderWeightoooOOO !== 'number' || typeof limitOrderWeightoooOOO !== 'number') {
            console.error("Invalid weights for oooOOO", { fullRangeWeightoooOOO, baseOrderWeightoooOOO, limitOrderWeightoooOOO });
            return [];
        }
        return [
            {
                name: "Full Range",
                start: 0,
                end: 100,
                weight: fullRangeWeightoooOOO,
                color: "#4a90e2",  // Updated color
                tickLower: -887200,
                tickUpper: 887200,
            },
            {
                name: "Base Order",
                start: 30,
                end: 80,
                weight: baseOrderWeightoooOOO,
                color: "#50e3c2",  // Updated color
                tickLower: Math.floor(CURRENT_TICK_oooOOO + Math.log(1 - 70.2 / 100) / Math.log(1.0001)),
                tickUpper: Math.floor(CURRENT_TICK_oooOOO + Math.log(1 + 235.3 / 100) / Math.log(1.0001)),
            },
            {
                name: "Limit Order",
                start: 80,
                end: 100,
                weight: limitOrderWeightoooOOO,
                color: "#b8e986",  // Updated color
                tickLower: CURRENT_TICK_oooOOO,
                tickUpper: Math.floor(CURRENT_TICK_oooOOO + Math.log(1 + 83.3 / 100) / Math.log(1.0001)),
            },
        ];
    }, [fullRangeWeightoooOOO, baseOrderWeightoooOOO, limitOrderWeightoooOOO])

    const liquidityDataCOOKIE = useMemo(() => {
        if (typeof fullRangeWeightCOOKIE !== 'number' || typeof baseOrderWeightCOOKIE !== 'number' || typeof limitOrderWeightCOOKIE !== 'number') {
            console.error("Invalid weights for COOKIE", { fullRangeWeightCOOKIE, baseOrderWeightCOOKIE, limitOrderWeightCOOKIE });
            return [];
        }
        return [
            {
                name: "Full Range",
                start: 0,
                end: 100,
                weight: fullRangeWeightCOOKIE,
                color: "#ff9a9e",  // Updated color
                tickLower: -887200,
                tickUpper: 887200,
            },
            {
                name: "Base Order",
                start: 30,
                end: 80,
                weight: baseOrderWeightCOOKIE,
                color: "#fad0c4",  // Updated color
                tickLower: Math.floor(CURRENT_TICK_COOKIE + Math.log(1 - 70.2 / 100) / Math.log(1.0001)),
                tickUpper: Math.floor(CURRENT_TICK_COOKIE + Math.log(1 + 235.3 / 100) / Math.log(1.0001)),
            },
            {
                name: "Limit Order",
                start: 80,
                end: 100,
                weight: limitOrderWeightCOOKIE,
                color: "#ffecd2",  // Updated color
                tickLower: CURRENT_TICK_COOKIE,
                tickUpper: Math.floor(CURRENT_TICK_COOKIE + Math.log(1 + 83.3 / 100) / Math.log(1.0001)),
            },
        ];
    }, [fullRangeWeightCOOKIE, baseOrderWeightCOOKIE, limitOrderWeightCOOKIE])

    console.log("Rendering VaultVisualization");
    console.log("liquidityDataoooOOO:", liquidityDataoooOOO);
    console.log("liquidityDataCOOKIE:", liquidityDataCOOKIE);

    if (liquidityDataoooOOO.length === 0 || liquidityDataCOOKIE.length === 0) {
        console.error("Liquidity data is empty");
        return <div>Error: Unable to load liquidity data. Please try again later.</div>;
    }

    return (
        <ErrorBoundary>
            <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Vault Statistics & Liquidity Distribution</h1>

                    <div className="grid gap-4 md:grid-cols-4 mb-4">
                        <StatCard
                            title="oooOOO/ETH Vault TVL"
                            value={`$${formatNumber(7900)}`}
                            subValue="Total Value Locked"
                        />
                        <StatCard
                            title="oooOOO/ETH Vault/Pool"
                            value={formatPercent(58.9)}
                            subValue="Share of Pool"
                        />
                        <StatCard
                            title="COOKIE/ETH Vault TVL"
                            value={`$${formatNumber(1112840)}`}
                            subValue="Total Value Locked"
                        />
                        <StatCard
                            title="COOKIE/ETH Volume 24h"
                            value={`$${formatNumber(196947.13)}`}
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 mb-4">
                        <StatCard
                            title="oooOOO/ETH Total WETH"
                            value={formatNumber(1.377)}
                            subValue={`${formatPercent(62.7)} of pool`}
                        />
                        <StatCard
                            title="Total oooOOO"
                            value={formatNumber(1724000)}
                            subValue={`${formatPercent(37.3)} of pool`}
                        />
                        <StatCard
                            title="COOKIE/ETH Total WETH"
                            value={formatNumber(6489.94211)}
                        />
                        <StatCard
                            title="COOKIE/ETH Spot Price"
                            value={`$${formatNumber(1 / 6489.94211)}`}
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <div className="w-full lg:w-1/2">
                            <div className="h-[50vh] bg-black/20 rounded-lg">
                                <SimpleLiquidityVisualization
                                    liquidityDataoooOOO={liquidityDataoooOOO}
                                    liquidityDataCOOKIE={liquidityDataCOOKIE}
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 p-4 bg-black/20 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">Liquidity Distribution</h2>

                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold">oooOOO/ETH</h3>
                                {liquidityDataoooOOO.map((data, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-2">
                                            <Label className="text-sm font-medium">{data.name}</Label>
                                            <span className="text-sm text-muted-foreground">{formatPercent(data.weight)}</span>
                                        </div>
                                        <div className="h-3 rounded" style={{ width: `${data.weight}%`, backgroundColor: data.color }} />
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={0.01}
                                            value={[data.weight]}
                                            onValueChange={index === 0 ? handleFullRangeWeightChangeoooOOO : index === 1 ? handleBaseOrderWeightChangeoooOOO : handleLimitOrderWeightChangeoooOOO}
                                            className="mt-2"
                                        />
                                    </div>
                                ))}

                                <h3 className="text-lg font-semibold mt-8">COOKIE/ETH</h3>
                                {liquidityDataCOOKIE.map((data, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-2">
                                            <Label className="text-sm font-medium">{data.name}</Label>
                                            <span className="text-sm text-muted-foreground">{formatPercent(data.weight)}</span>
                                        </div>
                                        <div className="h-3 rounded" style={{ width: `${data.weight}%`, backgroundColor: data.color }} />
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={0.01}
                                            value={[data.weight]}
                                            onValueChange={index === 0 ? handleFullRangeWeightChangeCOOKIE : index === 1 ? handleBaseOrderWeightChangeCOOKIE : handleLimitOrderWeightChangeCOOKIE}
                                            className="mt-2"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h3 className="font-semibold mb-2">Order Ranges</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>Base Order: -70.2% to +235.3% of current price</li>
                                    <li>Limit Order: 0% to +83.3% of current price</li>
                                    <li>Full Range: Entire possible price range</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-4 bg-black/20 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">oooOOO/ETH Combined Liquidity Curve</h2>
                        <LiquidityCurveChart liquidityData={liquidityDataoooOOO} basePrice={oooOOO_PRICE} />
                        <p className="mt-4 text-sm text-muted-foreground">
                            This graph shows the combined liquidity curve for all positions in the oooOOO/ETH pool. The x-axis represents the price (log scale), and the y-axis represents the total liquidity at each price point.
                        </p>
                    </div>
                    <div className="w-full p-4 bg-black/20 rounded-lg mt-4">
                        <h2 className="text-xl font-bold mb-4">oooOOO/ETH Liquidity Distribution</h2>
                        <LiquidityDistributionChart liquidityData={liquidityDataoooOOO} currentTick={CURRENT_TICK_oooOOO} basePrice={oooOOO_PRICE} />
                        <p className="mt-4 text-sm text-muted-foreground">
                            This graph shows the distribution of liquidity across different price ranges for the oooOOO/ETH pool. The x-axis represents the price (log scale), and the y-axis represents the total liquidity at each price point.
                        </p>
                    </div>
                    <div className="w-full p-4 bg-black/20 rounded-lg mt-4">
                        <h2 className="text-xl font-bold mb-4">COOKIE/ETH Liquidity Distribution</h2>
                        <LiquidityDistributionChart liquidityData={liquidityDataCOOKIE} currentTick={CURRENT_TICK_COOKIE} basePrice={COOKIE_PRICE} />
                        <p className="mt-4 text-sm text-muted-foreground">
                            This graph shows the distribution of liquidity across different price ranges for the COOKIE/ETH pool. The x-axis represents the price (log scale), and the y-axis represents the total liquidity at each price point.
                        </p>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default VaultVisualization

