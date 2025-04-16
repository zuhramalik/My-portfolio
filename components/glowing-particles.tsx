"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface GlowingParticlesProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  className?: string
}

export default function GlowingParticles({
  count = 50,
  colors = ["#ec4899", "#8b5cf6", "#ffffff"],
  minSize = 2,
  maxSize = 6,
  minSpeed = 0.5,
  maxSpeed = 1.5,
  className = "",
}: GlowingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      direction: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (maxSize - minSize) + minSize
        this.speedX = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1)
        this.speedY = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1)
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = Math.random() * 0.5 + 0.2
        this.direction = Math.random() * Math.PI * 2
      }

      update() {
        this.x += Math.cos(this.direction) * this.speedX
        this.y += Math.sin(this.direction) * this.speedY

        // Change direction slightly for organic movement
        this.direction += (Math.random() - 0.5) * 0.1

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1
        }

        // Pulse size
        this.size += Math.sin(Date.now() / 1000) * 0.1

        // Ensure size stays within bounds
        if (this.size < minSize) this.size = minSize
        if (this.size > maxSize) this.size = maxSize
      }

      draw() {
        if (!ctx) return

        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)

        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "transparent")

        ctx.globalAlpha = this.alpha * 0.5
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
