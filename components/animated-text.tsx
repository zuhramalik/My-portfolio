"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  type?: "bounce" | "wave" | "stagger" | "glitch" | "gradient"
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  type = "stagger",
}: AnimatedTextProps) {
  // Split text into an array of letters
  const letters = Array.from(text)

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay },
    }),
  }

  // Bounce animation for each letter
  const bounceChild = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  // Wave animation for each letter
  const waveChild = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: i * 0.05,
      },
    }),
    hidden: {
      opacity: 0,
      y: [0, -20, 0, 20, 0],
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  // Stagger animation for each letter
  const staggerChild = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -10,
      y: -10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Glitch animation for each letter
  const glitchChild = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
      },
    },
  }

  const getVariant = () => {
    switch (type) {
      case "bounce":
        return bounceChild
      case "wave":
        return waveChild
      case "glitch":
        return glitchChild
      case "stagger":
      default:
        return staggerChild
    }
  }

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={getVariant()}
          className={`inline-block ${type === "gradient" ? "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500" : ""}`}
          style={{ marginRight: letter === " " ? "0.25em" : "0" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}
