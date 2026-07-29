import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col items-center justify-center p-6 selection:bg-[#1a1c1c] selection:text-[#ffffff]">
      <div className="max-w-md w-full ethereal-panel p-12 md:p-16 text-center flex flex-col items-center border border-[#e2e2e2]">
        <div className="font-serif text-8xl text-[#1a1c1c] mb-4">
          404
        </div>
        <h1 className="label-caps text-sm text-[#1a1c1c] mb-3">
          PAGE NOT FOUND
        </h1>
        <p className="body-md text-[#707070] mb-8">
          The requested monograph page or case study route does not exist or has been relocated.
        </p>

        <Link
          href="/"
          className="btn-ethereal-filled flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO INDEX</span>
        </Link>
      </div>
    </main>
  )
}
