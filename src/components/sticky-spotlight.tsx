"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, Sparkles } from "lucide-react"

export function StickySpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Hook scroll progress relative to this section during sticky pinning
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform title from left (-250px -> 0px -> 0px -> -250px)
  const textX = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.80, 1.0],
    ["-250px", "0px", "0px", "-250px"]
  )

  // Transform image frame from right (+250px -> 0px -> 0px -> 250px)
  const imageX = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.80, 1.0],
    ["250px", "0px", "0px", "250px"]
  )

  // Opacity fade-in as elements entrance, pin, and exit
  const opacity = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.80, 1.0],
    [0, 1, 1, 0]
  )

  const motionTextStyle = isDesktop ? { x: textX, opacity } : {}
  const motionImageStyle = isDesktop ? { x: imageX, opacity } : {}

  return (
    <section
      id="spotlight"
      ref={containerRef}
      className="relative h-auto md:h-[220vh] bg-[#f9f9f9] border-b border-[#e2e2e2]"
    >
      {/* Sticky Fullscreen Container on Desktop / Natural Flow Layout on Mobile */}
      <div className="relative md:sticky top-0 h-auto md:h-screen w-full flex items-center justify-center overflow-visible md:overflow-hidden py-16 md:py-0 px-6 md:px-16">
        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Title & Metadata Text (Flies in from Left) */}
          <motion.div
            style={motionTextStyle}
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
              An intelligent E-Commerce craft store ecosystem powered by Laravel 13, Livewire, and Google Gemini AI (RAG) for automated product recommendations and real-time Midtrans payment webhook parsing.
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

          {/* Right Side: Showcase Frame with DefaCraftStore Logo (Flies in from Right) */}
          <motion.div
            style={motionImageStyle}
            className="lg:col-span-6"
          >
            <div className="ethereal-card p-6 md:p-8 border border-[#1a1c1c] bg-white">
              <div className="relative h-72 sm:h-96 w-full bg-[#f3f3f3] border border-[#e2e2e2] flex flex-col items-center justify-center gap-4 overflow-hidden group">
                {/* DefaCraftStore Uploaded Logo */}
                <div className="relative h-32 w-32 sm:h-44 sm:w-44 shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/projects/defacraftstore.jpg"
                    alt="DefaCraftStore Logo"
                    fill
                    className="object-cover"
                  />
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
