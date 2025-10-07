'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import { Points, PointsMaterial, BufferGeometry, Float32BufferAttribute, Vector3, MathUtils as ThreeMathUtils, AdditiveBlending } from 'three'

interface InteractiveParticlesProps {
    count?: number;
}

export default function InteractiveParticles({ count = 1000 }: InteractiveParticlesProps) {
    const pointsRef = useRef<Points>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const velocitiesRef = useRef<Float32Array | null>(null)
    const { viewport, camera } = useThree()

    // Generate particle positions and velocities
    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        
        for (let i = 0; i < count; i++) {
            // Spawn particles in a large sphere around the camera
            const i3 = i * 3
            const radius = 15 + Math.random() * 20
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i3 + 2] = -Math.random() * 200 // Spread along tunnel
            
            // Golden to white color gradient
            const colorMix = Math.random()
            colors[i3] = 0.83 + colorMix * 0.17     // R: 212/255 to 1
            colors[i3 + 1] = 0.69 + colorMix * 0.31 // G: 175/255 to 1  
            colors[i3 + 2] = 0.22 + colorMix * 0.78 // B: 55/255 to 1
        }
        
        velocitiesRef.current = new Float32Array(count * 3).fill(0)
        
        return { positions, colors }
    }, [count])

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state, delta) => {
        if (!pointsRef.current || !velocitiesRef.current) return
        
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
        const time = state.clock.elapsedTime
        
        // Mouse position in 3D space
        const mousePos = new Vector3(
            mouseRef.current.x * viewport.width / 2,
            mouseRef.current.y * viewport.height / 2,
            camera.position.z + 5
        )
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            
            // Current particle position
            const particlePos = new Vector3(
                positions[i3],
                positions[i3 + 1],
                positions[i3 + 2]
            )
            
            // Distance to mouse
            const distanceToMouse = particlePos.distanceTo(mousePos)
            const influenceRadius = 5
            
            if (distanceToMouse < influenceRadius) {
                // Repel particles from mouse
                const force = (1 - distanceToMouse / influenceRadius) * 0.5
                const direction = particlePos.clone().sub(mousePos).normalize()
                
                velocitiesRef.current[i3] += direction.x * force * delta * 50
                velocitiesRef.current[i3 + 1] += direction.y * force * delta * 50
                velocitiesRef.current[i3 + 2] += direction.z * force * delta * 10
            }
            
            // Apply velocity with damping
            positions[i3] += velocitiesRef.current[i3] * delta
            positions[i3 + 1] += velocitiesRef.current[i3 + 1] * delta
            positions[i3 + 2] += velocitiesRef.current[i3 + 2] * delta
            
            // Damping
            velocitiesRef.current[i3] *= 0.95
            velocitiesRef.current[i3 + 1] *= 0.95
            velocitiesRef.current[i3 + 2] *= 0.95
            
            // Gentle floating motion
            positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.002
            positions[i3 + 1] += Math.cos(time * 0.7 + i * 0.13) * 0.002
            
            // Keep particles in bounds (respawn if too far)
            const distanceFromCamera = Math.abs(positions[i3 + 2] - camera.position.z)
            if (distanceFromCamera > 100) {
                // Respawn in front of camera
                const radius = 15 + Math.random() * 10
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)
                
                positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
                positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
                positions[i3 + 2] = camera.position.z - 50
                
                velocitiesRef.current[i3] = 0
                velocitiesRef.current[i3 + 1] = 0
                velocitiesRef.current[i3 + 2] = 0
            }
        }
        
        pointsRef.current.geometry.attributes.position.needsUpdate = true
        
        // Subtle rotation
        pointsRef.current.rotation.y = time * 0.02
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

