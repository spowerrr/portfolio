"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { useAudio } from "@/hooks/use-audio"
import { MagneticButton } from "@/components/magnetic-button"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { toggleHover, toggleClick } = useAudio()

  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  const projects: Project[] = [
    {
      id: "project1",
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with Next.js, featuring product filtering, cart functionality, and payment integration.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      demoUrl: "#",
      githubUrl: "https://github.com/spowerrr",
    },
    {
      id: "project2",
      title: "3D Portfolio Showcase",
      description:
        "An interactive 3D portfolio website built with Three.js and React, featuring custom animations and 3D models.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Three.js", "GSAP", "Framer Motion"],
      demoUrl: "#",
      githubUrl: "https://github.com/spowerrr",
    },
    {
      id: "project3",
      title: "AI Content Generator",
      description:
        "A web application that uses AI to generate content for various purposes, with a clean and intuitive user interface.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Node.js", "OpenAI API", "Express"],
      demoUrl: "#",
      githubUrl: "https://github.com/spowerrr",
    },
    {
      id: "project4",
      title: "Real-time Chat Application",
      description:
        "A real-time chat application with features like message encryption, file sharing, and user authentication.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Socket.io", "Firebase", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "https://github.com/spowerrr",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section id="projects" ref={containerRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Here are some of my recent projects that showcase my skills and expertise. Each project represents a unique
            challenge and solution.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-glow-sm"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onMouseEnter={toggleHover}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex gap-4">
                    <MagneticButton>
                      <a
                        href={project.demoUrl}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-all hover:shadow-glow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={toggleClick}
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    </MagneticButton>

                    <MagneticButton>
                      <a
                        href={project.githubUrl}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-card-foreground shadow-glow transition-all hover:shadow-glow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={toggleClick}
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub Repository</span>
                      </a>
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

