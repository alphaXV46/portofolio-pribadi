"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, FolderKanban, Sparkles } from "lucide-react"

export function StickySpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Hook scroll progress relative to this 200vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform title from left (-250px -> 0px)
  const textX = useTransform(scrollYProgress, [0.1, 0.45], ["-250px", "0px"])
  
  // Transform image frame from right (+250px -> 0px)
  const imageX = useTransform(scrollYProgress, [0.1, 0.45], ["250px", "0px"])

  // Opacity fade-in as elements converge to center
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.9], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-[#f9f9f9] border-b border-[#e2e2e2]">
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-16">
        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Title & Metadata Text (Flies in from Left) */}
          <motion.div
            style={{ x: textX, opacity }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 text-[#707070] label-caps">
              <Sparkles className="h-3.5 w-3.5 text-[#a38a5e]" />
              <span>FEATURED FLAGSHIP SPOTLIGHT</span>
            </div>

            <h2 className="display-lg text-[#1a1c1c] leading-tight">
              DefaCraftStore Platform
            </h2>

            <p className="body-lg text-[#707070] max-w-xl">
              An intelligent E-Commerce ecosystem powered by Laravel 13, Livewire, and Google Gemini AI (RAG) for automated product recommendations and real-time Midtrans payment webhook parsing.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Laravel 13", "Livewire", "Gemini AI (RAG)", "Midtrans", "Tailwind CSS", "MySQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="label-caps text-[10px] px-3 py-1 bg-white border border-[#e2e2e2] text-[#1a1c1c]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <div className="pt-4">
              <Link
                href="/projects/defacraftstore"
                className="btn-ethereal-filled inline-flex items-center gap-2"
              >
                <span>READ SPOTLIGHT CASE STUDY</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Showcase Frame (Flies in from Right) */}
          <motion.div
            style={{ x: imageX, opacity }}
            className="lg:col-span-6"
          >
            <div className="ethereal-card p-6 md:p-8 border border-[#1a1c1c] bg-white shadow-2xl shadow-black/10">
              <div className="relative h-72 sm:h-96 w-full bg-[#f3f3f3] border border-[#e2e2e2] flex flex-col items-center justify-center gap-4 overflow-hidden">
                <div className="h-20 w-20 border border-[#1a1c1c] bg-white flex items-center justify-center text-[#1a1c1c] shadow-md">
                  <FolderKanban className="h-10 w-10 text-[#a38a5e]" />
                </div>
                <div className="text-center px-4">
                  <span className="label-caps text-xs text-[#1a1c1c] block mb-1">
                    DEFACRAFTSTORE ARCHITECTURE
                  </span>
                  <span className="caption text-[#707070]">
                    Laravel 13 • Livewire • Gemini AI RAG • Midtrans
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
