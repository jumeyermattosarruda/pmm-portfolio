// Main portfolio layout — desktop & mobile.
// Reads content from window.PORTFOLIO_CONTENT (loaded by host).

const { useState, useEffect } = React;

// ─── Hero — fashion-magazine oversized type ──────────────────
const Hero = ({ profile, mobile, titleScale = 1 }) =>
<section style={{
  padding: mobile ? '40px 24px 60px' : '80px 80px 100px',
  borderBottom: '1px solid var(--brown-200)',
  position: 'relative'
}}>
    {/* Top eyebrow */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 50 : 90 }}>
      <Eyebrow>{profile.location}</Eyebrow>
      <Eyebrow>Portfolio</Eyebrow>
    </div>

    <div style={{ display: mobile ? 'block' : 'grid', gridTemplateColumns: mobile ? null : '1fr auto', gap: mobile ? 40 : 80, alignItems: 'end' }}>
      <div>
        <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: (mobile ? 88 : 200) * titleScale,
        fontWeight: 300,
        lineHeight: 0.88,
        letterSpacing: mobile ? -3 : -8,
        color: 'var(--brown-900)'
      }}>
          {profile.firstName}
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: "rgb(143, 99, 82)" }}>{profile.lastName}</em>
        </div>
        <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: mobile ? 14 : 16,
        color: 'var(--brown-700)',
        marginTop: mobile ? 24 : 40,
        maxWidth: mobile ? '100%' : 480,
        lineHeight: 1.55,
        fontWeight: 400
      }}>
          {profile.tagline}
        </div>
        <AwardStrip mobile={mobile} awards={[
        { name: 'Dev Portal Awards', detail: 'Winner', year: '2024' },
        { name: 'Awwwards', detail: 'Site of the Day', year: '2023' }]} />
        <div style={{
        marginTop: mobile ? 24 : 36,
        display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'
      }}>
          <LinkedInBtn size={mobile ? 'md' : 'lg'} />
          <a href="#work" style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
          color: 'var(--brown-800)', textDecoration: 'none',
          letterSpacing: 1.5, textTransform: 'uppercase',
          borderBottom: '1px solid var(--brown-900)', paddingBottom: 4
        }}>View work ↓</a>
        </div>
      </div>
      <div style={{ marginTop: mobile ? 60 : 0 }}>
        <PhotoSlideshow size={mobile ? 220 : 280} rounded="0" />
        <div style={{ height: 30 }} />
        <Eyebrow style={{ display: 'block', marginTop: 8, textAlign: 'center' }}>{profile.role}</Eyebrow>
      </div>
    </div>
  </section>;


// ─── Metrics strip ───────────────────────────────────────────
const Metrics = ({ metrics, mobile }) =>
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
      {metrics.map((m, i) =>
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
    )}
    </div>
  </section>;


// ─── Work section ────────────────────────────────────────────
const WorkSection = ({ projects, onOpen, layout, titleScale, mobile }) =>
<section id="work" style={{ padding: mobile ? '60px 24px' : '120px 80px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: mobile ? 40 : 80 }}>
      <div>
        <Eyebrow>Selected work</Eyebrow>
        <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: (mobile ? 48 : 96) * titleScale,
        fontWeight: 300, lineHeight: 0.95,
        letterSpacing: -2, color: 'var(--brown-900)',
        marginTop: 16
      }}>
          Case <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>studies</em>
        </h2>
      </div>
      {!mobile &&
    <Eyebrow>Projects</Eyebrow>
    }
    </div>

    {layout === 'list' || mobile ?
  <div>
        {projects.map((p) => <ProjectCard key={p.id} project={p} onOpen={onOpen} layout="list" titleScale={titleScale} />)}
        <div style={{ borderTop: '1px solid var(--brown-200)' }} />
      </div> :

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '80px 64px'
  }}>
        {projects.map((p) => <ProjectCard key={p.id} project={p} onOpen={onOpen} layout="grid" titleScale={titleScale} />)}
      </div>
  }
  </section>;


// ─── About + Career + Skills (grouped) ────────────────────────
const AboutCareerSkills = ({ profile, timeline, skills, mobile, titleScale }) =>
<section style={{
  padding: mobile ? '50px 24px 60px' : '100px 80px 100px',
  borderTop: '1px solid var(--brown-200)',
  borderBottom: '1px solid var(--brown-200)',
  background: 'var(--bg-warm)'
}}>
  {/* About */}
  <div style={{ display: mobile ? 'block' : 'grid', gridTemplateColumns: mobile ? null : '1fr 1.4fr', gap: mobile ? 28 : 100, alignItems: 'start', marginBottom: mobile ? 40 : 80 }}>
    <div>
      <Eyebrow>About</Eyebrow>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: (mobile ? 44 : 80) * titleScale,
        fontWeight: 300, lineHeight: 0.95,
        letterSpacing: -1.5, color: 'var(--brown-900)',
        marginTop: 12, margin: "12px 0px 20px"
      }}>
        Curiosity as a career <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>strategy.</em>
      </h2>
    </div>
    <div>
      {profile.bio.map((p, i) =>
      <p key={i} style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: mobile ? 14 : 18,
        lineHeight: 1.65,
        color: 'var(--brown-800)',
        marginBottom: 18,
        fontWeight: 400, marginTop: 0
      }}>{p}</p>
      )}
    </div>
  </div>

  {/* Career */}
  <div style={{ marginBottom: mobile ? 36 : 56 }}>
    <Eyebrow>Career</Eyebrow>
    {mobile ?
    <div style={{ marginTop: 24 }}>
        <VerticalTimeline timeline={timeline} />
      </div> :
    <div style={{ paddingTop: 24, paddingLeft: 40, paddingRight: 40 }}>
        <HorizontalTimeline timeline={timeline} />
      </div>
    }
  </div>

  {/* Skills */}
  <div>
    <Eyebrow>Skills & tools</Eyebrow>
    <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {skills.map((s) => <Tag key={s}>{s}</Tag>)}
    </div>
  </div>
</section>;


// ─── About ───────────────────────────────────────────────────
const About = ({ profile, mobile, titleScale }) =>
<section style={{ ...{
    padding: mobile ? '60px 24px' : '120px 80px',
    borderTop: '1px solid var(--brown-200)',
    borderBottom: '1px solid var(--brown-200)',
    background: 'var(--bg-warm)'
  }, padding: "120px 80px 40px" }}>
    <div style={{ display: mobile ? 'block' : 'grid', gridTemplateColumns: mobile ? null : '1fr 1.4fr', gap: mobile ? 40 : 100, alignItems: 'start' }}>
      <div>
        <Eyebrow>About</Eyebrow>
        <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: (mobile ? 48 : 80) * titleScale,
        fontWeight: 300, lineHeight: 0.95,
        letterSpacing: -1.5, color: 'var(--brown-900)',
        marginTop: 16, margin: "0px", padding: "10px"
      }}>
          Curiosity as a career <em style={{ fontStyle: 'italic', color: 'var(--accent)', padding: "10px" }}>strategy.</em>
        </h2>
      </div>
      <div>
        {profile.bio.map((p, i) =>
      <p key={i} style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: mobile ? 15 : 18,
        lineHeight: 1.65,
        color: 'var(--brown-800)',
        marginBottom: 24,
        fontWeight: 400, margin: "20px 0px 24px"
      }}>{p}</p>
      )}
      </div>
    </div>
  </section>;


// ─── Career timeline section ─────────────────────────────────
const CareerSection = ({ timeline, mobile, titleScale }) =>
<section style={{ ...{ padding: mobile ? '70px 24px 80px' : '140px 80px' }, padding: "10px 80px 20px" }}>
    <div style={{ marginBottom: mobile ? 40 : 70, textAlign: 'center' }}>
      <Eyebrow>Career</Eyebrow>
      <h2 style={{
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: (mobile ? 44 : 80) * titleScale,
      fontWeight: 300, lineHeight: 0.95,
      letterSpacing: -1.5, color: 'var(--brown-900)',
      marginTop: 16
    }}>
         <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}></em>
      </h2>
    </div>
    <div style={{ paddingLeft: mobile ? 0 : 40, paddingRight: mobile ? 0 : 40 }}>
      <HorizontalTimeline timeline={timeline} />
    </div>
  </section>;


// ─── Skills ──────────────────────────────────────────────────
const Skills = ({ skills, mobile }) =>
<section style={{ ...{
    padding: mobile ? '60px 24px' : '100px 80px',
    borderTop: '1px solid var(--brown-200)',
    background: 'var(--bg-warm)'
  }, padding: "20px 80px 40px" }}>
    <Eyebrow>Skills & tools</Eyebrow>
    <div style={{
    marginTop: 28,
    display: 'flex', flexWrap: 'wrap', gap: 10
  }}>
      {skills.map((s) => <Tag key={s}>{s}</Tag>)}
    </div>
  </section>;


// ─── Contact footer ──────────────────────────────────────────
const Contact = ({ profile, mobile, titleScale }) =>
<section style={{ ...{
    padding: mobile ? '70px 24px 50px' : '140px 80px 80px',
    background: 'var(--brown-900)', color: '#fff'
  }, padding: "40px 80px 80px" }}>
    <div style={{ maxWidth: 900 }}>
      <Eyebrow color="var(--accent)"></Eyebrow>
      <h2 style={{
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: (mobile ? 56 : 120) * titleScale,
      fontWeight: 300, lineHeight: 0.95,
      letterSpacing: mobile ? -2 : -4, color: '#fff',
      marginTop: 20, marginBottom: 32
    }}>
        Let&apos;s <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>chat.</em>
      </h2>
      <p style={{
      fontFamily: 'DM Sans, sans-serif',
      fontSize: mobile ? 16 : 22,
      lineHeight: 1.5, color: 'rgba(255,255,255,0.7)',
      marginBottom: 40, maxWidth: 600
    }}>{profile.openTo}. Always happy to chat about GTM, dev marketing, or alts.</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href={`mailto:${profile.email}`} style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        background: 'var(--accent)', color: 'var(--brown-900)',
        padding: mobile ? '12px 20px' : '16px 28px',
        fontFamily: 'DM Sans, sans-serif', fontSize: mobile ? 13 : 14,
        fontWeight: 500, letterSpacing: 0.3,
        textDecoration: 'none', border: '1px solid var(--accent)'
      }}>Reach out →</a>
        <LinkedInBtn size={mobile ? 'md' : 'lg'} variant="outline" />
      </div>
    </div>
    <div style={{
    marginTop: mobile ? 60 : 100,
    paddingTop: 24,
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', justifyContent: 'space-between',
    fontFamily: 'DM Sans, sans-serif', fontSize: 11,
    letterSpacing: 1.5, textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)'
  }}>
      <span>© {profile.firstName} {profile.lastName}</span>
      <span>DESIGNED WITH CARE, VIBE CODED INDEPENDENTLY.</span>
    </div>
  </section>;


// ─── Top nav ─────────────────────────────────────────────────
const TopNav = ({ profile, mobile }) =>
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
    {!mobile &&
  <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {['Work', 'Career', 'About', 'Contact'].map((l) =>
    <a key={l} href={`#${l.toLowerCase()}`} style={{
      fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500,
      letterSpacing: 1.5, textTransform: 'uppercase',
      color: 'var(--brown-800)', textDecoration: 'none'
    }}>{l}</a>
    )}
        <LinkedInBtn size="sm" label="LinkedIn" />
        <GitHubBtn size="sm" variant="outline" label="GitHub" href={profile.github} />
      </nav>
  }
    {mobile &&
  <Eyebrow>Menu</Eyebrow>
  }
  </header>;


// ─── Full Portfolio ──────────────────────────────────────────
const Portfolio = ({ content, mobile = false, titleScale = 1, layout = 'grid' }) => {
  const [active, setActive] = useState(null);
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--brown-900)' }}>
      <TopNav profile={content.profile} mobile={mobile} />
      <Hero profile={content.profile} mobile={mobile} titleScale={titleScale} />
      <Metrics metrics={content.metrics} mobile={mobile} />
      <AboutCareerSkills profile={content.profile} timeline={content.timeline} skills={content.skills} mobile={mobile} titleScale={titleScale} />
      <WorkSection projects={content.projects} onOpen={setActive} layout={layout} titleScale={titleScale} mobile={mobile} />
      <Contact profile={content.profile} mobile={mobile} titleScale={titleScale} />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>);

};

Object.assign(window, { Portfolio });