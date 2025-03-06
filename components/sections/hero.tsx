"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useAudio } from "@/hooks/use-audio"
import { MagneticButton } from "@/components/magnetic-button"
import { ArrowDown, ExternalLink } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { toggleClick, toggleHover } = useAudio()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 z-0">
        <LightBeams />
      </div>

      <motion.div className="container relative z-10 mx-auto px-4 text-center" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <AnimatedText
            text="Creative Developer"
            className="text-lg md:text-xl font-medium text-primary uppercase tracking-widest"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
        >
          <AnimatedLetters text="CSE Student & Developer" highlightIndices={[0, 4, 12]} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
        >
          I'm a 3rd year Computer Science student passionate about software development. Currently exploring various
          technologies including C, C++, JavaScript, and learning Go for backend development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:shadow-glow-lg"
              onMouseEnter={toggleHover}
              onClick={toggleClick}
            >
              View My Work
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onMouseEnter={toggleHover}
              onClick={toggleClick}
            >
              Contact Me <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <MagneticButton>
          <a
            href="#about"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background/50 text-primary backdrop-blur-sm transition-colors hover:bg-primary/10"
            onMouseEnter={toggleHover}
            onClick={toggleClick}
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
            <span className="sr-only">Scroll Down</span>
          </a>
        </MagneticButton>
      </motion.div>
    </section>
  )
}

function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className={`overflow-hidden ${className}`} variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

function AnimatedLetters({
  text,
  highlightIndices = [],
}: {
  text: string
  highlightIndices?: number[]
}) {
  const letters = Array.from(text)

  return (
    <span className="inline-block">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5 + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className={`inline-block ${highlightIndices.includes(i) ? "text-primary" : ""}`}
          whileHover={{
            scale: 1.2,
            color: "#7C3AED",
            transition: { duration: 0.2 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

function LightBeams() {
  const beamsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!beamsRef.current) return

      const { clientX, clientY } = e
      const { width, height } = beamsRef.current.getBoundingClientRect()

      const x = clientX / width - 0.5
      const y = clientY / height - 0.5

      beamsRef.current.style.setProperty("--mouse-x", `${x * 100}%`)
      beamsRef.current.style.setProperty("--mouse-y", `${y * 100}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={beamsRef}
      className="absolute inset-0 overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      <div className="light-beam light-beam-1" />
      <div className="light-beam light-beam-2" />
      <div className="light-beam light-beam-3" />
    </div>
  )
}

