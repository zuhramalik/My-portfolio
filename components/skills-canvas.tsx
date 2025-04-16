"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillsCanvasProps {
  skills: Skill[]
}

export default function SkillsCanvas({ skills }: SkillsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create skill nodes
    const nodes = skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2
      const radius = Math.min(canvas.width, canvas.height) * 0.3

      return {
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        radius: 40 + (skill.level / 100) * 20,
        color: skill.color,
        name: skill.name,
        level: skill.level,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        originalX: canvas.width / 2 + Math.cos(angle) * radius,
        originalY: canvas.height / 2 + Math.sin(angle) * radius,
      }
    })

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.beginPath()
      ctx.moveTo(nodes[0].x, nodes[0].y)

      for (let i = 0; i < nodes.length; i++) {
        const nextIndex = (i + 1) % nodes.length
        ctx.lineTo(nodes[nextIndex].x, nodes[nextIndex].y)
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw center connections
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(node.x, node.y)
        ctx.strokeStyle = `${node.color}40`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw center node
      ctx.beginPath()
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()

      // Draw nodes
      nodes.forEach((node) => {
        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}40`
        ctx.fill()
        ctx.strokeStyle = node.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw text
        ctx.font = "bold 14px Arial"
        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.name, node.x, node.y)

        // Update position with slight movement
        node.x += node.vx
        node.y += node.vy

        // Boundary check and bounce
        if (Math.abs(node.x - node.originalX) > 30) {
          node.vx *= -1
        }

        if (Math.abs(node.y - node.originalY) > 30) {
          node.vy *= -1
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [skills])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
