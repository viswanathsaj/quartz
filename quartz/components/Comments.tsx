import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import giscusScript from "./scripts/comments.inline"
// @ts-ignore
import issoScript from "./scripts/isso.inline"
import style from "./styles/comments.scss"

type Options =
  | {
      provider: "giscus"
      options: {
        repo: `${string}/${string}`
        repoId: string
        category: string
        categoryId: string
        themeUrl?: string
        lightTheme?: string
        darkTheme?: string
        mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
        strict?: boolean
        reactionsEnabled?: boolean
        inputPosition?: "top" | "bottom"
        lang?: string
      }
    }
  | {
      provider: "isso"
      options: {
        serverUrl: string
      }
    }

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // check if comments should be displayed according to frontmatter
    const disableComment: boolean =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    if (disableComment) {
      return <></>
    }

    if (opts.provider === "isso") {
      const serverUrl = opts.options.serverUrl.replace(/\/$/, "")
      return (
        <div class={classNames(displayClass, "isso-comments")} data-isso-server={serverUrl}>
          <section id="isso-thread">
            <noscript>Javascript needs to be activated to view comments.</noscript>
          </section>
        </div>
      )
    }

    return (
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "url"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        data-light-theme={opts.options.lightTheme ?? "light"}
        data-dark-theme={opts.options.darkTheme ?? "dark"}
        data-theme-url={
          opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`
        }
        data-lang={opts.options.lang ?? "en"}
      ></div>
    )
  }

  Comments.afterDOMLoaded = opts.provider === "isso" ? issoScript : giscusScript
  Comments.css = style

  return Comments
}) satisfies QuartzComponentConstructor<Options>
