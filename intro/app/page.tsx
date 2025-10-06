'use client'
import Nav from '@/components/ui/nav'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Scene from './components/three/scene'
import { useScroll } from './components/three/tunnel'
import MouseTrail from './components/ui/mouse-trail'

function isWebGLAvailable() {
  if (typeof window === 'undefined') return true; // SSR check

  try {
    const canvas = document.createElement('canvas');
    // Try WebGL 2 first
    let gl: WebGL2RenderingContext | WebGLRenderingContext | null = null;

    const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (gl2) {
      gl = gl2;
    } else {
      // Fallback to WebGL 1
      gl = (
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      ) as WebGLRenderingContext | null;
    }

    if (!gl) return false;

    // Additional check for required extensions
    const extensions = gl.getSupportedExtensions();
    return gl !== null && extensions !== null;
  } catch (e) {
    console.error('WebGL Detection Error:', e);
    return false;
  }
}

export default function HomePage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasWebGL] = useState(true)
  const [isDarkening, setIsDarkening] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFastForwarding, setIsFastForwarding] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [showBlogButton, setShowBlogButton] = useState(false)
  const { fadeToBlack } = useScroll()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsTransitioning(true)
          setTimeout(() => {
            setIsLoading(false)
          }, 1500)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercentage > 85) {
        setShowNav(true)
        setShowBlogButton(true)
      } else {
        setShowNav(false)
        setShowBlogButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const transitionToBlog = () => {
    setIsFastForwarding(true)
    setIsDarkening(true)

    // Wait for the animation to complete before navigating
    setTimeout(() => {
      router.push('/blog')
    }, 2500)
  }

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#030014] flex flex-col items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -20 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <>
      <MouseTrail />
      <div className="fixed inset-0 z-0">
        {hasWebGL && <Scene fastForward={isFastForwarding} />}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
        className="relative min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showNav ? 1 : 0, y: showNav ? 0 : -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <Nav />
        </motion.div>
        <main className="relative z-10 overflow-hidden">
          {/* Sections for scroll height */}
          <section className="h-[150vh]" />
          <section className="h-[150vh]" />
          <section className="h-[150vh]" />
          <section className="h-[150vh]" />
          <section className="h-[150vh]" />

          {/* Final Section with View Blog Button */}
          <section className="h-[150vh] relative">
            <div className="fixed inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: showBlogButton ? 1 : 0,
                  scale: showBlogButton ? 1 : 0.8,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut"
                }}
              >
                <motion.button
                  onClick={transitionToBlog}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-3 overflow-hidden rounded-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                  <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/20 transition-colors duration-500" />
                  <span className="relative text-lg font-black tracking-widest text-white/80 group-hover:text-white transition-colors duration-500">
                    VIEW BLOG
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>
      </motion.div>

      {/* Darkening Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isDarkening ? 1 : 0,
          transition: { duration: 1.2, delay: 0.8, ease: "easeIn" }
        }}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
      />

      <AnimatePresence>
        {fadeToBlack && (
          <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}