import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, ArrowRight, FolderKanban } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Navbar } from "@/components/navbar"
import { MDXContent } from "@/components/mdx-content"
import { projects } from "#content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const projectIndex = projects.findIndex((p) => p.slug === resolvedParams.slug)

  if (projectIndex === -1) {
    notFound()
  }

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#1a1c1c] selection:text-[#ffffff]">
      <Navbar />

      <article className="pt-36 pb-24 md:pt-48 md:pb-32 relative flex-1">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Navigation Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 label-caps text-xs text-[#707070] hover:text-[#1a1c1c] transition-colors mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO ALL WORKS</span>
          </Link>

          {/* Hero Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="label-caps text-xs bg-white border border-[#e2e2e2] px-3 py-1 text-[#1a1c1c]">
                {project.category}
              </span>
            </div>

            <h1 className="display-lg text-[#1a1c1c] mb-6">
              {project.title}
            </h1>

            <p className="body-lg text-[#707070] mb-8">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="label-caps text-[10px] px-3 py-1 bg-white border border-[#e2e2e2] text-[#1a1c1c]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#e2e2e2]">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ethereal-filled flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>LIVE DEMO</span>
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ethereal flex items-center gap-2"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>SOURCE CODE</span>
                </a>
              )}
            </div>
          </div>

          {/* Banner Frame */}
          <div className="relative h-64 sm:h-96 w-full bg-[#f3f3f3] border border-[#e2e2e2] mb-16 flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-[#707070]">
              <FolderKanban className="h-12 w-12 text-[#1a1c1c]" />
              <span className="label-caps text-xs">{project.title} — ARCHITECTURAL CASE STUDY</span>
            </div>
          </div>

          {/* Case Study MDX Content */}
          <div className="ethereal-panel p-8 md:p-16 mb-24">
            <MDXContent code={project.body} />
          </div>

          {/* Ethereal Monograph Project Pager ("NEXT PROJECT" in massive display-lg) */}
          <div className="pt-16 border-t border-[#1a1c1c]">
            <span className="label-caps text-[#707070] block mb-4">CONTINUE READING</span>
            <Link
              href={nextProject.permalink}
              className="group block"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="display-lg text-[#1a1c1c] group-hover:text-[#a38a5e] transition-colors leading-tight">
                  NEXT: {nextProject.title}
                </span>
                <ArrowRight className="h-10 w-10 text-[#1a1c1c] group-hover:translate-x-3 transition-transform flex-shrink-0 hidden md:block" />
              </div>
            </Link>
          </div>
        </div>
      </article>

      <footer className="py-12 border-t border-[#e2e2e2] bg-[#f9f9f9] text-xs font-sans text-[#707070]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-caps text-[10px]">© {new Date().getFullYear()} ETHEREAL GALLERY — ALL RIGHTS RESERVED.</p>
          <Link href="/projects" className="label-caps text-[10px] text-[#707070] hover:text-[#1a1c1c]">
            ALL WORKS
          </Link>
        </div>
      </footer>
    </main>
  )
}
