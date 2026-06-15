import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const APP_URL = 'https://photo-petal-palette.lovable.app'

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
  </svg>
)

// ── Nav icons ─────────────────────────────────────────────────
const HomeNav  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const SearchNav= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const ChatNav  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const ProfileNav=()=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const MapPin   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:9,height:9}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const MsgIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const EyeIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:10,height:10}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const SpkIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:10,height:10}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
const StarIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:10,height:10}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

// ── Phone mockup ──────────────────────────────────────────────
function PhoneMockup() {
  const photos = [
    '/zoe-portfolio/emi-1.jpg',
    '/zoe-portfolio/emi-2.jpg',
    '/zoe-portfolio/emi-5.jpg',
    '/zoe-portfolio/emi-3.jpg',
    '/zoe-portfolio/emi-4.jpg',
    '/zoe-portfolio/emi-7.jpg',
    '/zoe-portfolio/emi-8.jpg',
    '/zoe-portfolio/emi-6.jpg',
    '/zoe-portfolio/emi-9.jpg',
  ]

  return (
    <div style={{ width: 270, flexShrink: 0 }}>
      <div style={{
        background: '#1A0D06',
        borderRadius: 48,
        padding: 9,
        boxShadow: '0 40px 100px rgba(44,26,14,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <div style={{ background: '#F0E8DC', borderRadius: 40, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Status bar */}
          <div style={{ padding: '13px 18px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0E8DC', flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#2C1A0E' }}>9:41</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {/* signal bars */}
              <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
                {[4,6,8,10].map((h,i) => <div key={i} style={{ width: 3, height: h, background: i < 3 ? 'rgba(44,26,14,0.5)' : 'rgba(44,26,14,0.2)', borderRadius: 1 }}/>)}
              </div>
              {/* wifi */}
              <div style={{ width: 13, height: 10, position: 'relative' }}>
                <svg viewBox="0 0 24 16" fill="none" style={{ width: 13, height: 10 }}>
                  <path d="M1 5C5.5 1 10.5 0 12 0s6.5 1 11 5" stroke="rgba(44,26,14,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M4 9c2-2.5 5-4 8-4s6 1.5 8 4" stroke="rgba(44,26,14,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M7.5 13c1.2-1.2 3-2 4.5-2s3.3.8 4.5 2" stroke="rgba(44,26,14,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="rgba(44,26,14,0.5)"/>
                </svg>
              </div>
              {/* battery */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <div style={{ width: 20, height: 10, border: '1.5px solid rgba(44,26,14,0.4)', borderRadius: 3, position: 'relative', padding: 1.5 }}>
                  <div style={{ background: 'rgba(44,26,14,0.7)', borderRadius: 1, height: '100%', width: '75%' }} />
                </div>
                <div style={{ width: 2, height: 5, background: 'rgba(44,26,14,0.35)', borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* VISION + handle */}
          <div style={{ padding: '6px 16px 8px', flexShrink: 0 }}>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.24em', color: 'rgba(44,26,14,0.4)' }}>V I S I O N</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#2C1A0E', marginTop: 2, lineHeight: 1 }}>@snapsbyemi</div>
          </div>

          {/* Avatar + stat cards */}
          <div style={{ padding: '0 16px 10px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {/* Avatar */}
            <div style={{ width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(44,26,14,0.15)', background: '#D4C4A8' }}>
              <img src="/creators/emi-avatar.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
            </div>
            {/* Stat cards */}
            <div style={{ display: 'flex', gap: 7, flex: 1 }}>
              <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '7px 0', textAlign: 'center', border: '1px solid rgba(44,26,14,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#2C1A0E' }}>5.0</span>
                  <svg viewBox="0 0 24 24" fill="#2C1A0E" style={{ width: 10, height: 10 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)', fontWeight: 600, letterSpacing: '0.06em', marginTop: 2 }}>RATING</div>
              </div>
              <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '7px 0', textAlign: 'center', border: '1px solid rgba(44,26,14,0.07)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#2C1A0E' }}>89</div>
                <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)', fontWeight: 600, letterSpacing: '0.06em', marginTop: 2 }}>BOOKED</div>
              </div>
            </div>
          </div>

          {/* Name + tag + location + bio */}
          <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#2C1A0E' }}>Emi</span>
              <span style={{ background: '#FBE9D6', color: '#7A3A10', fontSize: 8, fontWeight: 700, padding: '2px 8px', borderRadius: 999 }}>CREATIVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(44,26,14,0.5)', marginBottom: 5 }}>
              <MapPin />
              <span style={{ fontSize: 10 }}>Los Angeles</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(44,26,14,0.6)', lineHeight: 1.5 }}>Wedding photographer capturing timeless moments. Available for bookings.</div>
          </div>

          {/* Message button */}
          <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
            <div style={{ background: '#EFE5D8', borderRadius: 24, padding: '9px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px solid rgba(44,26,14,0.08)' }}>
              <MsgIcon />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2C1A0E' }}>Message Emi Chen</span>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ padding: '0 16px 0', display: 'flex', gap: 6, flexShrink: 0 }}>
            {[
              { label: 'Portfolio', Icon: EyeIcon,  active: true  },
              { label: 'Services',  Icon: SpkIcon,  active: false },
              { label: 'Reviews',   Icon: StarIcon, active: false },
            ].map(({ label, Icon, active }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '7px 10px', borderRadius: 999,
                background: active ? '#2C1A0E' : 'transparent',
                color: active ? '#F8F2E8' : 'rgba(44,26,14,0.45)',
                fontSize: 10, fontWeight: active ? 700 : 500,
              }}>
                <Icon /> {label}
              </div>
            ))}
          </div>

          {/* Portfolio grid — portrait ratio, 3 cols, 3 rows */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginTop: 8, flexShrink: 0 }}>
            {photos.map((src, i) => (
              <div key={i} style={{ aspectRatio: '3/4', background: '#D4C4A8', overflow: 'hidden' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div style={{
            background: 'white',
            borderTop: '1px solid rgba(44,26,14,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            padding: '8px 8px 14px', flexShrink: 0,
          }}>
            {[
              { label: 'HOME',    Icon: HomeNav,   active: false },
              { label: 'SEARCH',  Icon: SearchNav, active: false },
              { label: '+',       Icon: null,      active: false, plus: true },
              { label: 'CHAT',    Icon: ChatNav,   active: false },
              { label: 'PROFILE', Icon: ProfileNav,active: true  },
            ].map(({ label, Icon, active, plus }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                {plus ? (
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F8F2E8" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                ) : (
                  <>
                    <div style={{ color: active ? '#2C1A0E' : 'rgba(44,26,14,0.3)' }}><Icon /></div>
                    <span style={{ fontSize: 6.5, fontWeight: active ? 700 : 500, color: active ? '#2C1A0E' : 'rgba(44,26,14,0.35)', letterSpacing: '0.04em' }}>{label}</span>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
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

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(44,26,14,0.4)', marginBottom: 12, textAlign: 'center' }}>GET THE APP</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#2C1A0E', textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Vision on your<br />home screen.
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(44,26,14,0.5)', textAlign: 'center', maxWidth: 340, lineHeight: 1.6, marginBottom: 48 }}>
          Available on iPhone and Android. No App Store needed — install directly from your browser.
        </p>

        {/* Phone */}
        <div style={{ marginBottom: 48 }}>
          <PhoneMockup />
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

        <p style={{ fontSize: 12, color: 'rgba(44,26,14,0.4)', textAlign: 'center' }}>
          🍎 iPhone · 🤖 Android · 💻 Desktop &nbsp;—&nbsp; no app store required
        </p>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(44,26,14,0.08)', padding: '20px 24px' }}>
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
