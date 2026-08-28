export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'start' ? 'text-start' : 'mx-auto text-center'

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-sm leading-8 text-white/58 sm:text-base">{description}</p>
      ) : null}
    </div>
  )
}
