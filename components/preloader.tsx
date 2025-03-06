"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("INITIALIZING")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const textInterval = setInterval(() => {
      setText((prev) => {
        const texts = [
          "INITIALIZING",
          "LOADING ASSETS",
          "COMPILING SHADERS",
          "RENDERING PARTICLES",
          "CALIBRATING ANIMATIONS",
          "ALMOST THERE",
        ]
        const currentIndex = texts.indexOf(prev)
        return texts[(currentIndex + 1) % texts.length]
      })
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="text-4xl font-bold text-white mb-8 font-mono tracking-tight">
          <GlitchText text={text} />
        </div>

        <div className="w-[300px] h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        <div className="mt-2 text-gray-400 font-mono text-sm text-right">{progress}%</div>
      </motion.div>
    </div>
  )
}

function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative inline-block">
      <div className="relative">
        {text}
        <motion.div
          className="absolute inset-0 text-cyan-400 opacity-70"
          style={{ clipPath: "inset(50% 0 50% 0)" }}
          animate={{
            clipPath: ["inset(50% 0 50% 0)", "inset(0% 0 70% 0)", "inset(20% 0 20% 0)", "inset(50% 0 50% 0)"],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            repeatDelay: 2,
          }}
        >
          {text}
        </motion.div>
        <motion.div
          className="absolute inset-0 text-rose-400 opacity-70"
          style={{ clipPath: "inset(50% 0 50% 0)" }}
          animate={{
            clipPath: ["inset(50% 0 50% 0)", "inset(70% 0 0% 0)", "inset(20% 0 20% 0)", "inset(50% 0 50% 0)"],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            repeatDelay: 2,
            delay: 0.1,
          }}
        >
          {text}
        </motion.div>
      </div>
    </div>
  )
}

