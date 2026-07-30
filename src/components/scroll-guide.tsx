"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

interface SectionItem {
  id: string
  num: string
  label: string
}

const sections: SectionItem[] = [
  { id: "hero", num: "01", label: "HERO" },
  { id: "spotlight", num: "02", label: "SPOTLIGHT" },
  { id: "about", num: "03", label: "ABOUT" },
  { id: "featured-projects", num: "04", label: "WORKS" },
  { id: "skills", num: "05", label: "SKILLS" },
  { id: "contact", num: "06", label: "CONTACT" },
]

export function ScrollGuide() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isHovered, setIsHovered] = useState<boolean>(false)

  useEffect(() => {
    const visibleRatios: Record<string, number> = {}

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && typeof window !== "undefined" && window.innerHeight > 0) {
          visibleRatios[entry.target.id] = entry.intersectionRect.height / window.innerHeight
        } else {
          delete visibleRatios[entry.target.id]
        }
      })

      // Select section with the highest visible viewport coverage ratio on screen
      let maxRatio = -1
      let mostVisibleId = ""
      Object.entries(visibleRatios).forEach(([id, ratio]) => {
        if (ratio > maxRatio) {
          maxRatio = ratio
          mostVisibleId = id
        }
      })

      if (mostVisibleId) {
        setActiveSection(mostVisibleId)
      }
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-15% 0px -15% 0px",
      threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else if (id === "spotlight") {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end w-52 pr-8 pl-20 py-12 select-none cursor-pointer"
      aria-label="Monograph Scroll Navigation"
    >
      {/* Container with smooth vertical spacing expansion (mepet -> berjauhan) */}
      <motion.nav
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col items-end transition-all duration-500 ease-out ${
          isHovered ? "gap-4" : "gap-2"
        }`}
      >
        {sections.map((sec, index) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group flex items-center gap-3.5 text-right transition-all duration-300 focus:outline-none py-1"
            >
              {/* Choreographed Text Label Reveal */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + index * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`label-caps font-mono text-[11px] tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? "text-[#1a1c1c] font-bold"
                        : "text-[#707070] group-hover:text-[#1a1c1c]"
                    }`}
                  >
                    <span className="text-[#a38a5e] mr-1.5">{sec.num}</span>
                    <span>{sec.label}</span>
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot / Dash Indicator */}
              <motion.span
                animate={{
                  width: isActive ? (isHovered ? 14 : 18) : 6,
                  height: 6,
                  backgroundColor: isActive ? "#a38a5e" : "#c4c7c7",
                  opacity: isActive ? 1 : isHovered ? 0.9 : 0.4,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block group-hover:bg-[#1a1c1c] group-hover:opacity-100 flex-shrink-0"
              />
            </button>
          )
        })}
      </motion.nav>
    </aside>
  )
}
