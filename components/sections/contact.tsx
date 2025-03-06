"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useAudio } from "@/hooks/use-audio"
import { MagneticButton } from "@/components/magnetic-button"
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react"

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toggleHover, toggleClick } = useAudio()

  const formRef = useRef<HTMLDivElement>(null)
  const connectRef = useRef<HTMLDivElement>(null)

  const isFormInView = useInView(formRef, { once: true, amount: 0.3 })
  const isConnectInView = useInView(connectRef, { once: true, amount: 0.3 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    toggleClick()

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  const socialLinks = [
    { name: "Twitter", icon: Twitter, url: "https://x.com/iam_puspo" },
    { name: "LinkedIn", icon: Linkedin, url: "https://bd.linkedin.com/in/iampuspo" },
    { name: "GitHub", icon: Github, url: "https://github.com/spowerrr" },
    { name: "Email", icon: Mail, url: "mailto:sk1969363@gmail.com" },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Have a project in mind or want to collaborate? Feel free to reach out to me. I'm always open to discussing
            new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Form</h3>

            {isSubmitted ? (
              <motion.div
                className="rounded-xl border border-border bg-card p-8 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                  <Send className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group relative z-0">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="peer block w-full appearance-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    onMouseEnter={toggleHover}
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                    Your Name
                  </label>
                </div>

                <div className="group relative z-0">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="peer block w-full appearance-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    onMouseEnter={toggleHover}
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                    Your Email
                  </label>
                </div>

                <div className="group relative z-0">
                  <textarea
                    name="message"
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="peer block w-full appearance-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                    onMouseEnter={toggleHover}
                  />
                  <label
                    htmlFor="message"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                    Your Message
                  </label>
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-70"
                    onMouseEnter={toggleHover}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
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
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            )}
          </motion.div>

          <motion.div
            ref={connectRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isConnectInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to connect with me on social media or send me an email. I'm always interested in new projects
                and collaborations.
              </p>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <MagneticButton key={link.name}>
                    <motion.a
                      href={link.url}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={toggleHover}
                      onClick={toggleClick}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            <motion.div
              className="rounded-xl border border-border bg-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-4">Let's Discuss Your Project</h4>
              <p className="text-muted-foreground mb-4">
                I'm interested in freelance opportunities – especially ambitious or large projects. However, if you have
                other requests or questions, don't hesitate to contact me.
              </p>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:sk1969363@gmail.com"
                  className="hover:text-primary transition-colors"
                  onMouseEnter={toggleHover}
                >
                  sk1969363@gmail.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

