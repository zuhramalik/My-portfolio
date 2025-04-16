"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormProps {
  id?: string
}

export default function ContactForm({ id }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing again
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Send the form data to the API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Success
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative h-full" id={id}>
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur opacity-30"></div>
      <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 h-full">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
          Send Me a Message
        </h3>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-8 sm:py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </motion.div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent!</h4>
            <p className="text-gray-300 text-center text-sm sm:text-base">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-white p-3 sm:p-4 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="bg-black/30 border-white/10 focus:border-pink-500 text-white text-base sm:text-lg py-5 sm:py-6 px-3 sm:px-4"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="bg-black/30 border-white/10 focus:border-pink-500 text-white text-base sm:text-lg py-5 sm:py-6 px-3 sm:px-4"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                className="bg-black/30 border-white/10 focus:border-pink-500 text-white text-base sm:text-lg py-3 sm:py-4 px-3 sm:px-4 min-h-[120px] sm:min-h-[150px]"
                placeholder="Enter your message"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white py-5 sm:py-6 text-base sm:text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        )}
      </div>
    </div>
  )
}
