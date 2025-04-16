"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ThreeDTextProps {
  text: string
  className?: string
}

export default function ThreeDText({ text, className = "" }: ThreeDTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const { left, top, width, height } = container.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top

      const centerX = width / 2
      const centerY = height / 2

      const moveX = (x - centerX) / 25
      const moveY = (y - centerY) / 25

      const textElements = container.querySelectorAll(".text-3d")
      textElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${-moveY}deg) rotateY(${moveX}deg)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className={`relative perspective-1000 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-3d transform-style-3d transition-transform duration-200 ease-out">
        <span className="block text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          {text}
        </span>
      </div>

      {/* Shadow text for 3D effect */}
      <div className="absolute inset-0 text-3d transform-style-3d transition-transform duration-200 ease-out opacity-50 blur-[2px] -z-10">
        <span className="block text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
          {text}
        </span>
      </div>
    </motion.div>
  )
}
