import { useState } from 'react'
import posthog from 'posthog-js'
import {
  PhotoSlideshow, LinkedInBtn, GitHubBtn,
  AwardStrip, Eyebrow, ImgPlaceholder, Tag,
  HorizontalTimeline, VerticalTimeline,
  ProjectCard, ProjectModal
} from './components'

// ─── Top nav ──────────────────────────────────────────────────
const TopNav = ({ profile, mobile }) => (
  <header style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: mobile ? '20px 24px' : '28px 80px',
    borderBottom: '1px solid var(--brown-200)',
    background: 'var(--bg)',
    position: 'sticky', top: 0, zIndex: 50
  }}>
    <div style={{
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: mobile ? 22 : 26, fontWeight: 400,
      color: 'var(--brown-900)', letterSpacing: -0.3
    }}>
      {profile.firstName} <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{profile.lastName}</em>
    </div>
    {!mobile && (
      <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {['About', 'Work', 'Contact'].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500,
            letterSpacing: 1.5, textTransform: 'uppercase',
            color: 'var(--brown-800)', textDecoration: 'none'
          }}>{l}</a>
        ))}
        <LinkedInBtn size="sm" label="LinkedIn" href={profile.linkedin} />
        <GitHubBtn size="sm" variant="outline" label="GitHub" href={profile.github} />
      </nav>
    )}
    {mobile && <Eyebrow>PMM</Eyebrow>}
  </header>
)

// ─── Hero ─────────────────────────────────────────────────────
const Hero = ({ profile, mobile, titleScale = 1 }) => (
  <section style={{
    padding: mobile ? '40px 24px 60px' : '80px 80px 100px',
    borderBottom: '1px solid var(--brown-200)'
  }}>
    <div style={{
      display: mobile ? 'block' : 'grid',
      gridTemplateColumns: mobile ? null : '1fr auto',
      gap: mobile ? 40 : 80, alignItems: 'end'
    }}>
      <div>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: (mobile ? 88 : 200) * titleScale,
          fontWeight: 300, lineHeight: 0.88,
          letterSpacing: mobile ? -3 : -8,
          color: 'var(--brown-900)'
        }}>
          {profile.firstName}
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgb(143, 99, 82)' }}>
            {profile.lastName}
          </em>
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: mobile ? 14 : 16,
          color: 'var(--brown-700)',
          marginTop: mobile ? 24 : 40,
          maxWidth: mobile ? '100%' : 480,
          lineHeight: 1.55, fontWeight: 400
        }}>
          {profile.tagline}
        </div>
        <AwardStrip mobile={mobile} awards={[
          { name: 'Dev Portal Awards', detail: 'Winner', year: '2024' },
          { name: 'Awwwards', detail: 'Site of the Day', year: '2023' }
        ]} />
        <div style={{
          marginTop: mobile ? 24 : 36,
          display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'
        }}>
          <LinkedInBtn size={mobile ? 'md' : 'lg'} href={profile.linkedin} />
          <GitHubBtn size={mobile ? 'md' : 'lg'} variant="outline" href={profile.github} />
        </div>
      </div>
      <div style={{ marginTop: mobile ? 60 : 0 }}>
        <PhotoSlideshow size={mobile ? 220 : 280} rounded="50%" images={profile.photos} labels={profile.photos} />
        <div style={{ height: 30 }} />
        <Eyebrow style={{ display: 'block', marginTop: 8, textAlign: 'center' }}>
          {profile.role}
        </Eyebrow>
      </div>
    </div>
  </section>
)

// ─── Metrics strip ────────────────────────────────────────────
const Metrics = ({ metrics, mobile }) => (
  <section style={{
    padding: mobile ? '50px 24px' : '70px 80px',
    borderBottom: '1px solid var(--brown-200)',
    background: 'var(--accent-soft)'
  }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: mobile ? 32 : 24
    }}>
      {metrics.map((m, i) => (
        <div key={i} style={{
          paddingLeft: mobile ? 0 : 24,
          borderLeft: mobile ? 'none' : '1px solid var(--brown-300)',
          display: 'flex', alignItems: 'baseline', gap: mobile ? 12 : 16, flexWrap: 'wrap'
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: mobile ? 48 : 72,
            fontWeight: 300, lineHeight: 0.9,
            color: 'var(--brown-900)', letterSpacing: -2
          }}>{m.value}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11,
            letterSpacing: 1.5, textTransform: 'uppercase',
            color: 'var(--brown-600)'
          }}>{m.label}</div>
        </div>
      ))}
    </div>
  </section>
)

// ─── About + Career + Skills (combined section) ───────────────
const AboutCareerSkills = ({ profile, timeline, skills, tools, mobile, titleScale = 1 }) => (
  <section id="about" style={{
    padding: mobile ? '50px 24px 60px' : '100px 80px',
    borderBottom: '1px solid var(--brown-200)',
    background: 'var(--bg-warm)'
  }}>
    {/* About */}
    <div style={{
      display: mobile ? 'block' : 'grid',
      gridTemplateColumns: mobile ? null : '1fr 1.4fr',
      gap: mobile ? 28 : 100, alignItems: 'start',
      marginBottom: mobile ? 48 : 80
    }}>
      <div>
        <Eyebrow>About</Eyebrow>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: (mobile ? 44 : 80) * titleScale,
          fontWeight: 300, lineHeight: 0.95,
          letterSpacing: -1.5, color: 'var(--brown-900)',
          marginTop: 12, marginBottom: 20
        }}>
          Curiosity as a career{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>strategy.</em>
        </h2>
      </div>
      <div>
        {profile.bio.map((p, i) => (
          <p key={i} style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: mobile ? 14 : 18,
            lineHeight: 1.65, color: 'var(--brown-800)',
            marginBottom: i < profile.bio.length - 1 ? 18 : 0,
            fontWeight: 400
          }}>{p}</p>
        ))}
      </div>
    </div>

    {/* Career */}
    <div style={{ marginBottom: mobile ? 36 : 56 }}>
      <Eyebrow>Career</Eyebrow>
      {mobile ? (
        <div style={{ marginTop: 24 }}>
          <VerticalTimeline timeline={timeline} />
        </div>
      ) : (
        <div style={{ paddingTop: 24, paddingLeft: 40, paddingRight: 40 }}>
          <HorizontalTimeline timeline={timeline} />
        </div>
      )}
    </div>

    {/* Skills */}
    <div style={{ marginBottom: mobile ? 32 : 48 }}>
      <Eyebrow>Skills</Eyebrow>
      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {skills.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>
    </div>

    {/* Tools */}
    <div>
      <Eyebrow>Tools & Code</Eyebrow>
      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tools.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  </section>
)

// ─── Work section ─────────────────────────────────────────────
const WorkSection = ({ projects, onOpen, layout, titleScale = 1, mobile, linkedin }) => (
  <section id="work" style={{ padding: mobile ? '60px 0 0' : '120px 80px' }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      marginBottom: mobile ? 40 : 80,
      padding: mobile ? '0 24px' : undefined
    }}>
      <div>
        <Eyebrow>Selected work</Eyebrow>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: (mobile ? 48 : 96) * titleScale,
          fontWeight: 300, lineHeight: 0.95,
          letterSpacing: -2, color: 'var(--brown-900)', marginTop: 16
        }}>
          Case <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>studies</em>
        </h2>
      </div>
      {!mobile && <Eyebrow>Projects</Eyebrow>}
    </div>

    {mobile ? (
      <div>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} layout="mobile" titleScale={titleScale} />
        ))}
      </div>
    ) : layout === 'list' ? (
      <div>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} layout="list" titleScale={titleScale} />
        ))}
        <div style={{ borderTop: '1px solid var(--brown-200)' }} />
      </div>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '80px 64px' }}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} layout="grid" titleScale={titleScale} />
        ))}
      </div>
    )}

    <div style={{ marginTop: mobile ? 48 : 80, textAlign: 'center', padding: mobile ? '0 24px 60px' : undefined }}>
      <LinkedInBtn size={mobile ? 'md' : 'lg'} href={linkedin} label="Connect on LinkedIn" />
    </div>
  </section>
)

// ─── Contact footer ───────────────────────────────────────────
const Contact = ({ profile, mobile, titleScale = 1 }) => (
  <section id="contact" style={{
    padding: mobile ? '70px 24px 50px' : '100px 80px 80px',
    background: 'var(--brown-900)', color: '#fff'
  }}>
    <div style={{ maxWidth: 900 }}>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: (mobile ? 56 : 120) * titleScale,
        fontWeight: 300, lineHeight: 0.95,
        letterSpacing: mobile ? -2 : -4, color: '#fff',
        marginBottom: 32
      }}>
        Let&apos;s <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>chat.</em>
      </h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture('contact reached out', { href: profile.linkedin })} style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: 'var(--accent)', color: 'var(--brown-900)',
          padding: mobile ? '12px 20px' : '16px 28px',
          fontFamily: 'DM Sans, sans-serif', fontSize: mobile ? 13 : 14,
          fontWeight: 500, letterSpacing: 0.3,
          textDecoration: 'none', borderRadius: 5, border: '1px solid var(--accent)'
        }}>Reach out →</a>
        <LinkedInBtn size={mobile ? 'md' : 'lg'} variant="outline" href={profile.linkedin} />
        <GitHubBtn size={mobile ? 'md' : 'lg'} variant="outline" href={profile.github} />
      </div>
    </div>
    <div style={{
      marginTop: mobile ? 60 : 100,
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      fontFamily: 'DM Sans, sans-serif', fontSize: 11,
      letterSpacing: 1.5, textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.4)'
    }}>
      <span>© {profile.firstName} {profile.lastName}</span>
      <span>Designed with care. Vibe coded independently.</span>
    </div>
  </section>
)

// ─── Full Portfolio ───────────────────────────────────────────
export const Portfolio = ({ content, mobile = false, titleScale = 1, layout = 'grid' }) => {
  const [active, setActive] = useState(null)
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--brown-900)' }}>
      <TopNav profile={content.profile} mobile={mobile} />
      <Hero profile={content.profile} mobile={mobile} titleScale={titleScale} />
      <Metrics metrics={content.metrics} mobile={mobile} />
      <AboutCareerSkills
        profile={content.profile}
        timeline={content.timeline}
        skills={content.skills}
        tools={content.tools}
        mobile={mobile}
        titleScale={titleScale}
      />
      <WorkSection
        projects={content.projects}
        onOpen={setActive}
        layout={layout}
        titleScale={titleScale}
        mobile={mobile}
        linkedin={content.profile.linkedin}
      />
      <Contact profile={content.profile} mobile={mobile} titleScale={titleScale} />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  )
}
