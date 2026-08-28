import { media } from '../content'
import { reveal, useInView } from '../hooks/useInView'
import OptimizedVideo from './OptimizedVideo'

export default function Philosophy({ copy }) {
  const [ref, visible] = useInView()

  return (
    <section className="border-y border-white/8 bg-[#0a0b10] px-4 py-24 sm:px-6 lg:py-36">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >
        <div style={reveal(visible, { x: 28 })}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            {copy.philosophy.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
            {copy.philosophy.title}
          </h2>
          <p className="mt-5 text-sm leading-8 text-white/58 sm:text-base">
            {copy.philosophy.description}
          </p>
          <div className="mt-9 space-y-6 border-t border-white/10 pt-7">
            {copy.philosophy.blocks.map((block, index) => (
              <article key={block.title} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="mt-0.5 text-xs font-black text-amber-300">0{index + 1}</span>
                <div>
                  <h3 className="font-bold text-white">{block.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/50">{block.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10"
          style={reveal(visible, { x: -28, delay: 100 })}
        >
          <div className="media-fallback absolute inset-0" aria-hidden="true" />
          <OptimizedVideo
            src={media.vision.video}
            poster={media.vision.poster}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
