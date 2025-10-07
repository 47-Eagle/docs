'use client'

import { useEffect } from 'react'

export default function MobileGestures() {
    useEffect(() => {
        if (typeof window === 'undefined') return
        
        let touchStartY = 0
        let touchStartX = 0
        let touchStartTime = 0
        let isPinching = false
        let initialPinchDistance = 0
        
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                touchStartY = e.touches[0].clientY
                touchStartX = e.touches[0].clientX
                touchStartTime = Date.now()
            } else if (e.touches.length === 2) {
                // Pinch gesture
                isPinching = true
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                initialPinchDistance = Math.sqrt(dx * dx + dy * dy)
            }
        }
        
        const handleTouchMove = (e: TouchEvent) => {
            if (isPinching && e.touches.length === 2) {
                // Handle pinch zoom (could trigger fast forward)
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const currentDistance = Math.sqrt(dx * dx + dy * dy)
                const distanceChange = currentDistance - initialPinchDistance
                
                if (Math.abs(distanceChange) > 50) {
                    // Significant pinch detected - trigger fast forward
                    window.dispatchEvent(new CustomEvent('fastforward', { detail: true }))
                    setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('fastforward', { detail: false }))
                    }, 1000)
                }
            }
        }
        
        const handleTouchEnd = (e: TouchEvent) => {
            if (isPinching) {
                isPinching = false
                initialPinchDistance = 0
                return
            }
            
            if (e.changedTouches.length === 1) {
                const touchEndY = e.changedTouches[0].clientY
                const touchEndX = e.changedTouches[0].clientX
                const touchDuration = Date.now() - touchStartTime
                
                const deltaY = touchStartY - touchEndY
                const deltaX = touchStartX - touchEndX
                
                // Swipe detection
                const minSwipeDistance = 50
                const maxSwipeTime = 500
                
                if (touchDuration < maxSwipeTime) {
                    // Vertical swipe
                    if (Math.abs(deltaY) > minSwipeDistance && Math.abs(deltaY) > Math.abs(deltaX)) {
                        if (deltaY > 0) {
                            // Swipe up - scroll down
                            window.scrollBy({ 
                                top: window.innerHeight * 0.7, 
                                behavior: 'smooth' 
                            })
                        } else {
                            // Swipe down - scroll up
                            window.scrollBy({ 
                                top: -window.innerHeight * 0.7, 
                                behavior: 'smooth' 
                            })
                        }
                    }
                    
                    // Horizontal swipe (for navigation hints)
                    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
                        if (deltaX > 0) {
                            // Swipe left - could trigger fast forward
                            window.dispatchEvent(new CustomEvent('fastforward', { detail: true }))
                            setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('fastforward', { detail: false }))
                            }, 1500)
                        }
                    }
                }
                
                // Long press detection (hold for fast forward)
                if (touchDuration > 800 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                    window.dispatchEvent(new CustomEvent('fastforward', { detail: true }))
                    setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('fastforward', { detail: false }))
                    }, 2000)
                }
            }
        }
        
        // Add touch event listeners with passive: false for preventDefault capability
        document.addEventListener('touchstart', handleTouchStart, { passive: true })
        document.addEventListener('touchmove', handleTouchMove, { passive: true })
        document.addEventListener('touchend', handleTouchEnd, { passive: true })
        
        return () => {
            document.removeEventListener('touchstart', handleTouchStart)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleTouchEnd)
        }
    }, [])
    
    return null // This is a behavior-only component
}

