'use client'

import { a, useSpring } from '@react-spring/three'
import { Trail } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useEffect, useRef } from 'react'
import { Color, Group, Vector2, Vector3 } from 'three'
import Tunnel from './tunnel'

function MouseTrail() {
    const { viewport } = useThree()
    const trailRef = useRef<Group>(null)
    const vec = new Vector3()
    const color = new Color("#ffffff")

    const [springs, api] = useSpring(() => ({
        position: [0, 0, 4.5],
        config: { mass: 0.1, tension: 280, friction: 20 }
    }))

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            vec.set(x * viewport.width / 2, y * viewport.height / 2, 4.5)
            api.start({ position: [vec.x, vec.y, vec.z] })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [viewport, api])

    return (
        <a.group position={springs.position as any}>
            {/* Main trail */}
            <Trail
                width={0.35}
                length={20}
                color={color}
                attenuation={(t) => {
                    const scale = 1 - t
                    return scale * scale
                }}
            >
                <mesh scale={0.04}>
                    <sphereGeometry />
                    <meshBasicMaterial color={color} />
                </mesh>
            </Trail>

            {/* Particle system */}
            {Array.from({ length: 8 }).map((_, i) => (
                <Trail
                    key={i}
                    width={0.15}
                    length={12}
                    color={color}
                    attenuation={(t) => {
                        const scale = 1 - t
                        return scale * scale * scale
                    }}
                >
                    <mesh
                        scale={0.02}
                        position={[
                            Math.cos((i / 8) * Math.PI * 2) * 0.15,
                            Math.sin((i / 8) * Math.PI * 2) * 0.15,
                            0
                        ]}
                    >
                        <sphereGeometry />
                        <meshBasicMaterial color={color} />
                    </mesh>
                </Trail>
            ))}
        </a.group>
    )
}

interface SceneProps {
    fastForward: boolean;
}

export default function Scene({ fastForward }: SceneProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true }}
        >
            <color attach="background" args={['#000']} />
            <fog attach="fog" args={['#000', 5, 15]} />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
            <Suspense fallback={null}>
                <MouseTrail />
                <Tunnel fastForward={fastForward} />
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        intensity={2}
                        levels={5}
                        mipmapBlur
                    />
                    <ChromaticAberration
                        offset={new Vector2(0.002, 0.002)}
                        radialModulation={false}
                        modulationOffset={0}
                    />
                </EffectComposer>
            </Suspense>
        </Canvas>
    )
}