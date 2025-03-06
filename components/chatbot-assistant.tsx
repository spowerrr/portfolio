"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAudio } from "@/hooks/use-audio"
import { Bot, Send, X } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotAssistantProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatbotAssistant({ open, onOpenChange }: ChatbotAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hi there! I'm your portfolio assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toggleClick, toggleHover } = useAudio()

  useEffect(() => {
    if (open) {
      scrollToBottom()
    }
  }, [messages, open])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    toggleClick()

    // Process the user's message and generate a response
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const generateResponse = (message: string): string => {
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! How can I assist you with the portfolio today?"
    } else if (message.includes("project") || message.includes("show project")) {
      return "You can view all projects in the Projects section. Would you like me to scroll there for you?"
    } else if (message.includes("contact") || message.includes("hire") || message.includes("work")) {
      return "You can get in touch through the Contact section. Would you like me to take you there?"
    } else if (message.includes("dark mode") || message.includes("light mode") || message.includes("toggle")) {
      return "You can toggle between dark and light mode using the switch in the top right corner of the page."
    } else if (message.includes("skill") || message.includes("technology")) {
      return "I specialize in React, Next.js, TypeScript, Tailwind CSS, and Framer Motion. Check out the Skills section for more details!"
    } else if (message.includes("joke")) {
      return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
    } else if (message.includes("thank")) {
      return "You're welcome! Let me know if you need anything else."
    } else {
      return "I'm not sure I understand. Try asking about projects, skills, or how to contact me."
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Portfolio Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenChange(false)
                toggleClick()
              }}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              onMouseEnter={toggleHover}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                onMouseEnter={toggleHover}
              />

              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
                onMouseEnter={toggleHover}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

