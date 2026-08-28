export default function StatsBar({ items, lang }) {
  return (
    <section
      className="border-y border-white/8 bg-[#07080c] px-4 py-10 sm:px-6"
      aria-label={lang === 'ar' ? 'حدود التصوّر' : 'Concept boundaries'}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-7 text-center md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-gradient text-2xl font-black sm:text-3xl" dir="ltr">
              {item.value}
            </p>
            <p className="mt-1.5 text-xs text-white/50">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
