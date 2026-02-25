"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Give the layout time to mount the scroller
    const initLenis = () => {
      const scroller = document.querySelector(".retro-scroll") as HTMLElement;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.firstElementChild as HTMLElement,
        duration: 1.2,
        smoothWheel: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return lenis;
    };

    const lenisInstance = initLenis();

    return () => {
      lenisInstance?.destroy()
    }
  }, [])

  return <>{children}</>
}