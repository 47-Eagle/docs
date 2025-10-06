'use client'

import { useEffect, useRef } from 'react'

export default function MouseTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        updateSize()
        window.addEventListener('resize', updateSize)

        // Trail settings
        const particles: Array<{
            x: number
            y: number
            size: number
            alpha: number
        }> = []
        const maxParticles = 50
        let mouseX = 0
        let mouseY = 0

        const addParticle = (x: number, y: number) => {
            if (particles.length >= maxParticles) return
            particles.push({
                x,
                y,
                size: Math.random() * 2 + 1,
                alpha: 1
            })
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]
                p.alpha -= 0.02
                if (p.alpha <= 0) {
                    particles.splice(i, 1)
                    continue
                }

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`
                ctx.fill()
            }

            requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            addParticle(mouseX, mouseY)
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        animate()

        return () => {
            window.removeEventListener('resize', updateSize)
            canvas.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
            style={{ background: 'transparent' }}
        />
    )
} 