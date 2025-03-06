"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    const links = document.querySelectorAll("a, button, [role=button]")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, [])

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference" as const,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 24,
      width: 24,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference" as const,
    },
  }

  const dotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    clicked: {
      x: position.x - 6,
      y: position.y - 6,
      height: 12,
      width: 12,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    link: {
      x: position.x - 4,
      y: position.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
  }

  return (
    <>
      <motion.div
        className="cursor-outer fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={dotVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </>
  )
}

