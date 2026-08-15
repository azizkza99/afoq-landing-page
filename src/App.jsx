import React, { useState, useEffect, useRef } from 'react';
import { Globe, ArrowLeft, Instagram, Twitter, ArrowUpRight, Menu, X, Loader2 } from 'lucide-react';

/* ============================================================
   CONFIG — كل النصوص والروابط القابلة للتخصيص في مكان واحد
   ============================================================ */
const CONFIG = {
  brand: 'أفق',
  nav: {
    features: 'المميزات',
    pricing: 'الأسعار',
    about: 'من نحن',
    signup: 'إنشاء حساب',
    login: 'تسجيل الدخول',
  },
  hero: {
    headingPre: 'اعرف، ثم',
    headingAccent: 'ابتكر',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    subtitle:
      'كن أول من يعلم بآخر الأفكار والمستجدات. اشترك في نشرتنا البريدية الآن ولا تفوّت أي تحديث جديد.',
    manifestoBtn: 'فلسفتنا',
    videoSrc: '/hero-video.mp4',
    messages: {
      emptyError: 'يرجى إدخال بريدك الإلكتروني أولاً.',
      invalidError: 'صيغة البريد الإلكتروني غير صحيحة.',
      success: 'تم الاشتراك بنجاح ✓',
    },
  },
  about: {
    label: 'من نحن',
    headingPre: 'نُبدع',
    headingAccent1: 'أفكاراً',
    headingMid: 'لأجل',
    headingAccent2: 'عقولٍ تبتكر، وتبني، وتُلهم.',
  },
  featured: {
    label: 'منهجنا',
    body: 'نؤمن بقوة الفضول في استكشاف المجهول. كل مشروع يبدأ بسؤال، وكل إجابة تفتح باباً جديداً نحو الابتكار.',
    cta: 'اكتشف المزيد',
    videoSrc: '/featured-video.mp4',
  },
  philosophy: {
    headingLeft: 'ابتكار',
    headingX: '×',
    headingRight: 'رؤية',
    videoSrc: '/vision-video.mp4',
    blocks: [
      {
        label: 'اختر مسارك',
        body: 'كل إنجاز حقيقي يبدأ من نقطة التقاء الاستراتيجية المنضبطة بالرؤية الإبداعية المتميزة. نحن نعمل عند هذا التقاطع، نحوّل الأفكار الجريئة إلى نتائج ملموسة تُحرّك الناس وتُعيد تشكيل الصناعات.',
      },
      {
        label: 'نصنع المستقبل',
        body: 'نؤمن بأن أفضل الأعمال تولد حين يلتقي الفضول بالإيمان الراسخ. عمليتنا مصممة لاكتشاف الفرص الخفية وتحويلها إلى تجارب يبقى أثرها بعد الانطباع الأول بزمن طويل.',
      },
    ],
  },
  services: {
    heading: 'ماذا نقدّم',
    label: 'خدماتنا',
    cards: [
      {
        tag: 'استراتيجية',
        title: 'البحث والتحليل',
        description:
          'نتعمّق في البيانات والثقافة والسلوك الإنساني لاستخراج الرؤى التي تصنع تغييراً حقيقياً ودائماً.',
        videoSrc: '/research-video.mp4',
      },
      {
        tag: 'الإتقان',
        title: 'التصميم والتنفيذ',
        description:
          'من الفكرة إلى الإطلاق، نهتم بكل التفاصيل لنقدّم تجارب تبدو سلسة وتترك انطباعاً استثنائياً.',
        videoSrc: '/design-video.mp4',
      },
    ],
  },
  footer: {
    rightsSuffix: 'جميع الحقوق محفوظة',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
  },
};

/* ============================================================
   أدوات مساعدة: كشف الظهور عند التمرير + تنسيق الحركة
   ============================================================ */
function useInView(margin = '-100px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView];
}

function reveal(inView, { x = 0, y = 0, duration = 800, delay = 0 } = {}) {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate(0, 0)' : `translate(${x}px, ${y}px)`,
    transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  };
}

/* ============================================================
   الأنماط العامة: خطوط Cairo/Amiri + تأثير الزجاج السائل
   ============================================================ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@300;400;500;600;700;800&display=swap');

      .font-cairo { font-family: 'Cairo', sans-serif; }
      .font-accent { font-family: 'Amiri', serif; font-style: italic; }

      .liquid-glass {
        background: rgba(255, 255, 255, 0.01);
        background-blend-mode: luminosity;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border: none;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
      }
      .liquid-glass::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1.4px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.45) 0%,
          rgba(255, 255, 255, 0.15) 20%,
          rgba(255, 255, 255, 0) 40%,
          rgba(255, 255, 255, 0) 60%,
          rgba(255, 255, 255, 0.15) 80%,
          rgba(255, 255, 255, 0.45) 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }

      @keyframes gentleGlow {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.04); }
      }
      .media-fallback {
        background:
          radial-gradient(ellipse at 50% 65%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 35%, transparent 70%),
          #050505;
        animation: gentleGlow 9s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .media-fallback { animation: none; }
        * { scroll-behavior: auto !important; }
      }
    `}</style>
  );
}

/* ============================================================
   شريط التنقل — مع قائمة جوال منسدلة وسلسة
   ============================================================ */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [menuOpen]);

  const mobileLinks = [
    { label: CONFIG.nav.features, href: '#' },
    { label: CONFIG.nav.pricing, href: '#' },
    { label: CONFIG.nav.about, href: '#' },
  ];

  return (
    <div className="relative z-20 px-6 py-6">
      <div className="max-w-5xl mx-auto relative" ref={wrapRef}>
        <nav className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Globe size={24} className="text-white shrink-0" aria-hidden="true" />
            <span className="text-white font-semibold text-lg ms-3 font-cairo truncate">{CONFIG.brand}</span>
            <div className="hidden md:flex items-center gap-8 ms-8">
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors font-cairo cursor-pointer">
                {CONFIG.nav.features}
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors font-cairo cursor-pointer">
                {CONFIG.nav.pricing}
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors font-cairo cursor-pointer">
                {CONFIG.nav.about}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <button type="button" className="text-white text-sm font-medium font-cairo cursor-pointer hover:text-white/80 transition-colors">
              {CONFIG.nav.signup}
            </button>
            <button type="button" className="liquid-glass rounded-full px-5 md:px-6 py-2 text-white text-sm font-medium font-cairo cursor-pointer hover:bg-white/5 transition-colors">
              {CONFIG.nav.login}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              className="md:hidden text-white p-1 cursor-pointer"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* قائمة الجوال المنسدلة */}
        <div
          id="mobile-nav-menu"
          className="md:hidden absolute inset-x-0 top-full mt-3 overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateRows: menuOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms ease-out',
          }}
        >
          <div className="overflow-hidden">
            <div
              className="liquid-glass rounded-3xl px-6 py-2 flex flex-col"
              style={{ opacity: menuOpen ? 1 : 0, transition: `opacity 250ms ease-out ${menuOpen ? '80ms' : '0ms'}` }}
            >
              {mobileLinks.map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <div className="h-px bg-white/10" />}
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white text-sm font-medium font-cairo py-3 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   فيديو الهيرو مع التلاشي التسلسلي (Memoized لمنع أي وميض)
   ============================================================ */
const HeroVideo = React.memo(function HeroVideo({ src }) {
  const videoRef = useRef(null);
  const opacityRef = useRef(0);
  const rafRef = useRef(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const setOpacity = (val) => {
      opacityRef.current = val;
      video.style.opacity = String(val);
    };

    const animateOpacity = (from, to, duration, onDone) => {
      cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setOpacity(from + (to - from) * progress);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else if (onDone) {
          onDone();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      fadingOutRef.current = false;
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };
    const handleTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration && video.duration - video.currentTime <= 0.55) {
        fadingOutRef.current = true;
        animateOpacity(opacityRef.current, 0, 500);
      }
    };
    const handleEnded = () => {
      setOpacity(0);
      fadingOutRef.current = false;
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover object-bottom"
      style={{ opacity: 0 }}
      muted
      autoPlay
      playsInline
      preload="auto"
      src={src}
    />
  );
});

/* ============================================================
   القسم 1 — الهيرو
   ============================================================ */
function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage(CONFIG.hero.messages.emptyError);
      return;
    }
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage(CONFIG.hero.messages.invalidError);
      return;
    }
    setStatus('loading');
    setMessage('');
   try {
      const response = await fetch('https://formspree.io/f/xljrwrda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(CONFIG.hero.messages.success);
        setEmail('');
      } else {
        setStatus('error');
        setMessage('حدث خطأ، يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('تعذر الاتصال بالخادم.');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      <div className="media-fallback absolute inset-0 w-full h-full" />
      <HeroVideo src={CONFIG.hero.videoSrc} />

      <Navbar />

      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
        style={{ transform: 'translateY(-14%)' }}
      >
        <h1
          className="text-white tracking-tight mb-8 font-cairo font-light"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 8.5rem)', lineHeight: 1.15, textWrap: 'balance' }}
        >
          {CONFIG.hero.headingPre}{' '}
          <span className="font-accent">{CONFIG.hero.headingAccent}</span>
        </h1>

        <form onSubmit={handleSubmit} noValidate className="max-w-xl w-full mb-4">
          <div className="liquid-glass rounded-full ps-6 pe-2 py-2 flex items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={CONFIG.hero.emailPlaceholder}
              disabled={status === 'loading'}
              aria-invalid={status === 'error'}
              aria-describedby="hero-email-feedback"
              className="bg-transparent flex-1 min-w-0 text-white placeholder:text-white/40 outline-none text-sm md:text-base font-cairo disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white rounded-full p-3 text-black shrink-0 hover:bg-white/90 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="اشتراك في النشرة البريدية"
            >
              {status === 'loading' ? (
                <Loader2 size={20} className="animate-spin" aria-hidden="true" />
              ) : (
                <ArrowLeft size={20} aria-hidden="true" />
              )}
            </button>
          </div>
          <p
            id="hero-email-feedback"
            role={status === 'error' ? 'alert' : 'status'}
            className={`text-xs mt-3 font-cairo transition-opacity duration-300 ${
              status === 'error' ? 'text-red-400' : 'text-white/70'
            }`}
            style={{ opacity: message ? 1 : 0, minHeight: '1em' }}
          >
            {message || '\u00A0'}
          </p>
        </form>

        <p className="text-white/80 text-sm leading-relaxed px-4 max-w-lg mb-8 font-cairo">
          {CONFIG.hero.subtitle}
        </p>

        <button
          type="button"
          className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer font-cairo"
        >
          {CONFIG.hero.manifestoBtn}
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button type="button" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer" aria-label="Instagram">
          <Instagram size={20} aria-hidden="true" />
        </button>
        <button type="button" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer" aria-label="Twitter">
          <Twitter size={20} aria-hidden="true" />
        </button>
        <button type="button" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer" aria-label="Website">
          <Globe size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   القسم 2 — من نحن
   ============================================================ */
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
      <div ref={ref} className="relative max-w-4xl mx-auto text-center">
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6 font-cairo" style={reveal(inView, { y: 20, duration: 600 })}>
          {CONFIG.about.label}
        </p>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight font-cairo font-light"
          style={{ lineHeight: 1.2, ...reveal(inView, { y: 40, duration: 800, delay: 100 }) }}
        >
          {CONFIG.about.headingPre} <span className="font-accent">{CONFIG.about.headingAccent1}</span> {CONFIG.about.headingMid}
          <br className="hidden md:block" />
          <span className="font-accent"> {CONFIG.about.headingAccent2}</span>
        </h2>
      </div>
    </section>
  );
}

/* ============================================================
   القسم 3 — الفيديو المميز
   ============================================================ */
function FeaturedVideoSection() {
  const [ref, inView] = useInView();
  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div
        ref={ref}
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative aspect-video"
        style={reveal(inView, { y: 60, duration: 900 })}
      >
        <div className="media-fallback absolute inset-0" />
        <video
          className="w-full h-full object-cover relative"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          src={CONFIG.featured.videoSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
            <p className="text-white/50 text-xs tracking-widest uppercase mb-3 font-cairo">{CONFIG.featured.label}</p>
            <p className="text-white text-sm md:text-base leading-relaxed font-cairo">{CONFIG.featured.body}</p>
          </div>
          <button
            type="button"
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer font-cairo"
          >
            {CONFIG.featured.cta}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   القسم 4 — ابتكار × رؤية
   ============================================================ */
function PhilosophySection() {
  const [headingRef, headingInView] = useInView();
  const [videoRef, videoInView] = useInView();
  const [textRef, textInView] = useInView();

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-cairo font-light"
          style={reveal(headingInView, { y: 40, duration: 800 })}
        >
          {CONFIG.philosophy.headingLeft}{' '}
          <span className="font-accent text-white/40">{CONFIG.philosophy.headingX}</span>{' '}
          {CONFIG.philosophy.headingRight}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            ref={videoRef}
            className="rounded-3xl overflow-hidden relative"
            style={{ aspectRatio: '4 / 3', ...reveal(videoInView, { x: 40, duration: 800 }) }}
          >
            <div className="media-fallback absolute inset-0" />
            <video
              className="w-full h-full object-cover relative"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              src={CONFIG.philosophy.videoSrc}
            />
          </div>

          <div ref={textRef} style={reveal(textInView, { x: -40, duration: 800 })}>
            {CONFIG.philosophy.blocks.map((block, i) => (
              <div key={block.label}>
                {i > 0 && <div className="w-full h-px bg-white/10 my-8" />}
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-4 font-cairo">{block.label}</p>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed font-cairo">{block.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   القسم 5 — خدماتنا (Memoized بطاقات الخدمات)
   ============================================================ */
const ServiceCard = React.memo(function ServiceCard({ tag, title, description, videoSrc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="liquid-glass rounded-3xl overflow-hidden group"
      style={reveal(inView, { y: 50, duration: 800, delay })}
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="media-fallback absolute inset-0" />
        <video
          className="w-full h-full object-cover relative transition-transform duration-700 group-hover:scale-105"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          src={videoSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/40 text-xs tracking-widest uppercase font-cairo">{tag}</p>
          <span className="liquid-glass rounded-full p-2 text-white">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
        <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-cairo">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed font-cairo">{description}</p>
      </div>
    </div>
  );
});

function ServicesSection() {
  const [headerRef, headerInView] = useInView();
  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 60%)' }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className="flex items-center justify-between mb-10 md:mb-14"
          style={reveal(headerInView, { y: 30, duration: 700 })}
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-cairo font-light">{CONFIG.services.heading}</h2>
          <p className="text-white/40 text-sm hidden md:block font-cairo">{CONFIG.services.label}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CONFIG.services.cards.map((card, i) => (
            <ServiceCard key={card.title} {...card} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   القسم 6 — التذييل (Footer)
   ============================================================ */
function Footer() {
  const [ref, inView] = useInView('-60px');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black px-6 pt-10 pb-10 relative overflow-hidden font-cairo">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
      <div ref={ref} className="relative max-w-6xl mx-auto" style={reveal(inView, { y: 30, duration: 700 })}>
        <div className="liquid-glass rounded-3xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <Globe size={26} className="text-white shrink-0" aria-hidden="true" />
            <span className="text-white font-semibold text-xl font-cairo">{CONFIG.brand}</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="#" className="text-white/70 hover:text-white text-sm font-medium transition-colors font-cairo cursor-pointer">
              {CONFIG.nav.features}
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm font-medium transition-colors font-cairo cursor-pointer">
              {CONFIG.nav.pricing}
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm font-medium transition-colors font-cairo cursor-pointer">
              {CONFIG.nav.about}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" aria-label="Instagram" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <Instagram size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Twitter" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <Twitter size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Website" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <Globe size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-white/40 text-xs font-cairo px-2">
          <p>
            © {year} {CONFIG.brand}. {CONFIG.footer.rightsSuffix}.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition-colors cursor-pointer">{CONFIG.footer.privacy}</a>
            <a href="#" className="hover:text-white/70 transition-colors cursor-pointer">{CONFIG.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   التطبيق الرئيسي
   ============================================================ */
export default function App() {
  return (
    <div dir="rtl" lang="ar" className="bg-black font-cairo">
      <GlobalStyles />
      <Hero />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <Footer />
    </div>
  );
}
