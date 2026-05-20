import React, { useState } from 'react'

// ============================================================
// REPLACE THIS URL LATER WITH YOUR LOVABLE APP / PWA URL
// All "Get Vision" and "Open App" buttons use this constant.
// Example: const APP_URL = "https://your-lovable-app.lovable.app"
// ============================================================
const APP_URL = "https://app.joinvision.app"

// Small reusable icon set (inline SVGs — no external deps)
const Icon = {
  Home: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.8 8.6a5.5 5.5 0 0 0-9.3-2.4l-.5.5-.5-.5A5.5 5.5 0 0 0 3.2 12c0 5 8.8 9.7 8.8 9.7s8.8-4.7 8.8-9.7"/></svg>
  ),
  Grid: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
  ),
  Package: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="m3 7 9 4 9-4M12 11v10M3 7v10l9 4M21 7v10l-9 4"/></svg>
  ),
  Camera: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/></svg>
  ),
  Download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
  ),
  Bookmark: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.8.7-5 4.7 1.4 6.7L12 17l-6.1 3.4 1.4-6.7-5-4.7 6.8-.7L12 2Z"/></svg>
  ),
}

// ---------- Header ----------
function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-cream-100/80 backdrop-blur-md border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-espresso text-lg sm:text-xl font-semibold tracking-vision">
          V I S I O N
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-espresso/80">
          <a href="#how" className="hover:text-espresso transition">How it Works</a>
          <a href="#creatives" className="hover:text-espresso transition">For Creatives</a>
          <a href="#bookings" className="hover:text-espresso transition">For Bookings</a>
          <a href="#download" className="hover:text-espresso transition">Download</a>
        </nav>
        <div className="flex items-center gap-3">
          {/* Replace APP_URL above with your Lovable app/PWA URL */}
          <a
            href={APP_URL}
            className="hidden sm:inline-flex items-center bg-espresso text-cream-50 px-4 py-2 rounded-full text-sm font-medium hover:bg-espresso-dark transition"
          >
            Get Vision
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-espresso"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open
                ? <path d="M6 6l12 12M18 6 6 18" />
                : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>
              }
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-cream-200/60 bg-cream-100">
          <div className="px-5 py-4 flex flex-col gap-3 text-espresso/90">
            <a href="#how" onClick={() => setOpen(false)}>How it Works</a>
            <a href="#creatives" onClick={() => setOpen(false)}>For Creatives</a>
            <a href="#bookings" onClick={() => setOpen(false)}>For Bookings</a>
            <a href="#download" onClick={() => setOpen(false)}>Download</a>
            <a href={APP_URL} className="bg-espresso text-cream-50 text-center py-2 rounded-full mt-2">Get Vision</a>
          </div>
        </div>
      )}
    </header>
  )
}

// ---------- Phone Mockup ----------
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* Phone shell */}
      <div className="relative rounded-[44px] bg-espresso p-3 shadow-phone">
        <div className="rounded-[36px] bg-cream-50 overflow-hidden h-[600px] flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-1 text-[10px] text-espresso/70 font-medium">
            <span>9:41</span>
            <span className="flex gap-1 items-center">
              <span className="w-3 h-1.5 bg-espresso/60 rounded-sm"/>
              <span className="w-3 h-1.5 bg-espresso/60 rounded-sm"/>
              <span className="w-4 h-2 border border-espresso/60 rounded-sm"/>
            </span>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-hidden">
            <div className="px-4 pt-2 pb-3">
              <div className="text-center">
                <p className="font-display tracking-vision-tight text-espresso text-[11px] font-semibold">V I S I O N</p>
              </div>
            </div>

            {/* Profile card */}
            <div className="mx-3 bg-white rounded-3xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full tile-2 ring-2 ring-cream-100"/>
                <div className="flex-1">
                  <p className="text-espresso font-semibold text-sm">Maya Rivera</p>
                  <p className="text-espresso/60 text-xs">Content Creator · LA</p>
                </div>
                <button className="bg-espresso text-cream-50 text-[10px] font-medium px-3 py-1.5 rounded-full">Book</button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-cream-100 rounded-2xl py-2 text-center">
                  <p className="text-espresso font-semibold text-sm">48</p>
                  <p className="text-espresso/60 text-[9px]">Posts</p>
                </div>
                <div className="bg-cream-100 rounded-2xl py-2 text-center">
                  <p className="text-espresso font-semibold text-sm flex items-center justify-center gap-0.5">
                    4.9<Icon.Star className="w-2.5 h-2.5 text-peach-200"/>
                  </p>
                  <p className="text-espresso/60 text-[9px]">Rating</p>
                </div>
                <div className="bg-cream-100 rounded-2xl py-2 text-center">
                  <p className="text-espresso font-semibold text-sm">126</p>
                  <p className="text-espresso/60 text-[9px]">Bookings</p>
                </div>
              </div>
            </div>

            {/* Pill tabs */}
            <div className="px-3 mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
              {['Portfolio','Packages','Bookings','Saved'].map((t,i)=>(
                <span key={t}
                  className={`text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap ${
                    i===0 ? 'bg-espresso text-cream-50' : 'bg-softpink-50 text-espresso/80'
                  }`}>
                  {t}
                </span>
              ))}
            </div>

            {/* Portfolio grid */}
            <div className="px-3 mt-3 grid grid-cols-2 gap-2">
              {[
                {cls:'tile-1', price:'$220'},
                {cls:'tile-2', price:'$180'},
                {cls:'tile-3', price:'$340'},
                {cls:'tile-4', price:'$150'},
              ].map((t,i)=>(
                <div key={i} className={`${t.cls} rounded-2xl aspect-[3/4] relative overflow-hidden`}>
                  <span className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur text-espresso text-[9px] font-semibold px-2 py-0.5 rounded-full">
                    {t.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="border-t border-cream-200/60 bg-white px-2 pt-2 pb-3 flex items-center justify-between">
            {[
              {Cmp:Icon.Home, active:true},
              {Cmp:Icon.Search},
              {Cmp:null}, // placeholder for plus
              {Cmp:Icon.Chat},
              {Cmp:Icon.User},
            ].map((n,i)=>{
              if (i===2) {
                return (
                  <div key={i} className="-mt-7">
                    <div className="w-11 h-11 rounded-full bg-espresso flex items-center justify-center shadow-soft">
                      <Icon.Plus className="w-5 h-5 text-cream-50"/>
                    </div>
                  </div>
                )
              }
              const C = n.Cmp
              return (
                <div key={i} className="flex-1 flex justify-center">
                  <C className={`w-5 h-5 ${n.active ? 'text-espresso' : 'text-espresso/40'}`}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Decorative floating tags */}
      <div className="hidden sm:flex absolute -left-10 top-20 bg-white rounded-full shadow-card px-3 py-1.5 items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-peach-200"/>
        <span className="text-[11px] text-espresso font-medium">New booking</span>
      </div>
      <div className="hidden sm:block absolute -right-8 bottom-32 bg-white rounded-2xl shadow-card px-3 py-2">
        <p className="text-[10px] text-espresso/60">Package</p>
        <p className="text-xs text-espresso font-semibold">2hr Brand Shoot</p>
      </div>
    </div>
  )
}

// ---------- Hero ----------
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-peach-100/50 blur-3xl"/>
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-softpink-50/60 blur-3xl"/>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-softpink-50 text-espresso text-xs font-medium px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-peach-200"/> Creator booking marketplace
          </span>
          <h1 className="mt-5 font-display text-espresso text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Book your next shoot <span className="italic text-espresso-light">without</span> the back-and-forth.
          </h1>
          <p className="mt-5 text-espresso/70 text-base sm:text-lg max-w-xl leading-relaxed">
            Discover creatives, browse portfolios, view packages, request dates,
            and book content shoots — all in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {/* Replace APP_URL constant above with your Lovable app/PWA link */}
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-medium hover:bg-espresso-dark transition shadow-soft"
            >
              Get Vision
            </a>
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center bg-white border border-cream-300 text-espresso px-6 py-3.5 rounded-full font-medium hover:bg-cream-50 transition"
            >
              Join as a Creative
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full tile-1 ring-2 ring-cream-100"/>
              <div className="w-8 h-8 rounded-full tile-4 ring-2 ring-cream-100"/>
              <div className="w-8 h-8 rounded-full tile-2 ring-2 ring-cream-100"/>
              <div className="w-8 h-8 rounded-full tile-6 ring-2 ring-cream-100"/>
            </div>
            <p className="text-sm text-espresso/60">Photographers · Videographers · Event shooters</p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneMockup/>
        </div>
      </div>
    </section>
  )
}

// ---------- Problem Section ----------
function Problem() {
  const items = [
    { title: 'Too many DMs', body: 'Endless back-and-forth across platforms just to get a quote and a date.' },
    { title: 'No clear packages', body: 'Pricing changes every conversation. Nothing feels straightforward.' },
    { title: 'Hard to compare creatives', body: 'Style, rates, and availability live in five different places.' },
  ]
  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-vision-tight text-espresso/60 font-medium">The Problem</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-espresso font-semibold leading-tight">
            Booking content help shouldn't feel like a group project.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/60">
              <div className="w-10 h-10 rounded-2xl bg-softpink-50 flex items-center justify-center text-espresso font-display font-semibold">
                {i+1}
              </div>
              <h3 className="mt-5 font-display text-xl text-espresso font-semibold">{it.title}</h3>
              <p className="mt-2 text-espresso/70 text-sm leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-espresso/70 text-base sm:text-lg max-w-2xl">
          Vision brings portfolios, packages, availability, and booking requests into one simple flow.
        </p>
      </div>
    </section>
  )
}

// ---------- How It Works ----------
function HowItWorks() {
  const [tab, setTab] = useState('book')
  const steps = {
    book: [
      { n: '01', t: 'Browse creatives and listings', d: 'Explore profiles, portfolios, and styles tailored to your shoot.' },
      { n: '02', t: 'View portfolios, packages, and availability', d: 'See real work, transparent pricing, and open dates upfront.' },
      { n: '03', t: 'Request a date and book your shoot', d: 'Send a booking request and lock in your creative in minutes.' },
    ],
    create: [
      { n: '01', t: 'Create your profile', d: 'Add your bio, location, and styles — let your work do the talking.' },
      { n: '02', t: 'Add portfolio posts and packages', d: 'Showcase your best shoots and publish clear, bookable packages.' },
      { n: '03', t: 'Set your availability and receive booking requests', d: 'Open your calendar and get matched with clients who fit.' },
    ],
  }
  return (
    <section id="how" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-vision-tight text-espresso/60 font-medium">How it works</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-espresso font-semibold leading-tight">
              Simple for both sides of the booking.
            </h2>
          </div>
          <div className="inline-flex bg-cream-200/70 p-1 rounded-full self-start">
            <button
              id="bookings"
              onClick={() => setTab('book')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                tab === 'book' ? 'bg-espresso text-cream-50' : 'text-espresso/70'
              }`}
            >
              For Bookings
            </button>
            <button
              id="creatives"
              onClick={() => setTab('create')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                tab === 'create' ? 'bg-espresso text-cream-50' : 'text-espresso/70'
              }`}
            >
              For Creatives
            </button>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {steps[tab].map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/60 relative">
              <span className="font-display text-espresso/30 text-3xl font-semibold">{s.n}</span>
              <h3 className="mt-3 font-display text-xl text-espresso font-semibold">{s.t}</h3>
              <p className="mt-2 text-espresso/70 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Feature Showcase ----------
function Features() {
  const features = [
    { icon: Icon.User, title: 'Creator profiles', body: 'Polished profiles with bio, location, styles, and stats.' },
    { icon: Icon.Grid, title: 'Portfolio grids', body: 'Instagram-style grids that show your best work first.' },
    { icon: Icon.Package, title: 'Service packages', body: 'Clear, bookable packages with transparent pricing.' },
    { icon: Icon.Camera, title: 'Listing posts', body: 'Post your shoots, niches, and availability windows.' },
    { icon: Icon.Calendar, title: 'Availability calendar', body: 'Set open dates so clients can request shoots fast.' },
    { icon: Icon.Chat, title: 'In-app chat', body: 'Talk to clients and creatives without leaving Vision.' },
    { icon: Icon.Bookmark, title: 'Saved creatives & listings', body: 'Bookmark favorites and shortlist for later.' },
    { icon: Icon.Download, title: 'PWA install from web', body: 'Add Vision to your home screen — no app store needed.' },
  ]
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-vision-tight text-espresso/60 font-medium">Features</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-espresso font-semibold leading-tight">
            Everything you need to book and get booked.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const I = f.icon
            return (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-cream-200/60 hover:-translate-y-1 transition">
                <div className="w-11 h-11 rounded-2xl bg-peach-50 flex items-center justify-center text-espresso">
                  <I className="w-5 h-5"/>
                </div>
                <h3 className="mt-4 font-display text-lg text-espresso font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-espresso/65 text-sm leading-relaxed">{f.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---------- PWA Section ----------
function PWA() {
  return (
    <section id="download" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="bg-espresso text-cream-50 rounded-[2.5rem] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-peach-100/15 blur-3xl"/>
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-softpink-50/10 blur-3xl"/>
          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-cream-50/10 text-cream-50 text-xs font-medium px-3 py-1.5 rounded-full">
              <Icon.Download className="w-3.5 h-3.5"/> Progressive Web App
            </span>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Install Vision directly from the web.
            </h2>
            <p className="mt-5 text-cream-50/75 text-base sm:text-lg leading-relaxed max-w-lg">
              Vision will be available as a Progressive Web App, so users can open it from
              the website and save it to their phone home screen without needing the App Store first.
            </p>
            <div className="mt-7">
              {/* Replace APP_URL constant above with your Lovable app/PWA link */}
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 bg-cream-50 text-espresso px-6 py-3.5 rounded-full font-medium hover:bg-cream-100 transition"
              >
                Open Vision App
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
              </a>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-56 sm:w-64">
              {/* Mini phone */}
              <div className="rounded-[36px] bg-cream-100 p-2.5 shadow-phone">
                <div className="rounded-[28px] bg-cream-50 p-6 aspect-[9/16] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-espresso flex items-center justify-center mb-4">
                    <span className="font-display text-cream-50 text-xl font-semibold">V</span>
                  </div>
                  <p className="font-display tracking-vision-tight text-espresso text-xs font-semibold">V I S I O N</p>
                  <p className="text-espresso/60 text-[10px] mt-1">Add to Home Screen</p>
                  <div className="mt-6 w-full space-y-2">
                    <div className="h-2 bg-cream-200 rounded-full"/>
                    <div className="h-2 bg-cream-200 rounded-full w-4/5"/>
                    <div className="h-2 bg-cream-200 rounded-full w-3/5"/>
                  </div>
                  <button className="mt-6 bg-espresso text-cream-50 text-[10px] px-4 py-2 rounded-full">Install App</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Final CTA ----------
function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-vision-tight text-espresso/60 font-medium">Join Vision</span>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-espresso font-semibold leading-tight">
          Ready to book or get booked?
        </h2>
        <p className="mt-5 text-espresso/70 text-base sm:text-lg max-w-2xl mx-auto">
          Join Vision and make content bookings feel simple, visual, and organized.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          {/* Replace APP_URL above with your Lovable app/PWA URL */}
          <a href={APP_URL} className="inline-flex items-center justify-center bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-medium hover:bg-espresso-dark transition shadow-soft">
            Get Vision
          </a>
          <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-300 text-espresso px-6 py-3.5 rounded-full font-medium hover:bg-cream-50 transition">
            Join as a Creative
          </a>
        </div>
      </div>
    </section>
  )
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-2 gap-8 items-start">
        <div>
          <p className="font-display tracking-vision text-espresso font-semibold">V I S I O N</p>
          <p className="mt-3 text-espresso/65 text-sm max-w-sm leading-relaxed">
            A creator booking marketplace for content shoots, events, and creative services.
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex gap-6 text-sm text-espresso/70">
            <a href="#" className="hover:text-espresso">Privacy</a>
            <a href="#" className="hover:text-espresso">Terms</a>
            <a href="#" className="hover:text-espresso">Contact</a>
          </div>
          <p className="text-xs text-espresso/50">Built for PWA access.</p>
        </div>
      </div>
      <div className="border-t border-cream-200/70 py-5 text-center text-xs text-espresso/50">
        © {new Date().getFullYear()} Vision. All rights reserved.
      </div>
    </footer>
  )
}

// ---------- App ----------
export default function App() {
  return (
    <div className="bg-cream-100 min-h-screen">
      <Header/>
      <main>
        <Hero/>
        <Problem/>
        <HowItWorks/>
        <Features/>
        <PWA/>
        <FinalCTA/>
      </main>
      <Footer/>
    </div>
  )
}
