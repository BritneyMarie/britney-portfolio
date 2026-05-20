import { initAnimations } from './scripts/animations.js'
import { initForm }       from './scripts/form-handler.js'

// ── Mobile nav toggle ──────────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger')
const navLinks  = document.getElementById('nav-links')

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open')
  navLinks.classList.toggle('open')
  hamburger.setAttribute('aria-expanded', String(isOpen))
})

// Close nav when a link is clicked (mobile)
navLinks?.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open')
    navLinks.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
  })
})

// ── Navbar: shadow on scroll + active link tracking ────────────
const navbar   = document.getElementById('navbar')
const sections = document.querySelectorAll('main section[id]')

window.addEventListener(
  'scroll',
  () => {
    // Shadow
    navbar?.classList.toggle('scrolled', window.scrollY > 20)

    // Active link
    let current = ''
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id') ?? ''
      }
    })

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    })
  },
  { passive: true }
)

// ── Rotating hero badges ───────────────────────────────────────
;(() => {
  const badges = document.querySelectorAll('.hero-badge')
  if (badges.length < 2) return

  let currentPair = 0
  const pairCount = Math.ceil(badges.length / 2)

  function showPair(index) {
    badges.forEach((b) => b.classList.remove('active'))
    const i1 = index * 2
    const i2 = index * 2 + 1
    if (badges[i1]) badges[i1].classList.add('active')
    if (badges[i2]) badges[i2].classList.add('active')
  }

  showPair(0)
  setInterval(() => {
    currentPair = (currentPair + 1) % pairCount
    showPair(currentPair)
  }, 3000)
})()

// ── Init modules ───────────────────────────────────────────────
initAnimations()
initForm()
