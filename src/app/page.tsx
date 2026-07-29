import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/sections/about"
import { FeaturedProjectsSection } from "@/components/sections/featured-projects"
import { SkillsMatrixSection } from "@/components/sections/skills-matrix"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#1a1c1c] selection:text-[#ffffff]">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedProjectsSection />
      <SkillsMatrixSection />
      <ContactSection />

      {/* Monograph Footer */}
      <footer className="py-12 border-t border-[#e2e2e2] bg-[#f9f9f9] text-xs font-sans text-[#707070]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-caps text-[10px]">
            © {new Date().getFullYear()} ETHEREAL GALLERY — ALL RIGHTS RESERVED.
          </p>
          <p className="label-caps text-[10px] text-[#707070]">
            EDITORIAL MINIMALIST MONOGRAPH
          </p>
        </div>
      </footer>
    </main>
  )
}
