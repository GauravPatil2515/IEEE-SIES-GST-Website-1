import { useEffect } from 'react'
import Lenis from 'lenis'

export default function ScrollManager() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
        }

        let rafId = requestAnimationFrame(function tick(time) {
            raf(time)
            rafId = requestAnimationFrame(tick)
        })

        return () => {
            cancelAnimationFrame(rafId)
            lenis.destroy()
        }
    }, [])

    return null
}
