'use client'

import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Group, MathUtils, Mesh, MeshBasicMaterial, MeshPhongMaterial } from 'three'

type ScrollContextType = {
    scroll: number
    setScroll: (scroll: number) => void
    fastForward: boolean
    setFastForward: (fastForward: boolean) => void
    fadeToBlack: boolean
    setFadeToBlack: (fade: boolean) => void
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
    const [scroll, setScroll] = useState(0)
    const [fastForward, setFastForward] = useState(false)
    const [fadeToBlack, setFadeToBlack] = useState(false)

    // Removed duplicate scroll listener - HomePage handles this now

    return (
        <ScrollContext.Provider value={{ scroll, setScroll, fastForward, setFastForward, fadeToBlack, setFadeToBlack }}>
            {children}
        </ScrollContext.Provider>
    )
}

function useScroll() {
    const context = useContext(ScrollContext)
    if (!context) {
        throw new Error('useScroll must be used within a ScrollProvider')
    }
    return context
}

export { useScroll }

interface TunnelProps {
    fastForward: boolean;
    scrollValue: number;
}

function TextSection({ text, position, opacity = 1 }: { text: string, position: [number, number, number], opacity?: number }) {
    const textRef = useRef<any>(null)
    const { camera } = useThree()
    const [currentOpacity, setCurrentOpacity] = useState(0)

    useFrame(() => {
        const distance = Math.abs(camera.position.z - position[2])
        const visibilityRange = 8
        const fadeStart = 4

        let targetOpacity = 0
        if (distance < fadeStart) {
            targetOpacity = 1
        } else if (distance < visibilityRange) {
            const fadeProgress = (distance - fadeStart) / (visibilityRange - fadeStart)
            targetOpacity = Math.pow(1 - fadeProgress, 3)
        }

        setCurrentOpacity(targetOpacity * opacity)
    })

    return (
        <Text
            ref={textRef}
            position={position}
            fontSize={text.length > 18 ? 1.2 : 1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={currentOpacity}
            outlineWidth={0.2}
            outlineColor="#ffffff"
            outlineOpacity={currentOpacity * 0.9}
            outlineBlur={0.4}
            maxWidth={12}
            letterSpacing={0.05}
        >
            {text}
        </Text>
    )
}

export default function Tunnel({ fastForward, scrollValue }: TunnelProps) {
    const tunnelRef = useRef<Group>(null)
    const tunnelMaterialRef = useRef<MeshPhongMaterial>(null)
    const streakMaterialRef = useRef<MeshBasicMaterial>(null)
    const rotationRef = useRef(0)
    const scrollRef = useRef(0)
    const speedRef = useRef(0)
    const rubberBandPhaseRef = useRef<'none' | 'pullback' | 'pause' | 'accelerate' | 'lightspeed'>('none')
    const phaseStartTimeRef = useRef(0)
    const visibleSegmentsRef = useRef(240)
    const scrollHintOpacityRef = useRef(0)
    const hasScrolledRef = useRef(false)

    useFrame((state, delta) => {
        if (!tunnelRef.current || !tunnelMaterialRef.current || !streakMaterialRef.current) return

        // Debug: Always log scroll values
        if (Math.random() < 0.01) {
            console.log('🎥 Camera Update:', {
                scrollValue,
                scrollRefCurrent: scrollRef.current,
                cameraZ: state.camera.position.z,
                targetZ: -scrollRef.current * 0.05
            });
        }

        if (!hasScrolledRef.current) {
            scrollHintOpacityRef.current = MathUtils.lerp(scrollHintOpacityRef.current, 1, delta)
        } else {
            scrollHintOpacityRef.current = MathUtils.lerp(scrollHintOpacityRef.current, 0, delta * 4)
        }

        if (scrollValue > 10 && !hasScrolledRef.current) {
            hasScrolledRef.current = true
        }

        if (fastForward) {
            if (rubberBandPhaseRef.current === 'none') {
                rubberBandPhaseRef.current = 'pullback'
                phaseStartTimeRef.current = state.clock.elapsedTime
            }

            if (rubberBandPhaseRef.current === 'pullback') {
                const pullbackDuration = 0.8
                const progress = (state.clock.elapsedTime - phaseStartTimeRef.current) / pullbackDuration
                const tensionRef = Math.min(Math.pow(progress * 1.2, 2), 1)

                const basePullSpeed = -4000
                const oscillation = Math.sin(state.clock.elapsedTime * 12) * 500 * tensionRef
                const resistance = 1 - Math.pow(tensionRef, 1.5)
                const pullSpeed = (basePullSpeed * resistance) + oscillation

                speedRef.current = MathUtils.lerp(speedRef.current, pullSpeed, delta * 2.5)

                const wobbleAmount = Math.sin(state.clock.elapsedTime * 15) * 0.1 * tensionRef
                tunnelMaterialRef.current.opacity = 0.35 + wobbleAmount
                tunnelMaterialRef.current.emissive.setRGB(
                    0.2 + tensionRef * 0.3,
                    0.1 * (1 - tensionRef),
                    0.4 + tensionRef * 0.3
                )
                tunnelMaterialRef.current.emissiveIntensity = 0.4 + tensionRef * 0.8

                if (progress >= 1) {
                    rubberBandPhaseRef.current = 'pause'
                    phaseStartTimeRef.current = state.clock.elapsedTime
                }
            } else if (rubberBandPhaseRef.current === 'pause') {
                const pauseDuration = 0.8
                const progress = (state.clock.elapsedTime - phaseStartTimeRef.current) / pauseDuration

                const pulseFrequency = 15 + progress * 20
                const pulseIntensity = 0.3 + progress * 0.5
                const pulse = Math.sin(state.clock.elapsedTime * pulseFrequency) * pulseIntensity

                tunnelMaterialRef.current.opacity = 0.5 + pulse
                tunnelMaterialRef.current.emissive.setRGB(
                    0.5 + pulse * 0.5,
                    0.2 + pulse * 0.3,
                    1.0 + pulse * 0.5
                )
                tunnelMaterialRef.current.emissiveIntensity = 1 + pulse

                if (progress >= 1) {
                    rubberBandPhaseRef.current = 'accelerate'
                    phaseStartTimeRef.current = state.clock.elapsedTime
                }
            } else if (rubberBandPhaseRef.current === 'accelerate') {
                const accelerationDuration = 1.5
                const progress = (state.clock.elapsedTime - phaseStartTimeRef.current) / accelerationDuration

                const accelerationCurve = Math.pow(progress, 3)
                const baseSpeed = 6000
                const maxSpeed = 100000
                const targetSpeed = baseSpeed + (maxSpeed - baseSpeed) * accelerationCurve

                speedRef.current = MathUtils.lerp(speedRef.current, targetSpeed, delta * 4)

                const speedRatio = (speedRef.current - baseSpeed) / (maxSpeed - baseSpeed)

                tunnelMaterialRef.current.opacity = 0.35
                tunnelMaterialRef.current.emissive.setRGB(
                    0.2 + speedRatio * 0.8,
                    0.3 + speedRatio * 0.5,
                    1.0
                )
                tunnelMaterialRef.current.emissiveIntensity = 1 + speedRatio * 5

                if (speedRef.current > 90000) {
                    rubberBandPhaseRef.current = 'lightspeed'
                }
            }
        } else {
            speedRef.current = MathUtils.lerp(speedRef.current, 0, delta * 2)
            rubberBandPhaseRef.current = 'none'
        }

        const targetScroll = scrollValue + speedRef.current
        scrollRef.current = MathUtils.lerp(scrollRef.current, targetScroll, delta * 2)

        const baseRotation = scrollRef.current * 0.0001
        const ffRotation = speedRef.current * (rubberBandPhaseRef.current === 'lightspeed' ? 0.002 : 0.001)
        const targetRotation = baseRotation + ffRotation
        rotationRef.current = MathUtils.lerp(rotationRef.current, targetRotation, delta)
        tunnelRef.current.rotation.z = rotationRef.current

        const baseZ = -scrollRef.current * 0.05  // Increased from 0.015 to 0.05 for more visible movement
        const ffZ = -speedRef.current * (rubberBandPhaseRef.current === 'lightspeed' ? 0.15 : 0.1)
        const targetZ = baseZ + ffZ

        // Debug: Log camera movement (temporary)
        if (Math.abs(scrollValue) > 0 && Math.random() < 0.02) {
            console.log('Camera Debug:', {
                scrollValue,
                scrollRefCurrent: scrollRef.current,
                targetZ,
                currentCameraZ: state.camera.position.z
            });
        }

        // Fix: Add threshold to prevent floating point precision issues
        const distanceToTarget = Math.abs(state.camera.position.z - targetZ)
        if (distanceToTarget < 0.001) {
            // If already very close, just set it directly to prevent precision drift
            state.camera.position.z = targetZ
        } else {
            state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, delta * 5)
        }

        tunnelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.005

        if (rubberBandPhaseRef.current === 'lightspeed') {
            const baseSpeedRatio = (speedRef.current - 45000) / 30000
            const speedRatio = Math.min(baseSpeedRatio * 4, 1)

            streakMaterialRef.current.opacity = speedRatio * 0.8
        } else {
            streakMaterialRef.current.opacity = 0
        }
    })

    return (
        <group ref={tunnelRef}>
            {/* Debug: Show scroll value in 3D - BIGGER and CLOSER */}
            <Text
                position={[0, 0, 3]}
                fontSize={1}
                color="#ff0000"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#ffffff"
            >
                SCROLL VALUE: {scrollValue.toFixed(0)}
            </Text>
            
            <Text
                position={[0, -1, 3]}
                fontSize={0.8}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
            >
                Camera Z: {scrollRef.current.toFixed(2)}
            </Text>

            {/* Scroll hint text */}
            <Text
                position={[0, -2, 2]}
                fontSize={0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
                fillOpacity={scrollHintOpacityRef.current}
                outlineWidth={0.15}
                outlineColor="#ffffff"
                outlineOpacity={scrollHintOpacityRef.current * 0.7}
                outlineBlur={0.3}
                letterSpacing={0.1}
            >
                SCROLL TO BEGIN
            </Text>

            {/* 3D Text sections */}
            <TextSection text="DEPOSIT WLFI & USD1" position={[0, 0, -20]} />
            <TextSection text="ERC-4626 OMNICHAIN VAULTS" position={[0, 0, -40]} />
            <TextSection text="EARN ON ONE CHAIN" position={[0, 0, -60]} />
            <TextSection text="EARN MORE ON ANOTHER" position={[0, 0, -80]} />
            <TextSection text="SIMULTANEOUSLY" position={[0, 0, -100]} />
            <TextSection text="AUTOMATED REBALANCING" position={[0, 0, -120]} />
            <TextSection text="MAXIMIZED RETURNS" position={[0, 0, -140]} />
            <TextSection text="INTRODUCING" position={[0, 0, -160]} />
            <TextSection text="47 EAGLE" position={[0, 0, -180]} />

            {/* Tunnel segments */}
            <group>
                {Array.from({ length: Math.ceil(visibleSegmentsRef.current) }).map((_, i) => (
                    <mesh
                        key={i}
                        position={[0, 0, -i * 0.7]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <cylinderGeometry
                            args={[
                                4.5,
                                4.6,
                                1.5,
                                32,
                                1,
                                true
                            ]}
                        />
                        <meshPhongMaterial
                            ref={i === 0 ? tunnelMaterialRef : undefined}
                            color="#ffffff"
                            wireframe
                            transparent
                            opacity={0.35}
                            shininess={100}
                            specular="#ffffff"
                            emissive="#d4af37"
                            emissiveIntensity={0}
                            side={2}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>

            {/* Stars */}
            <group>
                {Array.from({ length: 200 }).map((_, i) => {
                    const radius = 6 + Math.random() * 4
                    const angle = Math.random() * Math.PI * 2
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    const z = -Math.random() * 150

                    return (
                        <group key={`star-${i}`} position={[x, y, z]}>
                            <mesh>
                                <sphereGeometry args={[0.02, 4, 4]} />
                                <meshBasicMaterial
                                    color="#ffffff"
                                    transparent
                                    opacity={0.8}
                                />
                            </mesh>
                            <mesh
                                position={[0, 0, 0.5]}
                                rotation={[Math.PI / 2, 0, 0]}
                            >
                                <cylinderGeometry args={[0.02, 0.02, 1, 4, 1]} />
                                <meshBasicMaterial
                                    ref={i === 0 ? streakMaterialRef : undefined}
                                    color="#ffffff"
                                    transparent
                                    opacity={0}
                                />
                            </mesh>
                        </group>
                    )
                })}
            </group>
        </group>
    )
}

