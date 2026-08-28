import { useEffect, useState } from 'react'
import Approach from './components/Approach'
import BriefPlanner from './components/BriefPlanner'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Philosophy from './components/Philosophy'
import Services from './components/Services'
import Showcase from './components/Showcase'
import StatsBar from './components/StatsBar'
import { content } from './content'

const LANGUAGE_KEY = 'afoq-language:v1'

function getInitialLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

export default function App() {
  const [lang, setLang] = useState(getInitialLanguage)
  const copy = content[lang]

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = copy.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', copy.meta.description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', copy.meta.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', copy.meta.description)

    try {
      window.localStorage.setItem(LANGUAGE_KEY, lang)
    } catch {
      // Language switching remains available when browser storage is blocked.
    }
  }, [copy, lang])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07080c] text-white">
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <Navbar
        copy={copy}
        onToggleLanguage={() =>
          setLang((current) => (current === 'ar' ? 'en' : 'ar'))
        }
      />
      <main id="main-content" tabIndex="-1">
        <Hero copy={copy} lang={lang} />
        <StatsBar items={copy.stats} lang={lang} />
        <Approach copy={copy} />
        <Showcase copy={copy} />
        <Philosophy copy={copy} />
        <Services copy={copy} lang={lang} />
        <BriefPlanner copy={copy} lang={lang} />
      </main>
      <Footer copy={copy} />
    </div>
  )
}
