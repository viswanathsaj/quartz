import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const SiteFooter: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const year = new Date().getFullYear()
  const base = pathToRoot(fileData.slug!)
  return (
    <footer class="site-footer">
      <div class="site-footer-left">
        <p class="site-footer-tagline">I hope you have a great day ahead, wherever you are.</p>
        <p class="site-footer-copy">© {year} Viswanath Saj — Iterating Daily.</p>
      </div>
      <img
        src={`${base}/static/signature.svg`}
        alt="Signature"
        class="site-footer-sig"
        draggable={false}
      />
    </footer>
  )
}

SiteFooter.css = `
.site-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 2rem 0 2.5rem 0;
  gap: 1.5rem;
  margin-top: 1rem;
  border-top: 1px dashed var(--lightgray);
}

.site-footer-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.site-footer-tagline {
  font-size: 0.875rem;
  color: var(--dark);
  margin: 0;
}

.site-footer-copy {
  font-size: 0.75rem;
  font-family: var(--headerFont);
  color: var(--gray);
  margin: 0;
}

.site-footer-sig {
  height: 3.5rem;
  width: auto;
  flex-shrink: 0;
  opacity: 0.8;
}

:root[saved-theme="dark"] .site-footer-sig {
  filter: invert(1);
  opacity: 0.6;
}
`

export default (() => SiteFooter) satisfies QuartzComponentConstructor
