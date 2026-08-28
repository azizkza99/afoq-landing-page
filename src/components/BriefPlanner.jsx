import { useState } from 'react'
import { CheckCircleIcon } from './Icons'
import SectionHeading from './SectionHeading'

function labelFor(options, value) {
  return options.find((option) => option.value === value)?.label ?? value
}

export default function BriefPlanner({ copy, lang }) {
  const [form, setForm] = useState({
    goal: 'clarity',
    stage: 'idea',
    output: 'direction',
  })
  const [generated, setGenerated] = useState(false)

  const summary = generated
    ? copy.planner.result
        .replace('{goal}', labelFor(copy.planner.goals, form.goal))
        .replace('{stage}', labelFor(copy.planner.stages, form.stage))
        .replace('{output}', labelFor(copy.planner.outputs, form.output))
    : ''

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setGenerated(false)
  }

  const fields = [
    { key: 'goal', label: copy.planner.goal, options: copy.planner.goals },
    { key: 'stage', label: copy.planner.stage, options: copy.planner.stages },
    { key: 'output', label: copy.planner.output, options: copy.planner.outputs },
  ]

  return (
    <section id="brief" className="scroll-mt-20 border-t border-white/8 bg-[#0a0b10] px-4 py-24 sm:px-6 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={copy.planner.eyebrow}
          title={copy.planner.title}
          description={copy.planner.description}
        />

        <form
          onSubmit={(event) => {
            event.preventDefault()
            setGenerated(true)
          }}
          className="glass mt-14 rounded-[2rem] p-6 sm:p-9"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {fields.map((field) => (
              <label key={field.key} className="block text-xs font-bold text-white/75">
                <span className="mb-2.5 block">{field.label}</span>
                <select
                  value={form[field.key]}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#07080c] px-4 py-3.5 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-2xl bg-amber-300 px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100"
          >
            {copy.planner.submit}
          </button>

          <div className="mt-6 min-h-28" aria-live="polite">
            {generated ? (
              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 shrink-0 text-amber-300" size={20} />
                  <div>
                    <h3 className="font-bold text-white">{copy.planner.resultTitle}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">{summary}</p>
                    <button
                      type="button"
                      onClick={() => setGenerated(false)}
                      className="mt-4 rounded-md text-xs font-bold text-amber-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      {copy.planner.reset}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="pt-5 text-center text-xs text-white/35">
                {lang === 'ar'
                  ? 'لا يُطلب أو يُرسل أي اسم أو بريد أو معلومة شخصية.'
                  : 'No name, email, or personal information is requested or sent.'}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
