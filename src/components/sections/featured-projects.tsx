"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ExternalLink, ArrowUpRight, FolderKanban, ChevronLeft, ChevronRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { projects } from "#content"

export function FeaturedProjectsSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMouseDown = useRef(false)
  const startX = useRef(0)
  const scrollLeftPos = useRef(0)

  const featured = projects
    .filter((p) => p.is_featured)
    .sort((a, b) => a.display_order - b.display_order)

  const CARD_STRIDE = 452

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -CARD_STRIDE, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: CARD_STRIDE, behavior: "smooth" })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    isMouseDown.current = true
    startX.current = e.pageX - carouselRef.current.offsetLeft
    scrollLeftPos.current = carouselRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    isMouseDown.current = false
  }

  const handleMouseUp = () => {
    isMouseDown.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    carouselRef.current.scrollLeft = scrollLeftPos.current - walk
  }

  return (
    <section id="featured-projects" className="py-24 md:py-32 border-b border-[#e2e2e2] bg-[#ffffff] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        
        {/* Header with Title & Arrow Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="label-caps text-[#707070] block mb-2">// MONOGRAPH SELECTION</span>
            <h2 className="headline-md text-[#1a1c1c]">
              Selected Case Studies
            </h2>
          </div>

          {/* Action Group: Controls & View All */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="btn-ethereal px-3 py-2 flex items-center justify-center"
                aria-label="Scroll Previous Works"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </button>
              <button
                onClick={scrollRight}
                className="btn-ethereal px-3 py-2 flex items-center justify-center"
                aria-label="Scroll Next Works"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </button>
            </div>

            <Link
              href="/projects"
              className="btn-ethereal hidden sm:flex items-center gap-2"
            >
              <span>ALL WORKS ({projects.length})</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* 1-Row Monograph Horizontal Carousel */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-6 px-6 md:-mx-16 md:px-16 cursor-grab active:cursor-grabbing select-none"
        >
          {featured.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1.0] }}
              className="ethereal-card group flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-2 border border-[#1a1c1c] bg-white shrink-0 w-[340px] sm:w-[420px] snap-start"
            >
              {/* Thumbnail Header Frame */}
              <div>
                <div className="relative h-56 w-full bg-[#f3f3f3] border border-[#e2e2e2] group-hover:border-[#1a1c1c] flex items-center justify-center mb-6 overflow-hidden transition-colors duration-300">
                  <motion.div
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1.0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-16 w-16 border border-[#1a1c1c] bg-white flex items-center justify-center text-[#1a1c1c] group-hover:bg-[#1a1c1c] group-hover:text-white group-hover:scale-110 transition-all duration-300"
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
