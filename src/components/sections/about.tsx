"use client"

import { motion } from "motion/react"
import { Code, Cpu, Globe, Rocket } from "lucide-react"

const stats = [
  { label: "FEATURED PROJECTS", value: "06", icon: Code },
  { label: "CORE TECH STACKS", value: "04", icon: Rocket },
  { label: "AI RAG INTEGRATION", value: "100%", icon: Globe },
  { label: "CROSS-PLATFORM DEPLOYED", value: "YES", icon: Cpu },
]

export function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 border-b border-[#e2e2e2] bg-[#f9f9f9]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="label-caps text-[#707070] block mb-2">// PHILOSOPHY & ARCHITECTURE</span>
          <h2 className="headline-md text-[#1a1c1c]">
            Fullstack Precision Across Web, Desktop, & AI
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="ethereal-panel p-8 md:p-12">
              <h3 className="font-serif text-2xl text-[#1a1c1c] mb-6 leading-snug">
                "Building software isn't just about writing code — it's about engineering resilient systems that solve real business bottlenecks."
              </h3>
              <p className="body-md text-[#1a1c1c] mb-4">
                I specialize in engineering fullstack web applications, C# .NET desktop tools, and AI-assisted workflows. My portfolio includes enterprise distribution systems built with Laravel 13 & Livewire, desktop barcode scanning platforms using embedded HTTP listeners & SQL triggers, and interactive Web Audio API engines.
              </p>
              <p className="body-md text-[#707070]">
                By combining cutting-edge frameworks like Next.js 16 and React 19 with robust backend architectures and AI (Gemini RAG), I deliver solutions tailored for performance and operational reliability.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="ethereal-card p-6 flex flex-col justify-between gap-6"
                >
                  <div className="text-[#1a1c1c]">
                    <Icon className="h-5 w-5 text-[#a38a5e]" />
                  </div>
                  <div>
                    <div className="font-serif text-4xl text-[#1a1c1c] mb-1">
                      {stat.value}
                    </div>
                    <div className="label-caps text-[10px] text-[#707070]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
