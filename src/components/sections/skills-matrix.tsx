"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Layout, Server, Wrench, Database, CheckCircle2 } from "lucide-react"

type SkillCategory = "Frontend" | "Backend" | "Tools & DevOps" | "Database"

interface SkillItem {
  name: string
  level: "Expert" | "Advanced" | "Proficient"
  category: SkillCategory
}

const skillsData: SkillItem[] = [
  // Frontend
  { name: "Next.js 15 (App Router)", level: "Expert", category: "Frontend" },
  { name: "TypeScript / JavaScript", level: "Expert", category: "Frontend" },
  { name: "React 19 & Hooks Architecture", level: "Expert", category: "Frontend" },
  { name: "Tailwind CSS & Glassmorphism", level: "Expert", category: "Frontend" },
  { name: "Framer Motion / Motion", level: "Advanced", category: "Frontend" },
  { name: "State Management (Zustand/Redux)", level: "Advanced", category: "Frontend" },

  // Backend
  { name: "Node.js & Express / NestJS", level: "Expert", category: "Backend" },
  { name: "Go (Golang)", level: "Advanced", category: "Backend" },
  { name: "RESTful & gRPC APIs", level: "Expert", category: "Backend" },
  { name: "GraphQL & Apollo Server", level: "Advanced", category: "Backend" },
  { name: "Microservices & Message Queues", level: "Advanced", category: "Backend" },
  { name: "WebSockets & Event-Driven Architecture", level: "Expert", category: "Backend" },

  // Tools & DevOps
  { name: "Docker & Containerization", level: "Advanced", category: "Tools & DevOps" },
  { name: "AWS (S3, ECS, Lambda, CloudFront)", level: "Advanced", category: "Tools & DevOps" },
  { name: "Git & GitHub Actions CI/CD", level: "Expert", category: "Tools & DevOps" },
  { name: "Vercel / Cloudflare Edge", level: "Expert", category: "Tools & DevOps" },
  { name: "Linux Server Administration", level: "Advanced", category: "Tools & DevOps" },

  // Database
  { name: "PostgreSQL & Prisma ORM", level: "Expert", category: "Database" },
  { name: "Redis Caching & BullMQ", level: "Expert", category: "Database" },
  { name: "MongoDB & Mongoose", level: "Advanced", category: "Database" },
  { name: "Supabase & Firebase", level: "Advanced", category: "Database" },
]

const categories: { id: SkillCategory; label: string; icon: typeof Layout }[] = [
  { id: "Frontend", label: "Frontend", icon: Layout },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "Database", label: "Databases", icon: Database },
  { id: "Tools & DevOps", label: "Tools & DevOps", icon: Wrench },
]

export function SkillsMatrixSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend")

  const filteredSkills = skillsData.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
            // TECH STACK & COMPETENCIES
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            Skills <span className="text-gradient">Matrix</span>
          </p>
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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                    : "glass-card text-slate-400 hover:text-slate-200 hover:border-white/20"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between group hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
              </div>
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-900/80 text-cyan-400 border border-white/5">
                {skill.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
