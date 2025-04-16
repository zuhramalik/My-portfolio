"use client"

import { useRef, useEffect } from "react"

interface FloatingBalloonsProps {
  count?: number
  minSize?: number
  maxSize?: number
  colors?: string[]
}

export default function FloatingBalloons({
  count = 50, // Increased from 30 to 50
  minSize = 20,
  maxSize = 80,
  colors = ["#ec4899", "#8b5cf6", "#06b6d4", "#f43f5e", "#a855f7", "#3b82f6"],
}: FloatingBalloonsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Balloon class
    class Balloon {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      rotation: number
      rotationSpeed: number
      wobbleSpeed: number
      wobbleSize: number
      wobbleOffset: number

      constructor() {
        this.size = Math.random() * (maxSize - minSize) + minSize
        this.x = Math.random() * canvas.width
        this.y = canvas.height + this.size
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speedX = (Math.random() - 0.5) * 1
        this.speedY = -Math.random() * 1 - 0.5 // Negative to move upward
        this.opacity = Math.random() * 0.5 + 0.3
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01
        this.wobbleSpeed = Math.random() * 0.03 + 0.01
        this.wobbleSize = Math.random() * 5 + 2
        this.wobbleOffset = Math.random() * Math.PI * 2
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX + Math.sin(this.wobbleOffset + Date.now() * this.wobbleSpeed) * 0.5
        this.rotation += this.rotationSpeed

        // Reset balloon when it goes off the top
        if (this.y < -this.size * 2) {
          this.y = canvas.height + this.size
          this.x = Math.random() * canvas.width
        }

        // Bounce off the sides
        if (this.x < -this.size || this.x > canvas.width + this.size) {
          this.speedX *= -1
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Draw balloon
        ctx.beginPath()
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Add highlight to make it look like a balloon
        const gradient = ctx.createRadialGradient(
          -this.size / 6,
          -this.size / 6,
          0,
          -this.size / 6,
          -this.size / 6,
          this.size / 2,
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.2)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Add string to balloon
        ctx.beginPath()
        ctx.moveTo(0, this.size / 2)
        ctx.quadraticCurveTo(this.size / 4, this.size, 0, this.size * 1.5)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }
    }

    // Create balloons
    const balloons: Balloon[] = []
    for (let i = 0; i < count; i++) {
      balloons.push(new Balloon())
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw balloons
      balloons.forEach((balloon) => {
        balloon.update()
        balloon.draw()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [count, minSize, maxSize, colors])

  // Update the canvas class to make it fixed and cover the entire viewport
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 opacity-70 pointer-events-none" />
}
