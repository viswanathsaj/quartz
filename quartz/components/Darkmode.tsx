// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { Sun, Moon } from "lucide-preact"

const Darkmode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "darkmode")}>
      <Sun class="dayIcon" size={16} strokeWidth={2} aria-label={i18n(cfg.locale).components.themeToggle.darkMode} />
      <Moon class="nightIcon" size={16} strokeWidth={2} aria-label={i18n(cfg.locale).components.themeToggle.lightMode} />
    </button>
  )
}

Darkmode.beforeDOMLoaded = darkmodeScript
Darkmode.css = styles

export default (() => Darkmode) satisfies QuartzComponentConstructor
