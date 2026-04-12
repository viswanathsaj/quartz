import { QuartzEmitterPlugin } from "../types"
import { getDate } from "../../components/Date"
import { FullSlug, simplifySlug } from "../../util/path"
import { write } from "./helpers"

export type FeaturedPost = {
  slug: string
  title: string
  description: string
  date: string | null
  tags: string[]
  cover: string | null
}

export const FeaturedPosts: QuartzEmitterPlugin = () => {
  return {
    name: "FeaturedPosts",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const featured: FeaturedPost[] = []

      for (const [_tree, file] of content) {
        const fm = file.data.frontmatter
        if (!fm || fm.featured !== true) continue

        const slug = simplifySlug(file.data.slug!)
        const date = getDate(cfg, file.data)

        const cover = fm.socialImage
          ? String(fm.socialImage)
          : fm.cover
            ? String(fm.cover)
            : null

        featured.push({
          slug,
          title: fm.title,
          description: fm.description ? String(fm.description) : (file.data.description ?? ""),
          date: date ? date.toISOString() : null,
          tags: (fm.tags ?? []).filter((t) => t !== "featured"),
          cover,
        })
      }

      // Sort newest first
      featured.sort((a, b) => {
        if (a.date && b.date) return b.date.localeCompare(a.date)
        if (a.date) return -1
        if (b.date) return 1
        return 0
      })

      yield write({
        ctx,
        content: JSON.stringify(featured, null, 2),
        slug: "static/featured" as FullSlug,
        ext: ".json",
      })
    },
  }
}
