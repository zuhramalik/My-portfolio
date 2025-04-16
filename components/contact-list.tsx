"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, Github, Linkedin } from "lucide-react"
import Link from "next/link"

interface ContactItem {
  icon: React.ReactNode
  label: string
  value: string
  link?: string
  color: string
}

export default function ContactList() {
  const contacts: ContactItem[] = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "zuhraa003@gmail.com",
      link: "mailto:zuhraa003@gmail.com",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "03197549097",
      link: "tel:03197549097",
      color: "from-violet-500 to-violet-600",
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/zuhramalik",
      link: "https://github.com/zuhramalik",
      color: "from-gray-700 to-gray-800",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/fatima-zuhra",
      link: "https://linkedin.com/in/fatima-zuhra",
      color: "from-blue-500 to-blue-600",
    },
  ]

  return (
    <div className="flex flex-col space-y-4">
      {contacts.map((contact, index) => (
        <motion.div
          key={contact.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ y: -5 }}
          className="relative group w-full"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl opacity-50 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-r ${contact.color} p-2 rounded-lg text-white`}>{contact.icon}</div>
              <div>
                <p className="text-xs text-gray-400">{contact.label}</p>
                {contact.link ? (
                  <Link
                    href={contact.link}
                    target={contact.link.startsWith("http") ? "_blank" : undefined}
                    rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm sm:text-base font-medium hover:text-pink-400 transition-colors"
                  >
                    {contact.value}
                  </Link>
                ) : (
                  <p className="text-sm sm:text-base font-medium">{contact.value}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
