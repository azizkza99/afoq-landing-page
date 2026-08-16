import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Globe, ArrowLeft, Instagram, Twitter, ArrowUpRight, Menu, X, Loader2 } from 'lucide-react';

/* ============================================================
   CONFIG — المحتوى والنصوص المحدثة
   ============================================================ */
const CONFIG = {
  brand: 'أفق',
  nav: {
    features: 'ابتكارنا',
    pricing: 'الخطط',
    about: 'فلسفتنا',
    signup: 'ابدأ الآن',
    login: 'دخول المشتركين',
  },
  hero: {
    headingPre: 'ارسم حدوداً جديدة،',
    headingAccent: 'وابتكر',
    emailPlaceholder: 'بريدك الإلكتروني للانضمام إلى نخبة المبتكرين',
    subtitle:
      'منصتك المتكاملة لصياغة المستقبل الرقمي. ندمج الاستراتيجية العميقة بالتصميم الاستثنائي لنصنع تجارب رقمية لا تُنسى.',
    manifestoBtn: 'استكشف المانيفستو',
    videoSrc: '/hero-video.mp4',
    messages: {
      emptyError: 'يرجى إدخال بريدك الإلكتروني أولاً.',
      invalidError: 'صيغة البريد الإلكتروني غير صحيحة.',
      success: 'تم انضمامك إلى القائمة الحصرية بنجاح ✓',
    },
  },
  about: {
    label: 'رؤيتنا الملهمة',
    headingPre: 'نصيغ',
    headingAccent1: 'الأفكار',
    headingMid: 'لترسم',
    headingAccent2: 'مستقبل الصناعة الرقمية برؤية متفردة.',
  },
  featured: {
    label: 'منهجية العمل',
    body: 'الفضول هو محركنا الأول. نبدأ من تساؤلات جريئة لنستكشف آفاقاً لم تصلها من قبل، محولين التعقيد إلى بساطة مذهلة وأثر مستدام.',
    cta: 'شاهد قصة النجاح',
    videoSrc: '/featured-video.mp4',
  },
  philosophy: {
    headingLeft: 'استراتيجية',
    headingX: '×',
    headingRight: 'إبداع',
    videoSrc: '/vision-video.mp4',
    blocks: [
      {
        label: 'الذكاء الاستراتيجي',
        body: 'كل خطوة تُحسب بدقة متناهية. ندمج تحليلات السوق المتقدمة مع التفكير الإبداعي الجريء لنضمن لكل مشروع حضوراً نافذاً وتأثيراً استثنائياً في سوق تنافسي.',
      },
      {
        label: 'التنفيذ المتقن',
        body: 'التفاصيل الصغيرة هي ما يصنع الفارق الكبير. نلتزم بمعايير فائقة الجودة في كل تفصيلة لنرتقي بتجربة المستخدم إلى مستويات غير مسبوقة.',
      },
    ],
  },
  services: {
    heading: 'مجالات التميز',
    label: 'ما نقدمه لك',
    cards: [
      {
        tag: 'تحليل واستراتيجية',
        title: 'هندسة الرؤى والبيانات',
        description:
          'نغوص في أعماق البيانات وسلوكيات الجمهور لنستخلص رؤى استراتيجية تقود قراراتك بثقة مطلقة وتحول التحديات إلى فرص.',
        videoSrc: '/research-video.mp4',
      },
      {
        tag: 'تصميم وهندسة',
        title: 'التجارب الرقمية الغامرة',
        description:
          'من المفهوم الأولي حتى الإطلاق الفاخر، نبني منتجات رقمية تجمع بين الأداء الفائق والجمالية البصرية الساحرة.',
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
   أدوات مساعدة: كشف الظهور عند التمرير + تحسين الأداء
   ============================================================ */
function useInView(margin = '-80px') {
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
   مكون الفيديو المحسن
   ============================================================ */
const OptimizedVideo = React.memo(function OptimizedVideo({ src, className = '', isHero = false }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(isHero);
  const opacityRef = useRef(0);
  const rafRef = useRef(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    if (isHero) return;
    const el = videoRef.current?.parentElement;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHero]);

  useEffect(() => {
    if (!isVisible) return;
    const video = videoRef.current;
    if (!video) return;

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
      if (!isHero) return;
      if (!fadingOutRef.current && video.duration && video.duration - video.currentTime <= 0.55) {
        fadingOutRef.current = true;
        animateOpacity(opacityRef.current, 0, 500);
      }
    };

    const handleEnded = () => {
      if (!isHero) return;
      setOpacity(0);
      fadingOutRef.current = false;
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    if (isHero) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
    }

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, isHero, src]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ opacity: isHero ? 0 : 1, transition: isHero ? 'none' : 'opacity 0.5s ease' }}
      muted
      autoPlay
      loop={!isHero}
      playsInline
      preload={isHero ? 'auto' : 'none'}
      src={isVisible ? src : undefined}
    />
  );
});

/* ============================================================
   أنماط التصميم المتناسق والخطوط المحسنة
   ============================================================ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@300;400;500;600;700;800&display=swap');

      .font-cairo {
        font-family: 'Cairo', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .font-accent {
        font-family: 'Amiri', serif;
        font-style: italic;
      }

      .liquid-glass {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .liquid-glass:hover {
        border-color: rgba(255, 255, 255, 0.16);
      }

      @keyframes gentleGlow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.06); }
      }

      .media-fallback {
        background:
          radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(245, 158, 11, 0.03) 40%, transparent 80%),
          #07080c;
        animation: gentleGlow 10s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .media-fallback { animation: none; }
        * { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
      }

      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.4;
        animation: float 14s infinite alternate ease-in-out;
      }
      @keyframes float {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-50px) scale(1.12); }
      }
    `}</style>
  );
}

/* ============================================================
   شريط التنقل
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

  const mobileLinks = useMemo(() => [
    { label: CONFIG.nav.features, href: '#' },
    { label: CONFIG.nav.pricing, href: '#' },
    { label: CONFIG.nav.about, href: '#' },
  ], []);

  return (
    <header className="relative z-20 px-6 py-6">
      <div className="max-w-6xl mx-auto relative" ref={wrapRef}>
        <nav className="liquid-glass rounded-full px-6 py-3.5 flex items-center justify-between" aria-label="التنقل الرئيسي">
          <div className="flex items-center min-w-0">
            <Globe size={22} className="text-amber-400 shrink-0" aria-hidden="true" />
            <span className="text-white font-bold text-base tracking-wider ms-2.5 font-cairo truncate">{CONFIG.brand}</span>
            <div className="hidden md:flex items-center gap-8 ms-12">
              <a href="#" className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-colors font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">
                {CONFIG.nav.features}
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-colors font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">
                {CONFIG.nav.pricing}
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-colors font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">
                {CONFIG.nav.about}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <button type="button" className="text-white/80 text-xs font-semibold font-cairo hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded px-2 py-1">
              {CONFIG.nav.signup}
            </button>
            <button type="button" className="liquid-glass rounded-full px-5 py-2 text-white text-xs font-semibold font-cairo hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-white/10">
              {CONFIG.nav.login}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              className="md:hidden text-white p-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-full"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* قائمة الجوال */}
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
              className="liquid-glass rounded-3xl px-6 py-3 flex flex-col gap-1"
              style={{ opacity: menuOpen ? 1 : 0, transition: `opacity 250ms ease-out ${menuOpen ? '80ms' : '0ms'}` }}
            >
              {mobileLinks.map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <div className="h-px bg-white/10 my-1" />}
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white text-xs font-semibold tracking-wide font-cairo py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded px-2"
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

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
          'Accept': 'application/json',
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
    <section className="min-h-screen overflow-hidden relative flex flex-col bg-[#07080c]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="orb bg-indigo-600/20 w-[500px] h-[500px] -top-32 -left-32" />
        <div className="orb bg-amber-500/15 w-[450px] h-[450px] top-1/3 -right-20" />
        <div className="orb bg-emerald-600/10 w-[350px] h-[350px] bottom-10 left-1/4" />
      </div>
      <div className="media-fallback absolute inset-0 w-full h-full" aria-hidden="true" />
      <OptimizedVideo src={CONFIG.hero.videoSrc} className="absolute inset-0 w-full h-full object-cover object-bottom" isHero={true} />

      <Navbar />

      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
        style={{ transform: 'translateY(-12%)' }}
      >
        <h1
          className="text-white tracking-tight mb-6 font-cairo font-light leading-[1.12]"
          style={{ fontSize: 'clamp(2.4rem, 7.5vw, 7.5rem)', textWrap: 'balance' }}
        >
          {CONFIG.hero.headingPre}{' '}
          <span className="font-accent text-amber-300 font-normal">{CONFIG.hero.headingAccent}</span>
        </h1>

        <form onSubmit={handleSubmit} noValidate className="max-w-xl w-full mb-4">
          <div className="liquid-glass rounded-full ps-6 pe-2.5 py-2.5 flex items-center gap-3 border border-white/10 shadow-2xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={CONFIG.hero.emailPlaceholder}
              disabled={status === 'loading'}
              aria-invalid={status === 'error'}
              aria-describedby="hero-email-feedback"
              className="bg-transparent flex-1 min-w-0 text-white placeholder:text-white/40 outline-none text-xs md:text-sm font-cairo font-normal disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gradient-to-l from-amber-400 to-amber-200 rounded-full p-2.5 text-black shrink-0 hover:opacity-90 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
              aria-label="اشتراك في النشرة البريدية"
            >
              {status === 'loading' ? (
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              ) : (
                <ArrowLeft size={18} aria-hidden="true" />
              )}
            </button>
          </div>
          <p
            id="hero-email-feedback"
            role={status === 'error' ? 'alert' : 'status'}
            className={`text-xs mt-2.5 font-cairo tracking-wide transition-opacity duration-300 ${
              status === 'error' ? 'text-red-400' : 'text-amber-200/80'
            }`}
            style={{ opacity: message ? 1 : 0, minHeight: '1.2em' }}
          >
            {message || '\u00A0'}
          </p>
        </form>

        <p className="text-white/70 text-xs md:text-sm leading-relaxed px-4 max-w-md mb-8 font-cairo font-normal tracking-wide">
          {CONFIG.hero.subtitle}
        </p>

        <button
          type="button"
          className="liquid-glass rounded-full px-7 py-2.5 text-white text-xs md:text-sm font-semibold tracking-wide hover:bg-white/10 transition-all font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-white/15"
        >
          {CONFIG.hero.manifestoBtn}
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-3 pb-10">
        <a href="#" aria-label="Instagram" className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50">
          <Instagram size={18} aria-hidden="true" />
        </a>
        <a href="#" aria-label="Twitter" className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50">
          <Twitter size={18} aria-hidden="true" />
        </a>
        <a href="#" aria-label="Website" className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50">
          <Globe size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/* ============================================================
   القسم 2 — من نحن
   ============================================================ */
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section className="bg-[#07080c] pt-28 md:pt-40 pb-12 md:pb-16 px-6 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div ref={ref} className="relative max-w-4xl mx-auto text-center">
        <p className="text-amber-400/90 text-[11px] tracking-[0.3em] uppercase mb-5 font-cairo font-bold" style={reveal(inView, { y: 20, duration: 600 })}>
          {CONFIG.about.label}
        </p>
        <h2
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-cairo font-light leading-[1.3]"
          style={reveal(inView, { y: 35, duration: 800, delay: 100 })}
        >
          {CONFIG.about.headingPre} <span className="font-accent text-amber-300 font-normal">{CONFIG.about.headingAccent1}</span> {CONFIG.about.headingMid}
          <br className="hidden md:block" />
          <span className="font-accent text-white/85"> {CONFIG.about.headingAccent2}</span>
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
    <section className="bg-[#07080c] pt-6 md:pt-10 pb-24 md:pb-36 px-6 overflow-hidden">
      <div
        ref={ref}
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative aspect-video border border-white/10 shadow-2xl"
        style={reveal(inView, { y: 50, duration: 900 })}
      >
        <div className="media-fallback absolute inset-0" aria-hidden="true" />
        <OptimizedVideo src={CONFIG.featured.videoSrc} className="w-full h-full object-cover relative" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md border border-white/10">
            <p className="text-amber-400 text-[11px] tracking-[0.2em] uppercase mb-3 font-cairo font-bold">{CONFIG.featured.label}</p>
            <p className="text-white/75 text-xs md:text-sm leading-relaxed font-cairo font-normal tracking-wide">{CONFIG.featured.body}</p>
          </div>
          <button
            type="button"
            className="liquid-glass rounded-full px-7 py-2.5 text-white text-xs md:text-sm font-semibold tracking-wide shrink-0 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50 font-cairo border border-white/15"
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
    <section className="bg-[#07080c] py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-16 md:mb-24 font-cairo font-light"
          style={reveal(headingInView, { y: 35, duration: 800 })}
        >
          {CONFIG.philosophy.headingLeft}{' '}
          <span className="font-accent text-amber-400/60 font-normal">{CONFIG.philosophy.headingX}</span>{' '}
          {CONFIG.philosophy.headingRight}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div
            ref={videoRef}
            className="rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl"
            style={{ aspectRatio: '4 / 3', ...reveal(videoInView, { x: 30, duration: 800 }) }}
          >
            <div className="media-fallback absolute inset-0" aria-hidden="true" />
            <OptimizedVideo src={CONFIG.philosophy.videoSrc} className="w-full h-full object-cover relative" />
          </div>

          <div ref={textRef} style={reveal(textInView, { x: -30, duration: 800 })}>
            {CONFIG.philosophy.blocks.map((block, i) => (
              <div key={block.label}>
                {i > 0 && <div className="w-full h-px bg-white/10 my-8" />}
                <div>
                  <p className="text-amber-400 text-[11px] tracking-[0.2em] uppercase mb-3 font-cairo font-bold">{block.label}</p>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-cairo font-normal tracking-wide">{block.body}</p>
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
   القسم 5 — خدماتنا
   ============================================================ */
const ServiceCard = React.memo(function ServiceCard({ tag, title, description, videoSrc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="liquid-glass rounded-3xl overflow-hidden group border border-white/10 hover:border-white/25 transition-all duration-500 flex flex-col"
      style={reveal(inView, { y: 40, duration: 800, delay })}
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="media-fallback absolute inset-0" aria-hidden="true" />
        <OptimizedVideo
          src={videoSrc}
          className="w-full h-full object-cover relative transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" aria-hidden="true" />
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-amber-400 text-[11px] tracking-[0.2em] uppercase font-cairo font-bold">{tag}</p>
            <span className="liquid-glass rounded-full p-2 text-white border border-white/10 group-hover:bg-amber-400 group-hover:text-black transition-all" aria-hidden="true">
              <ArrowUpRight size={14} />
            </span>
          </div>
          <h3 className="text-white text-lg md:text-xl mb-2.5 tracking-tight font-cairo font-semibold">{title}</h3>
          <p className="text-white/65 text-xs md:text-sm leading-relaxed font-cairo font-normal tracking-wide">{description}</p>
        </div>
      </div>
    </div>
  );
});

function ServicesSection() {
  const [headerRef, headerInView] = useInView();
  return (
    <section className="bg-[#07080c] py-28 md:py-40 px-6 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.025) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className="flex items-center justify-between mb-12 md:mb-16"
          style={reveal(headerInView, { y: 25, duration: 700 })}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white tracking-tight font-cairo font-light">{CONFIG.services.heading}</h2>
          <p className="text-amber-400/80 text-xs md:text-sm hidden md:block font-cairo font-semibold tracking-wide">{CONFIG.services.label}</p>
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
  const [ref, inView] = useInView('-50px');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#07080c] px-6 pt-12 pb-12 relative overflow-hidden font-cairo">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(99,102,241,0.035) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div ref={ref} className="relative max-w-6xl mx-auto" style={reveal(inView, { y: 25, duration: 700 })}>
        <div className="liquid-glass rounded-3xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <Globe size={22} className="text-amber-400 shrink-0" aria-hidden="true" />
            <span className="text-white font-bold text-base tracking-wider font-cairo">{CONFIG.brand}</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3" aria-label="روابط التذييل">
            <a href="#" className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-colors font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">
              {CONFIG.nav.features}
            </a>
            <a href="#" className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-colors font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">
              {CONFIG.nav.pricing}
            </a>
            <a href="#" className="text-white/70 hover:text-white text-xs font-semibold tracking-wide transition-colors font-cairo focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">
              {CONFIG.nav.about}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-white/10">
              <Instagram size={16} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Twitter" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-white/10">
              <Twitter size={16} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Website" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-white/10">
              <Globe size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-white/40 text-xs font-cairo font-normal tracking-wide px-2">
          <p>
            © {year} {CONFIG.brand}. {CONFIG.footer.rightsSuffix}.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/75 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">{CONFIG.footer.privacy}</a>
            <a href="#" className="hover:text-white/75 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded py-1">{CONFIG.footer.terms}</a>
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
    <div dir="rtl" lang="ar" className="bg-[#07080c] font-cairo text-white selection:bg-amber-400 selection:text-black">
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
