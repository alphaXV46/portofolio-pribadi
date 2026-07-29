import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s
        .object({
          slug: s.path(),
          title: s.string().max(100),
          description: s.string().max(300),
          category: s.enum(['Fullstack', 'Backend', 'Mobile', 'Game']),
          thumbnail_url: s.string().default('/images/projects/placeholder.jpg'),
          demo_url: s.string().optional(),
          github_url: s.string().optional(),
          is_featured: s.boolean().default(false),
          display_order: s.number().default(0),
          tags: s.array(s.string()).default([]),
          body: s.mdx()
        })
        .transform(data => {
          const cleanSlug = data.slug.replace(/^projects[\/\\]/, '')
          return {
            ...data,
            slug: cleanSlug,
            permalink: `/projects/${cleanSlug}`
          }
        })
    }
  }
})
