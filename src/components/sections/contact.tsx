"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle")
    setErrorMessage("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const resData = await response.json()

      if (response.ok && resData.success) {
        setStatus("success")
        reset()
      } else {
        setStatus("error")
        setErrorMessage(resData.message || "Failed to send message.")
      }
    } catch (err) {
      setStatus("error")
      setErrorMessage("Network error occurred. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
            // INITIATE CONTACT
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Social Links & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Have a project in mind?</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Whether you need technical leadership, architectural consultation, or a high-impact fullstack solution, my inbox is always open.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-400 transition-colors p-3 rounded-xl glass-card"
                >
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span>contact@example.com</span>
                </a>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                  FULL NAME
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 mb-2">
                  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project or inquiry..."
                  {...register("message")}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submission Feedback Banners */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>Thank you! Your message has been received. I'll get back to you shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/20 disabled:opacity-50 transition-all duration-300 mt-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
