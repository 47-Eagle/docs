'use client'

import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { CatmullRomCurve3, Group, Vector3 } from 'three'

// Create a curve for particle flow
const curve = new CatmullRomCurve3([
    new Vector3(-3, 0, 0),
    new Vector3(-1, 2, -1),
    new Vector3(1, -2, -1),
    new Vector3(3, 0, 0)
], false, 'centripetal', 0.5)

// Generate points along the curve for particles
const points = curve.getPoints(50)

interface HoverData {
    asset: string
    value: string
    hash: string
}

interface HoverInfo {
    show: boolean
    position: Vector3
    data: HoverData
}

export default function ConversionFlow() {
    const groupRef = useRef<Group>(null)
    const [hoverInfo, setHoverInfo] = useState<HoverInfo>({
        show: false,
        position: new Vector3(),
        data: {
            asset: '',
            value: '',
            hash: ''
        }
    })

    // Create two sets of particles going in opposite directions
    const forwardParticles = useRef(Array.from({ length: 30 }, () => ({
        position: new Vector3(),
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.2,
        size: 0.08 + Math.random() * 0.04
    })))

    const returnParticles = useRef(Array.from({ length: 20 }, () => ({
        position: new Vector3(),
        progress: Math.random(),
        speed: 0.15 + Math.random() * 0.15,
        size: 0.06 + Math.random() * 0.03
    })))

    useFrame((state, delta) => {
        // Animate forward particles (ANON to HERMES)
        forwardParticles.current.forEach(particle => {
            particle.progress = (particle.progress + delta * particle.speed) % 1
            const point = curve.getPoint(particle.progress)
            particle.position.copy(point)
        })

        // Animate return particles (HERMES to ANON)
        returnParticles.current.forEach(particle => {
            particle.progress = (particle.progress - delta * particle.speed + 1) % 1
            const point = curve.getPoint(particle.progress)
            particle.position.copy(point)
        })

        // Gentle floating motion
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
            groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {/* ANON Node */}
            <mesh
                position={[-3, 0, 0]}
                onPointerEnter={() => setHoverInfo({
                    show: true,
                    position: new Vector3(-3, 1, 0),
                    data: {
                        asset: 'ANON',
                        value: '1.0',
                        hash: '0x123...'
                    }
                })}
                onPointerLeave={() => setHoverInfo({ ...hoverInfo, show: false })}
            >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.5} />
            </mesh>
            <Text
                position={[-3, -1, 0]}
                fontSize={0.3}
                color="#ffffff"
            >
                ANON
            </Text>

            {/* HERMES Node */}
            <mesh
                position={[3, 0, 0]}
                onPointerEnter={() => setHoverInfo({
                    show: true,
                    position: new Vector3(3, 1, 0),
                    data: {
                        asset: 'HERMES',
                        value: '0.95',
                        hash: '0x456...'
                    }
                })}
                onPointerLeave={() => setHoverInfo({ ...hoverInfo, show: false })}
            >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
            </mesh>
            <Text
                position={[3, -1, 0]}
                fontSize={0.3}
                color="#ffffff"
            >
                HERMES
            </Text>

            {/* Forward Flow Particles (ANON to HERMES) */}
            {forwardParticles.current.map((particle, i) => (
                <mesh key={`forward-${i}`} position={particle.position}>
                    <sphereGeometry args={[particle.size, 16, 16]} />
                    <meshStandardMaterial
                        color="#60a5fa"
                        emissive="#60a5fa"
                        emissiveIntensity={1}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}

            {/* Return Flow Particles (HERMES to ANON) */}
            {returnParticles.current.map((particle, i) => (
                <mesh key={`return-${i}`} position={particle.position}>
                    <sphereGeometry args={[particle.size, 16, 16]} />
                    <meshStandardMaterial
                        color="#a78bfa"
                        emissive="#a78bfa"
                        emissiveIntensity={1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}

            {/* Hover Info */}
            {hoverInfo.show && (
                <Text
                    position={hoverInfo.position}
                    fontSize={0.2}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="bottom"
                >
                    {`${hoverInfo.data.asset}\nValue: ${hoverInfo.data.value}\nHash: ${hoverInfo.data.hash}`}
                </Text>
            )}
        </group>
    )
}