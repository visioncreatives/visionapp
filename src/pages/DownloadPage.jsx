import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const APP_URL = 'https://app.joinvision.app'

// ── Detect platform ───────────────────────────────────────────
function getPlatform() {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  return 'other'
}

// ── Icons ─────────────────────────────────────────────────────
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
)
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const PlusBoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
)
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
  </svg>
)
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

// ── Phone mockup ─────────────────────────────────────────────
function PhoneMockup() {
  const photos = [1, 2, 4, 5, 6, 7].map(n => `/zoe-portfolio/emi-${n}.jpg`)

  return (
    <div style={{ width: 220, flexShrink: 0 }}>
      {/* Phone shell */}
      <div style={{ background: '#1A0D06', borderRadius: 36, padding: 7, boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)' }}>
        <div style={{ background: '#F8F2E8', borderRadius: 30, overflow: 'hidden', height: 440, display: 'flex', flexDirection: 'column' }}>

          {/* Status bar */}
          <div style={{ padding: '10px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#2C1A0E' }}>9:41</span>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 12, height: 5, border: '1px solid rgba(44,26,14,0.4)', borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 1, right: 2, background: '#2C1A0E', borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* App header */}
          <div style={{ padding: '4px 14px 8px', flexShrink: 0 }}>
            <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(44,26,14,0.4)' }}>V I S I O N</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#2C1A0E', marginTop: 2 }}>@snapsbyemi</div>
          </div>

          {/* Profile row */}
          <div style={{ padding: '0 14px 10px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#D4C4A8', overflow: 'hidden', flexShrink: 0, border: '2px solid #2C1A0E' }}>
              <img src="/creators/emi-avatar.jpg" alt="Emi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#2C1A0E' }}>9</div>
                  <div style={{ fontSize: 7, color: 'rgba(44,26,14,0.45)' }}>posts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#2C1A0E' }}>5.0</div>
                  <div style={{ fontSize: 7, color: 'rgba(44,26,14,0.45)' }}>rating</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#2C1A0E' }}>89</div>
                  <div style={{ fontSize: 7, color: 'rgba(44,26,14,0.45)' }}>booked</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div style={{ padding: '0 14px 10px', flexShrink: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 10, color: '#2C1A0E' }}>Emi Chen <span style={{ background: '#FBE9D6', color: '#7A3A10', fontSize: 7, fontWeight: 700, padding: '1px 6px', borderRadius: 999, marginLeft: 3 }}>CREATIVE</span></div>
            <div style={{ fontSize: 8, color: 'rgba(44,26,14,0.55)', marginTop: 2, lineHeight: 1.4 }}>Wedding photographer capturing timeless moments.</div>
          </div>

          {/* Book button */}
          <div style={{ padding: '0 14px 10px', flexShrink: 0 }}>
            <div style={{ background: '#2C1A0E', borderRadius: 20, padding: '6px 0', textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#F8F2E8' }}>Book This Package</div>
          </div>

          {/* Portfolio grid */}
          <div style={{ flex: 1, padding: '0 14px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
              {photos.map((src, i) => (
                <div key={i} style={{ aspectRatio: '1/1', background: '#D4C4A8', overflow: 'hidden', borderRadius: 3 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{ padding: '6px 0 12px', borderTop: '1px solid rgba(44,26,14,0.07)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexShrink: 0, background: 'white' }}>
            {['Home', 'Search', 'Chat', 'Profile'].map((label, i) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: i === 3 ? '#2C1A0E' : 'rgba(44,26,14,0.15)' }} />
                <span style={{ fontSize: 6, fontWeight: i === 3 ? 700 : 400, color: i === 3 ? '#2C1A0E' : 'rgba(44,26,14,0.4)' }}>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating review card */}
      <div style={{ background: 'white', borderRadius: 16, padding: '10px 14px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', marginTop: -28, marginLeft: -20, marginRight: 20, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: 3, color: '#E8A030', marginBottom: 4 }}>
          {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#2C1A0E', lineHeight: 1.4 }}>"Emi made us feel so at ease — our photos came out absolutely stunning."</div>
        <div style={{ fontSize: 8, color: 'rgba(44,26,14,0.4)', marginTop: 4 }}>— Sofia R.</div>
      </div>
    </div>
  )
}

// ── Step card ─────────────────────────────────────────────────
function Step({ n, icon, title, desc, active }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 14,
      padding: '14px 16px', borderRadius: 16,
      background: active ? 'rgba(248,242,232,0.12)' : 'transparent',
      border: active ? '1px solid rgba(248,242,232,0.15)' : '1px solid transparent',
      transition: 'all 0.2s',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: active ? '#F8F2E8' : 'rgba(248,242,232,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: active ? '#2C1A0E' : 'rgba(248,242,232,0.5)',
        transition: 'all 0.2s',
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(248,242,232,0.45)', letterSpacing: '0.08em', marginBottom: 2 }}>STEP {n}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: active ? '#F8F2E8' : 'rgba(248,242,232,0.55)', lineHeight: 1.3, transition: 'all 0.2s' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'rgba(248,242,232,0.45)', marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function DownloadPage() {
  const [platform, setPlatform] = useState('other')
  const [activeTab, setActiveTab] = useState('ios')
  const [activeStep, setActiveStep] = useState(0)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const p = getPlatform()
    setPlatform(p)
    if (p === 'android') setActiveTab('android')
    else setActiveTab('ios')

    // Capture install prompt for Android/Chrome
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setInstalled(true))
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  // Animate through steps automatically
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % (activeTab === 'ios' ? 4 : 4))
    }, 2000)
    return () => clearInterval(intervalRef.current)
  }, [activeTab])

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

  const iosSteps = [
    { icon: <ShareIcon />, title: 'Open in Safari', desc: 'Visit joinvision.app/download in Safari (not Chrome) on your iPhone or iPad.' },
    { icon: <ShareIcon />, title: 'Tap the Share button', desc: 'Find the Share icon (box with an arrow) at the bottom of your Safari browser.' },
    { icon: <PlusBoxIcon />, title: 'Add to Home Screen', desc: 'Scroll down in the share sheet and tap "Add to Home Screen".' },
    { icon: <HomeIcon />, title: 'Tap Add — you\'re in', desc: 'Vision appears on your home screen and opens just like a native app.' },
  ]

  const androidSteps = [
    { icon: <ShareIcon />, title: 'Open in Chrome', desc: 'Visit joinvision.app/download in Chrome on your Android phone.' },
    { icon: <MenuIcon />, title: 'Tap the menu (⋮)', desc: 'Tap the three-dot menu in the top-right corner of Chrome.' },
    { icon: <PlusBoxIcon />, title: 'Tap "Add to Home Screen"', desc: 'Select "Add to Home Screen" or "Install App" from the menu.' },
    { icon: <HomeIcon />, title: 'Tap Install — done', desc: 'Vision installs instantly and lives on your home screen like a native app.' },
  ]

  const steps = activeTab === 'ios' ? iosSteps : androidSteps

  const features = [
    { label: 'No App Store required' },
    { label: 'Free to install' },
    { label: 'Works on any device' },
    { label: 'Feels like a native app' },
    { label: 'Always up to date' },
    { label: 'Secure & fast' },
  ]

  return (
    <div className="bg-cream-100 min-h-screen font-sans">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-cream-200/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-vision text-espresso text-sm">V I S I O N</Link>
          <a href={APP_URL} className="text-sm font-semibold text-espresso/70 hover:text-espresso transition-colors">Open App</a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: '#2C1A0E', overflow: 'hidden', position: 'relative' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,196,160,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,200,232,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy + steps */}
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(248,242,232,0.1)', border: '1px solid rgba(248,242,232,0.15)', borderRadius: 999, padding: '5px 14px', marginBottom: 24 }}>
                <DownloadIcon />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#F8F2E8', letterSpacing: '0.06em' }}>PROGRESSIVE WEB APP</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#F8F2E8', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Vision on your<br />home screen.
              </h1>
              <p style={{ marginTop: 16, fontSize: 16, color: 'rgba(248,242,232,0.6)', lineHeight: 1.65, maxWidth: 420 }}>
                No App Store. No friction. Install Vision directly from your browser in under 30 seconds — on any iPhone, Android, or desktop.
              </p>

              {/* Platform tabs */}
              <div style={{ display: 'flex', gap: 6, marginTop: 32, background: 'rgba(248,242,232,0.07)', borderRadius: 999, padding: 4, width: 'fit-content' }}>
                {['ios', 'android'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setActiveStep(0) }}
                    style={{
                      padding: '7px 20px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                      background: activeTab === tab ? '#F8F2E8' : 'transparent',
                      color: activeTab === tab ? '#2C1A0E' : 'rgba(248,242,232,0.5)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab === 'ios' ? '🍎  iPhone / iPad' : '🤖  Android'}
                  </button>
                ))}
              </div>

              {/* Steps */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {steps.map((s, i) => (
                  <div key={i} onClick={() => setActiveStep(i)} style={{ cursor: 'pointer' }}>
                    <Step n={i + 1} icon={s.icon} title={s.title} desc={s.desc} active={activeStep === i} />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {installed ? (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A5A48', color: '#D6EEE8', padding: '13px 24px', borderRadius: 999, fontSize: 15, fontWeight: 700 }}>
                    <CheckIcon /> Installed — open from your home screen
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleInstall}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#F8F2E8', color: '#2C1A0E', padding: '13px 26px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 30px rgba(0,0,0,0.25)', transition: 'opacity 0.15s' }}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    >
                      <DownloadIcon />
                      {installPrompt ? 'Install Vision' : 'Open Vision App'}
                      <ArrowIcon />
                    </button>
                    <a
                      href={APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1.5px solid rgba(248,242,232,0.2)', color: 'rgba(248,242,232,0.7)', padding: '13px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.15s' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(248,242,232,0.45)'; e.currentTarget.style.color = '#F8F2E8' }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(248,242,232,0.2)'; e.currentTarget.style.color = 'rgba(248,242,232,0.7)' }}
                    >
                      Open in browser
                    </a>
                  </>
                )}
              </div>

              {/* Feature pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
                {features.map(f => (
                  <span key={f.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(248,242,232,0.07)', border: '1px solid rgba(248,242,232,0.1)', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: 'rgba(248,242,232,0.55)' }}>
                    <CheckIcon /> {f.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="hidden lg:flex justify-center items-start pt-4">
              <PhoneMockup />
            </div>

          </div>
        </div>
      </section>

      {/* Already using the app? */}
      <section className="py-12 bg-cream-100 border-t border-cream-200/60">
        <div className="max-w-xl mx-auto px-5 text-center">
          <p className="text-espresso/55 text-sm">Already have Vision installed?</p>
          <a href={APP_URL} className="mt-3 inline-flex items-center gap-2 text-espresso font-semibold text-sm hover:opacity-70 transition-opacity">
            Open the app <ArrowIcon />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream-200/80 py-8 px-5 sm:px-8 text-center text-xs text-espresso/40 bg-cream-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} Vision. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-espresso transition-colors">Home</Link>
            <Link to="/privacy" className="hover:text-espresso transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-espresso transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-espresso transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-espresso transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
