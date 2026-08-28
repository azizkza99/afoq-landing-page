import { reveal, useInView } from '../hooks/useInView'
import SectionHeading from './SectionHeading'

export default function Approach({ copy }) {
  const [headingRef, headingVisible] = useInView()

  return (
    <section id="approach" className="scroll-mt-20 bg-[#07080c] px-4 py-24 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div ref={headingRef} style={reveal(headingVisible, { y: 28 })}>
          <SectionHeading
            eyebrow={copy.approach.eyebrow}
            title={copy.approach.title}
            description={copy.approach.description}
          />
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {copy.approach.steps.map((step, index) => (
            <article
              key={step.number}
              className="glass rounded-3xl p-7 sm:p-8"
              style={reveal(headingVisible, { y: 28, delay: 100 + index * 90 })}
            >
              <span className="text-xs font-black tracking-[0.18em] text-amber-300">
                {step.number}
              </span>
              <h3 className="mt-8 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/55">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
