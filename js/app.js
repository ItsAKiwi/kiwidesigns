/* ============================================================
   KiwiDesigns — Industrial Zen Portfolio
   React 18 + Tailwind CSS via CDN
   ============================================================ */

const { useState, useEffect, useRef } = React;

/* ---- Intersection Observer hook ------------------------------ */
function useFadeInView(threshold = 0.06) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ---- Mist Reveal wrapper ------------------------------------- */
function MistReveal({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useFadeInView();
  return (
    <div
      ref={ref}
      className={`mist-reveal${isVisible ? ' in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---- Background SVG — Mountain & Cloud Silhouette ------------ */
function BackgroundSVG() {
  return (
    <svg
      aria-hidden="true"
      className="fixed bottom-0 right-0 pointer-events-none select-none"
      style={{
        opacity: 0.03,
        width: 'min(65vw, 720px)',
        height: 'auto',
        zIndex: 0,
      }}
      viewBox="0 0 720 560"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      {/* Main mountain range silhouette */}
      <path d="
        M0 560
        L0 440
        C30 415 65 425 95 395
        C130 362 155 338 195 308
        C235 278 265 258 305 230
        C340 204 368 188 398 172
        C428 156 450 146 474 142
        C498 138 518 143 538 154
        C558 165 576 180 598 176
        C620 172 640 155 662 144
        C680 135 700 130 720 133
        L720 560 Z
      " />

      {/* Secondary ridge — adds depth */}
      <path
        d="M0 480 C50 460 90 470 130 448 C170 426 200 408 240 388 C280 368 310 355 350 340 C390 325 720 320 720 320 L720 560 L0 560 Z"
        style={{ opacity: 0.4 }}
      />

      {/* Cloud cluster — lower left near mountain base */}
      <ellipse cx="120" cy="415" rx="50" ry="30" />
      <ellipse cx="158" cy="400" rx="40" ry="25" />
      <ellipse cx="88"  cy="410" rx="34" ry="22" />
      <ellipse cx="125" cy="385" rx="27" ry="18" />
      <ellipse cx="155" cy="382" rx="22" ry="14" />
      <ellipse cx="92"  cy="388" rx="18" ry="12" />

      {/* Cloud cluster — mid mountain */}
      <ellipse cx="330" cy="292" rx="44" ry="26" />
      <ellipse cx="368" cy="280" rx="36" ry="22" />
      <ellipse cx="298" cy="288" rx="30" ry="19" />
      <ellipse cx="335" cy="268" rx="24" ry="16" />
      <ellipse cx="362" cy="266" rx="18" ry="12" />

      {/* Floating cloud wisps — upper right */}
      <ellipse cx="568" cy="192" rx="60" ry="18" />
      <ellipse cx="610" cy="182" rx="48" ry="14" />
      <ellipse cx="532" cy="190" rx="38" ry="12" />
      <ellipse cx="572" cy="174" rx="32" ry="10" />
      <ellipse cx="606" cy="170" rx="24" ry="8" />

      {/* Delicate trailing wisps */}
      <ellipse cx="240" cy="356" rx="26" ry="8" />
      <ellipse cx="262" cy="350" rx="20" ry="7" />
      <ellipse cx="225" cy="353" rx="15" ry="6" />

      <ellipse cx="468" cy="218" rx="30" ry="9" />
      <ellipse cx="492" cy="212" rx="22" ry="7" />
    </svg>
  );
}

/* ---- Navigation ---------------------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'nav-scrolled' : ''}`}
      style={{ paddingTop: scrolled ? '1rem' : '2rem', paddingBottom: scrolled ? '1rem' : '2rem' }}
    >
      <div className="grid grid-cols-12 px-6">
        <div className="col-start-3 col-span-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <span
              className="text-white/40 hover:text-white/80 transition-colors duration-400 font-light"
              style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              KiwiDesigns
            </span>
          </a>

          {/* Nav links */}
          <div className="flex items-center gap-10">
            <a href="#about" className="nav-link">About</a>
            <a href="#work"  className="nav-link">Work</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---- Glassmorphism Feature Card — Gamer Community ------------ */
function FeatureCard() {
  return (
    <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-4rem', right: '-4rem',
          width: '14rem', height: '14rem',
          background: 'radial-gradient(circle, rgba(63,177,255,0.07) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />

      {/* Card header */}
      <div className="flex items-start justify-between mb-6" style={{ position: 'relative' }}>
        <div>
          <span className="label-cyan">UX Strategy</span>
          <h3
            className="text-white/90 font-semibold mt-2"
            style={{ fontSize: '1.2rem', letterSpacing: '-0.03em' }}
          >
            Gamer Community Platform
          </h3>
        </div>
        <span
          className="text-white/20 font-light"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            marginTop: '0.15rem',
          }}
        >
          2024
        </span>
      </div>

      {/* Description */}
      <p
        className="text-slate-400 text-sm mb-6"
        style={{ lineHeight: '1.8', maxWidth: '92%' }}
      >
        Designed a community-first experience that reduced churn by 40% through
        strategic information architecture, retention-focused interaction design,
        and a modular onboarding system built around social proof.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Business Goal', 'Retention Loop', 'Community Design', 'IA'].map(tag => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {/* Stats */}
      <div
        className="pt-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Retention',  value: '+40%' },
            { label: 'Daily Users', value: '120K'  },
            { label: 'NPS Score',  value: '78'    },
          ].map(stat => (
            <div key={stat.label}>
              <div
                className="font-bold stat-value"
                style={{ fontSize: '1.75rem', letterSpacing: '-0.05em' }}
              >
                {stat.value}
              </div>
              <div
                className="text-white/20 mt-1"
                style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Hero Section -------------------------------------------- */
function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-28" style={{ zIndex: 1 }}>
      <div className="grid grid-cols-12 px-6">

        {/* Col 1–2 — Vertical 留白 */}
        <div className="col-span-2 flex items-start justify-center" style={{ paddingTop: '9rem' }}>
          <span
            className="vertical-text"
            style={{ color: 'rgba(255,255,255,0.07)', letterSpacing: '0.7em', fontSize: '0.8rem' }}
          >
            留白
          </span>
        </div>

        {/* Col 3–10 — Main content */}
        <div className="col-span-8">

          {/* Pre-label */}
          <MistReveal delay={60}>
            <p
              className="text-white/20 font-light mb-6"
              style={{ fontSize: '0.65rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
            >
              Portfolio — 2024
            </p>
          </MistReveal>

          {/* Hero heading */}
          <MistReveal delay={160}>
            <h1
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(3.25rem, 7.5vw, 6.75rem)',
                letterSpacing: '-0.055em',
                lineHeight: '0.93',
                marginBottom: '2.25rem',
              }}
            >
              Architecting
              <br />
              <span style={{ color: 'rgba(255,255,255,0.22)' }}>Digital</span>
              <br />
              Citadels
            </h1>
          </MistReveal>

          {/* Sub-heading */}
          <MistReveal delay={300}>
            <p
              className="text-slate-400 mb-14"
              style={{ lineHeight: '1.8', maxWidth: '520px', fontSize: '1.05rem' }}
            >
              UX strategy is not decoration — it is the structural engineering
              beneath the surface. Every interface decision compounds into
              retention, conversion, and lasting competitive advantage.
            </p>
          </MistReveal>

          {/* Feature card */}
          <MistReveal delay={460}>
            <div style={{ maxWidth: '560px' }}>
              <FeatureCard />
            </div>
          </MistReveal>
        </div>

        {/* Col 11–12 — Vertical DESIGN IS WORLD BUILDING */}
        <div className="col-span-2 flex items-center justify-center">
          <span
            className="vertical-text-latin"
            style={{ color: 'rgba(255,255,255,0.05)', letterSpacing: '0.28em', fontSize: '0.55rem' }}
          >
            Design is World Building
          </span>
        </div>

      </div>
    </section>
  );
}

/* ---- Work Section -------------------------------------------- */
const PROJECTS = [
  {
    id: '01',
    title: 'Enterprise Design System',
    category: 'Design Systems',
    description:
      'A scalable component library unifying 6 product teams under one design language, reducing design debt by 60% and cutting estimated engineering hours in half.',
    tags: ['Systems Thinking', 'Component Architecture', 'Token Design'],
    year: '2024',
  },
  {
    id: '02',
    title: 'Fintech Onboarding Flow',
    category: 'Product Design',
    description:
      'Redesigned the core onboarding through progressive disclosure and social proof triggers — completion rates rose from 34% to 71%, activating $12M in dormant accounts.',
    tags: ['Conversion Optimization', 'Information Architecture'],
    year: '2023',
  },
  {
    id: '03',
    title: 'B2B Analytics Dashboard',
    category: 'UX Strategy',
    description:
      'Transformed a dense analytics platform into a command center built around decision-making patterns. Adopted by 500+ enterprise clients with a 92% satisfaction rate.',
    tags: ['Data Visualization', 'Enterprise UX', 'Mental Models'],
    year: '2023',
  },
];

function Work() {
  return (
    <section id="work" className="py-32" style={{ position: 'relative', zIndex: 1 }}>
      <div className="grid grid-cols-12 px-6">
        <div className="col-start-3 col-span-8">

          {/* Section header */}
          <MistReveal>
            <div className="mb-20">
              <span
                className="text-white/20 block mb-4"
                style={{ fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
              >
                Selected Work
              </span>
              <h2
                className="font-bold text-white"
                style={{ fontSize: '2.4rem', letterSpacing: '-0.045em' }}
              >
                Built to Last
              </h2>
            </div>
          </MistReveal>

          {/* Project list */}
          <div>
            {PROJECTS.map((project, i) => (
              <MistReveal key={project.id} delay={i * 130}>
                <div
                  className="project-row group py-9 cursor-pointer"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-start gap-6">

                    {/* Index */}
                    <span
                      className="text-white/15 font-light shrink-0 pt-0.5"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {project.id}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="label-cyan">{project.category}</span>
                        <span className="text-white/15" style={{ fontSize: '0.7rem' }}>
                          {project.year}
                        </span>
                      </div>

                      <h3
                        className="font-semibold text-white/65 group-hover:text-white/90 mb-3"
                        style={{
                          fontSize: '1.3rem',
                          letterSpacing: '-0.03em',
                          transition: 'color 0.4s ease',
                        }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-slate-400 text-sm"
                        style={{ lineHeight: '1.8', maxWidth: '520px' }}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </MistReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- About Section ------------------------------------------- */
function About() {
  return (
    <section
      id="about"
      className="py-32"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', zIndex: 1 }}
    >
      <div className="grid grid-cols-12 px-6">
        <div className="col-start-3 col-span-8">
          <div className="grid grid-cols-2 gap-20">

            {/* Left — Philosophy */}
            <MistReveal>
              <div>
                <span
                  className="text-white/20 block mb-10"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
                >
                  About
                </span>
                <h2
                  className="font-bold text-white mb-6"
                  style={{ fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: '1.1' }}
                >
                  Strategy First.
                  <br />
                  Craft Always.
                </h2>
                <p
                  className="text-slate-400 text-sm mb-5"
                  style={{ lineHeight: '1.8' }}
                >
                  I design systems that think. Not just aesthetically pleasing
                  interfaces, but structured experiences that understand the user's
                  mental model and guide them toward meaningful outcomes.
                </p>
                <p
                  style={{ lineHeight: '1.8', fontSize: '0.875rem', color: 'rgba(148,163,184,0.55)' }}
                >
                  The concept of{' '}
                  <span className="font-noto" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    留白
                  </span>
                  {' '}— strategic emptiness — shapes every layout decision.
                  Space is not wasted potential; it is the breath that makes
                  design legible and intention visible.
                </p>
              </div>
            </MistReveal>

            {/* Right — Info grid */}
            <MistReveal delay={200}>
              <div style={{ paddingTop: '5.5rem' }}>
                {[
                  { label: 'Expertise',  value: 'UX Strategy & Systems Design' },
                  { label: 'Philosophy', value: 'Liú Bái — Strategic Emptiness' },
                  { label: 'Based',      value: 'Global / Remote'               },
                  { label: 'Available',  value: 'Q1 2025 — Open to Projects'    },
                ].map(item => (
                  <div
                    key={item.label}
                    className="py-5"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="text-white/18 mb-1"
                      style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                    >
                      {item.label}
                    </div>
                    <div className="text-white/45 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </MistReveal>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer -------------------------------------------------- */
function Footer() {
  return (
    <footer
      className="py-14"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', zIndex: 1 }}
    >
      <div className="grid grid-cols-12 px-6">
        <div className="col-start-3 col-span-8 flex items-center justify-between">
          <span
            className="text-white/12"
            style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            © 2024 KiwiDesigns
          </span>
          <span
            className="font-noto text-white/10"
            style={{ fontSize: '1rem' }}
          >
            留白
          </span>
          <span
            className="text-white/12"
            style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Design is World Building
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Root App ------------------------------------------------ */
function App() {
  return (
    <div style={{ backgroundColor: '#0A0C10', minHeight: '100vh' }}>
      <BackgroundSVG />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Footer />
    </div>
  );
}

/* ---- Mount --------------------------------------------------- */
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
