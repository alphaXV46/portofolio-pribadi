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
      <article className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#1a1c1c] prose-p:text-[#1a1c1c] prose-p:leading-relaxed prose-li:text-[#1a1c1c] prose-code:text-[#1a1c1c] prose-code:bg-[#f3f3f3] prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:border-[#e2e2e2] prose-strong:text-[#1a1c1c] prose-strong:font-bold">
        <Component />
      </article>
    )
  } catch (err) {
    return <div className="caption text-[#707070]">Failed to load MDX content.</div>
  }
}
