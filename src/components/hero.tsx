"use client"

import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { ArrowRight, Mail, Sparkles, Terminal } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Live Status Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-slate-300 border border-white/10 shadow-lg shadow-cyan-500/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Senior Roles & Freelance Work</span>
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1] mb-6"
          >
            Senior Fullstack Engineer Building{" "}
            <span className="text-gradient">High-Performance</span> Web Systems
          </motion.h1>

          {/* Subtitle / Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-400 max-w-2.5xl leading-relaxed mb-10"
          >
            Specializing in modern web applications, microservices architecture, and cloud-native software. I transform complex business problems into scalable, elegant code.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
          >
            <Link
              href="/projects"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-200 glass-card hover:text-white hover:border-cyan-500/40 transition-all duration-300"
            >
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            variants={itemVariants}
            className="w-full pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400"
          >
            <span className="flex items-center gap-1.5 text-slate-500 mr-2">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" /> Core Stack:
            </span>
            {["Next.js", "TypeScript", "React", "Node.js", "Go", "PostgreSQL", "Docker", "AWS"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md glass-pill border border-white/5 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
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
