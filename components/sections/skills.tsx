"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useAudio } from "@/hooks/use-audio"
import { Code, FileCode2, Layers, Palette, Server, Terminal, Github, Database, BookOpen } from "lucide-react"

interface Skill {
  name: string
  icon: React.ElementType
  level: number
  category: string
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { toggleHover, toggleClick } = useAudio()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const categories = [
    { id: "languages", name: "Languages" },
    { id: "web", name: "Web Technologies" },
    { id: "tools", name: "Tools & DevOps" },
    { id: "learning", name: "Learning" },
  ]

  const skills: Skill[] = [
    // Programming Languages
    { name: "C", icon: FileCode2, level: 90, category: "languages" },
    { name: "C++", icon: FileCode2, level: 85, category: "languages" },

    // Web Technologies
    { name: "HTML", icon: Code, level: 80, category: "web" },
    { name: "CSS", icon: Palette, level: 75, category: "web" },
    { name: "JavaScript", icon: Layers, level: 70, category: "web" },

    // Tools & DevOps
    { name: "Linux", icon: Terminal, level: 80, category: "tools" },
    { name: "Git", icon: Code, level: 75, category: "tools" },
    { name: "GitHub", icon: Github, level: 80, category: "tools" },
    { name: "Docker", icon: Server, level: 70, category: "tools" },

    // Learning
    { name: "Go", icon: BookOpen, level: 40, category: "learning" },
    { name: "Backend Dev", icon: Database, level: 35, category: "learning" },
  ]

  const filteredSkills = activeCategory ? skills.filter((skill) => skill.category === activeCategory) : skills

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            I've worked with a variety of technologies and tools throughout my journey. Here's a glimpse of my technical
            expertise across different categories.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              key="all"
              onClick={() => {
                setActiveCategory(null)
                toggleClick()
              }}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={toggleHover}
            >
              All
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  toggleClick()
                }}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={toggleHover}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-glow-sm"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onMouseEnter={toggleHover}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <skill.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-xl font-semibold">{skill.name}</h3>

              <div className="mb-2 h-2 w-full rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                />
              </div>

              <p className="text-sm text-muted-foreground">{skill.level}%</p>

              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

