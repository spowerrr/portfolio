"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorPosition {
  x: number
  y: number
  id: number
}

export function CursorTrail() {
  const [cursorTrail, setCursorTrail] = useState<CursorPosition[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrail((prevTrail) => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prevTrail.slice(0, 14), // Keep only the last 15 positions
      ])
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  if (!isClient) {
    return null // Return null on server-side
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {cursorTrail.map((cursor, index) => (
          <motion.div
            key={cursor.id}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 0.7 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: cursor.x,
              top: cursor.y,
              transform: "translate(-50%, -50%)",
              zIndex: 9999 - index,
            }}
            className="pointer-events-none"
          >
            <div
              className="rounded-full bg-primary"
              style={{
                width: `${12 - index * 0.6}px`,
                height: `${12 - index * 0.6}px`,
                opacity: 1 - index * 0.06, // Fade out based on position in the trail
                boxShadow: `0 0 ${8 - index * 0.4}px rgba(124, 58, 237, ${0.8 - index * 0.05})`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

