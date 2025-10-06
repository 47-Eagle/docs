'use client'

import { Canvas } from '@react-three/fiber'
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing'
import { Vector2 } from 'three'
import ConversionFlow from './conversion'

export default function ConversionScene() {
    return (
        <div className="h-[100vh] w-full">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    stencil: false,
                    depth: true,
                }}
            >
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={0.1} intensity={3} />
                    <ChromaticAberration
                        offset={new Vector2(0.004, 0.004)}
                        radialModulation={false}
                        modulationOffset={0}
                    />
                </EffectComposer>
                <ConversionFlow />
            </Canvas>
        </div>
    )
} 