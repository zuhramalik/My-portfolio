"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  color: string
  delay: number
  inView: boolean
}

export default function SkillBadge({ name, color, delay, inView }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`${color} bg-opacity-20 border border-opacity-30 ${color.replace("bg-", "border-")} rounded-lg p-4 flex items-center justify-center shadow-lg`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        className="text-center"
      >
        <span className="font-medium text-lg">{name}</span>
      </motion.div>
    </motion.div>
  )
}
