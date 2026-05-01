import { useState, useEffect, useRef } from 'react'
import posthog from 'posthog-js'

// ─── Photo slideshow ─────────────────────────────────────────
export const PhotoSlideshow = ({ size = 240, images = [], labels = [], rounded = '50%', interval = 3200 }) => {
  const [i, setI] = useState(0)
  const slides = images.length ? images : labels.length ? labels : ['portrait 1', 'portrait 2', 'portrait 3']
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), interval)
    return () => clearInterval(t)
  }, [slides.length, interval])
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {slides.map((s, n) => {
        const isImage = images.length && typeof s === 'string' && (s.startsWith('http') || s.startsWith('/') || s.startsWith('./'))
        return (
          <div key={n} style={{
            position: 'absolute', inset: 0, borderRadius: rounded,
            opacity: n === i ? 1 : 0, transition: 'opacity 0.9s ease-in-out',
            background: isImage
              ? `url('${s}') center/cover`
              : 'linear-gradient(135deg, var(--accent-soft) 0%, #f3e6df 60%, #e8d5cb 100%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            color: 'var(--brown-700)', fontFamily: 'DM Sans, sans-serif', fontSize: 11,
            letterSpacing: 0.5, paddingBottom: 16, textTransform: 'uppercase',
            border: '1px solid var(--brown-200)', overflow: 'hidden'
          }}>
            {!isImage && <span style={{ opacity: 0.55 }}>{labels[n] || s}</span>}
          </div>
        )
      })}
      <div style={{
        position: 'absolute', bottom: -22, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 6
      }}>
        {slides.map((_, n) => (
          <div key={n} style={{
            width: n === i ? 18 : 6, height: 2,
            background: n === i ? 'var(--brown-900)' : 'var(--brown-300)',
            transition: 'all 0.4s'
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── LinkedIn button ─────────────────────────────────────────
export const LinkedInBtn = ({ size = 'md', variant = 'solid', label = 'Connect on LinkedIn', href = '#' }) => {
  const sizes = {
    sm: { fs: 11, py: 8, px: 14, ic: 13 },
    md: { fs: 13, py: 12, px: 20, ic: 15 },
    lg: { fs: 14, py: 16, px: 26, ic: 17 }
  }
  const s = sizes[size]
  const isOutline = variant === 'outline'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => posthog.capture('linkedin clicked', { label, href })}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: isOutline ? 'transparent' : 'var(--brown-900)',
        color: isOutline ? 'var(--brown-900)' : '#fff',
        border: '1px solid var(--brown-900)',
        padding: `${s.py}px ${s.px}px`,
        fontFamily: 'DM Sans, sans-serif', fontSize: s.fs, fontWeight: 500,
        letterSpacing: 0.2, textDecoration: 'none', cursor: 'pointer',
        transition: 'all 0.25s ease', borderRadius: 5
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--brown-700)'
        e.currentTarget.style.color = '#fff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isOutline ? 'transparent' : 'var(--brown-900)'
        e.currentTarget.style.color = isOutline ? 'var(--brown-900)' : '#fff'
      }}
    >
      <svg width={s.ic} height={s.ic} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      {label}
    </a>
  )
}

// ─── GitHub button ────────────────────────────────────────────
export const GitHubBtn = ({ size = 'md', variant = 'outline', label = 'GitHub', href = '#' }) => {
  const sizes = {
    sm: { fs: 11, py: 8, px: 14, ic: 13 },
    md: { fs: 13, py: 12, px: 20, ic: 15 },
    lg: { fs: 14, py: 16, px: 26, ic: 17 }
  }
  const s = sizes[size]
  const isOutline = variant === 'outline'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => posthog.capture('github clicked', { label, href })}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: isOutline ? 'transparent' : 'var(--brown-900)',
        color: isOutline ? 'var(--brown-900)' : '#fff',
        border: '1px solid var(--brown-900)',
        padding: `${s.py}px ${s.px}px`,
        fontFamily: 'DM Sans, sans-serif', fontSize: s.fs, fontWeight: 500,
        letterSpacing: 0.2, textDecoration: 'none', cursor: 'pointer',
        transition: 'all 0.25s ease', borderRadius: 5
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--brown-700)'
        e.currentTarget.style.color = '#fff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isOutline ? 'transparent' : 'var(--brown-900)'
        e.currentTarget.style.color = isOutline ? 'var(--brown-900)' : '#fff'
      }}
    >
      <svg width={s.ic} height={s.ic} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      {label}
    </a>
  )
}

// ─── Award badge ──────────────────────────────────────────────
export const AwardBadge = ({ name, detail, year }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '14px 18px 14px 16px',
    border: '1px solid var(--brown-200)',
    background: 'var(--bg)',
    borderRadius: 5, minWidth: 0
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'var(--accent-soft)', border: '1px solid var(--accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: 'var(--brown-800)' }}>
        <circle cx="12" cy="9" r="6" />
        <path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" />
      </svg>
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 18, fontWeight: 500, lineHeight: 1.1,
        color: 'var(--brown-900)', letterSpacing: -0.2
      }}>{name}</div>
      <div style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 10.5,
        letterSpacing: 1.2, textTransform: 'uppercase',
        color: 'var(--brown-600)', marginTop: 4
      }}>{detail}{year ? ` · ${year}` : ''}</div>
    </div>
  </div>
)

export const AwardStrip = ({ awards, mobile }) => (
  <div style={{
    marginTop: mobile ? 22 : 28,
    display: 'grid',
    gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
    gap: 10, maxWidth: mobile ? '100%' : 480
  }}>
    {awards.map((a, i) => <AwardBadge key={i} {...a} />)}
  </div>
)

// ─── Eyebrow ──────────────────────────────────────────────────
export const Eyebrow = ({ children, color, style = {} }) => (
  <span style={{
    fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
    letterSpacing: 3, textTransform: 'uppercase',
    color: color || 'var(--brown-500)', ...style
  }}>{children}</span>
)

// ─── Image placeholder ────────────────────────────────────────
export const ImgPlaceholder = ({ height = 220, label = 'project image', src = null, style = {} }) => {
  if (src) {
    return <div style={{ height, borderRadius: 5, background: `url('${src}') center/cover`, ...style }} />
  }
  return (
    <div style={{
      height, borderRadius: 5,
      background: 'linear-gradient(135deg, var(--accent-soft) 0%, #fce8e0 50%, #f5d9cd 100%)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--brown-200) 1px, transparent 1px), linear-gradient(90deg, var(--brown-200) 1px, transparent 1px)',
        backgroundSize: '40px 40px', opacity: 0.18
      }} />
      <span style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 11,
        letterSpacing: 2, textTransform: 'uppercase',
        color: 'var(--brown-500)', position: 'relative'
      }}>{label}</span>
    </div>
  )
}

// ─── Tag ──────────────────────────────────────────────────────
export const Tag = ({ children, variant = 'default' }) => {
  const styles = {
    default: { bg: 'transparent', color: 'var(--brown-700)', border: 'var(--brown-300)' },
    award: { bg: 'var(--accent-soft)', color: 'var(--brown-900)', border: 'var(--accent)' }
  }
  const s = styles[variant] || styles.default
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 500,
      letterSpacing: 0.3, borderRadius: 999
    }}>{children}</span>
  )
}

// ─── Horizontal timeline (desktop) ───────────────────────────
export const HorizontalTimeline = ({ timeline, animate = true }) => {
  const minY = Math.min(...timeline.map(t => t.start))
  const maxY = Math.max(2026.5, ...timeline.map(t => t.end === 'now' ? 2026.5 : t.end))
  const span = maxY - minY
  const pos = (y) => (y - minY) / span * 100
  const [progress, setProgress] = useState(animate ? 0 : 1)
  const ref = useRef(null)

  useEffect(() => {
    if (!animate) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start
        const dur = 1800
        const step = (t) => {
          if (!start) start = t
          const p = Math.min((t - start) / dur, 1)
          setProgress(1 - Math.pow(1 - p, 3))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [animate])

  return (
    <div ref={ref} style={{ width: '100%', paddingTop: 64, paddingBottom: 44, position: 'relative' }}>
      <div style={{ position: 'relative', height: 1, background: 'var(--brown-200)' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: 1,
          width: `${progress * 100}%`, background: 'var(--brown-900)'
        }} />
        {timeline.map((t, i) => {
          const start = pos(t.start)
          const end = pos(t.end === 'now' ? 2026.5 : t.end)
          const width = end - start
          const segOpacity = Math.max(0, Math.min(1, (progress * 100 - start) / 8))
          return (
            <span key={i}>
              {t.current && (
                <div style={{
                  position: 'absolute', left: `${start}%`, width: `${width}%`,
                  height: 4, top: -1.5, background: 'var(--accent)', opacity: segOpacity
                }} />
              )}
              <div style={{
                position: 'absolute', left: `${start}%`, top: '50%',
                transform: 'translate(-50%, -50%)',
                width: t.current ? 12 : 8, height: t.current ? 12 : 8,
                borderRadius: '50%',
                background: t.current ? 'var(--accent)' : 'var(--brown-900)',
                border: '2px solid #fff',
                boxShadow: t.current ? '0 0 0 4px var(--accent-soft)' : 'none',
                opacity: segOpacity, transition: 'opacity 0.4s'
              }} />
              <div style={{
                position: 'absolute', left: `${start + width / 2}%`,
                bottom: 'calc(100% + 14px)', transform: 'translateX(-50%)',
                textAlign: 'center', whiteSpace: 'nowrap',
                opacity: segOpacity, transition: 'opacity 0.6s'
              }}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 14,
                  fontWeight: 300, lineHeight: 1.1,
                  color: 'var(--brown-900)', letterSpacing: -0.3
                }}>{t.role}</div>
                <div style={{
                  fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                  color: 'var(--brown-500)', marginTop: 4, fontFamily: 'DM Sans, sans-serif'
                }}>{t.company}</div>
              </div>
              <div style={{
                position: 'absolute', left: `${start}%`, top: 'calc(100% + 14px)',
                transform: 'translateX(-50%)',
                fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                color: 'var(--brown-500)', letterSpacing: 1, opacity: segOpacity
              }}>{t.start}</div>
            </span>
          )
        })}
        <div style={{
          position: 'absolute', left: '100%', top: 'calc(100% + 14px)',
          transform: 'translateX(-50%)',
          fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
          color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase',
          opacity: progress
        }}>PRESENT</div>
      </div>
    </div>
  )
}

// ─── Vertical timeline (mobile) ───────────────────────────────
export const VerticalTimeline = ({ timeline, animate = true }) => {
  const [progress, setProgress] = useState(animate ? 0 : 1)
  const ref = useRef(null)

  useEffect(() => {
    if (!animate) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start
        const dur = 1400
        const step = (t) => {
          if (!start) start = t
          const p = Math.min((t - start) / dur, 1)
          setProgress(1 - Math.pow(1 - p, 3))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [animate])

  return (
    <div ref={ref} style={{ position: 'relative', paddingLeft: 24 }}>
      <div style={{
        position: 'absolute', left: 6, top: 6, bottom: 6,
        width: 1, background: 'var(--brown-200)'
      }} />
      <div style={{
        position: 'absolute', left: 6, top: 6,
        width: 1, height: `calc(${progress * 100}% - 12px)`,
        background: 'var(--brown-900)'
      }} />
      {timeline.map((t, i) => {
        const itemThreshold = i / timeline.length
        const opacity = Math.max(0, Math.min(1, (progress - itemThreshold) * 4))
        return (
          <div key={i} style={{
            position: 'relative',
            paddingBottom: i < timeline.length - 1 ? 22 : 0,
            opacity, transition: 'opacity 0.4s'
          }}>
            <div style={{
              position: 'absolute', left: -22, top: 4,
              width: t.current ? 12 : 8, height: t.current ? 12 : 8,
              borderRadius: '50%',
              background: t.current ? 'var(--accent)' : 'var(--brown-900)',
              border: '2px solid #fff',
              boxShadow: t.current ? '0 0 0 3px var(--accent-soft)' : 'none',
              transform: t.current ? 'translateX(-2px)' : 'none'
            }} />
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 10,
              letterSpacing: 1.5, textTransform: 'uppercase',
              color: t.current ? 'var(--accent)' : 'var(--brown-500)', marginBottom: 3
            }}>{t.start}{t.end === 'now' ? ' — Present' : ` — ${t.end}`}</div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 22, fontWeight: 300, lineHeight: 1.1,
              color: 'var(--brown-900)', letterSpacing: -0.3
            }}>{t.role}</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11,
              color: 'var(--brown-600)', marginTop: 2
            }}>{t.company}</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Project card ─────────────────────────────────────────────
export const ProjectCard = ({ project, onOpen, layout = 'grid', titleScale = 1 }) => {
  const [hover, setHover] = useState(false)

  if (layout === 'mobile') {
    return (
      <div
        onClick={() => { posthog.capture('project opened', { project_id: project.id, project_title: project.title, project_company: project.company, layout: 'mobile' }); onOpen(project) }}
        style={{
          minHeight: '100svh',
          display: 'flex', flexDirection: 'column',
          borderBottom: '1px solid var(--brown-200)',
          cursor: 'pointer'
        }}
      >
        <div style={{ flex: '0 0 52vh', overflow: 'hidden' }}>
          <ImgPlaceholder height="100%" label={project.imgLabel} src={project.image}
            style={{ height: '52vh', borderRadius: 0 }} />
        </div>
        <div style={{ padding: '28px 24px 40px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <Eyebrow>{project.company} · {project.year}</Eyebrow>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 36 * titleScale, fontWeight: 300, lineHeight: 1.05,
            letterSpacing: -0.5, color: 'var(--brown-900)'
          }}>{project.title}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 14,
            color: 'var(--brown-600)', lineHeight: 1.55, flex: 1
          }}>{project.problem}</div>
          <div style={{ marginTop: 8 }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 56, fontWeight: 300, lineHeight: 0.9,
              color: 'var(--brown-900)', letterSpacing: -1.5
            }}>{project.metric}</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11,
              letterSpacing: 1.5, textTransform: 'uppercase',
              color: 'var(--brown-500)', marginTop: 6
            }}>{project.metricLabel}</div>
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div
        onClick={() => { posthog.capture('project opened', { project_id: project.id, project_title: project.title, project_company: project.company, layout: 'list' }); onOpen(project) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'grid', gridTemplateColumns: '160px 1fr auto',
          gap: 32, alignItems: 'center', padding: '32px 0',
          borderTop: '1px solid var(--brown-200)',
          cursor: 'pointer', transition: 'all 0.3s'
        }}
      >
        <div style={{ overflow: 'hidden', borderRadius: 5 }}>
          <ImgPlaceholder height={100} label={project.imgLabel} src={project.image}
            style={{ transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s' }} />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
            <Eyebrow>{project.company} · {project.year}</Eyebrow>
            {project.award && <Tag variant="award">★ {project.award}</Tag>}
          </div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 32 * titleScale, fontWeight: 300, lineHeight: 1.05,
            letterSpacing: -0.5, color: 'var(--brown-900)', marginBottom: 8
          }}>{project.title}</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'var(--brown-600)', maxWidth: 480, lineHeight: 1.5 }}>
            {project.problem}
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: 120 }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 56, fontWeight: 300, lineHeight: 0.9,
            color: 'var(--brown-900)', letterSpacing: -1
          }}>{project.metric}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 10,
            letterSpacing: 1.5, textTransform: 'uppercase',
            color: 'var(--brown-500)', marginTop: 6
          }}>{project.metricLabel}</div>
        </div>
      </div>
    )
  }

  // Grid layout
  return (
    <div
      onClick={() => { posthog.capture('project opened', { project_id: project.id, project_title: project.title, project_company: project.company, layout: 'grid' }); onOpen(project) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', position: 'relative',
        transition: 'transform 0.4s ease',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)'
      }}
    >
      <div style={{ overflow: 'hidden', borderRadius: 5, marginBottom: 20 }}>
        <ImgPlaceholder height={280} label={project.imgLabel} src={project.image}
          style={{ transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s ease' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
        <Eyebrow>{project.company} · {project.year}</Eyebrow>
        {project.award && <Tag variant="award">★ {project.award}</Tag>}
      </div>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 36 * titleScale, fontWeight: 300, lineHeight: 1.05,
        letterSpacing: -0.5, color: 'var(--brown-900)', marginBottom: 14
      }}>{project.title}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 50, fontWeight: 300, lineHeight: 0.9,
            color: 'var(--brown-900)', letterSpacing: -1.5
          }}>{project.metric}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11,
            letterSpacing: 1.5, textTransform: 'uppercase',
            color: 'var(--brown-500)', marginTop: 4
          }}>{project.metricLabel}</div>
        </div>
        <span style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
          letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--brown-500)',
          opacity: hover ? 1 : 0, transition: 'opacity 0.3s'
        }}>↗</span>
      </div>
    </div>
  )
}

// ─── Project modal ────────────────────────────────────────────
export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  function handleClose() {
    posthog.capture('project closed', { project_id: project.id, project_title: project.title })
    onClose()
  }

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(45, 30, 22, 0.55)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 32, animation: 'fadeIn 0.3s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg)', width: '100%', maxWidth: 920,
          maxHeight: '92vh', overflow: 'auto', position: 'relative',
          borderRadius: 5, animation: 'slideUp 0.4s cubic-bezier(.2,.8,.2,1)'
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: 24, right: 24, zIndex: 10,
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--bg)', border: '1px solid var(--brown-300)',
            fontFamily: 'DM Sans, sans-serif', fontSize: 20, color: 'var(--brown-900)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >×</button>
        <ImgPlaceholder height={400} label={project.imgLabel} src={project.image} style={{ borderRadius: '5px 5px 0 0' }} />
        <div style={{ padding: '48px 64px 64px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center' }}>
            <Eyebrow>{project.company} · {project.year}</Eyebrow>
            {project.award && <Tag variant="award">★ {project.award}</Tag>}
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 64, fontWeight: 300, lineHeight: 1.0,
            letterSpacing: -1.5, color: 'var(--brown-900)', marginBottom: 32
          }}>{project.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <Eyebrow>Problem</Eyebrow>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, lineHeight: 1.6, color: 'var(--brown-800)', marginTop: 14 }}>{project.problem}</p>
            </div>
            <div>
              <Eyebrow>Solution</Eyebrow>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, lineHeight: 1.6, color: 'var(--brown-800)', marginTop: 14 }}>{project.solution}</p>
              {project.links && project.links.length > 0 && (
                <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => posthog.capture('project link clicked', { project_id: project.id, project_title: project.title, link_label: link.label, link_url: link.url })}
                      style={{
                        display: 'inline-block', padding: '4px 12px',
                        background: 'transparent', color: 'var(--brown-800)',
                        border: '1px solid var(--brown-400)',
                        fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
                        letterSpacing: 0.3, borderRadius: 999,
                        textDecoration: 'none', transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--brown-900)'
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = 'var(--brown-900)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--brown-800)'
                        e.currentTarget.style.borderColor = 'var(--brown-400)'
                      }}
                    >↗ {link.label}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--brown-200)', paddingTop: 32 }}>
            <Eyebrow>Outcomes</Eyebrow>
            <div style={{ marginTop: 22 }}>
              {project.outcomes.map((o, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 24, padding: '18px 0',
                  borderBottom: i < project.outcomes.length - 1 ? '1px solid var(--brown-100)' : 'none',
                  alignItems: 'baseline'
                }}>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 24,
                    fontWeight: 300, color: 'var(--accent)', minWidth: 40
                  }}>0{i + 1}</span>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 26,
                    fontWeight: 300, color: 'var(--brown-900)', lineHeight: 1.3
                  }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
          {project.tags && (
            <div style={{ marginTop: 40, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
