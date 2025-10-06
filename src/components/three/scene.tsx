'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Tunnel from './tunnel'

interface SceneProps {
    fastForward: boolean;
    scrollValue: number;
}

export default function Scene({ fastForward, scrollValue }: SceneProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true }}
            style={{ width: '100%', height: '100%' }}
        >
            <color attach="background" args={['#000']} />
            <fog attach="fog" args={['#000', 5, 15]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {/* Simple test mesh - should always be visible */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
            </mesh>
            
            <Suspense fallback={null}>
                <Tunnel fastForward={fastForward} scrollValue={scrollValue} />
            </Suspense>
        </Canvas>
    )
}

