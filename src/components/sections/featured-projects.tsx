"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ExternalLink, ArrowRight, FolderKanban } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { projects } from "#content"

export function FeaturedProjectsSection() {
  const featured = projects
    .filter((p) => p.is_featured)
    .sort((a, b) => a.display_order - b.display_order)

  return (
    <section id="featured-projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
              // CASE STUDIES
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
              Featured <span className="text-gradient">Projects</span>
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>View All Projects ({projects.length})</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10" />
                <div className="h-14 w-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                  <FolderKanban className="h-7 w-7" />
                </div>
                <span className="absolute top-4 left-4 z-20 px-3 py-1 text-xs font-semibold rounded-full glass-pill border border-white/10 text-cyan-300">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                    <Link href={project.permalink}>{project.title}</Link>
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-slate-900/80 text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-slate-900/40 text-slate-500">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions & Detail Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <Link
                      href={project.permalink}
                      className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3 w-3" />
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
      </div>
    </section>
  )
}
