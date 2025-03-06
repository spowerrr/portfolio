"use client"

import { useEffect, useState } from "react"

export function useAudio() {
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null)
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    // Create audio elements
    const click = new Audio("/click.mp3")
    const hover = new Audio("/hover.mp3")

    // Set volume
    click.volume = 0.2
    hover.volume = 0.1

    // Store audio elements
    setClickSound(click)
    setHoverSound(hover)

    // Default to muted on first load
    setIsMuted(true)

    // Clean up
    return () => {
      click.pause()
      hover.pause()
    }
  }, [])

  const toggleClick = () => {
    if (clickSound && !isMuted) {
      clickSound.currentTime = 0
      clickSound.play().catch(() => {
        // Autoplay was prevented
      })
    }
  }

  const toggleHover = () => {
    if (hoverSound && !isMuted) {
      hoverSound.currentTime = 0
      hoverSound.play().catch(() => {
        // Autoplay was prevented
      })
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return {
    toggleClick,
    toggleHover,
    toggleMute,
    isMuted,
  }
}

