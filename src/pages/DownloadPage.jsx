import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const APP_URL = 'https://downloadvision.lovable.app'
const E = '#2C1A0E'
const C = '#F8F2E8'

// ── Icons ─────────────────────────────────────────────────────
const Ico = {
  Back:    p => <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  Home:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search:  p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Chat:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Profile: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Map:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Msg:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Eye:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Bolt:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Star:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Clock:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Check:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  Send:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Download:p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>,
}

const StarFilled = ({ size = 9 }) => <svg viewBox="0 0 24 24" fill="#E8A030" style={{ width: size, height: size }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

// ── Phone shell ───────────────────────────────────────────────
function PhoneShell({ children }) {
  return (
    <div style={{ background: '#1A0D06', borderRadius: 44, padding: 9, boxShadow: '0 32px 80px rgba(44,26,14,0.3), 0 0 0 1px rgba(255,255,255,0.06)', width: 260 }}>
      <div style={{ background: C, borderRadius: 36, overflow: 'hidden', height: 520, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: E }}>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
              {[4,6,8,10].map((h,i) => <div key={i} style={{ width: 2.5, height: h, background: `rgba(44,26,14,${i<3?0.5:0.2})`, borderRadius: 1 }}/>)}
            </div>
            <div style={{ width: 18, height: 8, border: '1.5px solid rgba(44,26,14,0.4)', borderRadius: 2.5, position: 'relative', padding: 1.5 }}>
              <div style={{ background: E, borderRadius: 1, height: '100%', width: '75%' }}/>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── Bottom nav ────────────────────────────────────────────────
function BottomNav({ active, onNav }) {
  const items = [
    { key: 'home',    label: 'HOME',    Icon: Ico.Home    },
    { key: 'search',  label: 'SEARCH',  Icon: Ico.Search  },
    { key: 'plus' },
    { key: 'chat',    label: 'CHAT',    Icon: Ico.Chat    },
    { key: 'profile', label: 'PROFILE', Icon: Ico.Profile },
  ]
  return (
    <div style={{ borderTop: '1px solid rgba(44,26,14,0.08)', background: 'white', padding: '6px 4px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexShrink: 0, position: 'relative', zIndex: 10 }}>
      {items.map(({ key, label, Icon }) =>
        key === 'plus' ? (
          <div key="plus" style={{ width: 36, height: 36, borderRadius: '50%', background: E, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2.5" strokeLinecap="round" style={{ width: 15, height: 15 }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        ) : (
          <div key={key} onClick={() => onNav?.(key)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <Icon style={{ width: 14, height: 14, color: active === key ? E : 'rgba(44,26,14,0.3)' }} />
            <span style={{ fontSize: 6.5, fontWeight: active === key ? 700 : 400, color: active === key ? E : 'rgba(44,26,14,0.35)', letterSpacing: '0.04em' }}>{label}</span>
          </div>
        )
      )}
    </div>
  )
}

// ── Emi avatar ────────────────────────────────────────────────
function EmiAv({ size = 26 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: '#D4C4A8', flexShrink: 0 }}>
      <img src="/creators/emi.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
    </div>
  )
}

// ── Creator data for search page ──────────────────────────────
// CONFIRMED CARTOONS — never use: kai, marcus, ava, sofia, zoe, lena
// CONFIRMED REAL PHOTOS: mia, diego, yumi, ellie, luca, dre, leila, nova, sage, emi, nia, zara, chloe
const CREATIVES = [
  { name: 'Mia',   location: 'Los Angeles', img: '/creators/mia.jpg'   },
  { name: 'Diego', location: 'Chicago',     img: '/creators/diego.jpg' },
  { name: 'Yumi',  location: 'Seoul',       img: '/creators/yumi.jpg'  },
  { name: 'Ellie', location: 'Los Angeles', img: '/creators/ellie.jpg' },
  { name: 'Luca',  location: 'Portland',    img: '/creators/luca.jpg'  },
  { name: 'Dre',   location: 'Atlanta',     img: '/creators/dre.jpg'   },
  { name: 'Leila', location: 'Miami',       img: '/creators/leila.jpg' },
  { name: 'Nova',  location: 'New York',    img: '/creators/nova.jpg'  },
  { name: 'Sage',  location: 'Austin',      img: '/creators/sage.jpg'  },
  { name: 'Emi',   location: 'Los Angeles', img: '/creators/emi.jpg'   },
  { name: 'Nia',   location: 'Houston',     img: '/creators/nia.jpg'   },
  { name: 'Zara',  location: 'Nashville',   img: '/creators/zara.jpg'  },
]

const CATEGORIES = ['For you', 'Photography', 'Videography', 'Content', 'Events', 'Styling']

// ── Chat messages ─────────────────────────────────────────────
const CHAT_MSGS = [
  { from: 'them', text: 'Hi! Thanks for reaching out 🌸 What kind of shoot are you thinking?' },
  { from: 'me',   text: 'Hi Emi! I love your portfolio. I\'m planning a wedding in Malibu on June 22nd.' },
  { from: 'them', text: 'Malibu in June sounds absolutely beautiful ✨ Are you interested in half day or full day coverage?' },
  { from: 'me',   text: 'Probably full day. What\'s included?' },
  { from: 'them', text: '300+ edited photos, online gallery, and print release. I also do a quick preview gallery within 48 hours 📸' },
  { from: 'me',   text: 'That sounds perfect. Is June 22nd available?' },
  { from: 'them', text: 'Yes! June 22nd is open. Want me to send over a booking request? 🎉' },
  { from: 'me',   text: 'Yes please!' },
  { from: 'them', text: 'Done! I just sent the booking request. Can\'t wait to capture your day 💫' },
]

// ── Interactive phone ─────────────────────────────────────────
function InteractivePhone() {
  const [activeTab,      setActiveTab]     = useState('Portfolio')
  const [screen,         setScreen]        = useState('profile')
  const [selectedService,setService]       = useState(null)
  const [selectedReview, setReview]        = useState(null)
  const [selectedImg,    setSelectedImg]   = useState(null)
  const [bookDate,       setBookDate]      = useState('Jun 22, 2026')
  const [catFilter,      setCatFilter]     = useState('All')
  const [chatInput,      setChatInput]     = useState('')
  const [chatMsgs,       setChatMsgs]      = useState(CHAT_MSGS.slice(0, 5))
  const chatEndRef = useRef(null)

  const portfolioImgs = [
    '/zoe-portfolio/emi-1.jpg','/zoe-portfolio/emi-2.jpg','/zoe-portfolio/emi-5.jpg',
    '/zoe-portfolio/emi-3.jpg','/zoe-portfolio/emi-4.jpg','/zoe-portfolio/emi-7.jpg',
    '/zoe-portfolio/emi-8.jpg','/zoe-portfolio/emi-6.jpg','/zoe-portfolio/emi-9.jpg',
  ]
  const postMeta = [
    { tag: 'Wedding',   caption: 'Reception Evening', likes: 47,  comments: 12 },
    { tag: 'Candid',    caption: 'Pure Joy',          likes: 83,  comments: 21 },
    { tag: 'Portrait',  caption: 'Behind the Lens',   likes: 74,  comments: 19 },
    { tag: 'Candid',    caption: 'On the Run',        likes: 61,  comments: 8  },
    { tag: 'Wedding',   caption: 'Champagne & Roses', likes: 102, comments: 34 },
    { tag: 'Romance',   caption: 'Kiss in the Rain',  likes: 95,  comments: 27 },
    { tag: 'Editorial', caption: 'Sunset Drive',      likes: 88,  comments: 16 },
    { tag: 'Romance',   caption: 'Rain & Romance',    likes: 138, comments: 45 },
    { tag: 'Wedding',   caption: 'Getting Ready',     likes: 113, comments: 38 },
  ]
  const services = [
    { title: 'Half Day Coverage', price: '$250', unit: '/session', duration: '4 hours', desc: 'Perfect for intimate ceremonies & elopements. Includes 150+ edited photos delivered in 2 weeks.', photos: '150+', delivery: '2 weeks' },
    { title: 'Full Day Coverage', price: '$450', unit: '/session', duration: '8 hours', desc: 'Full day from getting ready to reception. 300+ edited photos + online gallery & print release.', photos: '300+', delivery: '3 weeks' },
  ]
  const reviews = [
    { name: 'Sofia R.',  handle: '@sofiareyes', stars: 5, date: 'May 2026', text: 'Emi made us feel so at ease — our photos came out absolutely stunning. Booked her again for our anniversary shoot!' },
    { name: 'Marcus A.', handle: '@marcusali',  stars: 5, date: 'Apr 2026', text: 'Professional, creative, and so easy to work with. The gallery was delivered ahead of schedule. 10/10.' },
    { name: 'Priya K.',  handle: '@priyak',     stars: 5, date: 'Mar 2026', text: "Every single photo is a work of art. She captured moments we didn't even notice were happening. Truly gifted." },
    { name: 'James L.',  handle: '@jamesl',     stars: 5, date: 'Feb 2026', text: 'Emi was calm, fun, and incredibly talented. Our whole wedding party loved her. The photos speak for themselves.' },
  ]

  const goBack     = () => { setScreen('profile'); setService(null); setReview(null); setSelectedImg(null) }
  const goToChat   = () => setScreen('chat')
  const navActive  = screen === 'search' ? 'search' : screen === 'chat' ? 'chat' : 'profile'

  const handleNav = (key) => {
    if      (key === 'search')  setScreen('search')
    else if (key === 'chat')    goToChat()
    else                        { setScreen('profile'); setActiveTab('Portfolio') }
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    const next = [...chatMsgs, { from: 'me', text: chatInput }]
    setChatMsgs(next)
    setChatInput('')
    // Auto-reply
    const remaining = CHAT_MSGS.slice(next.length - 1)
    if (remaining.length > 1 && remaining[1]?.from === 'them') {
      setTimeout(() => setChatMsgs(m => [...m, remaining[1]]), 800)
    }
  }

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMsgs, screen])

  // ── Search / Discover ────────────────────────────────────
  if (screen === 'search') {
    return (
      <PhoneShell>
        {/* Header */}
        <div style={{ padding: '4px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 8, fontWeight: 800, color: E, letterSpacing: '0.22em', marginBottom: 1 }}>V I S I O N</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: E, lineHeight: 1.25 }}>find creatives that<br/>match your vision</div>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(44,26,14,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Ico.Search style={{ width: 12, height: 12, color: E }} />
          </div>
        </div>
        {/* Category pills */}
        <div style={{ padding: '0 12px 7px', display: 'flex', gap: 5, overflowX: 'auto', flexShrink: 0 }} className="no-scrollbar">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: '4px 10px', borderRadius: 999, cursor: 'pointer', fontSize: 8.5, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, border: `1.5px solid ${catFilter === c ? E : 'rgba(44,26,14,0.13)'}`, background: catFilter === c ? E : 'white', color: catFilter === c ? C : 'rgba(44,26,14,0.6)' }}>
              {c}
            </button>
          ))}
        </div>
        {/* Scrollable grid */}
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 12px 8px' }}>
          {/* Section label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: E }}>Discover creatives</span>
            <span style={{ fontSize: 9, color: 'rgba(44,26,14,0.45)', fontWeight: 500 }}>See all →</span>
          </div>
          {/* 3-col photo grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {CREATIVES.map((cr, i) => (
              <div key={i} onClick={() => setScreen('profile')} style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '3/4', background: '#C8B8A8' }}>
                <img src={cr.img} alt={cr.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                {/* Name + location */}
                <div style={{ position: 'absolute', bottom: 5, left: 6, right: 4 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>{cr.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
                    <Ico.Map style={{ width: 6, height: 6, color: 'rgba(255,255,255,0.8)' }} />
                    <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>{cr.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav active="search" onNav={handleNav} />
      </PhoneShell>
    )
  }

  // ── Chat screen ──────────────────────────────────────────
  if (screen === 'chat') {
    return (
      <PhoneShell>
        {/* Header */}
        <div style={{ padding: '4px 12px 8px', borderBottom: '1px solid rgba(44,26,14,0.07)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, background: 'white' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
            <Ico.Back style={{ width: 14, height: 14 }} />
          </button>
          <EmiAv size={28} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: E }}>Emi Chen</div>
            <div style={{ fontSize: 8, color: '#1A5A48', fontWeight: 600 }}>● Active now</div>
          </div>
          <Ico.Msg style={{ width: 14, height: 14, color: 'rgba(44,26,14,0.3)' }} />
        </div>
        {/* Messages */}
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 6, background: '#F0E8DC' }}>
          {chatMsgs.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start', gap: 5, alignItems: 'flex-end' }}>
              {msg.from === 'them' && <EmiAv size={20} />}
              <div style={{
                maxWidth: '75%', padding: '7px 10px', borderRadius: msg.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.from === 'me' ? E : 'white',
                color: msg.from === 'me' ? C : E,
                fontSize: 9.5, lineHeight: 1.45,
                boxShadow: '0 1px 4px rgba(44,26,14,0.08)',
              }}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {/* Input */}
        <div style={{ padding: '8px 10px 10px', borderTop: '1px solid rgba(44,26,14,0.07)', background: 'white', display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ flex: 1, background: '#F0E8DC', borderRadius: 20, padding: '6px 12px', display: 'flex', alignItems: 'center' }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChat()}
              placeholder="Message Emi..."
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 9.5, color: E, width: '100%', fontFamily: 'inherit' }}
            />
          </div>
          <button onClick={sendChat} style={{ width: 28, height: 28, borderRadius: '50%', background: E, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Ico.Send style={{ width: 11, height: 11, color: C }} />
          </button>
        </div>
        <BottomNav active={navActive} onNav={handleNav} />
      </PhoneShell>
    )
  }

  // ── Image feed ───────────────────────────────────────────
  if (screen === 'imagefeed') {
    return (
      <PhoneShell>
        <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', flexShrink: 0, borderBottom: '1px solid rgba(44,26,14,0.07)', background: 'white', position: 'relative' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'absolute', left: 10 }}>
            <Ico.Back style={{ width: 14, height: 14 }} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 12, color: E }}>Portfolio</div>
        </div>
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', background: '#F0E8DC' }}
          ref={el => { if (el && selectedImg !== null) { const t = el.querySelectorAll('[data-post]')[selectedImg]; if (t) t.scrollIntoView({ block: 'start', behavior: 'instant' }) }}}>
          {postMeta.map((post, i) => (
            <div key={i} data-post={i} style={{ background: 'white', marginBottom: 5 }}>
              <div style={{ padding: '6px 10px', display: 'flex', gap: 6, alignItems: 'center' }}>
                <EmiAv size={22} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 10, color: E }}>Emi Chen</div>
                  <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)' }}>Los Angeles</div>
                </div>
              </div>
              <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#D4C4A8' }}>
                <img src={portfolioImgs[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              </div>
              <div style={{ padding: '7px 10px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="1.8" style={{ width: 13, height: 13 }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span style={{ fontSize: 8, color: 'rgba(44,26,14,0.5)' }}>{post.likes}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <Ico.Chat style={{ width: 12, height: 12, color: 'rgba(44,26,14,0.5)' }} />
                    <span style={{ fontSize: 8, color: 'rgba(44,26,14,0.5)' }}>{post.comments}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '0 10px 8px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#FBE9D6', color: '#7A3A10', fontSize: 7.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999, marginBottom: 3 }}>
                  {post.tag}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: E }}>{post.caption}</div>
              </div>
            </div>
          ))}
        </div>
        <BottomNav active="profile" onNav={handleNav} />
      </PhoneShell>
    )
  }

  // ── Checkout ─────────────────────────────────────────────
  if (screen === 'checkout' && selectedService) {
    const s = selectedService
    return (
      <PhoneShell>
        <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', flexShrink: 0, borderBottom: '1px solid rgba(44,26,14,0.07)', background: 'white', position: 'relative' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'absolute', left: 10 }}>
            <Ico.Back style={{ width: 14, height: 14 }} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 12, color: E }}>Book Package</div>
        </div>
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', background: C, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: 'white', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(44,26,14,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: E }}>{s.title}</div>
                <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginTop: 2, color: 'rgba(44,26,14,0.5)' }}>
                  <Ico.Clock style={{ width: 9, height: 9 }} /><span style={{ fontSize: 9 }}>{s.duration}</span>
                </div>
              </div>
              <div><span style={{ fontSize: 16, fontWeight: 800, color: E }}>{s.price}</span><span style={{ fontSize: 8, color: 'rgba(44,26,14,0.45)' }}>{s.unit}</span></div>
            </div>
            <div style={{ borderTop: '1px solid rgba(44,26,14,0.07)', marginTop: 10, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[`${s.photos} edited photos`, `Delivery in ${s.delivery}`, 'Online gallery + print release', 'Secure payment via Stripe'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <Ico.Check style={{ width: 10, height: 10, color: '#1A5A48', flexShrink: 0 }} />
                  <span style={{ fontSize: 9.5, color: 'rgba(44,26,14,0.65)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: '10px 14px', border: '1px solid rgba(44,26,14,0.07)' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(44,26,14,0.45)', letterSpacing: '0.08em', marginBottom: 7 }}>SELECT DATE</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Jun 22', 'Jun 28', 'Jul 5', 'Jul 12'].map(d => (
                <button key={d} onClick={() => setBookDate(d + ', 2026')} style={{ padding: '5px 10px', borderRadius: 10, cursor: 'pointer', fontSize: 9, fontWeight: 600, background: bookDate.startsWith(d) ? E : 'white', color: bookDate.startsWith(d) ? C : 'rgba(44,26,14,0.6)', border: `1.5px solid ${bookDate.startsWith(d) ? E : 'rgba(44,26,14,0.1)'}` }}>{d}</button>
              ))}
            </div>
          </div>
          <div style={{ background: E, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: 'rgba(248,242,232,0.6)' }}>Total due</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: C }}>{s.price}</span>
            </div>
            <button onClick={() => setScreen('confirmation')} style={{ width: '100%', background: C, color: E, border: 'none', borderRadius: 10, padding: '10px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              Confirm & Pay
            </button>
          </div>
        </div>
        <BottomNav active="profile" onNav={handleNav} />
      </PhoneShell>
    )
  }

  // ── Confirmation ─────────────────────────────────────────
  if (screen === 'confirmation') {
    return (
      <PhoneShell>
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 18px', background: C }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#D6EEE8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Ico.Check style={{ width: 24, height: 24, color: '#1A5A48' }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: E, textAlign: 'center', marginBottom: 6 }}>Booking Confirmed!</div>
          <div style={{ fontSize: 11, color: 'rgba(44,26,14,0.55)', textAlign: 'center', lineHeight: 1.5, marginBottom: 20 }}>
            {selectedService?.title} with Emi Chen<br/>{bookDate} · Malibu, CA
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: '12px 16px', width: '100%', border: '1px solid rgba(44,26,14,0.07)', marginBottom: 14 }}>
            {[['Package', selectedService?.title], ['Date', bookDate], ['Amount', selectedService?.price], ['Status', 'Confirmed ✓']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(44,26,14,0.05)' }}>
                <span style={{ fontSize: 9, color: 'rgba(44,26,14,0.45)' }}>{k}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: k === 'Status' ? '#1A5A48' : E }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={goBack} style={{ background: E, color: C, border: 'none', borderRadius: 24, padding: '10px 28px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Back to Profile</button>
        </div>
        <BottomNav active="profile" onNav={handleNav} />
      </PhoneShell>
    )
  }

  // ── Review detail ────────────────────────────────────────
  if (screen === 'review' && selectedReview) {
    const r = selectedReview
    return (
      <PhoneShell>
        <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', flexShrink: 0, borderBottom: '1px solid rgba(44,26,14,0.07)', background: 'white', position: 'relative' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'absolute', left: 10 }}>
            <Ico.Back style={{ width: 14, height: 14 }} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 12, color: E }}>Review</div>
        </div>
        <div style={{ flex: 1, padding: '16px', background: C, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '14px 16px', border: '1px solid rgba(44,26,14,0.07)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#D4C4A8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: E }}>{r.name[0]}</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: E }}>{r.name}</div>
                <div style={{ fontSize: 9, color: 'rgba(44,26,14,0.4)' }}>{r.handle} · {r.date}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>{[0,1,2,3,4].map(i => <StarFilled key={i} size={11} />)}</div>
            <div style={{ fontSize: 11, color: 'rgba(44,26,14,0.7)', lineHeight: 1.6 }}>"{r.text}"</div>
          </div>
          <button onClick={goBack} style={{ background: E, color: C, border: 'none', borderRadius: 24, padding: '10px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Back to Profile</button>
        </div>
        <BottomNav active="profile" onNav={handleNav} />
      </PhoneShell>
    )
  }

  // ── Profile (default) ─────────────────────────────────────
  return (
    <PhoneShell>
      <div style={{ padding: '2px 14px 6px', flexShrink: 0 }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.24em', color: 'rgba(44,26,14,0.35)' }}>V I S I O N</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: E }}>@snapsbyemi</div>
      </div>
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
        {/* Stats */}
        <div style={{ padding: '0 14px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(44,26,14,0.12)', background: '#D4C4A8' }}>
            <img src="/creators/emi.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
          </div>
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {[['5.0 ★', 'RATING'], ['89', 'BOOKED']].map(([v, l]) => (
              <div key={l} style={{ flex: 1, background: 'white', borderRadius: 12, padding: '7px 4px', textAlign: 'center', border: '1px solid rgba(44,26,14,0.07)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: E }}>{v}</div>
                <div style={{ fontSize: 7, color: 'rgba(44,26,14,0.4)', fontWeight: 600, letterSpacing: '0.06em', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Bio */}
        <div style={{ padding: '0 14px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: E }}>Emi</span>
            <span style={{ background: '#FBE9D6', color: '#7A3A10', fontSize: 7.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>CREATIVE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(44,26,14,0.45)', marginBottom: 4 }}>
            <Ico.Map style={{ width: 9, height: 9 }} /><span style={{ fontSize: 9.5 }}>Los Angeles</span>
          </div>
          <div style={{ fontSize: 9.5, color: 'rgba(44,26,14,0.6)', lineHeight: 1.5 }}>Wedding photographer capturing timeless moments. Available for bookings.</div>
        </div>
        {/* Message button — clickable */}
        <div style={{ padding: '0 14px 8px' }}>
          <button onClick={goToChat} style={{ width: '100%', background: '#EFE5D8', borderRadius: 22, padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px solid rgba(44,26,14,0.08)', cursor: 'pointer' }}>
            <Ico.Msg style={{ width: 10, height: 10, color: E }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: E }}>Message Emi Chen</span>
          </button>
        </div>
        {/* Tabs */}
        <div style={{ padding: '0 14px 0', display: 'flex', gap: 5 }}>
          {[['Portfolio', Ico.Eye], ['Services', Ico.Bolt], ['Reviews', Ico.Star]].map(([label, Icon]) => (
            <button key={label} onClick={() => setActiveTab(label)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 999, border: 'none', cursor: 'pointer', background: activeTab === label ? E : 'transparent', color: activeTab === label ? C : 'rgba(44,26,14,0.45)', fontSize: 9.5, fontWeight: activeTab === label ? 700 : 500 }}>
              <Icon style={{ width: 9, height: 9 }} /> {label}
            </button>
          ))}
        </div>
        {/* Portfolio */}
        {activeTab === 'Portfolio' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginTop: 8 }}>
            {portfolioImgs.map((src, i) => (
              <div key={i} onClick={() => { setSelectedImg(i); setScreen('imagefeed') }} style={{ aspectRatio: '3/4', background: '#D4C4A8', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            ))}
          </div>
        )}
        {/* Services */}
        {activeTab === 'Services' && (
          <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {services.map(s => (
              <div key={s.title} style={{ background: 'white', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(44,26,14,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: E }}>{s.title}</div>
                    <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginTop: 2, color: 'rgba(44,26,14,0.45)' }}>
                      <Ico.Clock style={{ width: 8, height: 8 }} /><span style={{ fontSize: 8.5 }}>{s.duration}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: E }}>{s.price}</span>
                    <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)' }}>{s.unit}</div>
                  </div>
                </div>
                <div style={{ fontSize: 9, color: 'rgba(44,26,14,0.55)', lineHeight: 1.5, marginBottom: 10 }}>{s.desc}</div>
                <button onClick={() => { setService(s); setScreen('checkout') }} style={{ width: '100%', background: E, color: C, border: 'none', borderRadius: 20, padding: '8px 0', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                  Book This Package
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Reviews */}
        {activeTab === 'Reviews' && (
          <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: 'white', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(44,26,14,0.07)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: E }}>5.0</div>
                <div style={{ display: 'flex', gap: 1, justifyContent: 'center' }}>{[0,1,2,3,4].map(i => <StarFilled key={i} />)}</div>
                <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)', marginTop: 2 }}>89 reviews</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[5,4,3].map(n => (
                  <div key={n} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <span style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.45)', width: 6 }}>{n}</span>
                    <div style={{ flex: 1, height: 4, background: '#EFE5D4', borderRadius: 999 }}>
                      <div style={{ width: n===5?'96%':n===4?'3%':'1%', height: '100%', background: E, borderRadius: 999 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {reviews.map((r, i) => (
              <div key={i} onClick={() => { setReview(r); setScreen('review') }} style={{ background: 'white', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(44,26,14,0.07)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#D4C4A8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: E }}>{r.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: E }}>{r.name}</div>
                      <div style={{ fontSize: 7.5, color: 'rgba(44,26,14,0.4)' }}>{r.date}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 1 }}>{[0,1,2,3,4].map(j => <StarFilled key={j} size={8} />)}</div>
                </div>
                <div style={{ fontSize: 9.5, color: 'rgba(44,26,14,0.65)', lineHeight: 1.5 }}>"{r.text.slice(0, 80)}…"</div>
                <div style={{ fontSize: 8.5, color: 'rgba(44,26,14,0.35)', marginTop: 5, fontWeight: 600 }}>Tap to read full review →</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav active={navActive} onNav={handleNav} />
    </PhoneShell>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function DownloadPage() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed,     setInstalled]     = useState(false)

  useEffect(() => {
    const handler = e => { e.preventDefault(); setInstallPrompt(e) }
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
    <div style={{ background: C, minHeight: '100vh', fontFamily: '"DM Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid rgba(44,26,14,0.08)', background: 'rgba(248,242,232,0.95)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ fontWeight: 700, letterSpacing: '0.3em', fontSize: 13, color: E, textDecoration: 'none' }}>V I S I O N</Link>
          <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(44,26,14,0.5)', textDecoration: 'none' }}>← Back</Link>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(44,26,14,0.4)', marginBottom: 12, textAlign: 'center' }}>GET THE APP</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: E, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}>
          Vision on your<br />home screen.
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(44,26,14,0.5)', textAlign: 'center', maxWidth: 340, lineHeight: 1.6, marginBottom: 28 }}>
          Available on iPhone and Android. No App Store needed — install directly from your browser.
        </p>

        {/* Download button — above the phone */}
        <button
          onClick={handleInstall}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: E, color: C, padding: '14px 30px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 30px rgba(44,26,14,0.2)', transition: 'opacity 0.15s', marginBottom: 10 }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <Ico.Download style={{ width: 17, height: 17 }} />
          {installed ? 'Installed ✓' : 'Download Vision'}
        </button>
        <p style={{ fontSize: 12, color: 'rgba(44,26,14,0.4)', textAlign: 'center', marginBottom: 40 }}>
          🍎 iPhone · 🤖 Android · 💻 Desktop &nbsp;—&nbsp; no app store required
        </p>

        {/* Phone + floating labels */}
        <div style={{ position: 'relative' }}>
          {/* Left label — more space */}
          <div style={{ position: 'absolute', left: -190, top: '38%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none' }}>
            <div style={{ background: C, border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 999, padding: '7px 16px', fontSize: 11, fontWeight: 700, color: E, whiteSpace: 'nowrap', boxShadow: '0 2px 14px rgba(44,26,14,0.08)' }}>
              scroll to explore
            </div>
            <svg width="52" height="22" viewBox="0 0 52 22" fill="none">
              <path d="M2 16 Q 16 20 32 11 Q 40 7 50 8" stroke={E} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M44 4 L50 8 L43 11" stroke={E} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          {/* Right label — more space */}
          <div style={{ position: 'absolute', right: -195, top: '55%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none' }}>
            <svg width="52" height="22" viewBox="0 0 52 22" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M2 16 Q 16 20 32 11 Q 40 7 50 8" stroke={E} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M44 4 L50 8 L43 11" stroke={E} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <div style={{ background: C, border: '1.5px solid rgba(44,26,14,0.12)', borderRadius: 16, padding: '10px 18px', boxShadow: '0 2px 14px rgba(44,26,14,0.08)', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: E, whiteSpace: 'nowrap' }}>interactive preview</div>
              <div style={{ fontSize: 12, color: 'rgba(44,26,14,0.45)', whiteSpace: 'nowrap' }}>tap &amp; scroll</div>
            </div>
          </div>

          <InteractivePhone />
        </div>

        {/* ── Install Instructions ─────────────────────────────── */}
        <div style={{ marginTop: 80, width: '100%', maxWidth: 760 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(44,26,14,0.4)', textAlign: 'center', marginBottom: 8 }}>HOW TO INSTALL</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: E, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Add Vision to your home screen</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>

            {/* iOS */}
            <div style={{ background: 'white', borderRadius: 24, padding: 28, border: '1.5px solid rgba(44,26,14,0.08)', boxShadow: '0 4px 24px rgba(44,26,14,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                {/* Apple logo */}
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: E }}>iPhone / iPad</div>
                  <div style={{ fontSize: 11, color: 'rgba(44,26,14,0.45)' }}>Safari browser required</div>
                </div>
              </div>

              {[
                {
                  n: 1,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
                  title: 'Open in Safari',
                  desc: <>Go to <span style={{ fontWeight: 700, color: E }}>downloadvision.lovable.app</span> in Safari (not Chrome)</>
                },
                {
                  n: 2,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
                  title: 'Tap the Share button',
                  desc: 'Tap the Share icon at the bottom of Safari — it looks like a box with an arrow pointing up'
                },
                {
                  n: 3,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
                  title: 'Add to Home Screen',
                  desc: 'Scroll down in the share sheet and tap "Add to Home Screen"'
                },
                {
                  n: 4,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><polyline points="20 6 9 17 4 12"/></svg>,
                  title: 'Tap Add',
                  desc: 'Confirm by tapping "Add" in the top right. Vision will appear on your home screen!'
                },
              ].map(({ n, icon, title, desc }) => (
                <div key={n} style={{ display: 'flex', gap: 14, marginBottom: n < 4 ? 18 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(44,26,14,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, background: E, color: C, borderRadius: 999, width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: E }}>{title}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(44,26,14,0.55)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}

              {/* iOS visual hint */}
              <div style={{ marginTop: 22, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(44,26,14,0.1)' }}>
                <div style={{ background: '#F2F2F7', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#6E40C9,#B04FC9)', flexShrink: 0 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#000' }}>Vision</div>
                    <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.45)' }}>downloadvision.lovable.app</div>
                  </div>
                </div>
                <div style={{ background: 'white', padding: '10px 14px 6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#007AFF', fontWeight: 600 }}>Add to Home Screen</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.2" strokeLinecap="round" style={{ width: 13, height: 13 }}><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                  <div style={{ display: 'flex', gap: 12, paddingBottom: 8 }}>
                    {[
                      { icon: '📤', label: 'Share' },
                      { icon: '🔖', label: 'Bookmarks' },
                      { icon: '📋', label: 'Copy Link' },
                    ].map(({ icon, label }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
                        <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.5)' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Android */}
            <div style={{ background: 'white', borderRadius: 24, padding: 28, border: '1.5px solid rgba(44,26,14,0.08)', boxShadow: '0 4px 24px rgba(44,26,14,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                {/* Android logo */}
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#3DDC84', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 20, height: 20 }}><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: E }}>Android</div>
                  <div style={{ fontSize: 11, color: 'rgba(44,26,14,0.45)' }}>Chrome browser required</div>
                </div>
              </div>

              {[
                {
                  n: 1,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
                  title: 'Open in Chrome',
                  desc: <>Go to <span style={{ fontWeight: 700, color: E }}>downloadvision.lovable.app</span> in Google Chrome</>
                },
                {
                  n: 2,
                  icon: <svg viewBox="0 0 24 24" fill={E} style={{ width: 18, height: 18 }}><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>,
                  title: 'Tap the menu (⋮)',
                  desc: 'Tap the three-dot menu in the top right corner of Chrome'
                },
                {
                  n: 3,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
                  title: 'Add to Home Screen',
                  desc: 'Tap "Add to Home screen" or "Install app" from the menu'
                },
                {
                  n: 4,
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke={E} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><polyline points="20 6 9 17 4 12"/></svg>,
                  title: 'Tap Install',
                  desc: 'Tap "Install" on the prompt. Vision will be added to your home screen instantly!'
                },
              ].map(({ n, icon, title, desc }) => (
                <div key={n} style={{ display: 'flex', gap: 14, marginBottom: n < 4 ? 18 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(44,26,14,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, background: E, color: C, borderRadius: 999, width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: E }}>{title}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(44,26,14,0.55)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}

              {/* Android visual hint */}
              <div style={{ marginTop: 22, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(44,26,14,0.1)', background: '#F8F9FA' }}>
                <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'white' }}>
                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.05)', borderRadius: 20, padding: '5px 12px', fontSize: 10, color: 'rgba(0,0,0,0.4)' }}>downloadvision.lovable.app</div>
                  <svg viewBox="0 0 24 24" fill="rgba(0,0,0,0.4)" style={{ width: 18, height: 18, flexShrink: 0 }}><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                </div>
                <div style={{ padding: '8px 0' }}>
                  {['New tab', 'New incognito tab', 'Add to Home screen', 'Install app', 'Bookmarks'].map((item, i) => (
                    <div key={item} style={{ padding: '8px 18px', fontSize: 12, color: i === 2 || i === 3 ? '#1a73e8' : 'rgba(0,0,0,0.7)', fontWeight: i === 2 || i === 3 ? 700 : 400, background: i === 2 ? 'rgba(26,115,232,0.06)' : 'transparent' }}>
                      {i === 2 ? '📲 ' : i === 3 ? '⬇️ ' : ''}{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom tip */}
          <div style={{ marginTop: 28, padding: '14px 20px', background: 'rgba(44,26,14,0.04)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(44,26,14,0.6)', lineHeight: 1.5 }}>
              <strong style={{ color: E }}>Already installed?</strong> Open Vision directly from your home screen. It runs like a native app — no browser bar, full screen.
            </p>
          </div>
        </div>

      </main>

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
