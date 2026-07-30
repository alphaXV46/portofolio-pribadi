"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { ArrowUpRight, CheckCircle2, AlertCircle, Mail, FileText } from "lucide-react"
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
    <section id="contact" className="py-32 md:py-40 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="label-caps text-[#707070] block mb-2">// INITIATE INQUIRY</span>
          <h2 className="headline-md text-[#1a1c1c]">
            Start a Conversation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-5xl items-start">
          {/* Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div>
              <h3 className="font-serif text-2xl text-[#1a1c1c] mb-4">
                Have an ambitious project or architectural inquiry?
              </h3>
              <p className="body-md text-[#707070] mb-8">
                Whether you are seeking software leadership, technical consultation, or a high-impact digital product, I am available for select engagements.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <span className="label-caps text-[10px] text-[#707070]">DIRECT INBOX:</span>
                <a
                  href="mailto:contact@example.com"
                  className="body-md font-medium text-[#1a1c1c] hover:text-[#a38a5e] transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-[#a38a5e]" />
                  <span>contact@example.com</span>
                </a>
              </div>

              {/* Download CV Resource Button */}
              <div className="mb-8">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ethereal w-full flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>DOWNLOAD CURRICULUM VITAE (PDF)</span>
                </a>
              </div>

              <div className="pt-8 border-t border-[#e2e2e2] flex items-center gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#707070] hover:text-[#1a1c1c] transition-colors flex items-center gap-1 label-caps text-xs"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GITHUB</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#707070] hover:text-[#1a1c1c] transition-colors flex items-center gap-1 label-caps text-xs"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#707070] hover:text-[#1a1c1c] transition-colors flex items-center gap-1 label-caps text-xs"
                >
                  <TwitterIcon className="h-4 w-4" />
                  <span>TWITTER</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="ethereal-panel p-8 md:p-12 flex flex-col gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block label-caps text-xs text-[#1a1c1c] mb-2">
                  FULL NAME *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  {...register("name")}
                  className="w-full ethereal-input"
                />
                {errors.name && (
                  <p className="caption text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block label-caps text-xs text-[#1a1c1c] mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="eleanor@studio.com"
                  {...register("email")}
                  className="w-full ethereal-input"
                />
                {errors.email && (
                  <p className="caption text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block label-caps text-xs text-[#1a1c1c] mb-2">
                  PROJECT INQUIRY *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your technical requirements or proposal..."
                  {...register("message")}
                  className="w-full ethereal-input resize-none"
                />
                {errors.message && (
                  <p className="caption text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Banners */}
              {status === "success" && (
                <div className="p-4 bg-[#f9f9f9] border border-[#a38a5e] text-[#1a1c1c] body-md text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#a38a5e]" />
                  <span>Inquiry received. I will respond within 24 hours.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-[#ffffff] border border-[#ba1a1a] text-[#ba1a1a] body-md text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[#ba1a1a]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-ethereal-filled w-full flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <span>SENDING INQUIRY...</span>
                ) : (
                  <>
                    <span>SUBMIT INQUIRY</span>
                    <ArrowUpRight className="h-4 w-4" />
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
