"use client"

import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { ArrowDownRight, Mail, FileText } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function Hero() {
  return (
    <section id="hero" className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-[#e2e2e2]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-5xl"
        >
          {/* Label Category */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 text-[#707070] label-caps">
              <span className="h-1.5 w-1.5 bg-[#a38a5e]" />
              <span>FULLSTACK & SOFTWARE ARCHITECTURE MONOGRAPH</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="display-lg text-[#1a1c1c] mb-8 max-w-4xl"
          >
            Engineering High-Performance Web & Desktop Software Systems
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="body-lg text-[#707070] max-w-2xl mb-12"
          >
            Specializing in Laravel 13, Next.js 16, C# .NET desktop solutions, Gemini AI (RAG) integrations, and high-precision event systems with an unyielding commitment to performance.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-16"
          >
            <Link
              href="/projects"
              className="btn-ethereal-filled flex items-center justify-center gap-2"
            >
              <span>EXPLORE WORKS</span>
              <ArrowDownRight className="h-4 w-4" />
            </Link>

            <a
              href="#contact"
              className="btn-ethereal flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>INITIATE CONTACT</span>
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ethereal flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>DOWNLOAD CV</span>
            </a>
          </motion.div>

          {/* Core Tech Stack Matrix */}
          <motion.div
            variants={itemVariants}
            className="w-full pt-8 border-t border-[#e2e2e2] flex flex-wrap items-center gap-3 text-[#707070]"
          >
            <span className="label-caps text-[#1a1c1c] mr-3">
              PRIMARY STACK:
            </span>
            {["Laravel 13", "Next.js 16", "C# .NET", "TypeScript 5", "Livewire", "Gemini AI (RAG)", "MySQL", "SQLite"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white border border-[#e2e2e2] text-[#1a1c1c] label-caps text-[10px]"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
