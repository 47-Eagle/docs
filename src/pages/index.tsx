import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '@docusaurus/router';
import Scene from '../components/three/scene';
import { ScrollProvider, useScroll } from '../components/three/tunnel';
import styles from './index.module.css';
import '../css/homepage.css';

// Disable Docusaurus layout wrapper
export const frontMatter = {
  wrapperClassName: 'custom-wrapper-class',
};


function HomePage() {
    const history = useHistory();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Skip loading screen for now
    const [isDarkening, setIsDarkening] = useState(false);
    const [isFastForwarding, setIsFastForwarding] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showDocsButton, setShowDocsButton] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const { setScroll } = useScroll();
    
    // Redirect to standalone page
    useEffect(() => {
        window.location.replace('/home.html');
    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500); // Reduced from 1500 to 500
                    return 100;
                }
                return prev + 5; // Faster loading: 5% per tick instead of 1%
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);


    const transitionToDocs = () => {
        setIsFastForwarding(true);
        setIsDarkening(true);

        setTimeout(() => {
            history.push('/user');
        }, 2500);
    };

    if (isLoading) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className={styles.loadingScreen}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -20 : 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={styles.loadingContent}
                    >
                        <span className={styles.loadingProgress}>
                            {progress}%
                        </span>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <>
            <div className={styles.homePage}>
                
                <div className={styles.canvasContainer}>
                    <Scene fastForward={isFastForwarding} scrollValue={scrollY} />
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                    className={styles.content}
                >
                    <main className={styles.main}>
                    {/* Redirecting to home.html... */}
                </main>
            </motion.div>

            {/* Darkening Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isDarkening ? 1 : 0,
                    transition: { duration: 1.2, delay: 0.8, ease: "easeIn" }
                }}
                className={styles.darkOverlay}
            />
            </div>
        </>
    );
}

export default function HomePageWrapper() {
    return (
        <ScrollProvider>
            <HomePage />
        </ScrollProvider>
    );
}

