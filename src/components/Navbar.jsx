import { useEffect, useState } from 'react'
import { CloseIcon, GlobeIcon, MenuIcon } from './Icons'

export default function Navbar({ copy, onToggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { href: '#approach', label: copy.nav.approach },
    { href: '#work', label: copy.nav.work },
    { href: '#services', label: copy.nav.services },
  ]

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const toggleLanguage = () => {
    setMenuOpen(false)
    onToggleLanguage()
  }

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 py-5 sm:px-6">
      <nav
        className="glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-4 sm:px-6"
        aria-label={copy.nav.approach}
      >
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-300">
            <GlobeIcon size={18} />
          </span>
          <span className="font-bold tracking-[0.08em] text-white">{copy.brand}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md text-xs font-semibold text-white/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={copy.nav.languageLabel}
            className="rounded-full px-3 py-2 text-xs font-bold text-amber-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            dir="ltr"
          >
            {copy.nav.language}
          </button>
          <a
            href="#brief"
            className="hidden rounded-full bg-amber-300 px-5 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100 sm:block"
          >
            {copy.nav.brief}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? copy.nav.menuClose : copy.nav.menuOpen}
            className="rounded-full p-2 text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="glass mx-auto mt-3 flex max-w-6xl flex-col rounded-3xl p-3 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#brief"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-2xl bg-amber-300 px-4 py-3 text-center text-sm font-bold text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100"
          >
            {copy.nav.brief}
          </a>
        </div>
      ) : null}
    </header>
  )
}
