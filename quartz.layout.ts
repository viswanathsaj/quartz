import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Flex({
      components: [
        { Component: Component.PageTitle(), grow: true },
        { Component: Component.Search() },
        { Component: Component.LanguagePlaceholder() },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  afterBody: [],
  footer: Component.SiteFooter(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [],
  right: [],
  afterBody: [
    Component.Flex({
      components: [
        { Component: Component.Graph(), basis: "50%" },
        { Component: Component.Backlinks(), basis: "50%" },
      ],
      gap: "1.5rem",
    }),
    Component.ConditionalRender({
      component: Component.Comments({
        provider: "isso",
        options: {
          serverUrl: "/isso/",
        },
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
