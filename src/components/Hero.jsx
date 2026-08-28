import { media } from '../content'
import { ArrowDownIcon, SparklesIcon } from './Icons'
import OptimizedVideo from './OptimizedVideo'

export default function Hero({ copy, lang }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#07080c] px-4 pb-24 pt-36 sm:px-6"
    >
      <div className="media-fallback absolute inset-0" aria-hidden="true" />
      <OptimizedVideo
        src={media.hero.video}
        poster={media.hero.poster}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,.42),rgba(7,8,12,.72)_58%,#07080c)]" aria-hidden="true" />
      <div className="orb -left-24 top-24 h-72 w-72 bg-indigo-500/20" aria-hidden="true" />
      <div className="orb -right-20 bottom-20 h-80 w-80 bg-amber-300/15" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl text-center">
        <div className="mx-auto max-w-4xl">
          <p className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-amber-200 sm:text-xs">
            <SparklesIcon size={14} />
            {copy.hero.eyebrow}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-8xl">
            {copy.hero.lead}{' '}
            <span className="text-gradient block sm:inline">{copy.hero.accent}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-sm leading-8 text-white/68 sm:text-base lg:text-lg">
            {copy.hero.description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#work"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-4 text-sm font-bold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100 sm:w-auto"
            >
              {copy.hero.primary}
              <ArrowDownIcon size={17} direction={lang === 'ar' ? 'left' : 'right'} />
            </a>
            <a
              href="#brief"
              className="glass w-full rounded-full px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:w-auto"
            >
              {copy.hero.secondary}
            </a>
          </div>
          <p className="mt-7 text-xs text-white/45">{copy.hero.trust}</p>
        </div>
      </div>
    </section>
  )
}
