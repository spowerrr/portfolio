"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { useAudio } from "@/hooks/use-audio"
import { MagneticButton } from "@/components/magnetic-button"
import { Moon, Sun } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toggleClick, toggleHover } = useAudio()
  const { scrollY } = useScroll()

  const navbarBackground = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(10, 10, 20, 0.8)"])

  const navbarBackdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"])

  const navbarHeight = useTransform(scrollY, [0, 100], ["6rem", "4rem"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12"
      style={{
        backgroundColor: navbarBackground,
        backdropFilter: navbarBackdropBlur,
        height: navbarHeight,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="#home" className="text-2xl font-bold tracking-tighter" onMouseEnter={toggleHover}>
          <span className="text-primary">Pus</span>po
        </a>
      </motion.div>

      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <MagneticButton>
                <a
                  href={item.href}
                  className="relative text-sm font-medium transition-colors hover:text-primary"
                  onMouseEnter={toggleHover}
                  onClick={toggleClick}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </MagneticButton>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark")
            toggleClick()
          }}
          className="rounded-full p-2 text-foreground hover:bg-muted transition-colors"
          onMouseEnter={toggleHover}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          <span className="sr-only">Toggle theme</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <MagneticButton>
            <a
              href="#contact"
              className="relative inline-flex h-10 overflow-hidden rounded-full bg-primary p-[1px]"
              onMouseEnter={toggleHover}
              onClick={toggleClick}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground backdrop-blur-3xl">
                Let's Talk
              </span>
            </a>
          </MagneticButton>
        </motion.div>

        <button className="block md:hidden text-foreground" onMouseEnter={toggleHover} onClick={toggleClick}>
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
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Menu</span>
        </button>
      </div>
    </motion.header>
  )
}

