"use client"

import { useRef, useEffect } from "react"

export default function BubbleBackground() {
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

    // Bubble class
    class Bubble {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      blur: number

      constructor() {
        this.radius = Math.random() * 60 + 20
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius
        this.color = this.getRandomColor()
        this.speedX = (Math.random() - 0.5) * 1
        this.speedY = (Math.random() - 0.5) * 1
        this.opacity = Math.random() * 0.3 + 0.1
        this.blur = Math.random() * 5 + 2
      }

      getRandomColor() {
        const colors = [
          "rgba(236, 72, 153, 1)", // pink-500
          "rgba(139, 92, 246, 1)", // violet-500
          "rgba(6, 182, 212, 1)", // cyan-500
          "rgba(59, 130, 246, 1)", // blue-500
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.speedX *= -1
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.speedY *= -1
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.filter = `blur(${this.blur}px)`

        // Draw bubble
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Add highlight
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius,
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()
      }
    }

    // Create bubbles
    const bubbles: Bubble[] = []
    const bubbleCount = Math.min(20, Math.floor(window.innerWidth / 100))

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble())
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw bubbles
      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Update the canvas class to ensure it's visible throughout the entire portfolio
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-30 opacity-60 pointer-events-none" />
}
