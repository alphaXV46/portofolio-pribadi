"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ArrowUpRight } from "lucide-react"

const navLinks = [
  { name: "INDEX", href: "/" },
  { name: "WORKS", href: "/projects" },
  { name: "EXPERTISE", href: "/#skills" },
  { name: "CONTACT", href: "/#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#e2e2e2] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group text-[#1a1c1c]"
        >
          <span className="font-serif text-xl tracking-wider font-normal">
            ETHEREAL <span className="font-sans text-xs tracking-[0.2em] font-semibold text-[#707070]">// GALLERY</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`label-caps text-xs py-1 transition-colors relative ${
                  isActive
                    ? "text-[#1a1c1c] border-b-2 border-[#1a1c1c]"
                    : "text-[#707070] hover:text-[#1a1c1c]"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/cv.pdf"
            download
            className="btn-ethereal flex items-center gap-2"
          >
            <span>DOWNLOAD CV</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1a1c1c] border border-[#e2e2e2] bg-white rounded-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#ffffff] border-b border-[#e2e2e2] p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="label-caps text-sm text-[#1a1c1c] py-2 border-b border-[#f3f3f3]"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href="/cv.pdf"
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-ethereal-filled w-full flex items-center justify-center gap-2"
                >
                  <span>DOWNLOAD CV</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
