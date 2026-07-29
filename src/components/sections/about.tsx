"use client"

import { motion } from "motion/react"
import { Code, Cpu, Globe, Rocket } from "lucide-react"

const stats = [
  { label: "Years Experience", value: "6+", icon: Code },
  { label: "Projects Shipped", value: "30+", icon: Rocket },
  { label: "Client Satisfaction", value: "100%", icon: Globe },
  { label: "Architecture Audits", value: "45+", icon: Cpu },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3">
            // ABOUT ME
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            Engineered for <span className="text-gradient">Performance</span> and Scale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Code className="h-40 w-40 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                Hi, I'm a Senior Fullstack Architect based in tech innovation hubs.
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                I specialize in designing and engineering high-throughput backend services, interactive real-time web applications, and resilient cloud architectures. With a relentless focus on clean code and performance benchmarks, I build products that scale seamlessly.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Whether orchestrating complex event-driven microservices in Go & Node.js or crafting slick, ultra-responsive web experiences in Next.js and TypeScript, I bridge business requirements with cutting-edge engineering.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="glass-card p-6 rounded-2xl flex flex-col gap-3 group border border-white/10 hover:border-cyan-500/40"
                >
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
