import { media } from '../content'
import { reveal, useInView } from '../hooks/useInView'
import { ArrowUpIcon } from './Icons'
import OptimizedVideo from './OptimizedVideo'
import SectionHeading from './SectionHeading'

function ServiceCard({ item, index, lang, visible }) {
  const itemMedia = media[item.mediaKey]

  return (
    <article
      className="glass group overflow-hidden rounded-[2rem]"
      style={reveal(visible, { y: 30, delay: index * 100 })}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="media-fallback absolute inset-0" aria-hidden="true" />
        <OptimizedVideo
          src={itemMedia.video}
          poster={itemMedia.poster}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
      </div>
      <div className="p-7 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
            {item.tag}
          </p>
          <span className="rounded-full border border-white/10 p-2 text-white/70" aria-hidden="true">
            <ArrowUpIcon size={16} direction={lang === 'ar' ? 'left' : 'right'} />
          </span>
        </div>
        <h3 className="mt-7 text-2xl font-bold text-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/55">{item.description}</p>
      </div>
    </article>
  )
}

export default function Services({ copy, lang }) {
  const [ref, visible] = useInView()

  return (
    <section id="services" className="scroll-mt-20 bg-[#07080c] px-4 py-24 sm:px-6 lg:py-36">
      <div ref={ref} className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          description={copy.services.description}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {copy.services.items.map((item, index) => (
            <ServiceCard
              key={item.title}
              item={item}
              index={index}
              lang={lang}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
