function setupIssoComments() {
  const container = document.querySelector(".isso-comments[data-isso-server]") as HTMLElement | null
  if (!container) return

  const serverUrl = container.dataset.issoServer!

  // Clear existing thread content
  const issoThread = document.getElementById("isso-thread")
  if (!issoThread) return
  issoThread.innerHTML = "<noscript>Javascript needs to be activated to view comments.</noscript>"

  // Remove any previously injected isso script so it re-runs
  const existing = document.querySelector("script[data-isso]")
  if (existing) existing.remove()

  // Inject fresh script — isso auto-initializes on load, reading data-isso for the server URL
  const script = document.createElement("script")
  script.src = `${serverUrl}/js/embed.min.js`
  script.setAttribute("data-isso", serverUrl)
  script.setAttribute("data-isso-reply-to-self", "true")
  script.async = true
  document.head.appendChild(script)

  // Patch labels and placeholders after isso renders
  const patchLabels = () => {
    const authorLabel = issoThread.querySelector<HTMLElement>(".isso-postbox-author + label")
    if (authorLabel) authorLabel.textContent = "Name*"

    const emailLabel = issoThread.querySelector<HTMLElement>(".isso-postbox-email + label")
    if (emailLabel) emailLabel.textContent = "Email"

    const websiteLabel = issoThread.querySelector<HTMLElement>(".isso-postbox-website + label")
    if (websiteLabel) websiteLabel.textContent = "Website"

    const textarea = issoThread.querySelector<HTMLTextAreaElement>(".isso-textarea")
    if (textarea) textarea.placeholder = "Centuries from now, historians will study this. Minimum 3 characters."

    const authorInput = issoThread.querySelector<HTMLInputElement>(".isso-postbox-author")
    if (authorInput) authorInput.placeholder = "Mark Mywords"

    const emailInput = issoThread.querySelector<HTMLInputElement>(".isso-postbox-email")
    if (emailInput) emailInput.placeholder = "definitely@real.email"

    const websiteInput = issoThread.querySelector<HTMLInputElement>(".isso-postbox-website")
    if (websiteInput) websiteInput.placeholder = "https://myspace.com/stillactive"
  }

  // Prevent Quartz's router from intercepting isso action link clicks.
  // We stopPropagation (so Quartz doesn't treat them as page navigations) but
  // do NOT preventDefault — isso's own handlers must still run.
  // For bare href="#" anchors we also preventDefault to stop scroll-to-top.
  const observer = new MutationObserver(() => {
    patchLabels()

    const issoLinks = issoThread.querySelectorAll<HTMLAnchorElement>(
      ".isso-reply, .isso-edit, .isso-delete, .isso-upvote, .isso-downvote, .isso-permalink",
    )
    issoLinks.forEach((link) => {
      if (link.dataset.routerFixed) return
      link.dataset.routerFixed = "1"
      // Tell Quartz's router to ignore these links entirely
      link.dataset.routerIgnore = ""
      // Still prevent scroll-to-top for bare href="#" links
      if (link.getAttribute("href") === "#") {
        link.addEventListener("click", (e) => e.preventDefault())
      }
    })
  })

  observer.observe(issoThread, { childList: true, subtree: true })
  window.addCleanup(() => observer.disconnect())

  window.addCleanup(() => {
    const s = document.querySelector("script[data-isso]")
    if (s) s.remove()
  })
}

document.addEventListener("nav", setupIssoComments)
