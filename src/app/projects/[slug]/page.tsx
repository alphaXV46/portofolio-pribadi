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
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <article className="pt-32 pb-20 relative flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Projects</span>
          </Link>

          {/* Hero Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full glass-pill border border-cyan-500/30 text-cyan-300">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-6">
              {project.title}
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900/90 text-slate-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 text-sm transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-slate-200 glass-card hover:text-white hover:border-cyan-500/40 text-sm transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Screenshot Showcase Placeholder Banner */}
          <div className="relative h-64 sm:h-96 w-full rounded-2xl glass-panel border border-white/10 mb-12 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 opacity-90" />
            <div className="relative z-10 flex flex-col items-center gap-3 text-slate-400">
              <FolderKanban className="h-12 w-12 text-cyan-400" />
              <span className="text-sm font-mono">{project.title} — System Architecture & Showcase</span>
            </div>
          </div>

          {/* Case Study MDX Content */}
          <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 mb-16">
            <MDXContent code={project.body} />
          </div>

          {/* Navigation Controls (Prev / Next) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
            {prevProject ? (
              <Link
                href={prevProject.permalink}
                className="glass-card p-4 rounded-xl flex flex-col gap-1 hover:border-cyan-500/40 transition-all"
              >
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Previous Case Study
                </span>
                <span className="text-sm font-bold text-slate-200 truncate">{prevProject.title}</span>
              </Link>
            ) : <div />}

            {nextProject && (
              <Link
                href={nextProject.permalink}
                className="glass-card p-4 rounded-xl flex flex-col gap-1 items-end hover:border-cyan-500/40 transition-all text-right"
              >
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  Next Case Study <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-sm font-bold text-slate-200 truncate">{nextProject.title}</span>
              </Link>
            )}
          </div>
        </div>
      </article>

      <footer className="py-8 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Senior Fullstack Engineer. Built with Next.js 15 & Velite.</p>
          <Link href="/projects" className="hover:text-cyan-400 transition-colors">
            All Projects
          </Link>
        </div>
      </footer>
    </main>
  )
}
