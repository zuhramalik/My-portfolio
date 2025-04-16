"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  borderRadius?: string
  gradientColors?: string[]
  animationDuration?: number
}

export default function AnimatedGradientBorder({
  children,
  className = "",
  borderWidth = 2,
  borderRadius = "1rem",
  gradientColors = ["#ec4899", "#8b5cf6", "#06b6d4", "#ec4899"],
  animationDuration = 8,
}: AnimatedGradientBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create a gradient background that's larger than the container
    const updateGradient = () => {
      const angle = (Date.now() / 1000) % 360
      container.style.backgroundImage = `linear-gradient(${angle}deg, ${gradientColors.join(", ")})`
    }

    // Start animation
    const intervalId = setInterval(updateGradient, 50)

    return () => {
      clearInterval(intervalId)
    }
  }, [gradientColors])

  return (
    <motion.div
      ref={containerRef}
      className={`relative p-[${borderWidth}px] ${className}`}
      style={{
        borderRadius,
        backgroundSize: "400% 400%",
        animation: `gradient-animation ${animationDuration}s ease infinite`,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative bg-black/40 backdrop-blur-sm w-full h-full"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>

      <style jsx global>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </motion.div>
  )
}
