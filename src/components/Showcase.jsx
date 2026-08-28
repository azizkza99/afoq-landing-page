import { media } from '../content'
import { reveal, useInView } from '../hooks/useInView'
import OptimizedVideo from './OptimizedVideo'
import SectionHeading from './SectionHeading'

export default function Showcase({ copy }) {
  const [ref, visible] = useInView('-40px')

  return (
    <section id="work" className="scroll-mt-20 bg-[#07080c] px-4 py-24 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={copy.showcase.eyebrow}
          title={copy.showcase.title}
          description={copy.showcase.description}
        />
        <div
          ref={ref}
          className="relative mt-14 aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60 sm:aspect-video"
          style={reveal(visible, { y: 35, duration: 850 })}
        >
          <div className="media-fallback absolute inset-0" aria-hidden="true" />
          <OptimizedVideo
            src={media.featured.video}
            poster={media.featured.poster}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" aria-hidden="true" />
          <span className="glass absolute bottom-5 start-5 rounded-full px-4 py-2 text-[10px] font-black tracking-[0.2em] text-amber-200 sm:bottom-8 sm:start-8">
            {copy.showcase.badge}
          </span>
        </div>
      </div>
    </section>
  )
}
