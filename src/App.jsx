import React, { useState } from 'react'

// ============================================================
// REPLACE THIS URL WITH YOUR LOVABLE APP / PWA URL
// Example: const APP_URL = "https://your-app.lovable.app"
// ============================================================
const APP_URL = "https://app.joinvision.app"

// ── Inline SVG icons ─────────────────────────────────────────
const Ico = {
  Home:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12 12 4l9 8"/><path d="M5 10v10h5v-5h4v5h5V10"/></svg>,
  Search:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Chat:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>,
  User:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  Plus:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Calendar: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Star:     p => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.8.7-5 4.7 1.4 6.7L12 17l-6.1 3.4 1.4-6.7-5-4.7 6.8-.7L12 2Z"/></svg>,
  Heart:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.8 8.6a5.5 5.5 0 0 0-9.3-2.4l-.5.5-.5-.5A5.5 5.5 0 0 0 3.2 12c0 5 8.8 9.7 8.8 9.7s8.8-4.7 8.8-9.7"/></svg>,
  Camera:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 4h-5L7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/></svg>,
  Package:  p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="m3 7 9 4 9-4M12 11v10M3 7v10l9 4M21 7v10l-9 4"/></svg>,
  Tag:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2H7a2 2 0 0 0-2 2v5l7 7 7-7-5-5a2 2 0 0 0-2-2Z"/><path d="M7 7h.01"/></svg>,
  Stripe:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  Lock:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Grid:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  Bookmark: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>,
  Download: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>,
  Dollar:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Map:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21c0 0-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2"/></svg>,
  Arrow:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>,
  Menu:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  Close:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  Check:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  Lightning:p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>,
}

// ── Fake AI creator profiles ──────────────────────────────────
const CREATORS = [
  { name: 'Zoe Chen',      handle: '@zoechen',    role: 'CREATIVE', location: 'Los Angeles', price: '$120',  tile: 'tile-blush',  tag: 'Golden Hour', rating: '4.9', posts: 34, bookings: 89  },
  { name: 'Marcus Ali',    handle: '@marcusali',  role: 'CREATIVE', location: 'New York',    price: '$200',  tile: 'tile-sky',    tag: 'Editorial',   rating: '5.0', posts: 21, bookings: 52  },
  { name: 'Sofia Reyes',   handle: '@sofiareyes', role: 'CREATIVE', location: 'Miami',       price: '$95',   tile: 'tile-peach',  tag: 'Casual',      rating: '4.8', posts: 47, bookings: 130 },
  { name: 'Ava Nakamura',  handle: '@avanaka',    role: 'CREATIVE', location: 'San Francisco', price: '$175', tile: 'tile-lilac', tag: 'Luxury',      rating: '5.0', posts: 18, bookings: 44  },
]

const LISTINGS = [
  { title: 'Golden Hour Portrait', location: 'Malibu, CA',       price: '$120', tag: 'Candid',    tile: 'tile-butter', time: 'Jun 14, 3:00 PM' },
  { title: 'Brand Content Day',    location: 'DTLA, CA',         price: '$350', tag: 'Editorial', tile: 'tile-sky',    time: 'Jun 20, 10:00 AM' },
  { title: 'Bridal Shower Shoot',  location: 'Pasadena, CA',     price: '$180', tag: 'Events',    tile: 'tile-blush',  time: 'Jul 5, 1:00 PM' },
  { title: 'Lifestyle Content',    location: 'Venice Beach, CA', price: '$95',  tag: 'Casual',    tile: 'tile-mint',   time: 'Jun 28, 9:00 AM' },
]

// ── Pastel pill tag helper ────────────────────────────────────
const TAG_COLORS = {
  'CREATIVE':  { bg: '#FBE9D6', text: '#7A3A10' },
  'PERSONAL':  { bg: '#E2EEF6', text: '#1A4A6A' },
  'Golden Hour':{ bg: '#FAF4D6', text: '#6A5010' },
  'Editorial': { bg: '#E2EEF6', text: '#1A4A6A' },
  'Casual':    { bg: '#E6F0E6', text: '#2A5A2A' },
  'Luxury':    { bg: '#EDE6F5', text: '#4A2A7A' },
  'Events':    { bg: '#FBE9E9', text: '#7A2A2A' },
  'Candid':    { bg: '#D6EEE8', text: '#1A5A48' },
  'Branding':  { bg: '#FAF4D6', text: '#6A5010' },
  'Filled':    { bg: '#FBE9D6', text: '#7A3A10' },
}
function Pill({ label, size = 'sm' }) {
  const c = TAG_COLORS[label] || { bg: '#E8E8E8', text: '#444' }
  const px = size === 'xs' ? '6px 10px' : '5px 12px'
  const fs = size === 'xs' ? '9px' : '11px'
  return (
    <span style={{ background: c.bg, color: c.text, padding: px, fontSize: fs, borderRadius: 999, fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
      {label}
    </span>
  )
}

// ── Phone shell wrapper ───────────────────────────────────────
function PhoneShell({ children, height = 620 }) {
  return (
    <div style={{ width: 280, flexShrink: 0 }}>
      <div style={{ background: '#2C1A0E', borderRadius: 44, padding: 10, boxShadow: '0 30px 60px -15px rgba(44,26,14,0.45)' }}>
        <div style={{ background: '#F8F2E8', borderRadius: 36, overflow: 'hidden', height, display: 'flex', flexDirection: 'column' }}>
          {/* Status bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 18px 4px', fontSize: 10, color: 'rgba(44,26,14,0.5)', fontWeight: 600 }}>
            <span>9:41</span>
            <span style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <span style={{ width: 12, height: 6, background: 'rgba(44,26,14,0.4)', borderRadius: 2 }}/>
              <span style={{ width: 12, height: 6, background: 'rgba(44,26,14,0.4)', borderRadius: 2 }}/>
              <span style={{ width: 16, height: 8, border: '1.5px solid rgba(44,26,14,0.4)', borderRadius: 2 }}/>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Bottom nav bar ────────────────────────────────────────────
function BottomNav({ active = 'home' }) {
  const items = [
    { key: 'home',    Icon: Ico.Home,   label: 'HOME' },
    { key: 'search',  Icon: Ico.Search, label: 'SEARCH' },
    { key: 'plus',    Icon: null,       label: '' },
    { key: 'chat',    Icon: Ico.Chat,   label: 'CHAT' },
    { key: 'profile', Icon: Ico.User,   label: 'PROFILE' },
  ]
  return (
    <div style={{ borderTop: '1px solid rgba(44,26,14,0.08)', background: 'white', padding: '8px 4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      {items.map(it => {
        if (it.key === 'plus') return (
          <div key="plus" style={{ marginTop: -22 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(44,26,14,0.3)' }}>
              <Ico.Plus style={{ width: 18, height: 18, color: '#F8F2E8' }}/>
            </div>
          </div>
        )
        const isActive = active === it.key
        return (
          <div key={it.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
            <it.Icon style={{ width: 18, height: 18, color: isActive ? '#2C1A0E' : 'rgba(44,26,14,0.3)' }}/>
            <span style={{ fontSize: 7, letterSpacing: '0.08em', color: isActive ? '#2C1A0E' : 'rgba(44,26,14,0.3)', fontWeight: isActive ? 700 : 400 }}>{it.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Hero phone mockup: creator profile view ───────────────────
function HeroPhone() {
  const c = CREATORS[0]
  return (
    <PhoneShell height={620}>
      {/* Header */}
      <div style={{ padding: '6px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 9, letterSpacing: '0.25em', fontWeight: 700, color: '#2C1A0E' }}>V I S I O N</span>
        <span style={{ fontSize: 9, color: 'rgba(44,26,14,0.45)' }}>@zoechen</span>
      </div>

      {/* Profile header */}
      <div style={{ padding: '10px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%' }} className="tile-blush tile-portrait"/>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#2C1A0E' }}>Zoe Chen</span>
              <Pill label="CREATIVE" size="xs"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
              <Ico.Map style={{ width: 9, height: 9, color: 'rgba(44,26,14,0.45)' }}/>
              <span style={{ fontSize: 10, color: 'rgba(44,26,14,0.55)' }}>Los Angeles</span>
            </div>
          </div>
          <button style={{ background: '#2C1A0E', color: '#F8F2E8', border: 'none', borderRadius: 20, padding: '6px 12px', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>Book</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 10 }}>
          {[['34', 'POSTS'], ['4.9 ★', 'RATING'], ['89', 'BOOKINGS']].map(([v, l]) => (
            <div key={l} style={{ background: 'white', borderRadius: 12, padding: '8px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2C1A0E' }}>{v}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.06em', color: 'rgba(44,26,14,0.45)', marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' }} className="no-scrollbar">
          {['Portfolio', 'Packages', 'Reviews'].map((t, i) => (
            <span key={t} style={{
              fontSize: 10, padding: '5px 12px', borderRadius: 20, whiteSpace: 'nowrap', fontWeight: 600,
              background: i === 0 ? '#2C1A0E' : 'white',
              color: i === 0 ? '#F8F2E8' : 'rgba(44,26,14,0.55)',
              border: i === 0 ? 'none' : '1px solid rgba(44,26,14,0.1)',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Portfolio grid */}
      <div style={{ flex: 1, padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, overflow: 'hidden' }}>
        {[
          { tile: 'tile-blush',  price: '$120', label: 'Golden Hour' },
          { tile: 'tile-butter', price: '$200', label: 'Editorial' },
          { tile: 'tile-mint',   price: '$95',  label: 'Casual' },
          { tile: 'tile-peach',  price: '$180', label: 'Portrait' },
        ].map((t, i) => (
          <div key={i} className={`${t.tile} tile-portrait`} style={{ borderRadius: 14, position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
            <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', color: '#2C1A0E', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>{t.price}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="profile"/>
    </PhoneShell>
  )
}

// ── Listing detail phone mockup ───────────────────────────────
function ListingPhone() {
  return (
    <PhoneShell height={600}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 14px 0' }} className="no-scrollbar">
        {/* Hero image */}
        <div className="tile-blush tile-portrait" style={{ borderRadius: 18, aspectRatio: '4/3', position: 'relative', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4 }}>
            <Pill label="Filled" size="xs"/>
            <Pill label="Candid" size="xs"/>
          </div>
          {/* Nav arrows */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', pointerEvents: 'none' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico.Arrow style={{ width: 10, height: 10, transform: 'rotate(180deg)', color: '#2C1A0E' }}/>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico.Arrow style={{ width: 10, height: 10, color: '#2C1A0E' }}/>
            </div>
          </div>
        </div>

        <div style={{ fontWeight: 700, fontSize: 18, color: '#2C1A0E', marginBottom: 8 }}>Bridal Shower Photos</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          <Pill label="Filled" size="xs"/>
          <span style={{ background: '#FAF4D6', color: '#6A5010', padding: '3px 10px', fontSize: 9, borderRadius: 999, fontWeight: 600 }}>$150 budget</span>
          <Pill label="Candid" size="xs"/>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(44,26,14,0.55)', marginBottom: 10 }}>
          <Ico.Map style={{ width: 10, height: 10 }}/> San Mateo
          <span style={{ marginLeft: 6 }}>·</span>
          <Ico.Calendar style={{ width: 10, height: 10 }}/> May 17, 1:00 PM – 2:00 PM
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: '10px 12px' }}>
          <div style={{ fontSize: 8, letterSpacing: '0.08em', fontWeight: 700, color: 'rgba(44,26,14,0.45)', marginBottom: 4 }}>ABOUT</div>
          <div style={{ fontSize: 11, color: 'rgba(44,26,14,0.7)', lineHeight: 1.5 }}>Candid photos of people and group photos. Preferably in the moment and some posed as well.</div>
        </div>
      </div>
      <BottomNav active="home"/>
    </PhoneShell>
  )
}

// ── Creatives browse phone ────────────────────────────────────
function BrowsePhone() {
  return (
    <PhoneShell height={600}>
      <div style={{ padding: '8px 14px 0' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.25em', fontWeight: 700, color: '#2C1A0E', textAlign: 'center', marginBottom: 10 }}>V I S I O N</div>

        {/* Search bar */}
        <div style={{ background: 'white', borderRadius: 20, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, border: '1px solid rgba(44,26,14,0.08)' }}>
          <Ico.Search style={{ width: 12, height: 12, color: 'rgba(44,26,14,0.35)' }}/>
          <span style={{ fontSize: 10, color: 'rgba(44,26,14,0.35)' }}>Search creatives, styles, locations…</span>
        </div>

        {/* Aesthetic filter pills */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 10, overflowX: 'auto' }} className="no-scrollbar">
          {[
            { l: 'Golden Hour', bg: '#FAF4D6', c: '#6A5010' },
            { l: 'Editorial',   bg: '#E2EEF6', c: '#1A4A6A' },
            { l: 'Casual',      bg: '#E6F0E6', c: '#2A5A2A' },
            { l: 'Luxury',      bg: '#EDE6F5', c: '#4A2A7A' },
          ].map(({ l, bg, c }) => (
            <span key={l} style={{ background: bg, color: c, fontSize: 9, padding: '4px 10px', borderRadius: 20, fontWeight: 600, whiteSpace: 'nowrap' }}>{l}</span>
          ))}
        </div>

        {/* Creator cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CREATORS.slice(0, 3).map((cr, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(44,26,14,0.06)' }}>
              <div className={`${cr.tile} tile-portrait`} style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: '#2C1A0E' }}>{cr.name}</span>
                  <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 20, background: TAG_COLORS[cr.tag]?.bg || '#eee', color: TAG_COLORS[cr.tag]?.text || '#333', fontWeight: 600 }}>{cr.tag}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                  <Ico.Map style={{ width: 8, height: 8, color: 'rgba(44,26,14,0.4)' }}/>
                  <span style={{ fontSize: 9, color: 'rgba(44,26,14,0.5)' }}>{cr.location}</span>
                  <span style={{ marginLeft: 4, fontSize: 9, color: 'rgba(44,26,14,0.4)' }}>★ {cr.rating}</span>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2C1A0E' }}>{cr.price}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="search"/>
    </PhoneShell>
  )
}

// ── Packages phone ────────────────────────────────────────────
function PackagesPhone() {
  const packages = [
    { name: '1-Hour Portrait Session', price: '$150', desc: 'Up to 30 edited photos, 1 location', tag: 'Casual',      bg: '#E6F0E6', tc: '#2A5A2A' },
    { name: '2-Hour Brand Shoot',       price: '$320', desc: 'Lifestyle + product, 2 locations',  tag: 'Editorial',  bg: '#E2EEF6', tc: '#1A4A6A' },
    { name: 'Golden Hour Mini',         price: '$95',  desc: '20 min, 15 edited photos',           tag: 'Golden Hour', bg: '#FAF4D6', tc: '#6A5010' },
  ]
  return (
    <PhoneShell height={600}>
      <div style={{ padding: '8px 14px 0' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.25em', fontWeight: 700, color: '#2C1A0E', textAlign: 'center', marginBottom: 8 }}>V I S I O N</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div className="tile-blush tile-portrait" style={{ width: 36, height: 36, borderRadius: '50%' }}/>
          <div>
            <span style={{ fontWeight: 700, fontSize: 12, color: '#2C1A0E' }}>Zoe Chen</span>
            <Pill label="CREATIVE" size="xs"/>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {['Portfolio', 'Packages', 'Reviews'].map((t, i) => (
            <span key={t} style={{ fontSize: 10, padding: '5px 12px', borderRadius: 20, fontWeight: 600, background: i === 1 ? '#2C1A0E' : 'white', color: i === 1 ? '#F8F2E8' : 'rgba(44,26,14,0.5)', border: i === 1 ? 'none' : '1px solid rgba(44,26,14,0.1)' }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {packages.map((pkg, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, padding: '10px 12px', border: '1px solid rgba(44,26,14,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: '#2C1A0E', marginBottom: 3 }}>{pkg.name}</div>
                  <div style={{ fontSize: 9, color: 'rgba(44,26,14,0.55)', marginBottom: 5 }}>{pkg.desc}</div>
                  <span style={{ background: pkg.bg, color: pkg.tc, fontSize: 8, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{pkg.tag}</span>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#2C1A0E' }}>{pkg.price}</div>
                  <button style={{ marginTop: 4, background: '#2C1A0E', color: '#F8F2E8', border: 'none', borderRadius: 16, padding: '4px 10px', fontSize: 9, fontWeight: 600, cursor: 'pointer' }}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile"/>
    </PhoneShell>
  )
}

// ── Chat phone ────────────────────────────────────────────────
function ChatPhone() {
  const messages = [
    { from: 'them', text: 'Hi! Loved your golden hour work. Are you free June 14?' },
    { from: 'me',   text: 'Yes, 3–5 PM works for me! Malibu or Santa Monica?' },
    { from: 'them', text: 'Malibu! Can we do the 1-hr portrait package?' },
    { from: 'me',   text: 'Perfect. I just sent a booking request — $120 all in.' },
    { from: 'them', text: 'Accepted! So excited 🙌' },
  ]
  return (
    <PhoneShell height={600}>
      {/* Chat header */}
      <div style={{ padding: '8px 14px 8px', borderBottom: '1px solid rgba(44,26,14,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className="tile-blush tile-portrait" style={{ width: 32, height: 32, borderRadius: '50%' }}/>
        <div>
          <div style={{ fontWeight: 700, fontSize: 12, color: '#2C1A0E' }}>Zoe Chen</div>
          <div style={{ fontSize: 9, color: 'rgba(44,26,14,0.45)' }}>Golden Hour · Los Angeles</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }} className="no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%', padding: '7px 10px', borderRadius: m.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.from === 'me' ? '#2C1A0E' : 'white',
              color: m.from === 'me' ? '#F8F2E8' : '#2C1A0E',
              fontSize: 10, lineHeight: 1.4,
              border: m.from === 'me' ? 'none' : '1px solid rgba(44,26,14,0.07)',
            }}>{m.text}</div>
          </div>
        ))}
        {/* Booking confirmed chip */}
        <div style={{ alignSelf: 'center', background: '#E6F0E6', color: '#2A5A2A', fontSize: 9, fontWeight: 600, padding: '4px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Ico.Check style={{ width: 9, height: 9 }}/> Booking confirmed — Jun 14, 3:00 PM
        </div>
      </div>

      {/* Input bar */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(44,26,14,0.07)', display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, background: 'white', borderRadius: 20, padding: '6px 12px', fontSize: 10, color: 'rgba(44,26,14,0.35)', border: '1px solid rgba(44,26,14,0.08)' }}>Message…</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ico.Arrow style={{ width: 12, height: 12, color: '#F8F2E8' }}/>
        </div>
      </div>
      <BottomNav active="chat"/>
    </PhoneShell>
  )
}

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-cream-100/85 backdrop-blur-md border-b border-cream-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-espresso font-bold tracking-vision text-base">V I S I O N</a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-espresso/70 font-medium">
          <a href="#how" className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <a href="#bookings" className="hover:text-espresso transition-colors">For Bookings</a>
          <a href="#download" className="hover:text-espresso transition-colors">Download</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href={APP_URL} className="hidden sm:inline-flex items-center bg-espresso text-cream-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-espresso-dark transition-colors">
            Get Vision
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-espresso" aria-label="Menu">
            {open ? <Ico.Close style={{ width: 20, height: 20 }}/> : <Ico.Menu style={{ width: 20, height: 20 }}/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-cream-200/60 bg-cream-100">
          <div className="px-5 py-4 flex flex-col gap-4 text-espresso/80 font-medium">
            <a href="#how" onClick={() => setOpen(false)}>How it Works</a>
            <a href="#creatives" onClick={() => setOpen(false)}>For Creatives</a>
            <a href="#bookings" onClick={() => setOpen(false)}>For Bookings</a>
            <a href="#download" onClick={() => setOpen(false)}>Download</a>
            <a href={APP_URL} className="bg-espresso text-cream-50 text-center py-2.5 rounded-full font-semibold mt-1">Get Vision</a>
          </div>
        </div>
      )}
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream-100">
      {/* Pastel blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-40" style={{ background: '#F2C4A0', filter: 'blur(80px)' }}/>
      <div className="absolute top-60 -left-32 w-96 h-96 rounded-full opacity-30" style={{ background: '#B8D4B8', filter: 'blur(70px)' }}/>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-25" style={{ background: '#C8B8E0', filter: 'blur(60px)' }}/>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-24 pb-16 sm:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#FBE9D6', color: '#7A3A10' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F2C4A0' }}/>
            Creator booking marketplace
          </div>
          <h1 className="mt-5 text-espresso text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight">
            book your next shoot<br/>
            <span className="italic font-normal" style={{ color: '#7A4A2A' }}>without</span> the back-and-forth.
          </h1>
          <p className="mt-5 text-espresso/65 text-base sm:text-lg max-w-lg leading-relaxed">
            Discover creatives by aesthetic, browse real portfolios, view packages, and book content shoots — all in one place.
          </p>

          {/* Style aesthetic pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { l: 'Golden Hour', bg: '#FAF4D6', c: '#6A5010' },
              { l: 'Editorial',   bg: '#E2EEF6', c: '#1A4A6A' },
              { l: 'Casual',      bg: '#E6F0E6', c: '#2A5A2A' },
              { l: 'Luxury',      bg: '#EDE6F5', c: '#4A2A7A' },
              { l: 'Events',      bg: '#FBE9E9', c: '#7A2A2A' },
            ].map(({ l, bg, c }) => (
              <span key={l} style={{ background: bg, color: c, fontSize: 12, padding: '5px 14px', borderRadius: 999, fontWeight: 600 }}>{l}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Get Vision <Ico.Arrow className="w-4 h-4"/>
            </a>
            <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-200 text-espresso px-6 py-3.5 rounded-full font-semibold hover:bg-cream-50 transition-colors">
              Join as a Creative
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['tile-blush','tile-sage','tile-peach','tile-lilac'].map(t => (
                <div key={t} className={`${t} tile-portrait`} style={{ width: 32, height: 32, borderRadius: '50%', outline: '2px solid #F8F2E8' }}/>
              ))}
            </div>
            <p className="text-sm text-espresso/55 font-medium">Photographers · Videographers · Event shooters</p>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center lg:justify-end relative">
          <HeroPhone/>
          {/* Floating cards */}
          <div className="hidden sm:flex absolute -left-8 top-24 bg-white rounded-2xl shadow-soft px-3.5 py-2.5 items-center gap-2.5 border border-cream-200/60">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A8D8C8' }}/>
            <span className="text-xs font-semibold text-espresso">New booking request</span>
          </div>
          <div className="hidden sm:block absolute -right-6 bottom-36 bg-white rounded-2xl shadow-soft px-3.5 py-2.5 border border-cream-200/60">
            <div className="text-[10px] text-espresso/50 font-medium">Starting from</div>
            <div className="text-sm font-bold text-espresso">$95 / session</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Problem ───────────────────────────────────────────────────
function Problem() {
  const items = [
    { n: '1', title: 'Too many DMs', body: 'Endless back-and-forth across apps just to get a price and a date.', bg: '#FBE9E9', num: '#7A2A2A' },
    { n: '2', title: 'No clear packages', body: 'Pricing shifts every conversation. Nothing transparent, nothing bookable.', bg: '#FAF4D6', num: '#6A5010' },
    { n: '3', title: 'Hard to compare creatives', body: 'Style, rates, and availability are scattered across five platforms.', bg: '#EDE6F5', num: '#4A2A7A' },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: '#FDFAF5' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The Problem</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            booking content help shouldn't feel like a group project.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base" style={{ background: it.bg, color: it.num }}>
                {it.n}
              </div>
              <h3 className="mt-5 font-bold text-lg text-espresso">{it.title}</h3>
              <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-espresso/65 text-base sm:text-lg max-w-2xl leading-relaxed">
          Vision brings portfolios, packages, availability, and booking requests into one clean flow.
        </p>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const [tab, setTab] = useState('book')
  const steps = {
    book: [
      { n: '01', t: 'Browse by aesthetic', d: 'Filter creatives by style — Golden Hour, Editorial, Casual, Luxury, and more.', color: '#FAF4D6', tc: '#6A5010' },
      { n: '02', t: 'View packages & availability', d: 'See transparent pricing, real portfolio work, and open dates — all on one profile.', color: '#E2EEF6', tc: '#1A4A6A' },
      { n: '03', t: 'Book & pay securely', d: 'Request a date, confirm the booking, and pay through Stripe — no DMs needed.', color: '#E6F0E6', tc: '#2A5A2A' },
    ],
    create: [
      { n: '01', t: 'Build your profile', d: 'Add your portfolio, bio, style tags, location, and starting price.', color: '#FBE9D6', tc: '#7A3A10' },
      { n: '02', t: 'List packages & set availability', d: 'Create fixed-price packages and toggle instant booking to skip the back-and-forth.', color: '#EDE6F5', tc: '#4A2A7A' },
      { n: '03', t: 'Get booked & get paid', d: 'Accept requests, coordinate via in-app chat, and receive direct deposits via Stripe Connect.', color: '#D6EEE8', tc: '#1A5A48' },
    ],
  }
  return (
    <section id="how" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">How it works</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              simple for both sides of the booking.
            </h2>
          </div>
          <div className="inline-flex bg-cream-200/80 p-1 rounded-full self-start">
            {[['book','For Bookings'],['create','For Creatives']].map(([k,l]) => (
              <button key={k} id={k === 'book' ? 'bookings' : 'creatives'} onClick={() => setTab(k)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === k ? 'bg-espresso text-cream-50' : 'text-espresso/60'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {steps[tab].map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/50">
              <span className="inline-block font-bold text-2xl px-3 py-1 rounded-xl" style={{ background: s.color, color: s.tc }}>{s.n}</span>
              <h3 className="mt-4 font-bold text-lg text-espresso">{s.t}</h3>
              <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────
function Features() {
  const features = [
    { Icon: Ico.User,     title: 'Creator profiles',          body: 'Bio, location, style tags, rating, and booking stats — all on one polished page.', bg: '#FBE9D6', ic: '#7A3A10' },
    { Icon: Ico.Grid,     title: 'Portfolio grids',           body: 'Style-tagged portfolio work with draggable cover-image positioning.', bg: '#E2EEF6', ic: '#1A4A6A' },
    { Icon: Ico.Package,  title: 'Fixed-price packages',      body: 'Creatives list clear packages — clients book without negotiating every time.', bg: '#E6F0E6', ic: '#2A5A2A' },
    { Icon: Ico.Tag,      title: 'Aesthetic discovery',       body: 'Filter by Golden Hour, Editorial, Casual, Luxury, and more to find the right fit.', bg: '#FAF4D6', ic: '#6A5010' },
    { Icon: Ico.Calendar, title: 'Availability & scheduling', body: 'Creatives set weekly slots; clients see open dates and request in real time.', bg: '#EDE6F5', ic: '#4A2A7A' },
    { Icon: Ico.Chat,     title: 'In-app messaging',          body: 'Coordinate shoot details, negotiate times, and confirm everything without leaving the app.', bg: '#D6EEE8', ic: '#1A5A48' },
    { Icon: Ico.Stripe,   title: 'Stripe payments',           body: 'Secure checkout for clients, direct deposits for creatives. Platform takes 5%.', bg: '#FBE9E9', ic: '#7A2A2A' },
    { Icon: Ico.Lightning,'title': 'Instant booking',         body: 'Creatives can toggle instant booking — clients lock in without waiting for approval.', bg: '#FAF4D6', ic: '#6A5010' },
    { Icon: Ico.Bookmark, title: 'Save & shortlist',          body: 'Bookmark creatives and listings to build your shortlist before committing.', bg: '#EDE6F5', ic: '#4A2A7A' },
    { Icon: Ico.Star,     title: 'Ratings & reviews',         body: 'Both sides leave reviews after a shoot, building trust across the platform.', bg: '#FBE9D6', ic: '#7A3A10' },
    { Icon: Ico.Lock,     title: 'Secure & moderated',        body: 'Google + email auth, in-app reporting, and an admin dashboard for oversight.', bg: '#E6F0E6', ic: '#2A5A2A' },
    { Icon: Ico.Download, title: 'PWA — no app store',        body: 'Install Vision directly from the browser and add it to your home screen.', bg: '#E2EEF6', ic: '#1A4A6A' },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: '#FDFAF5' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Features</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            everything you need to book and get booked.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: f.bg }}>
                <f.Icon style={{ width: 20, height: 20, color: f.ic }}/>
              </div>
              <h3 className="mt-4 font-bold text-base text-espresso">{f.title}</h3>
              <p className="mt-1.5 text-espresso/60 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── App Showcase (3 phones side by side) ──────────────────────
function AppShowcase() {
  const screens = [
    { label: 'Browse Creatives',  Phone: BrowsePhone,   bg: '#E6F0E6', tc: '#2A5A2A' },
    { label: 'In-App Chat',       Phone: ChatPhone,     bg: '#E2EEF6', tc: '#1A4A6A' },
    { label: 'Package Booking',   Phone: PackagesPhone, bg: '#EDE6F5', tc: '#4A2A7A' },
  ]
  return (
    <section className="py-16 sm:py-24 bg-cream-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The App</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            one app. three views. zero confusion.
          </h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">
            Clients discover and book. Creatives list and get paid. Everyone stays on the same page.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 items-start justify-center">
          {screens.map(({ label, Phone, bg, tc }, i) => (
            <div key={i} className="flex flex-col items-center gap-4 flex-1">
              <Phone/>
              <span style={{ background: bg, color: tc, fontSize: 12, fontWeight: 700, padding: '5px 16px', borderRadius: 999 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Creator Profiles section ──────────────────────────────────
function CreatorProfiles() {
  return (
    <section id="creatives" className="py-16 sm:py-24" style={{ background: '#FDFAF5' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: phone */}
          <div className="flex justify-center">
            <HeroPhone/>
          </div>
          {/* Right: copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">For Creatives</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">
              your profile is your portfolio, your packages, and your calendar — all in one.
            </h2>
            <div className="mt-8 flex flex-col gap-4">
              {[
                { icon: Ico.Grid,     label: 'Upload portfolio work with style tags and draggable cover images.', bg: '#FBE9D6', ic: '#7A3A10' },
                { icon: Ico.Package,  label: 'Set fixed-price packages — clients book without back-and-forth.', bg: '#E6F0E6', ic: '#2A5A2A' },
                { icon: Ico.Calendar, label: 'Toggle instant booking and set your weekly availability slots.', bg: '#EDE6F5', ic: '#4A2A7A' },
                { icon: Ico.Dollar,   label: 'Get paid via Stripe Connect. Track earnings and payout status in one place.', bg: '#E2EEF6', ic: '#1A4A6A' },
              ].map(({ icon: I, label, bg, ic }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                    <I style={{ width: 18, height: 18, color: ic }}/>
                  </div>
                  <p className="text-espresso/70 text-sm leading-relaxed pt-2">{label}</p>
                </div>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Join as a Creative <Ico.Arrow className="w-4 h-4"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Listings section ──────────────────────────────────────────
function Listings() {
  return (
    <section id="bookings" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">For Clients</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">
              post a listing or browse creatives — either way, you're in control.
            </h2>
            <p className="mt-4 text-espresso/60 leading-relaxed">
              Post a custom shoot listing with your budget, location, and vibe — or browse available creatives and book directly from their profile. No DMs, no waiting.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {LISTINGS.map((l, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-cream-200/50">
                  <div className={`${l.tile} tile-portrait aspect-[4/3] relative`}>
                    <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.92)', fontSize: 10, fontWeight: 700, color: '#2C1A0E', padding: '3px 9px', borderRadius: 999 }}>{l.price}</span>
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-xs text-espresso leading-tight">{l.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Ico.Map style={{ width: 8, height: 8, color: 'rgba(44,26,14,0.4)' }}/>
                      <span style={{ fontSize: 9, color: 'rgba(44,26,14,0.5)' }}>{l.location}</span>
                    </div>
                    <div className="mt-1.5">
                      <Pill label={l.tag} size="xs"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Start Browsing <Ico.Arrow className="w-4 h-4"/>
            </a>
          </div>
          {/* Right: listing phone */}
          <div className="flex justify-center">
            <ListingPhone/>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PWA Section ───────────────────────────────────────────────
function PWA() {
  return (
    <section id="download" className="py-16 sm:py-24" style={{ background: '#FDFAF5' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="bg-espresso rounded-[2.5rem] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          {/* Pastel accent blobs on dark bg */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10" style={{ background: '#F2C4A0', filter: 'blur(50px)' }}/>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#B8D4E8', filter: 'blur(50px)' }}/>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(248,242,232,0.12)', color: '#F8F2E8' }}>
              <Ico.Download style={{ width: 12, height: 12 }}/> Progressive Web App
            </div>
            <h2 className="mt-5 text-cream-50 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              install Vision directly from the web.
            </h2>
            <p className="mt-5 text-cream-50/65 text-base sm:text-lg leading-relaxed max-w-lg">
              Vision is a Progressive Web App — open it in your browser, add to your home screen, and use it like a native app. No App Store needed.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              {/* Replace APP_URL at the top of this file with your Lovable/PWA link */}
              <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-cream-50 text-espresso px-6 py-3.5 rounded-full font-semibold hover:bg-cream-100 transition-colors">
                Open Vision App <Ico.Arrow className="w-4 h-4"/>
              </a>
            </div>
            {/* PWA steps */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                { step: '1', text: 'Open joinvision.app in Safari or Chrome', bg: '#FBE9D6', c: '#7A3A10' },
                { step: '2', text: 'Tap "Share" then "Add to Home Screen"',   bg: '#E6F0E6', c: '#2A5A2A' },
                { step: '3', text: 'Launch from your home screen like any app', bg: '#E2EEF6', c: '#1A4A6A' },
              ].map(s => (
                <div key={s.step} className="flex items-center gap-3">
                  <span style={{ background: s.bg, color: s.c, fontWeight: 700, fontSize: 11, width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.step}</span>
                  <span className="text-cream-50/75 text-sm">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini phone */}
          <div className="relative flex justify-center lg:justify-end">
            <div style={{ width: 180, flexShrink: 0 }}>
              <div style={{ background: '#3A2A1A', borderRadius: 36, padding: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <div style={{ background: '#F8F2E8', borderRadius: 28, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <span style={{ color: '#F8F2E8', fontSize: 22, fontWeight: 800 }}>V</span>
                  </div>
                  <p style={{ fontSize: 8, letterSpacing: '0.3em', fontWeight: 700, color: '#2C1A0E', marginBottom: 2 }}>V I S I O N</p>
                  <p style={{ fontSize: 8, color: 'rgba(44,26,14,0.5)', marginBottom: 16 }}>Add to Home Screen</p>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ height: 7, background: '#EFE5D4', borderRadius: 10 }}/>
                    <div style={{ height: 7, background: '#EFE5D4', borderRadius: 10, width: '80%' }}/>
                    <div style={{ height: 7, background: '#EFE5D4', borderRadius: 10, width: '60%' }}/>
                  </div>
                  <button style={{ marginTop: 16, background: '#2C1A0E', color: '#F8F2E8', border: 'none', borderRadius: 20, padding: '7px 18px', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>Install App</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 bg-cream-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-30" style={{ background: '#F2C4A0', filter: 'blur(70px)' }}/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-25" style={{ background: '#B8D4B8', filter: 'blur(70px)' }}/>
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-20" style={{ background: '#C8B8E0', filter: 'blur(60px)' }}/>
      </div>
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Join Vision</span>
        <h2 className="mt-4 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          ready to book or get booked?
        </h2>
        <p className="mt-5 text-espresso/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Join Vision and make content bookings feel simple, visual, and organized.
        </p>
        {/* Pastel tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { l: 'Photographers',   bg: '#FBE9D6', c: '#7A3A10' },
            { l: 'Videographers',   bg: '#E2EEF6', c: '#1A4A6A' },
            { l: 'Event Shooters',  bg: '#E6F0E6', c: '#2A5A2A' },
            { l: 'Content Creators',bg: '#EDE6F5', c: '#4A2A7A' },
            { l: 'Brands & Clients',bg: '#FAF4D6', c: '#6A5010' },
          ].map(({ l, bg, c }) => (
            <span key={l} style={{ background: bg, color: c, fontSize: 12, padding: '5px 14px', borderRadius: 999, fontWeight: 600 }}>{l}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          {/* Replace APP_URL at the top of this file with your Lovable/PWA link */}
          <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-espresso text-cream-50 px-7 py-4 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft text-base">
            Get Vision <Ico.Arrow className="w-4 h-4"/>
          </a>
          <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-200 text-espresso px-7 py-4 rounded-full font-semibold hover:bg-cream-50 transition-colors text-base">
            Join as a Creative
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-3 gap-8 items-start">
        <div>
          <p className="font-bold tracking-vision text-espresso text-sm">V I S I O N</p>
          <p className="mt-3 text-espresso/55 text-sm max-w-xs leading-relaxed">
            A creator booking marketplace for content shoots, events, and creative services.
          </p>
          {/* Pastel aesthetic tags in footer */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              { l: 'Golden Hour', bg: '#FAF4D6', c: '#6A5010' },
              { l: 'Editorial',   bg: '#E2EEF6', c: '#1A4A6A' },
              { l: 'Casual',      bg: '#E6F0E6', c: '#2A5A2A' },
            ].map(({ l, bg, c }) => (
              <span key={l} style={{ background: bg, color: c, fontSize: 10, padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>{l}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-espresso/60">
          <p className="font-semibold text-espresso/80 text-xs uppercase tracking-vision-sm mb-1">Company</p>
          <a href="#" className="hover:text-espresso transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-espresso transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-espresso transition-colors">Contact</a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-espresso/60">
          <p className="font-semibold text-espresso/80 text-xs uppercase tracking-vision-sm mb-1">Platform</p>
          <a href="#how" className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <a href="#bookings" className="hover:text-espresso transition-colors">For Clients</a>
          <a href="#download" className="hover:text-espresso transition-colors">Install App</a>
        </div>
      </div>
      <div className="border-t border-cream-200/70 py-5 px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-espresso/40">
        <span>© {new Date().getFullYear()} Vision. All rights reserved.</span>
        <span>Built for PWA access · Stripe-powered payments</span>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-cream-100 min-h-screen font-sans">
      <Header/>
      <main>
        <Hero/>
        <Problem/>
        <HowItWorks/>
        <AppShowcase/>
        <Features/>
        <CreatorProfiles/>
        <Listings/>
        <PWA/>
        <FinalCTA/>
      </main>
      <Footer/>
    </div>
  )
}
