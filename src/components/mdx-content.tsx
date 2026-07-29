"use client"

import React, { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"

interface MDXContentProps {
  code: string
}

const useMDXComponent = (code: string) => {
  const fn = new Function("opts", code)
  return fn({ Fragment, jsx, jsxs }).default
}

export function MDXContent({ code }: MDXContentProps) {
  try {
    const Component = useMDXComponent(code)
    return (
      <article className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-headings:font-extrabold prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-code:text-cyan-300 prose-code:bg-slate-900/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-strong:text-cyan-400">
        <Component />
      </article>
    )
  } catch (err) {
    return <div className="text-slate-400 text-sm">Failed to load MDX content.</div>
  }
}
