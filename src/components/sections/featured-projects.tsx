"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ExternalLink, ArrowUpRight, FolderKanban } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { projects } from "#content"

export function FeaturedProjectsSection() {
  const featured = projects
    .filter((p) => p.is_featured)
    .sort((a, b) => a.display_order - b.display_order)

  return (
    <section id="featured-projects" className="py-32 md:py-40 border-b border-[#e2e2e2] bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="label-caps text-[#707070] block mb-2">// MONOGRAPH SELECTION</span>
            <h2 className="headline-md text-[#1a1c1c]">
              Selected Case Studies
            </h2>
          </div>

          <Link
            href="/projects"
            className="btn-ethereal hover:scale-105 flex items-center gap-2 transition-transform duration-300"
          >
            <span>VIEW ALL WORKS ({projects.length})</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.215, 0.61, 0.355, 1.0] }}
              className="ethereal-card group flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#1a1c1c] hover:shadow-2xl hover:shadow-black/10 bg-white"
            >
              {/* Thumbnail Header Frame */}
              <div>
                <div className="relative h-60 w-full bg-[#f3f3f3] border border-[#e2e2e2] group-hover:border-[#1a1c1c] flex items-center justify-center mb-6 overflow-hidden transition-colors duration-300">
                  <motion.div
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1.0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-16 w-16 border border-[#1a1c1c] bg-white flex items-center justify-center text-[#1a1c1c] group-hover:bg-[#1a1c1c] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm"
                  >
                    <FolderKanban className="h-7 w-7" />
                  </motion.div>

                  <span className="absolute top-4 left-4 label-caps text-[10px] bg-white border border-[#e2e2e2] group-hover:border-[#1a1c1c] group-hover:bg-[#1a1c1c] group-hover:text-white px-3.5 py-1 text-[#1a1c1c] transition-all duration-300">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#1a1c1c] group-hover:text-[#a38a5e] transition-colors duration-300 mb-3 leading-snug">
                  <Link href={project.permalink}>{project.title}</Link>
                </h3>
                
                <p className="body-md text-[#707070] line-clamp-3 mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="label-caps text-[10px] px-2.5 py-1 bg-[#f9f9f9] border border-[#e2e2e2] group-hover:border-[#c4c7c7] text-[#1a1c1c] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="label-caps text-[10px] px-2 py-1 bg-[#f9f9f9] text-[#707070]">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions & Detail Link */}
                <div className="flex items-center justify-between pt-4 border-t border-[#e2e2e2] group-hover:border-[#1a1c1c] transition-colors duration-300">
                  <Link
                    href={project.permalink}
                    className="label-caps text-xs text-[#1a1c1c] group-hover:text-[#a38a5e] transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <span>READ CASE STUDY</span>
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#707070] hover:text-[#1a1c1c] hover:scale-110 transition-all"
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
                        className="text-[#707070] hover:text-[#a38a5e] hover:scale-110 transition-all"
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
      </div>
    </section>
  )
}
