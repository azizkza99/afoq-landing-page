import { GlobeIcon } from './Icons'

export default function Footer({ copy }) {
  return (
    <footer className="border-t border-white/8 bg-[#07080c] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-start">
        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 rounded-lg font-bold tracking-[0.08em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <GlobeIcon size={19} className="text-amber-300" />
            {copy.brand}
          </a>
          <p className="mt-3 text-xs text-white/45">{copy.footer.description}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-amber-300/80">{copy.footer.trust}</p>
          <p className="mt-2 text-xs text-white/30" dir="ltr">{copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
