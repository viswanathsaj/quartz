import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { Languages } from "lucide-preact"

const LanguagePlaceholder: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "language-placeholder")} aria-label="Language" disabled>
      <Languages size={16} strokeWidth={2} />
    </button>
  )
}

LanguagePlaceholder.css = `
.language-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: default;
  color: var(--darkgray);
  opacity: 0.6;
}
`

export default (() => LanguagePlaceholder) satisfies QuartzComponentConstructor
