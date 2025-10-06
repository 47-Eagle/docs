'use client'

import { Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Group, Vector3 } from 'three'

interface Props {
    scrollProgress: number
}

export default function TriangleViz({ scrollProgress }: Props) {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <TriangleVizScene scrollProgress={scrollProgress} />
        </Canvas>
    )
}

function TriangleVizScene({ scrollProgress }: Props) {
    const groupRef = useRef<Group>(null)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [activeArrow, setActiveArrow] = useState<number>(0)

    // Create MotionValue inside the component
    const scrollMotionValue = useMotionValue(scrollProgress)

    // Update motion value when prop changes
    useEffect(() => {
        scrollMotionValue.set(scrollProgress)
    }, [scrollProgress])

    // Create points for the triangle
    const points = [
        new Vector3(0, 2, 0),      // ETH (top)
        new Vector3(-2, -1, 0),    // COOKIE (bottom left)
        new Vector3(2, -1, 0),     // oooOOO (bottom right)
    ]

    // Create points for the arrows (slightly offset from the lines)
    const arrowPoints = [
        [points[0], points[1]], // ETH -> COOKIE
        [points[1], points[2]], // COOKIE -> oooOOO
        [points[2], points[0]], // oooOOO -> ETH
    ]

    // Animation based on scroll progress
    const rotation = useTransform(scrollMotionValue, [0, 1], [0, Math.PI * 4])
    const scale = useTransform(scrollMotionValue, [0, 0.5, 1], [0.8, 1.2, 0.8])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = rotation.get()
            const scaleValue = scale.get()
            groupRef.current.scale.setScalar(scaleValue)
        }

        // Animate arrows in sequence
        const time = state.clock.getElapsedTime()
        setActiveArrow(Math.floor(time % 3))
    })

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            {points.map((point, i) => (
                <group key={i} position={point}>
                    <mesh
                        onPointerEnter={() => setHoveredNode(['ETH', 'COOKIE', 'oooOOO'][i])}
                        onPointerLeave={() => setHoveredNode(null)}
                    >
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshStandardMaterial
                            color={hoveredNode === ['ETH', 'COOKIE', 'oooOOO'][i] ? '#8b5cf6' : '#6366f1'}
                            emissive={hoveredNode === ['ETH', 'COOKIE', 'oooOOO'][i] ? '#8b5cf6' : '#6366f1'}
                            emissiveIntensity={hoveredNode === ['ETH', 'COOKIE', 'oooOOO'][i] ? 0.5 : 0.2}
                        />
                    </mesh>
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.3}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="bottom"
                    >
                        {['ETH', 'COOKIE', 'oooOOO'][i]}
                    </Text>
                </group>
            ))}

            {/* Lines */}
            {arrowPoints.map((points, i) => (
                <group key={i}>
                    <line>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={2}
                                array={new Float32Array([
                                    points[0].x, points[0].y, points[0].z,
                                    points[1].x, points[1].y, points[1].z
                                ])}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color={activeArrow === i ? '#8b5cf6' : '#4c1d95'}
                            linewidth={2}
                            opacity={activeArrow === i ? 1 : 0.5}
                            transparent
                        />
                    </line>
                </group>
            ))}

            {/* Animated Particles */}
            {arrowPoints.map((points, i) => (
                <group key={`particle-${i}`} visible={activeArrow === i}>
                    <mesh
                        position={new Vector3().lerpVectors(
                            points[0],
                            points[1],
                            (Math.sin(Date.now() * 0.002) + 1) / 2
                        )}
                    >
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial
                            color="#8b5cf6"
                            emissive="#8b5cf6"
                            emissiveIntensity={1}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    )
} 