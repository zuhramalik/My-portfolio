"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Globe, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  title: string
  description: string
  link: string
  image: string
  tags: string[]
  type?: "web" | "app"
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-full">
        <div className="relative h-60 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

          {/* Project type badge */}
          <div className="absolute top-4 left-4">
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                project.type === "app" ? "bg-violet-500/80 text-white" : "bg-pink-500/80 text-white"
              }`}
            >
              {project.type === "app" ? (
                <>
                  <Smartphone className="h-3 w-3" />
                  <span>Mobile App</span>
                </>
              ) : (
                <>
                  <Globe className="h-3 w-3" />
                  <span>Website</span>
                </>
              )}
            </div>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-pink-400 group-hover:to-violet-400 transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-6">{project.description}</p>

          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-pink-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>View Code</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                <span>View project</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
