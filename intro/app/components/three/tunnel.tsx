'use client'

import { Center, Text, Text3D } from '@react-three/drei'
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

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
}

function TextSection({ text, position, opacity = 1 }: { text: string, position: [number, number, number], opacity?: number }) {
    const groupRef = useRef<Group>(null)
    const { camera } = useThree()

    useFrame(() => {
        if (!groupRef.current?.children[0]?.children[0]) return

        const distance = Math.abs(camera.position.z - position[2])
        const visibilityRange = 8 // Shorter range for better separation
        const fadeStart = 4 // Start fading earlier

        // Calculate opacity with a sharper falloff
        let targetOpacity = 0
        if (distance < fadeStart) {
            targetOpacity = 1
        } else if (distance < visibilityRange) {
            const fadeProgress = (distance - fadeStart) / (visibilityRange - fadeStart)
            targetOpacity = Math.pow(1 - fadeProgress, 3) // Sharper falloff
        }

        // Apply visibility and transform effects
        const mesh = groupRef.current.children[0].children[0] as Mesh
        if (mesh && mesh.material) {
            const material = mesh.material as MeshPhongMaterial
            material.opacity = targetOpacity * opacity
            material.transparent = true
            material.depthWrite = targetOpacity > 0.5 // Prevent transparency artifacts
            material.emissiveIntensity = targetOpacity * 2 // Brighter when closer

            // Hide when nearly invisible
            mesh.visible = targetOpacity > 0.01
        }
    })

    return (
        <group ref={groupRef}>
            <Center position={position}>
                <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={1.5}
                    height={0.2}
                    curveSegments={12}
                >
                    {text}
                    <meshPhongMaterial
                        color="white"
                        emissive="white"
                        shininess={100}
                        transparent
                        opacity={1}
                        depthWrite={true}
                    />
                </Text3D>
            </Center>
        </group>
    )
}

export default function Tunnel({ fastForward }: TunnelProps) {
    const tunnelRef = useRef<Group>(null)
    const tunnelMaterialRef = useRef<MeshPhongMaterial>(null)
    const streakMaterialRef = useRef<MeshBasicMaterial>(null)
    const { scroll, setFadeToBlack } = useScroll()
    const rotationRef = useRef(0)
    const scrollRef = useRef(0)
    const speedRef = useRef(0)
    const rubberBandPhaseRef = useRef<'none' | 'pullback' | 'pause' | 'accelerate' | 'lightspeed' | 'fadeout'>('none')
    const pullbackStartRef = useRef(0)
    const pauseTimerRef = useRef(0)
    const tensionRef = useRef(0)
    const fadeoutTimerRef = useRef(0)
    const visibleSegmentsRef = useRef(240)
    const scrollHintOpacityRef = useRef(0)
    const hasScrolledRef = useRef(false)
    const phaseStartTimeRef = useRef(0)
    const timeRef = useRef(0)

    useFrame((state, delta) => {
        if (!tunnelRef.current || !tunnelMaterialRef.current || !streakMaterialRef.current) return

        // Update time reference
        timeRef.current = state.clock.elapsedTime

        // Handle scroll hint visibility
        if (!hasScrolledRef.current) {
            scrollHintOpacityRef.current = MathUtils.lerp(scrollHintOpacityRef.current, 1, delta)
        } else {
            scrollHintOpacityRef.current = MathUtils.lerp(scrollHintOpacityRef.current, 0, delta * 4)
        }

        if (scroll > 10 && !hasScrolledRef.current) {
            hasScrolledRef.current = true
        }

        // Fast forward effect with enhanced rubber band
        if (fastForward) {
            if (rubberBandPhaseRef.current === 'none') {
                rubberBandPhaseRef.current = 'pullback'
                pullbackStartRef.current = scrollRef.current
                tensionRef.current = 0
                phaseStartTimeRef.current = state.clock.elapsedTime
            }

            if (rubberBandPhaseRef.current === 'pullback') {
                // More dramatic pullback with non-linear tension
                const pullbackDuration = 0.8 // Reduced from 1.2s to 0.8s for snappier feel
                const progress = (state.clock.elapsedTime - phaseStartTimeRef.current) / pullbackDuration
                tensionRef.current = Math.min(Math.pow(progress * 1.2, 2), 1) // Reduced tension build-up multiplier from 1.5 to 1.2

                // Reduced pullback speed and oscillation
                const basePullSpeed = -4000 // Reduced from -8000 to -4000
                const oscillation = Math.sin(state.clock.elapsedTime * 12) * 500 * tensionRef.current // Reduced oscillation amplitude and frequency
                const resistance = 1 - Math.pow(tensionRef.current, 1.5) // Softer resistance curve
                const pullSpeed = (basePullSpeed * resistance) + oscillation

                speedRef.current = MathUtils.lerp(speedRef.current, pullSpeed, delta * 2.5) // Slightly reduced lerp speed

                // Enhanced visual feedback during pullback
                const wobbleAmount = Math.sin(state.clock.elapsedTime * 15) * 0.1 * tensionRef.current // Reduced wobble
                tunnelMaterialRef.current.opacity = 0.35 + wobbleAmount
                tunnelMaterialRef.current.emissive.setRGB(
                    0.2 + tensionRef.current * 0.3, // Reduced color intensity
                    0.1 * (1 - tensionRef.current),
                    0.4 + tensionRef.current * 0.3  // Reduced color intensity
                )
                tunnelMaterialRef.current.emissiveIntensity = 0.4 + tensionRef.current * 0.8 // Reduced glow

                // Add tunnel segment distortion
                if (tunnelRef.current) {
                    const segments = tunnelRef.current.children.slice(0, Math.ceil(visibleSegmentsRef.current))
                    segments.forEach((child, i) => {
                        const mesh = child as Mesh
                        const wave = Math.sin(state.clock.elapsedTime * 12 + i * 0.1) * 0.2 * tensionRef.current // Reduced wave intensity
                        mesh.scale.x = mesh.scale.y = 1 + wave
                        mesh.rotation.z = wave * 0.15 // Reduced rotation
                    })
                }

                // Transition to pause when pulled back enough
                if (progress >= 1) {
                    rubberBandPhaseRef.current = 'pause'
                    phaseStartTimeRef.current = state.clock.elapsedTime
                }
            } else if (rubberBandPhaseRef.current === 'pause') {
                // Dramatic pause with energy build-up
                const pauseDuration = 0.8 // seconds
                const progress = (state.clock.elapsedTime - phaseStartTimeRef.current) / pauseDuration

                // Pulsing effect during pause
                const pulseFrequency = 15 + progress * 20 // Increasing frequency
                const pulseIntensity = 0.3 + progress * 0.5 // Increasing intensity
                const pulse = Math.sin(state.clock.elapsedTime * pulseFrequency) * pulseIntensity

                tunnelMaterialRef.current.opacity = 0.5 + pulse
                tunnelMaterialRef.current.emissive.setRGB(
                    0.5 + pulse * 0.5,
                    0.2 + pulse * 0.3,
                    1.0 + pulse * 0.5
                )
                tunnelMaterialRef.current.emissiveIntensity = 1 + pulse

                // Add energy build-up effect to tunnel segments
                if (tunnelRef.current) {
                    const segments = tunnelRef.current.children.slice(0, Math.ceil(visibleSegmentsRef.current))
                    segments.forEach((child, i) => {
                        const mesh = child as Mesh
                        const energyWave = Math.sin(state.clock.elapsedTime * 20 + i * 0.2) * (0.2 + progress * 0.3)
                        mesh.scale.x = mesh.scale.y = 1 + energyWave
                        mesh.rotation.z = energyWave * 0.3
                    })
                }

                // Transition to accelerate after pause
                if (progress >= 1) {
                    rubberBandPhaseRef.current = 'accelerate'
                    phaseStartTimeRef.current = state.clock.elapsedTime
                }
            } else if (rubberBandPhaseRef.current === 'accelerate') {
                // Explosive acceleration
                const accelerationDuration = 1.5 // seconds
                const progress = (state.clock.elapsedTime - phaseStartTimeRef.current) / accelerationDuration

                // Non-linear acceleration curve
                const accelerationCurve = Math.pow(progress, 3) // Cubic acceleration
                const baseSpeed = 6000
                const maxSpeed = 100000
                const targetSpeed = baseSpeed + (maxSpeed - baseSpeed) * accelerationCurve

                speedRef.current = MathUtils.lerp(speedRef.current, targetSpeed, delta * 4)

                // Visual effects during acceleration
                const speedRatio = (speedRef.current - baseSpeed) / (maxSpeed - baseSpeed)
                const stretchEffect = Math.sin(state.clock.elapsedTime * (20 + speedRatio * 40)) * (0.2 + speedRatio * 0.8)

                // Add twisting effect to tunnel segments
                if (tunnelRef.current) {
                    const segments = tunnelRef.current.children.slice(0, Math.ceil(visibleSegmentsRef.current))
                    segments.forEach((child, i) => {
                        const mesh = child as Mesh
                        // Create a wave pattern that moves along the tunnel
                        const waveSpeed = state.clock.elapsedTime * 8 + i * 0.1
                        const twistAmount = Math.sin(waveSpeed) * (0.2 + speedRatio * 0.8)

                        // Apply twist rotation around Z axis
                        mesh.rotation.z = twistAmount

                        // Add some X and Y rotation for more dynamic effect
                        mesh.rotation.x = Math.sin(waveSpeed * 0.5) * 0.1 * speedRatio
                        mesh.rotation.y = Math.cos(waveSpeed * 0.7) * 0.1 * speedRatio

                        // Scale segments for additional visual interest
                        const scaleEffect = 1 + Math.sin(waveSpeed * 1.2) * 0.1 * speedRatio
                        mesh.scale.x = mesh.scale.y = scaleEffect
                    })
                }

                tunnelMaterialRef.current.opacity = 0.35 + stretchEffect
                tunnelMaterialRef.current.emissive.setRGB(
                    0.2 + speedRatio * 0.8,
                    0.3 + speedRatio * 0.5,
                    1.0
                )
                tunnelMaterialRef.current.emissiveIntensity = 1 + speedRatio * 5

                // Transition to lightspeed
                if (speedRef.current > 90000) {
                    rubberBandPhaseRef.current = 'lightspeed'
                }
            }
        } else {
            speedRef.current = MathUtils.lerp(speedRef.current, 0, delta * 2)
            rubberBandPhaseRef.current = 'none'
            pauseTimerRef.current = 0
            tensionRef.current = 0
        }

        // Smooth scroll value with fast forward
        const targetScroll = scroll + speedRef.current
        scrollRef.current = MathUtils.lerp(scrollRef.current, targetScroll, delta * 2)

        // Enhanced rotation based on phase
        const baseRotation = scrollRef.current * 0.0001
        const ffRotation = speedRef.current * (rubberBandPhaseRef.current === 'lightspeed' ? 0.002 : 0.001)
        const targetRotation = baseRotation + ffRotation
        rotationRef.current = MathUtils.lerp(rotationRef.current, targetRotation, delta)
        tunnelRef.current.rotation.z = rotationRef.current

        // Enhanced camera movement with light speed effect
        const baseZ = -scrollRef.current * 0.015
        const ffZ = -speedRef.current * (rubberBandPhaseRef.current === 'lightspeed' ? 0.15 : 0.1)
        const targetZ = baseZ + ffZ

        // Make camera follow tunnel's twist
        const cameraRotationZ = rotationRef.current * 0.5 // Half the tunnel's rotation for a smoother effect
        const cameraSwayX = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 // Gentle horizontal sway
        const cameraSwayY = Math.cos(state.clock.elapsedTime * 0.3) * 0.15 // Gentle vertical sway

        // Apply camera transformations
        state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, delta * 2)
        state.camera.position.x = MathUtils.lerp(state.camera.position.x, cameraSwayX, delta)
        state.camera.position.y = MathUtils.lerp(state.camera.position.y, cameraSwayY, delta)
        state.camera.rotation.z = MathUtils.lerp(state.camera.rotation.z, cameraRotationZ, delta)

        // During lightspeed, increase the camera effects
        if (rubberBandPhaseRef.current === 'lightspeed') {
            const speedRatio = (speedRef.current - 45000) / 30000
            const intensifiedSway = speedRatio * 0.3 // Increased sway during lightspeed
            state.camera.position.x += Math.sin(state.clock.elapsedTime * 2) * intensifiedSway
            state.camera.position.y += Math.cos(state.clock.elapsedTime * 1.5) * intensifiedSway
            state.camera.rotation.z += Math.sin(state.clock.elapsedTime * 3) * (speedRatio * 0.1)
        }

        // Dynamic tunnel effect
        if (tunnelRef.current && rubberBandPhaseRef.current === 'lightspeed') {
            const dynamicEffect = Math.sin(state.clock.elapsedTime * 5) * 0.15
            tunnelMaterialRef.current.opacity = 0.35 + dynamicEffect
            tunnelMaterialRef.current.emissive.setRGB(0.3, 0.4, 1)
            tunnelMaterialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime * 5) * 0.5 + 0.5
        }

        // Subtle floating motion
        tunnelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.005

        // Handle star streaks during light speed
        if (rubberBandPhaseRef.current === 'lightspeed') {
            const baseSpeedRatio = (speedRef.current - 45000) / 30000
            const speedRatio = Math.min(baseSpeedRatio * 4, 1)

            // Fade in and elongate streaks
            streakMaterialRef.current.opacity = speedRatio * 0.8
            const streakScale = 1 + speedRatio * 15

            // Update all streak instances
            const streakInstances = tunnelRef.current.children[tunnelRef.current.children.length - 1].children
            streakInstances.forEach((streak, i) => {
                const flicker = Math.sin(state.clock.elapsedTime * (10 + speedRatio * 20) + i) * 0.2 + 0.8
                streak.scale.z = streakScale
                streak.scale.x = streak.scale.y = 1
                streak.visible = true
            })
        } else {
            // Hide streaks during normal speed
            streakMaterialRef.current.opacity = 0
            const streakInstances = tunnelRef.current.children[tunnelRef.current.children.length - 1].children
            streakInstances.forEach(streak => {
                streak.scale.z = 1
                streak.visible = false
            })
        }
    })

    return (
        <group ref={tunnelRef}>
            {/* Scroll hint text */}
            <group position={[0, -2, 2]}>
                <Text
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    material-transparent={true}
                    material-opacity={scrollHintOpacityRef.current}
                >
                    Scroll to Begin
                </Text>
            </group>

            {/* 3D Text sections */}
            <TextSection text="BEYOND THE NUMBERS" position={[0, 0, -15]} />
            <TextSection text="DISCOVER" position={[0, 0, -35]} />
            <TextSection text="ANALYZE" position={[0, 0, -55]} />
            <TextSection text="EVOLVE" position={[0, 0, -75]} />
            <TextSection text="TRANSCEND" position={[0, 0, -95]} />
            <TextSection text="GODDOG" position={[0, 0, -115]} />

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
                                4.5, // Top radius
                                4.6, // Bottom radius slightly larger for perspective
                                1.5, // Height
                                32, // Radial segments
                                1,  // Height segments
                                true // Open ended
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
                            emissive="#a5b4fc"
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
                            {/* Star point */}
                            <mesh>
                                <sphereGeometry args={[0.02, 4, 4]} />
                                <meshBasicMaterial
                                    color="#ffffff"
                                    transparent
                                    opacity={0.8}
                                />
                            </mesh>
                            {/* Star streak */}
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