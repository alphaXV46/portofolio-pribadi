"use client"

import { motion } from "motion/react"

const tickerItems = [
  "LARAVEL 13",
  "NEXT.JS 16",
  "C# .NET",
  "GEMINI AI (RAG)",
  "MYSQL",
  "TAILWIND CSS V4",
  "LIVEWIRE",
  "WEB AUDIO API",
  "SQL TRIGGERS",
  "VITE",
  "MIDTRANS",
  "REACT 19",
  "TYPESCRIPT 5",
]

// Repeat 4 times to ensure seamless infinite looping on all screen sizes
const fullTickerList = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]

export function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-[#e2e2e2] bg-white py-5 selection:bg-[#1a1c1c] selection:text-white">
      <motion.div
        className="flex whitespace-nowrap gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 35,
        }}
      >
        {fullTickerList.map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="label-caps text-xs tracking-[0.25em] font-mono text-[#1a1c1c] font-bold">
              {item}
            </span>
            <span className="h-2 w-2 bg-[#a38a5e] flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
