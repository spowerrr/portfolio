"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { useAudio } from "@/hooks/use-audio"
import { CommandMenu } from "@/components/command-menu"
import { CustomCursor } from "@/components/custom-cursor"
import { CursorTrail } from "@/components/cursor-trail"
import { Preloader } from "@/components/preloader"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ParticleField } from "@/components/particle-field"
import { ChatbotAssistant } from "@/components/chatbot-assistant"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toggleClick, toggleHover } = useAudio()
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9])

  useEffect(() => {
    // Check if it's night time (3:00 AM)
    const checkNightOwlMode = () => {
      const currentHour = new Date().getHours()
      if (currentHour === 3) {
        setTheme("dark")
        console.log("Night Owl Mode activated 🦉")
      }
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Add Konami code listener
    let konamiSequence = []
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]

    const handleKeyDown = (e) => {
      konamiSequence.push(e.key)
      konamiSequence = konamiSequence.slice(-10)

      if (konamiSequence.join(",") === konamiCode.join(",")) {
        console.log("Developer Mode Unlocked! 🚀")
        document.documentElement.classList.add("developer-mode")
        toggleClick()
      }

      // Command menu shortcut (Ctrl + K)
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        setCommandMenuOpen(true)
        toggleClick()
      }

      // Terminal shortcut (Cmd + `)
      if (e.metaKey && e.key === "`") {
        e.preventDefault()
        console.log("Terminal activated")
        toggleClick()
      }

      // Easter egg
      if (konamiSequence.slice(-5).join("") === "hello") {
        console.log("Hello there! 👋")
        toggleClick()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    checkNightOwlMode()

    return () => {
      clearTimeout(timer)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [setTheme, toggleClick])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <CustomCursor />
      <CursorTrail />
      <ParticleField />
      <ScrollProgress />

      <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />

      <ChatbotAssistant open={chatbotOpen} onOpenChange={setChatbotOpen} />

      <div className="relative z-10">
        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <button
        onClick={() => setChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:scale-110"
        onMouseEnter={toggleHover}
      >
        <span className="sr-only">Open Assistant</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bot"
        >
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      </button>
    </div>
  )
}

