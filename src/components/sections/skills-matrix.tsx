"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Layout, Server, Wrench, Database, Check } from "lucide-react"

type SkillCategory = "Frameworks & Web" | "Languages & Core" | "Databases & Storage" | "Tools & Integrations"

interface SkillItem {
  name: string
  level: "EXPERT" | "ADVANCED" | "PROFICIENT"
  category: SkillCategory
}

const skillsData: SkillItem[] = [
  // Frameworks & Web
  { name: "Laravel 13 & Livewire", level: "EXPERT", category: "Frameworks & Web" },
  { name: "Next.js 16 (App Router)", level: "EXPERT", category: "Frameworks & Web" },
  { name: "React 19 & Hooks", level: "EXPERT", category: "Frameworks & Web" },
  { name: "C# .NET & WPF / XAML", level: "ADVANCED", category: "Frameworks & Web" },
  { name: "Tailwind CSS v4", level: "EXPERT", category: "Frameworks & Web" },
  { name: "Vite Bundler & Architecture", level: "ADVANCED", category: "Frameworks & Web" },

  // Languages & Core
  { name: "TypeScript 5 & JavaScript ES6+", level: "EXPERT", category: "Languages & Core" },
  { name: "PHP 8.3 & Object-Oriented Design", level: "EXPERT", category: "Languages & Core" },
  { name: "C# & .NET Runtime", level: "ADVANCED", category: "Languages & Core" },
  { name: "Custom MVC Pattern Architecture", level: "EXPERT", category: "Languages & Core" },
  { name: "HTML5 & Modern Web Standards", level: "EXPERT", category: "Languages & Core" },

  // Databases & Storage
  { name: "MySQL & Relational Design", level: "EXPERT", category: "Databases & Storage" },
  { name: "SQLite & Embedded Databases", level: "ADVANCED", category: "Databases & Storage" },
  { name: "SQL Triggers & Stored Procedures", level: "ADVANCED", category: "Databases & Storage" },
  { name: "Redis Caching & Session Stores", level: "ADVANCED", category: "Databases & Storage" },
  { name: "Browser LocalStorage & IndexedDB", level: "EXPERT", category: "Databases & Storage" },

  // Tools & Integrations
  { name: "Gemini AI Chatbot (RAG)", level: "EXPERT", category: "Tools & Integrations" },
  { name: "Midtrans Payment Gateway", level: "EXPERT", category: "Tools & Integrations" },
  { name: "HttpListener WiFi Scan Server", level: "ADVANCED", category: "Tools & Integrations" },
  { name: "Web Audio API Sound Engine", level: "ADVANCED", category: "Tools & Integrations" },
  { name: "DomPDF & Maatwebsite Excel", level: "EXPERT", category: "Tools & Integrations" },
  { name: "Velite MDX Content Processing", level: "EXPERT", category: "Tools & Integrations" },
]

const categories: { id: SkillCategory; label: string; icon: typeof Layout }[] = [
  { id: "Frameworks & Web", label: "FRAMEWORKS & WEB", icon: Layout },
  { id: "Languages & Core", label: "LANGUAGES & CORE", icon: Server },
  { id: "Databases & Storage", label: "DATABASES & STORAGE", icon: Database },
  { id: "Tools & Integrations", label: "TOOLS & INTEGRATIONS", icon: Wrench },
]

export function SkillsMatrixSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frameworks & Web")

  const filteredSkills = skillsData.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-32 md:py-40 border-b border-[#e2e2e2] bg-[#f9f9f9]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-caps text-[#707070] block mb-2">// CAPABILITIES & TECH STACK</span>
          <h2 className="headline-md text-[#1a1c1c]">
            Technical Competencies
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 label-caps text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-[#1a1c1c] text-white border border-[#1a1c1c]"
                    : "bg-white text-[#707070] border border-[#e2e2e2] hover:text-[#1a1c1c] hover:border-[#1a1c1c]"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#707070]"}`} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto min-h-[380px]">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="ethereal-card p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-[#a38a5e] flex-shrink-0" />
                <span className="body-md font-medium text-[#1a1c1c]">
                  {skill.name}
                </span>
              </div>
              <span className="label-caps text-[10px] px-2.5 py-1 bg-[#f9f9f9] border border-[#e2e2e2] text-[#707070]">
                {skill.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
