"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ExternalLink, FolderKanban, ArrowLeft, ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { projects } from "#content"

type CategoryFilter = "ALL" | "Fullstack" | "Backend" | "Mobile" | "Game"

const categories: CategoryFilter[] = ["ALL", "Fullstack", "Backend", "Mobile", "Game"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL")

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "ALL") return true
    return p.category === selectedCategory
  })

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#1a1c1c] selection:text-[#ffffff]">
      <Navbar />

      <section className="pt-36 pb-24 md:pt-48 md:pb-32 relative flex-1">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 label-caps text-xs text-[#707070] hover:text-[#1a1c1c] transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>RETURN TO INDEX</span>
            </Link>

            <h1 className="display-lg text-[#1a1c1c] mb-6">
              Selected Works & Case Studies
            </h1>

            <p className="body-lg text-[#707070] max-w-2xl">
              An architectural monograph detailing system decisions, engineering trade-offs, and technical benchmarks across software domains.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-16 border-b border-[#e2e2e2] pb-6">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 label-caps text-xs transition-all duration-300 ${
                    isActive
                      ? "bg-[#1a1c1c] text-white border border-[#1a1c1c]"
                      : "bg-white text-[#707070] border border-[#e2e2e2] hover:text-[#1a1c1c] hover:border-[#1a1c1c]"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="ethereal-panel p-16 text-center text-[#707070] label-caps my-12">
              No works available in category "{selectedCategory}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="ethereal-card group flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="relative h-56 w-full bg-[#f3f3f3] border border-[#e2e2e2] flex items-center justify-center mb-6 overflow-hidden">
                      <div className="h-14 w-14 border border-[#1a1c1c] bg-white flex items-center justify-center text-[#1a1c1c] group-hover:bg-[#1a1c1c] group-hover:text-white transition-colors duration-300">
                        <FolderKanban className="h-6 w-6" />
                      </div>
                      <span className="absolute top-4 left-4 label-caps text-[10px] bg-white border border-[#e2e2e2] px-3 py-1 text-[#1a1c1c]">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl text-[#1a1c1c] group-hover:text-[#a38a5e] transition-colors mb-3 leading-snug">
                      <Link href={project.permalink}>{project.title}</Link>
                    </h2>
                    
                    <p className="body-md text-[#707070] line-clamp-3 mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="label-caps text-[10px] px-2.5 py-1 bg-[#f9f9f9] border border-[#e2e2e2] text-[#1a1c1c]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#e2e2e2]">
                      <Link
                        href={project.permalink}
                        className="label-caps text-xs text-[#1a1c1c] hover:text-[#a38a5e] transition-colors flex items-center gap-1"
                      >
                        <span>READ CASE STUDY</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>

                      <div className="flex items-center gap-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#707070] hover:text-[#1a1c1c] transition-colors"
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
                            className="text-[#707070] hover:text-[#a38a5e] transition-colors"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 border-t border-[#e2e2e2] bg-[#f9f9f9] text-xs font-sans text-[#707070]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-caps text-[10px]">© {new Date().getFullYear()} ETHEREAL GALLERY — ALL RIGHTS RESERVED.</p>
          <Link href="/" className="label-caps text-[10px] text-[#707070] hover:text-[#1a1c1c]">
            RETURN TO INDEX
          </Link>
        </div>
      </footer>
    </main>
  )
}
