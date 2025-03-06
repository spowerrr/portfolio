"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { useAudio } from "@/hooks/use-audio"

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { toggleHover } = useAudio()

  const isImageInView = useInView(imageRef, { once: true, amount: 0.3 })
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 })
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const timelineItems = [
    {
      year: "2021 - Present",
      title: "Computer Science and Engineering",
      description: "Studying CSE at United International University, currently in my 3rd year.",
    },
    {
      year: "2023",
      title: "Backend Development",
      description: "Started learning Go for backend development to expand my skill set.",
    },
    {
      year: "2022",
      title: "Web Development",
      description: "Focused on frontend technologies like HTML, CSS, and JavaScript.",
    },
    {
      year: "2021",
      title: "Programming Fundamentals",
      description: "Mastered C and C++ programming languages and computer science basics.",
    },
  ]

  return (
    <section id="about" ref={containerRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            I'm a passionate developer with a keen eye for design and a love for creating immersive digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={imageRef}
            style={{ y, opacity, scale }}
            className="relative"
            initial={{ x: -100, opacity: 0 }}
            animate={isImageInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted/20 backdrop-blur-sm">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Profile"
                width={600}
                height={600}
                className="object-cover transition-all duration-500 hover:scale-105"
                onMouseEnter={toggleHover}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

              <motion.div
                className="absolute bottom-6 left-6 right-6 rounded-xl bg-background/30 p-4 backdrop-blur-md border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-1">Puspo</h3>
                <p className="text-sm text-muted-foreground">CSE Student & Developer</p>
              </motion.div>
            </div>

            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
          </motion.div>

          <div>
            <motion.div
              ref={contentRef}
              className="mb-8"
              initial={{ x: 100, opacity: 0 }}
              animate={isContentInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4">
                I'm a 3rd year Computer Science and Engineering student at United International University. I'm
                passionate about software development and constantly expanding my skills in various technologies.
              </p>
              <p className="text-muted-foreground">
                My focus is on building efficient, user-friendly applications while exploring new technologies.
                Currently, I'm learning Go for backend development to broaden my expertise.
              </p>
            </motion.div>

            <div ref={timelineRef} className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Experience</h3>
              <div className="relative border-l border-border pl-6">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="mb-8 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute -left-[7px] h-3.5 w-3.5 rounded-full border border-border bg-primary" />
                    <div className="text-sm font-semibold text-primary mb-1">{item.year}</div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

