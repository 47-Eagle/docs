"use client"

import React, { useState, useCallback, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Line } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Info } from "lucide-react"

const CURRENT_TICK = Math.floor(Math.log(2131000) / Math.log(1.0001))
const WLFI_DECIMALS = 18
const USD1_DECIMALS = 18
const USD1_PRICE = 0.00001

const formatNumber = (num: number, decimals = 2) => {
  if (num >= 1e9) return (num / 1e9).toFixed(decimals) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(decimals) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(decimals) + "K"
  return num.toFixed(decimals)
}

const formatPercent = (num: number) => `${num.toFixed(1)}%`

const tickToPrice = (tick: number) => {
  return Math.pow(1.0001, tick) * USD1_PRICE
}

const AxisLabels = React.memo(({ size }) => {
  const ticks = useMemo(
    () => [CURRENT_TICK - 40000, CURRENT_TICK - 20000, CURRENT_TICK, CURRENT_TICK + 20000, CURRENT_TICK + 40000],
    [],
  )
  return (
    <>
      {ticks.map((tick, index) => (
        <Text
          key={index}
          position={[((tick - CURRENT_TICK) / 80000) * size, -0.5, size / 2 + 0.5]}
          color="white"
          fontSize={0.3}
          anchorX="center"
          anchorY="top"
        >
          ${formatNumber(tickToPrice(tick))}
        </Text>
      ))}
      <Text position={[0, -1, size / 2 + 1]} color="white" fontSize={0.4} anchorX="center" anchorY="top">
        Price Range (USD1/WLFI)
      </Text>
      <Text
        position={[-size / 2 - 1, size / 4, 0]}
        color="white"
        fontSize={0.4}
        anchorY="middle"
        rotation={[0, 0, Math.PI / 2]}
      >
        Liquidity Weight
      </Text>
      <Text
        position={[0, 0, -size / 2 - 1]}
        color="white"
        fontSize={0.4}
        anchorX="center"
        anchorY="top"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        Position Depth
      </Text>
    </>
  )
})

AxisLabels.displayName = "AxisLabels"

const AxisIndicators = React.memo(({ size }) => {
  const axisColor = new THREE.Color(0x808080)
  return (
    <group>
      <Line
        points={[
          [-size / 2 - 1, 0, 0],
          [size / 2 + 1, 0, 0],
        ]}
        color={axisColor}
      />
      <Line
        points={[
          [0, 0, 0],
          [0, size / 2 + 1, 0],
        ]}
        color={axisColor}
      />
      <Line
        points={[
          [0, 0, -size / 2 - 1],
          [0, 0, size / 2 + 1],
        ]}
        color={axisColor}
      />
    </group>
  )
})

AxisIndicators.displayName = "AxisIndicators"

const CurrentPricePlane = React.memo(({ size }) => {
  return (
    <group>
      <mesh position={[0, size / 2, 0]}>
        <boxGeometry args={[0.1, size, 2]} />
        <meshStandardMaterial color="yellow" transparent opacity={0.5} />
      </mesh>
      <Text position={[0, 0.5, size / 2 + 0.5]} color="yellow" fontSize={0.3} anchorX="center" anchorY="bottom">
        {`Current Price: $${formatNumber(tickToPrice(CURRENT_TICK))}`}
      </Text>
    </group>
  )
})

CurrentPricePlane.displayName = "CurrentPricePlane"

export default function VaultVisualization() {
  const size = 20

  const [fullRangeWeight, setFullRangeWeight] = useState(24.42)
  const [baseOrderWeight, setBaseOrderWeight] = useState(49.58)
  const [limitOrderWeight, setLimitOrderWeight] = useState(26.0)
  const [baseOrderWidth, setBaseOrderWidth] = useState(7000)
  const [limitOrderWidth, setLimitOrderWidth] = useState(20000)
  const [limitOrderSide, setLimitOrderSide] = useState("right")

  const handleFullRangeWeightChange = useCallback(
    (value: number[]) => {
      setFullRangeWeight(value[0])
      const remaining = 100 - value[0]
      const ratio = baseOrderWeight / (baseOrderWeight + limitOrderWeight)
      setBaseOrderWeight(remaining * ratio)
      setLimitOrderWeight(remaining * (1 - ratio))
    },
    [baseOrderWeight, limitOrderWeight],
  )

  const handleBaseOrderWeightChange = useCallback(
    (value: number[]) => {
      setBaseOrderWeight(value[0])
      const remaining = 100 - fullRangeWeight - value[0]
      setLimitOrderWeight(remaining)
    },
    [fullRangeWeight],
  )

  const handleLimitOrderWeightChange = useCallback(
    (value: number[]) => {
      setLimitOrderWeight(value[0])
      const remaining = 100 - fullRangeWeight - value[0]
      setBaseOrderWeight(remaining)
    },
    [fullRangeWeight],
  )

  const handleBaseOrderWidthChange = useCallback((value: number[]) => {
    setBaseOrderWidth(value[0])
  }, [])

  const handleLimitOrderWidthChange = useCallback((value: number[]) => {
    setLimitOrderWidth(value[0])
  }, [])

  const handleLimitOrderSideChange = useCallback((value: string) => {
    setLimitOrderSide(value)
  }, [])

  const liquidityData = useMemo(
    () => [
      {
        name: "Full Range",
        tickLower: -887200,
        tickUpper: 887200,
        weight: fullRangeWeight,
        color: "#4a9e9e",
      },
      {
        name: "Base Order",
        tickLower: CURRENT_TICK - baseOrderWidth / 2,
        tickUpper: CURRENT_TICK + baseOrderWidth / 2,
        weight: baseOrderWeight,
        color: "#4a4a9e",
      },
      {
        name: "Limit Order",
        tickLower: limitOrderSide === "right" ? CURRENT_TICK : CURRENT_TICK - limitOrderWidth,
        tickUpper: limitOrderSide === "right" ? CURRENT_TICK + limitOrderWidth : CURRENT_TICK,
        weight: limitOrderWeight,
        color: "#9e4a4a",
      },
    ],
    [fullRangeWeight, baseOrderWeight, limitOrderWeight, baseOrderWidth, limitOrderWidth, limitOrderSide],
  )

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Eagle's Uniswap V3 Omnichain Vault</h1>
          <p className="text-muted-foreground">WLFI/USD1 Pool · Managed via Charm's Alpha Pro · 0.30% Fee Tier</p>
        </div>

        {/* Simplified Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">30-Day Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">+159.92% APR</div>
              <p className="text-xs text-muted-foreground mt-1">$14,927 in fees earned</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">vs HODL Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">+$13,335</div>
              <p className="text-xs text-muted-foreground mt-1">13.1% better than holding</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">88.18%</div>
              <p className="text-xs text-muted-foreground mt-1">Time in range</p>
            </CardContent>
          </Card>
        </div>

        {/* Main 3D Visualization */}
        <div className="mb-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>3D Liquidity Position Visualization</span>
                <div className="group relative">
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  <div className="absolute left-0 top-6 w-72 p-3 bg-gray-950 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-sm">
                    Rotate: Left click + drag • Zoom: Scroll • Pan: Right click + drag
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[70vh] bg-black/20 rounded-lg">
                <Canvas camera={{ position: [0, 10, 25], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.3} />
                  <OrbitControls enableDamping dampingFactor={0.05} />

                  <AxisLabels size={size} />
                  <AxisIndicators size={size} />
                  <CurrentPricePlane size={size} />

                  {liquidityData.map((data, index) => {
                    const width = ((data.tickUpper - data.tickLower) / 80000) * size
                    const position = [
                      (((data.tickLower + data.tickUpper) / 2 - CURRENT_TICK) / 80000) * size,
                      (data.weight / 100) * (size / 2),
                      0,
                    ]
                    return (
                      <group key={index}>
                        <mesh position={position}>
                          <boxGeometry args={[width, (data.weight / 100) * size, 2]} />
                          <meshStandardMaterial color={data.color} transparent opacity={0.6} />
                        </mesh>
                        <lineSegments position={position}>
                          <edgesGeometry args={[new THREE.BoxGeometry(width, (data.weight / 100) * size, 2)]} />
                          <lineBasicMaterial color={data.color} linewidth={2} />
                        </lineSegments>
                        <Text
                          position={[position[0], position[1] + (data.weight / 100) * (size / 2) + 0.5, 0]}
                          color={data.color}
                          fontSize={0.4}
                          anchorX="center"
                          anchorY="bottom"
                        >
                          {data.name}
                        </Text>
                      </group>
                    )
                  })}

                  <gridHelper args={[20, 20, 0x202020, 0x404040]} position={[0, 0, 0]} />
                </Canvas>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Liquidity Weight Controls */}
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Liquidity Weight Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {liquidityData.map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: data.color }} />
                      {data.name}
                    </Label>
                    <span className="text-sm text-muted-foreground font-mono">{formatPercent(data.weight)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800 overflow-hidden mb-2">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${data.weight}%`, backgroundColor: data.color }}
                    />
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={0.1}
                    value={[data.weight]}
                    onValueChange={
                      index === 0
                        ? handleFullRangeWeightChange
                        : index === 1
                          ? handleBaseOrderWeightChange
                          : handleLimitOrderWeightChange
                    }
                    className="mt-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Position Range Controls */}
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Position Range Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm font-medium">Base Order Width</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {baseOrderWidth} ticks (±
                    {((Math.exp((baseOrderWidth / 2) * 0.0001) - 1) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Slider
                  min={200}
                  max={100000}
                  step={200}
                  value={[baseOrderWidth]}
                  onValueChange={handleBaseOrderWidthChange}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">Main liquidity concentration around current price</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm font-medium">Limit Order Width</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {limitOrderWidth} ticks ({((Math.exp(limitOrderWidth * 0.0001) - 1) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Slider
                  min={200}
                  max={100000}
                  step={200}
                  value={[limitOrderWidth]}
                  onValueChange={handleLimitOrderWidthChange}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">Limit order position for price movements</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Limit Order Placement</Label>
                <RadioGroup onValueChange={handleLimitOrderSideChange} value={limitOrderSide} className="flex gap-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="left" id="left" />
                    <Label htmlFor="left" className="cursor-pointer flex-1">
                      Below Price
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="right" id="right" />
                    <Label htmlFor="right" className="cursor-pointer flex-1">
                      Above Price
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="font-semibold mb-2 text-sm">Current Configuration</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Price Range: $4.297 - $5.238 USD1/WLFI</li>
                  <li>• Fee Tier: 0.30%</li>
                  <li>• Position Value: $100,004.55</li>
                  <li>• Total Fees: $14,926.68 (30 days)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
