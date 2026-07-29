import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/sections/about"
import { FeaturedProjectsSection } from "@/components/sections/featured-projects"
import { SkillsMatrixSection } from "@/components/sections/skills-matrix"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedProjectsSection />
      <SkillsMatrixSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Senior Fullstack Engineer. Built with Next.js 15 & Velite.</p>
          <p className="flex items-center gap-2">
            <span>Glassmorphism Dark Mode Theme</span>
          </p>
        </div>
      </footer>
    </main>
  )
}
