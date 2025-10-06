'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import Tunnel from './tunnel'

interface SceneProps {
    fastForward: boolean;
    scrollValue: number;
}

// Hook to detect theme mode
function useTheme() {
    const [isDark, setIsDark] = useState(true)
    
    useEffect(() => {
        const checkTheme = () => {
            // Check for Docusaurus theme
            const htmlElement = document.documentElement
            const theme = htmlElement.getAttribute('data-theme')
            setIsDark(theme === 'dark')
        }
        
        // Initial check
        checkTheme()
        
        // Watch for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })
        
        return () => observer.disconnect()
    }, [])
    
    return { isDark }
}

function SceneContent({ fastForward, scrollValue, isDark }: SceneProps & { isDark: boolean }) {
    // Theme-aware colors
    const bgColor = isDark ? '#000' : '#fafafa'
    
    return (
        <>
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" args={[bgColor, 5, 15]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Suspense fallback={null}>
                <Tunnel fastForward={fastForward} scrollValue={scrollValue} />
            </Suspense>
        </>
    )
}

export default function Scene({ fastForward, scrollValue }: SceneProps) {
    const { isDark } = useTheme()
    
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true }}
            style={{ width: '100%', height: '100%' }}
        >
            <SceneContent fastForward={fastForward} scrollValue={scrollValue} isDark={isDark} />
        </Canvas>
    )
}

