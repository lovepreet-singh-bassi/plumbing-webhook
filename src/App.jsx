import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'

// ─── ANIMATION CONSTANTS ────────────────────────────────────────────────────
const ease = [0.25, 1, 0.5, 1]
const springCfg = { stiffness: 55, damping: 18, mass: 0.8 }
const inViewOpts = { once: true, margin: '-80px' }
const entryTransition = { duration: 0.75, ease }


// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2.5rem',
        backgroundColor: scrolled ? 'rgba(22,14,50,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(91,33,182,0.2)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, var(--color-cyan) 0%, #A78BFA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          SS
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '1rem',
            color: 'var(--color-white)',
            letterSpacing: '0.03em',
          }}
        >
          SiteStudio
        </span>
      </div>

      {/* Desktop links + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {['Work', 'Services', 'Emma', 'Contact'].map((label) => (
          <NavLink key={label} label={label} href={`#${label.toLowerCase()}`} />
        ))}
        <NavCTA />
      </div>
    </nav>
  )
}

function NavLink({ label, href }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8125rem',
        color: 'var(--color-gray)',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '2px',
        textTransform: 'uppercase',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gray)')}
    >
      {label}
      {/* Cyan underline draws from left */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'var(--color-cyan)',
          transformOrigin: 'left',
          display: 'block',
        }}
      />
    </a>
  )
}

function NavCTA() {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8125rem',
        letterSpacing: '0.06em',
        color: hov ? '#160E32' : 'var(--color-gold)',
        background: hov ? 'var(--color-gold)' : 'transparent',
        border: '1.5px solid var(--color-gold)',
        padding: '0.5rem 1.25rem',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hov ? '0 0 20px rgba(212,168,83,0.35)' : 'none',
      }}
    >
      Get a Free Quote
    </button>
  )
}


// ─── HERO ────────────────────────────────────────────────────────────────────
const HERO_WORDS = ['We', 'build', 'websites', 'trades', 'businesses', 'actually', 'close', 'with.']

function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const rawFrameY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rawBadgeY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const frameY = useSpring(rawFrameY, springCfg)
  const badgeY = useSpring(rawBadgeY, springCfg)

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Pink drama orb — one of two pink moments */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,38,211,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* SVG grain overlay */}
      <GrainOverlay />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2.5rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: Text block — 55% */}
        <div style={{ flex: '1 1 340px', maxWidth: '600px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
              color: 'var(--color-white)',
              lineHeight: 1.08,
              marginBottom: '1.75rem',
            }}
          >
            {HERO_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease, delay: i * 0.07 }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--color-gray)',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: '480px',
            }}
          >
            Edmonton-based. Built for plumbers, HVAC, electricians &amp; contractors
            who are tired of losing jobs to competitors with better websites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
          >
            <GoldButton>See Our Work</GoldButton>
            <CyanLink href="#emma">How Emma works →</CyanLink>
          </motion.div>
        </div>

        {/* Right: Browser mockup — 45% */}
        <div style={{ flex: '1 1 300px', maxWidth: '520px', position: 'relative' }}>
          {/* Purple glow behind frame */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91,33,182,0.35) 0%, transparent 68%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            style={{ y: frameY, position: 'relative' }}
          >
            <BrowserFrame />

            {/* Floating "Live in 7 Days" badge */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-14px',
                right: '-14px',
                y: badgeY,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--color-gold)',
                  border: '1px solid var(--color-gold)',
                  borderRadius: '999px',
                  padding: '6px 16px',
                  background: 'rgba(22,14,50,0.97)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 24px rgba(212,168,83,0.25)',
                }}
              >
                Live in 7 Days
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BrowserFrame() {
  return (
    <div
      style={{
        background: 'rgba(16,9,38,0.97)',
        border: '1px solid rgba(91,33,182,0.4)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow:
          '0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(91,33,182,0.15), 0 0 60px rgba(0,212,255,0.05)',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '12px 16px',
          background: 'rgba(91,33,182,0.1)',
          borderBottom: '1px solid rgba(91,33,182,0.25)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            height: 22,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '4px',
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.28)',
            }}
          >
            oldmoneyconstruction.ca
          </span>
        </div>
      </div>

      {/* Fake site preview */}
      <div
        style={{
          padding: '18px',
          background: 'rgba(10,5,24,0.97)',
          height: '300px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Hero bar */}
        <div
          style={{
            height: '70px',
            background: 'linear-gradient(90deg, rgba(91,33,182,0.28) 0%, rgba(0,212,255,0.06) 100%)',
            borderRadius: '6px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: '10px',
            border: '1px solid rgba(91,33,182,0.2)',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(0,212,255,0.15)',
              border: '1px solid rgba(0,212,255,0.35)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 10,
                background: 'rgba(255,255,255,0.18)',
                borderRadius: 4,
                width: '55%',
                marginBottom: 6,
              }}
            />
            <div
              style={{
                height: 7,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 4,
                width: '35%',
              }}
            />
          </div>
          <div
            style={{
              width: 56,
              height: 24,
              borderRadius: 4,
              background: 'rgba(212,168,83,0.2)',
              border: '1px solid rgba(212,168,83,0.45)',
            }}
          />
        </div>
        {/* Service cards row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {[0.18, 0.12, 0.15].map((op, i) => (
            <div
              key={i}
              style={{
                height: '56px',
                background: `rgba(91,33,182,${op})`,
                borderRadius: '6px',
                border: '1px solid rgba(91,33,182,0.25)',
              }}
            />
          ))}
        </div>
        {/* Text lines */}
        {[1, 0.75, 0.55].map((w, i) => (
          <div
            key={i}
            style={{
              height: '7px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              marginBottom: '7px',
              width: `${w * 100}%`,
            }}
          />
        ))}
        {/* Bottom two cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            position: 'absolute',
            bottom: '18px',
            left: '18px',
            right: '18px',
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                height: '48px',
                background: 'rgba(0,212,255,0.05)',
                borderRadius: '6px',
                border: '1px solid rgba(0,212,255,0.12)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function GrainOverlay() {
  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}


// ─── MARQUEE STRIP ───────────────────────────────────────────────────────────
const STRIP1 = 'PLUMBERS · HVAC · ELECTRICIANS · CONTRACTORS · ROOFERS · LANDSCAPERS · '
const STRIP2 = 'EDMONTON · WEBSITES · AI RECEPTIONIST · CLOSE MORE JOBS · 24/7 ANSWERING · '

function Marquee() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <MarqueeStrip text={STRIP1} direction="left" accentColor="var(--color-cyan)" />
      <MarqueeStrip text={STRIP2} direction="right" accentColor="var(--color-gold)" />
    </div>
  )
}

function MarqueeStrip({ text, direction, accentColor }) {
  const doubled = text.repeat(8)
  const [paused, setPaused] = useState(false)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        borderTop: `1px solid ${accentColor}`,
        borderBottom: `1px solid ${accentColor}`,
        padding: '10px 0',
        margin: '3px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '0.25em',
          color: 'var(--color-gray)',
          animationName: direction === 'left' ? 'marqueeLeft' : 'marqueeRight',
          animationDuration: '20s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled}
      </div>
    </div>
  )
}


// ─── SERVICES ────────────────────────────────────────────────────────────────
const WEBSITE_FEATURES = ['Mobile-first design', 'Google Maps / SEO setup', 'Live in 7 business days']
const EMMA_FEATURES = [
  'Live call answering with AI',
  'Automatic job booking via calendar',
  'Post-call SMS to owner',
]

function Services() {
  return (
    <section id="services" style={{ padding: '9rem 2.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOpts}
          transition={entryTransition}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: 'var(--color-white)',
              lineHeight: 1.15,
            }}
          >
            Two things we do.
            <br />
            Both done right.
          </h2>
        </motion.div>

        {/* Cards grid with perspective for 3D hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            perspective: '1000px',
          }}
        >
          <ServiceCard
            label="// 01 — WEBSITES"
            title="A site that books jobs while you sleep"
            body="One-time investment. No monthly fees. Built fast, looks expensive, and actually shows up on Google. Starting at $800 CAD."
            features={WEBSITE_FEATURES}
            cta="Get a Quote →"
            animFrom={{ x: -50 }}
            delay={0}
          />
          <ServiceCard
            label="// 02 — AI RECEPTIONIST"
            title="Emma answers every call. 24/7. Even at 2am."
            body="She handles inquiries, books appointments, and sends you a text summary after every call. You never miss a job lead again. Starting at $199/month."
            features={EMMA_FEATURES}
            cta="Hear Emma →"
            animFrom={{ x: 50 }}
            delay={0.15}
            showPulse
          />
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ label, title, body, features, cta, animFrom, delay, showPulse }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, ...animFrom }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={inViewOpts}
      transition={{ duration: 0.8, ease, delay }}
      whileHover={{ y: -8, rotateY: 2, scale: 1.015 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: 'rgba(91,33,182,0.08)',
        border: `1px solid ${hov ? 'var(--color-cyan)' : 'rgba(91,33,182,0.3)'}`,
        borderRadius: '18px',
        padding: '2.5rem',
        transition: 'border-color 0.22s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: hov
            ? 'radial-gradient(circle at top right, rgba(0,212,255,0.07) 0%, transparent 70%)'
            : 'transparent',
          transition: 'background 0.3s ease',
          pointerEvents: 'none',
          borderRadius: '18px',
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.22em',
          color: 'var(--color-cyan)',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>

      {/* Emma mic pulse — pink drama moment #2 */}
      {showPulse && (
        <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '1.25rem' }}>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '2px solid var(--color-pink)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(192,38,211,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              border: '1px solid rgba(192,38,211,0.35)',
            }}
          >
            🎙
          </motion.div>
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          color: 'var(--color-white)',
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: 'var(--color-gray)',
          lineHeight: 1.75,
          marginBottom: '1.75rem',
        }}
      >
        {body}
      </p>

      <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
        {features.map((f, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-gray)',
              marginBottom: '0.5rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-cyan)',
                flexShrink: 0,
                boxShadow: '0 0 6px rgba(0,212,255,0.6)',
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      <button
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-gold)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.05em',
          transition: 'letter-spacing 0.22s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.letterSpacing = '0.1em')}
        onMouseLeave={(e) => (e.currentTarget.style.letterSpacing = '0.05em')}
      >
        {cta}
      </button>
    </motion.article>
  )
}


// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
function Portfolio() {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const rawL1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rawL3 = useTransform(scrollYProgress, [0, 1], [-35, 35])
  const layer1Y = useSpring(rawL1, springCfg)
  const layer3Y = useSpring(rawL3, springCfg)

  const [hov, setHov] = useState(false)

  const BADGES = [
    { label: 'Live in 5 Days', style: { top: '14%', left: '6%' } },
    { label: 'Mobile-First', style: { top: '22%', right: '6%' } },
    { label: 'Edmonton, AB', style: { bottom: '18%', left: '10%' } },
  ]

  return (
    <section id="work" style={{ padding: '9rem 2.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOpts}
          transition={entryTransition}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            color: 'var(--color-white)',
            marginBottom: '3rem',
          }}
        >
          Real work. Real results.
        </motion.h2>

        {/* Featured project — 3-layer parallax card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOpts}
          transition={entryTransition}
          onHoverStart={() => setHov(true)}
          onHoverEnd={() => setHov(false)}
          style={{
            position: 'relative',
            height: '520px',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            cursor: 'pointer',
          }}
        >
          {/* Layer 1: Gradient BG — moves slowest */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-40px',
              background:
                'linear-gradient(135deg, rgba(91,33,182,0.65) 0%, rgba(22,14,50,0.98) 100%)',
              zIndex: 1,
              y: layer1Y,
            }}
          />

          {/* Layer 2: Browser mockup — static speed */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '65%',
              minWidth: '280px',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                background: 'rgba(10,5,24,0.92)',
                border: '1px solid var(--color-cyan)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow:
                  '0 0 40px rgba(0,212,255,0.18), 0 20px 60px rgba(0,0,0,0.65)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  padding: '10px 14px',
                  background: 'rgba(0,212,255,0.06)',
                  borderBottom: '1px solid rgba(0,212,255,0.15)',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.14)',
                    }}
                  />
                ))}
                <div
                  style={{
                    flex: 1,
                    height: 16,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 3,
                    marginLeft: 6,
                  }}
                />
              </div>
              <div style={{ padding: '14px', background: 'rgba(10,5,24,0.98)' }}>
                <div
                  style={{
                    height: 52,
                    background: 'rgba(91,33,182,0.22)',
                    borderRadius: 5,
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                  }}
                >
                  <div
                    style={{
                      height: 10,
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: 3,
                      width: '45%',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 7,
                    marginBottom: 10,
                  }}
                >
                  {[0.1, 0.07, 0.12].map((op, i) => (
                    <div
                      key={i}
                      style={{
                        height: 44,
                        background: `rgba(0,212,255,${op})`,
                        borderRadius: 5,
                      }}
                    />
                  ))}
                </div>
                {[1, 0.78, 0.56].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 6,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 3,
                      marginBottom: 6,
                      width: `${w * 100}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Layer 3: Floating badges — move fastest (creates depth) */}
          {BADGES.map(({ label, style }, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                ...style,
                y: layer3Y,
                zIndex: 3,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: 'var(--color-gold)',
                  border: '1px solid rgba(212,168,83,0.5)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  background: 'rgba(22,14,50,0.88)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}

          {/* Hover overlay — "View Project →" */}
          <AnimatePresence>
            {hov && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(22,14,50,0.45)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 5,
                }}
              >
                <a
                  href="https://sitestudio.store/oldmoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-cyan)',
                    textDecoration: 'none',
                    letterSpacing: '0.06em',
                    border: '1px solid rgba(0,212,255,0.4)',
                    padding: '0.75rem 2rem',
                    borderRadius: '4px',
                    background: 'rgba(0,212,255,0.06)',
                  }}
                >
                  View Project →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Caption */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--color-gray)',
            lineHeight: 1.65,
            marginBottom: '4rem',
          }}
        >
          <strong style={{ color: 'var(--color-white)', fontWeight: 600 }}>
            Old Money Construction
          </strong>{' '}
          — Drywall Contractor, Edmonton AB
          <br />
          Custom website. Built and live in under a week.
        </p>

        {/* Pipeline placeholder cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {['HVAC Company', 'Electrical Services', 'Plumbing Co.'].map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOpts}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              style={{
                height: '180px',
                background: 'rgba(91,33,182,0.04)',
                border: '1px solid rgba(91,33,182,0.14)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: 0.4,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  color: 'var(--color-gray)',
                  textTransform: 'uppercase',
                }}
              >
                Coming Soon
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-gray)',
                }}
              >
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


// ─── STATS ───────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section
      style={{
        padding: '6rem 2.5rem',
        background: 'rgba(0,0,0,0.25)',
        borderTop: '1px solid rgba(91,33,182,0.15)',
        borderBottom: '1px solid rgba(91,33,182,0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <StatItem value="7" label="Days to go live" />
        <div
          style={{
            width: '1px',
            background: 'var(--color-gold)',
            opacity: 0.35,
            margin: '2rem 0',
            flexShrink: 0,
            alignSelf: 'stretch',
          }}
        />
        <StatItem value="24/7" label="Emma answers calls" highlight />
        <div
          style={{
            width: '1px',
            background: 'var(--color-gold)',
            opacity: 0.35,
            margin: '2rem 0',
            flexShrink: 0,
            alignSelf: 'stretch',
          }}
        />
        <StatItem value="$0" label="Monthly fees on websites" />
      </div>
    </section>
  )
}

function StatItem({ value, label, highlight }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '2rem 3.5rem',
        flex: '1 1 200px',
      }}
    >
      {/* Gold rule draws in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] }}
        style={{
          height: '1px',
          background: 'var(--color-gold)',
          transformOrigin: 'left',
          marginBottom: '1.75rem',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease, delay: 0.25 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: 1,
          color: highlight ? 'var(--color-pink)' : 'var(--color-white)',
          marginBottom: '0.75rem',
        }}
      >
        {value}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'var(--color-gray)',
          letterSpacing: '0.03em',
        }}
      >
        {label}
      </motion.p>
    </div>
  )
}


// ─── PROCESS ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    icon: '📞',
    title: 'You reach out',
    desc: 'Quick call or form. We scope your project, no obligation.',
  },
  {
    num: '02',
    icon: '✏️',
    title: 'We build',
    desc: 'Design, copy, SEO. You approve, we refine. Fast turnaround.',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'You go live',
    desc: 'Site is live. We handle hosting setup. You start getting calls.',
  },
]

function Process() {
  return (
    <section style={{ padding: '9rem 2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOpts}
          transition={entryTransition}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: 'var(--color-white)',
            textAlign: 'center',
            marginBottom: '5rem',
          }}
        >
          From inquiry to live site in days.
        </motion.h2>

        <div style={{ position: 'relative' }}>
          {/* Dashed connector line */}
          <div
            style={{
              position: 'absolute',
              top: '52px',
              left: '20%',
              right: '20%',
              height: '1px',
              borderTop: '1px dashed rgba(0,212,255,0.2)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOpts}
                transition={{ duration: 0.75, ease, delay: i * 0.2 }}
                style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.375rem',
                    color: 'var(--color-gold)',
                    marginBottom: '1rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  {step.num}
                </div>
                <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>{step.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-white)',
                    marginBottom: '0.625rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-gray)',
                    lineHeight: 1.7,
                    maxWidth: '220px',
                    margin: '0 auto',
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── FOOTER CTA ──────────────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <section
      id="contact"
      style={{
        padding: '9rem 2.5rem 5rem',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Gold radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '350px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(212,168,83,0.07) 0%, transparent 68%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOpts}
          transition={entryTransition}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
            color: 'var(--color-white)',
            lineHeight: 1.08,
            marginBottom: '3.5rem',
          }}
        >
          Ready to look as good
          <br />
          as the work you do?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOpts}
          transition={{ duration: 0.75, ease, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Rotating border gold CTA */}
          <div className="gold-cta-wrap">
            <button
              className="gold-cta-btn"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#160E32',
                background: 'var(--color-gold)',
                border: '2px solid var(--color-gold)',
                padding: '0.9rem 2.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 0 35px rgba(212,168,83,0.55), 0 0 70px rgba(212,168,83,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Get Your Free Quote
            </button>
          </div>

          {/* Ghost cyan button */}
          <GhostCyanButton>Hear Emma in Action</GhostCyanButton>
        </motion.div>
      </div>

      {/* Footer bar */}
      <div style={{ marginTop: '7rem' }}>
        <div
          style={{
            height: '1px',
            background: 'var(--color-gold)',
            opacity: 0.28,
            maxWidth: '1000px',
            margin: '0 auto 2rem',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            maxWidth: '1000px',
            margin: '0 auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-gray)',
            letterSpacing: '0.04em',
          }}
        >
          <span>© 2025 SiteStudio. Edmonton, AB.</span>
          <span>lovepreet@sitestudio.store</span>
          <span>sitestudio.store</span>
        </div>
      </div>
    </section>
  )
}

function GhostCyanButton({ children }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: 'var(--color-cyan)',
        background: hov ? 'rgba(0,212,255,0.08)' : 'transparent',
        border: '1.5px solid var(--color-cyan)',
        padding: '0.9rem 2.5rem',
        borderRadius: '5px',
        cursor: 'pointer',
        letterSpacing: '0.04em',
        transition: 'background 0.25s ease',
      }}
    >
      {children}
    </button>
  )
}


// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function GoldButton({ children }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        color: hov ? '#160E32' : 'var(--color-gold)',
        background: hov ? 'var(--color-gold)' : 'transparent',
        border: '1.5px solid var(--color-gold)',
        padding: '0.75rem 1.875rem',
        cursor: 'pointer',
        letterSpacing: '0.04em',
        transition: 'all 0.25s ease',
        borderRadius: '3px',
        boxShadow: hov ? '0 0 22px rgba(212,168,83,0.38)' : 'none',
      }}
    >
      {children}
    </button>
  )
}

function CyanLink({ children, href }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href={href}
      animate={{ x: hov ? 5 : 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        color: 'var(--color-cyan)',
        textDecoration: 'none',
        letterSpacing: '0.04em',
        display: 'inline-block',
      }}
    >
      {children}
    </motion.a>
  )
}


// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Stats />
        <Process />
        <FooterCTA />
      </main>
    </>
  )
}
