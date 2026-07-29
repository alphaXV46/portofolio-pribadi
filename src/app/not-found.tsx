import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-md w-full glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center">
        <div className="text-7xl font-extrabold text-gradient mb-2 tracking-widest font-mono">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The page or case study route you were looking for doesn't exist or has been relocated.
        </p>

        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/20 text-sm transition-all"
        >
          <Home className="h-4 w-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </main>
  )
}
