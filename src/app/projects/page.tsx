"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ExternalLink, FolderKanban, ArrowLeft } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { projects } from "#content"

type CategoryFilter = "All" | "Fullstack" | "Backend" | "Mobile" | "Game"

const categories: CategoryFilter[] = ["All", "Fullstack", "Backend", "Mobile", "Game"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All")

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true
    return p.category === selectedCategory
  })

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <section className="pt-32 pb-20 relative flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
              All <span className="text-gradient">Case Studies</span> & Projects
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Explore technical case studies detailing architecture decisions, performance benchmarks, and real-world system implementations.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                      : "glass-card text-slate-400 hover:text-slate-200 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 my-12">
              No projects found in category "{selectedCategory}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col group"
                >
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center border-b border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10" />
                    <div className="h-14 w-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                      <FolderKanban className="h-7 w-7" />
                    </div>
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 text-xs font-semibold rounded-full glass-pill border border-white/10 text-cyan-300">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                        <Link href={project.permalink}>{project.title}</Link>
                      </h2>
                      <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-slate-900/80 text-slate-300 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <Link
                          href={project.permalink}
                          className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
                        >
                          <span>Read Case Study</span>
                        </Link>

                        <div className="flex items-center gap-3">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-white transition-colors"
                              aria-label="GitHub Repository"
                            >
                              <GithubIcon className="h-4 w-4" />
                            </a>
                          )}
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-cyan-400 transition-colors"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-8 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Senior Fullstack Engineer. Built with Next.js 15 & Velite.</p>
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Return to Homepage
          </Link>
        </div>
      </footer>
    </main>
  )
}
