"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowDown, Github, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillsCanvas from "@/components/skills-canvas"
import ContactForm from "@/components/contact-form"
import ParticlesBackground from "@/components/particles-background"
import AnimatedCursor from "@/components/animated-cursor"
import { useMediaQuery } from "@/hooks/use-media-query"
import AnimatedText from "@/components/animated-text"
import ThreeDText from "@/components/3d-text"
import GlowingParticles from "@/components/glowing-particles"
import AnimatedGradientBorder from "@/components/animated-gradient-border"
import FloatingBalloons from "@/components/floating-balloons"
import BubbleBackground from "@/components/bubble-background"
import ContactList from "@/components/contact-list"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.97])

  const skills = [
    { name: "HTML", level: 90, color: "#E44D26" },
    { name: "CSS", level: 85, color: "#264DE4" },
    { name: "JavaScript", level: 80, color: "#F7DF1E" },
    { name: "React.js", level: 85, color: "#61DAFB" },
    { name: "Responsive Design", level: 90, color: "#9C27B0" },
    { name: "UI/UX", level: 75, color: "#FF4088" },
  ]

  const projects = [
    {
      title: "React Tutorial Project",
      description: "A comprehensive React.js tutorial project showcasing various React concepts and implementations.",
      link: "https://github.com/zuhramalik/react-tut.git",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "JavaScript", "Web Development"],
    },
    {
      title: "Hair Salon Website",
      description: "A modern, responsive website for a hair salon with booking functionality and service showcase.",
      link: "https://github.com/zuhramalik/hair_salon.git",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ]

      for (const section of sections) {
        if (!section.ref.current) continue

        const element = section.ref.current
        const offsetTop = element.offsetTop
        const height = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (ref) => {
    setMenuOpen(false)
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      <AnimatedCursor />
      <FloatingBalloons count={60} />
      <ParticlesBackground />
      <BubbleBackground />
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          >
            My Portfolio
          </motion.div>

          {isMobile ? (
            <>
    

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-md py-4 border-b border-white/10"
                  >
                    <nav className="flex flex-col space-y-3 px-4">
                      {[
                        { name: "Home", ref: homeRef },
                        { name: "About", ref: aboutRef },
                        { name: "Projects", ref: projectsRef },
                        { name: "Contact", ref: contactRef },
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => scrollTo(item.ref)}
                          className={`text-left px-4 py-2 rounded-md transition-colors ${
                            activeSection === item.name.toLowerCase() ? "bg-white/10 text-pink-400" : "hover:bg-white/5"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-1"
            >
              {[
                { name: "Home", ref: homeRef },
                { name: "About", ref: aboutRef },
                { name: "Projects", ref: projectsRef },
                { name: "Contact", ref: contactRef },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollTo(item.ref)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    activeSection === item.name.toLowerCase()
                      ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                      : "hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.nav>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <section
        ref={homeRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full max-w-6xl aspect-[16/9]">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-[100px] opacity-30"></div>
          </div>
        </motion.div>

        {/* Glowing particles around the name */}
        <div className="absolute inset-0 overflow-hidden">
          <GlowingParticles count={80} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <AnimatedGradientBorder className="mb-8 inline-block" borderRadius="2rem" borderWidth={3}>
            <div className="px-6 sm:px-12 py-6 sm:py-8">
              <ThreeDText text="Fatima Tu Zuhra" className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight" />
            </div>
          </AnimatedGradientBorder>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10 mt-8 inline-block relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-black/40 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/10">
              <AnimatedText
                text="Front-End Developer"
                type="glitch"
                className="text-lg sm:text-xl md:text-2xl uppercase tracking-widest text-white font-medium"
                delay={0.5}
                duration={0.03}
              />
            </div>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I create beautiful, responsive websites with modern technologies and clean code.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000"></div>
              <Button
                onClick={() => scrollTo(projectsRef)}
                className="relative bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-full"
                size="lg"
              >
                <span className="relative z-10 flex items-center text-sm sm:text-base">
                  View My Work
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollTo(contactRef)}
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-full text-sm sm:text-base"
                size="lg"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => scrollTo(aboutRef)}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20"
          >
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </motion.div>
        </motion.button>
      </section>
      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center relative">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] opacity-30"></div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                About Me
              </span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">
                    Who I Am
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                    I am a passionate Front-End Developer with expertise in creating responsive, user-friendly web
                    applications. With a strong foundation in HTML, CSS, JavaScript, and React.js, I transform design
                    concepts into functional, interactive experiences.
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                    My approach combines technical skills with creative problem-solving to deliver solutions that are
                    both visually appealing and functionally robust. I'm constantly learning and adapting to new
                    technologies to stay at the forefront of web development.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {["Creative", "Detail-oriented", "Problem Solver", "Team Player"].map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className="h-full"
            >
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                    My Skills
                  </h3>
                  <div className="h-[250px] sm:h-[300px] md:h-[350px]">
                    <SkillsCanvas skills={skills} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center relative"
      >
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] opacity-30"></div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                My Projects
              </span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mt-16 text-center"
          >
            <Link
              href="https://github.com/zuhramalik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-white/5 hover:bg-white/10 transition-colors px-5 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 text-sm sm:text-base"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>View more on GitHub</span>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        ref={contactRef}
        className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center relative"
      >
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] opacity-30"></div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Get In Touch
              </span>
            </h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">
                    Contact Information
                  </h3>

                  <ContactList />

                  <div className="mt-12">
                    <h4 className="text-lg sm:text-xl font-semibold mb-4">Let's Connect</h4>
                    <p className="text-sm sm:text-base text-gray-300 mb-6">
                      I'm currently available for freelance work. If you have a project that needs some creative touch,
                      I'd love to hear about it.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-[1px] rounded-full">
                        <button
                          onClick={() =>
                            document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="bg-black/40 backdrop-blur-sm px-5 py-2 sm:px-6 sm:py-3 rounded-full text-white hover:bg-black/20 transition-colors text-sm sm:text-base"
                        >
                          Send Me a Message
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <ContactForm id="contact-form" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 text-center text-gray-400 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Fatima Tu Zuhra. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">Crafted with ❤️ and React.js</p>
        </div>
      </footer>
    </main>
  )
}