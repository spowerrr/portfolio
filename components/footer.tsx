"use client"

import { motion } from "framer-motion"
import { useAudio } from "@/hooks/use-audio"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const { toggleHover, toggleClick } = useAudio()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    toggleClick()
  }

  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" className="text-2xl font-bold tracking-tighter" onMouseEnter={toggleHover}>
              <span className="text-primary">Pus</span>po
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>&copy; {new Date().getFullYear()} Puspo. All rights reserved.</p>
            <p className="mt-1">CSE Student at United International University</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              onMouseEnter={toggleHover}
            >
              <ArrowUp className="h-5 w-5" />
              <span className="sr-only">Scroll to top</span>
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

