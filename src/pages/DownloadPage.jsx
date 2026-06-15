import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const APP_URL = 'https://photo-petal-palette.lovable.app'

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
  </svg>
)

export default function DownloadPage() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setInstalled(true))
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      if (outcome === 'accepted') setInstalled(true)
      setInstallPrompt(null)
    } else {
      window.open(APP_URL, '_blank')
    }
  }

  // Portfolio images already in the project
  const photos = [
    '/zoe-portfolio/emi-1.jpg',
    '/zoe-portfolio/emi-6.jpg',
    '/zoe-portfolio/emi-2.jpg',
    '/zoe-portfolio/emi-7.jpg',
    '/zoe-portfolio/emi-8.jpg',
    '/zoe-portfolio/emi-9.jpg',
  ]

  return (
    <div style={{ background: '#F8F2E8', minHeight: '100vh', fontFamily: '"DM Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid rgba(44,26,14,0.08)', background: 'rgba(248,242,232,0.95)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ fontWeight: 700, letterSpacing: '0.3em', fontSize: 13, color: '#2C1A0E', textDecoration: 'none' }}>V I S I O N</Link>
          <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(44,26,14,0.5)', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>

        {/* Headline */}
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(44,26,14,0.4)', marginBottom: 12, textAlign: 'center' }}>GET THE APP</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#2C1A0E', textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Vision on your<br />home screen.
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(44,26,14,0.5)', textAlign: 'center', maxWidth: 340, lineHeight: 1.6, marginBottom: 40 }}>
          Available on iPhone and Android. No App Store needed — install directly from your browser.
        </p>

        {/* App preview — 3-column photo grid inside a phone frame */}
        <div style={{ position: 'relative', marginBottom: 48 }}>
          {/* Phone shell */}
          <div style={{ background: '#1A0D06', borderRadius: 44, padding: 8, boxShadow: '0 40px 100px rgba(44,26,14,0.25), 0 0 0 1px rgba(255,255,255,0.05)', width: 280 }}>
            <div style={{ background: '#F8F2E8', borderRadius: 37, overflow: 'hidden' }}>

              {/* Status bar */}
              <div style={{ padding: '12px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#2C1A0E' }}>9:41</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <div style={{ width: 14, height: 6, border: '1.5px solid rgba(44,26,14,0.35)', borderRadius: 2, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 1.5, right: 2.5, background: '#2C1A0E', borderRadius: 1 }} />
                  </div>
                </div>
              </div>

              {/* App header */}
              <div style={{ padding: '2px 18px 10px' }}>
                <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(44,26,14,0.35)' }}>V I S I O N</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#2C1A0E', marginTop: 1 }}>@snapsbyemi</div>
              </div>

              {/* Profile row */}
              <div style={{ padding: '0 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#D4C4A8', overflow: 'hidden', flexShrink: 0, border: '2.5px solid #2C1A0E' }}>
                  <img src="/creators/emi-avatar.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[['9', 'posts'], ['5.0', 'rating'], ['89', 'booked']].map(([v, l]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#2C1A0E' }}>{v}</div>
                      <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)', marginTop: 1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio + name */}
              <div style={{ padding: '0 18px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#2C1A0E' }}>Emi Chen</span>
                  <span style={{ background: '#FBE9D6', color: '#7A3A10', fontSize: 7.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>CREATIVE</span>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(44,26,14,0.5)', lineHeight: 1.45 }}>Wedding photographer capturing timeless moments.</div>
              </div>

              {/* Book button */}
              <div style={{ padding: '0 18px 12px' }}>
                <div style={{ background: '#2C1A0E', borderRadius: 24, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#F8F2E8' }}>Book This Package</div>
              </div>

              {/* Portfolio grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, padding: '0 0 2px' }}>
                {photos.map((src, i) => (
                  <div key={i} style={{ aspectRatio: '1/1', background: '#D4C4A8', overflow: 'hidden' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div style={{ padding: '8px 0 16px', borderTop: '1px solid rgba(44,26,14,0.07)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'white' }}>
                {['Home', 'Search', 'Chat', 'Profile'].map((label, i) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: i === 3 ? '#2C1A0E' : 'rgba(44,26,14,0.12)' }} />
                    <span style={{ fontSize: 7, fontWeight: i === 3 ? 700 : 400, color: i === 3 ? '#2C1A0E' : 'rgba(44,26,14,0.35)' }}>{label.toUpperCase()}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Floating review card */}
          <div style={{ position: 'absolute', bottom: 60, right: -60, background: 'white', borderRadius: 16, padding: '10px 14px', boxShadow: '0 8px 32px rgba(44,26,14,0.14)', width: 170, zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 2, marginBottom: 5 }}>
              {[0,1,2,3,4].map(i => (
                <svg key={i} viewBox="0 0 24 24" fill="#E8A030" style={{ width: 10, height: 10 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#2C1A0E', lineHeight: 1.45 }}>"Emi made us feel so at ease — our photos came out absolutely stunning."</div>
            <div style={{ fontSize: 9, color: 'rgba(44,26,14,0.4)', marginTop: 5 }}>— Sofia R.</div>
          </div>
        </div>

        {/* Download button */}
        <button
          onClick={handleInstall}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#2C1A0E', color: '#F8F2E8', padding: '15px 32px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 30px rgba(44,26,14,0.2)', transition: 'opacity 0.15s', marginBottom: 16 }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <DownloadIcon />
          {installed ? 'Installed ✓' : 'Download Vision'}
        </button>

        {/* Platform note */}
        <p style={{ fontSize: 12, color: 'rgba(44,26,14,0.4)', textAlign: 'center' }}>
          🍎 iPhone · 🤖 Android · 💻 Desktop &nbsp;—&nbsp; no app store required
        </p>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(44,26,14,0.08)', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, color: 'rgba(44,26,14,0.35)' }}>© {new Date().getFullYear()} Vision. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['/', 'Home'], ['/privacy', 'Privacy'], ['/terms', 'Terms'], ['/faq', 'FAQ']].map(([to, label]) => (
              <Link key={to} to={to} style={{ fontSize: 11, color: 'rgba(44,26,14,0.35)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
