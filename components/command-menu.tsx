"use client"

import { useEffect } from "react"
import { useAudio } from "@/hooks/use-audio"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useTheme } from "next-themes"
import { ArrowRight, Github, Home, Laptop, Mail, Moon, Palette, Sun, User, Twitter, Linkedin } from "lucide-react"

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { toggleClick, toggleHover } = useAudio()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
        toggleClick()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open, toggleClick])

  const runCommand = (command: () => void) => {
    onOpenChange(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {[
            { icon: Home, name: "Home", shortcut: "H", action: () => (window.location.href = "#home") },
            { icon: User, name: "About", shortcut: "A", action: () => (window.location.href = "#about") },
            { icon: Palette, name: "Skills", shortcut: "S", action: () => (window.location.href = "#skills") },
            { icon: Laptop, name: "Projects", shortcut: "P", action: () => (window.location.href = "#projects") },
            { icon: Mail, name: "Contact", shortcut: "C", action: () => (window.location.href = "#contact") },
          ].map((item) => (
            <CommandItem key={item.name} onSelect={() => runCommand(item.action)} onMouseEnter={toggleHover}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
              <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                {item.shortcut}
              </kbd>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))} onMouseEnter={toggleHover}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
            {theme === "light" && <ArrowRight className="ml-auto h-4 w-4 text-primary" />}
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))} onMouseEnter={toggleHover}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
            {theme === "dark" && <ArrowRight className="ml-auto h-4 w-4 text-primary" />}
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => setTheme("system"))} onMouseEnter={toggleHover}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System Mode</span>
            {theme === "system" && <ArrowRight className="ml-auto h-4 w-4 text-primary" />}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social">
          <CommandItem
            onSelect={() => runCommand(() => window.open("https://github.com/spowerrr", "_blank"))}
            onMouseEnter={toggleHover}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => window.open("https://bd.linkedin.com/in/iampuspo", "_blank"))}
            onMouseEnter={toggleHover}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => window.open("https://x.com/iam_puspo", "_blank"))}
            onMouseEnter={toggleHover}
          >
            <Twitter className="mr-2 h-4 w-4" />
            <span>Twitter</span>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => window.open("mailto:sk1969363@gmail.com", "_blank"))}
            onMouseEnter={toggleHover}
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

