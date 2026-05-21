import React, { useState } from 'react'

// ============================================================
// REPLACE THIS WITH YOUR LOVABLE / PWA URL
// Example: const APP_URL = "https://your-app.lovable.app"
// ============================================================
const APP_URL = "https://app.joinvision.app"

// ─── Icons ────────────────────────────────────────────────────
const Ico = {
  Home:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12 12 4l9 8"/><path d="M5 10v10h5v-5h4v5h5V10"/></svg>,
  Search:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Chat:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>,
  User:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  Plus:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Star:     (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.8.7-5 4.7 1.4 6.7L12 17l-6.1 3.4 1.4-6.7-5-4.7 6.8-.7L12 2Z"/></svg>,
  Arrow:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>,
  Menu:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  Close:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  Check:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  Map:      (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2"/></svg>,
  Download: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>,
  Sparkle:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  Eye:      (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Palette:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125C13.033 18.769 13 18.5 13 18c0-.586.414-1 1-1h1.5c2.485 0 4.5-2.015 4.5-4.5C20 7.253 16.418 2 12 2Z"/></svg>,
  Film:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>,
  Wand:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 4-9 9 6 6 9-9-6-6ZM4 20l2-2M9 4l2 2M4 9l2 2M14 19l2 2M19 14l2 2"/></svg>,
  Layers:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 2 10 6.5-10 6.5L2 8.5 12 2Z"/><path d="m20 13 2 1.5-10 6.5L2 14.5l2-1.5"/></svg>,
}

// ─── Pixar-style cartoon avatars ──────────────────────────────
const AVATAR_SRCS = {
  Zoe:    "/creators/zoe.png",
  Marcus: "/creators/marcus.png",
  Sofia:  "/creators/sofia.png",
  Ava:    "/creators/ava.png",
  Kai:    "/creators/kai.png",
  Lena:   "/creators/lena.png",
}

function makeAvatar(key) {
  return function Avatar({ size = 40 }) {
    return (
      <img
        src={AVATAR_SRCS[key]}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", display: "block" }}
      />
    )
  }
}

const Avatar = {
  Zoe:    makeAvatar("Zoe"),
  Marcus: makeAvatar("Marcus"),
  Sofia:  makeAvatar("Sofia"),
  Ava:    makeAvatar("Ava"),
  Kai:    makeAvatar("Kai"),
  Lena:   makeAvatar("Lena"),
}

// ─── Creators dataset ─────────────────────────────────────────
const CREATORS = [
  { name: "Zoe Chen",     Av: Avatar.Zoe,    handle: "@zoechen",    role: "PHOTOGRAPHER",     location: "Los Angeles",   price: "$120", tag: "Golden Hour", rating: "4.9", works: 34, bookings: 89,  tagBg: "#FAF4D6", tagC: "#6A5010" },
  { name: "Marcus Ali",   Av: Avatar.Marcus, handle: "@marcusali",  role: "VIDEOGRAPHER",     location: "New York",      price: "$200", tag: "Editorial",   rating: "5.0", works: 21, bookings: 52,  tagBg: "#E2EEF6", tagC: "#1A4A6A" },
  { name: "Sofia Reyes",  Av: Avatar.Sofia,  handle: "@sofiareyes", role: "STYLIST",          location: "Miami",         price: "$95",  tag: "Lifestyle",   rating: "4.8", works: 47, bookings: 130, tagBg: "#E6F0E6", tagC: "#2A5A2A" },
  { name: "Ava Nakamura", Av: Avatar.Ava,    handle: "@avanaka",    role: "CREATIVE DIR.",    location: "San Francisco", price: "$175", tag: "Luxury",      rating: "5.0", works: 18, bookings: 44,  tagBg: "#EDE6F5", tagC: "#4A2A7A" },
  { name: "Kai Williams", Av: Avatar.Kai,    handle: "@kaiwill",    role: "CONTENT CREATOR",  location: "Portland",      price: "$110", tag: "Candid",      rating: "4.9", works: 29, bookings: 71,  tagBg: "#D6EEE8", tagC: "#1A5A48" },
  { name: "Lena Park",    Av: Avatar.Lena,   handle: "@lenapark",   role: "GRAPHIC DESIGNER", location: "Chicago",       price: "$140", tag: "Branding",    rating: "4.8", works: 38, bookings: 60,  tagBg: "#FBE9E9", tagC: "#7A2A2A" },
]

// ─── ArtTile — abstract decorative tile, no human figure ──────
function ArtTile({ bg, variant = 0, price, label, style = {} }) {
  const patterns = [
    <React.Fragment key="p0">
      <div style={{ position: "absolute", top: "-15%", right: "-15%", width: "65%", paddingBottom: "65%", borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "50%", paddingBottom: "50%", borderRadius: "50%", background: "rgba(0,0,0,0.07)" }} />
      <div style={{ position: "absolute", top: "35%", left: "20%", width: "28%", paddingBottom: "28%", borderRadius: "50%", background: "rgba(255,255,255,0.14)" }} />
    </React.Fragment>,
    <React.Fragment key="p1">
      <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", background: "rgba(255,255,255,0.12)", transform: "skewX(-10deg)", transformOrigin: "top right" }} />
      <div style={{ position: "absolute", bottom: "18%", left: "12%", width: "42%", height: "2px", background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
      <div style={{ position: "absolute", bottom: "25%", left: "12%", width: "58%", height: "2px", background: "rgba(255,255,255,0.18)", borderRadius: 2 }} />
    </React.Fragment>,
    <React.Fragment key="p2">
      <div style={{ position: "absolute", top: "10%", left: "10%", width: "42%", paddingBottom: "42%", borderRadius: 14, background: "rgba(255,255,255,0.16)" }} />
      <div style={{ position: "absolute", top: "20%", right: "8%", width: "30%", paddingBottom: "30%", borderRadius: 10, background: "rgba(0,0,0,0.07)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "12%", width: "38%", paddingBottom: "38%", borderRadius: 12, background: "rgba(255,255,255,0.11)" }} />
    </React.Fragment>,
    <React.Fragment key="p3">
      <div style={{ position: "absolute", bottom: "-8%", left: "50%", transform: "translateX(-50%)", width: "130%", paddingBottom: "65%", borderRadius: "50% 50% 0 0", background: "rgba(255,255,255,0.14)" }} />
      <div style={{ position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)", width: "35%", paddingBottom: "35%", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
    </React.Fragment>,
    <React.Fragment key="p4">
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.25)" }} />
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.25)" }} />
      <div style={{ position: "absolute", top: "25%", left: "25%", width: "50%", paddingBottom: "50%", borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
    </React.Fragment>,
    <React.Fragment key="p5">
      {[
        { t: "15%", l: "20%", s: "8%" },
        { t: "30%", l: "60%", s: "12%" },
        { t: "55%", l: "25%", s: "10%" },
        { t: "65%", l: "65%", s: "7%" },
        { t: "80%", l: "40%", s: "6%" },
      ].map((d, i) => (
        <div key={i} style={{ position: "absolute", top: d.t, left: d.l, width: d.s, paddingBottom: d.s, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
      ))}
    </React.Fragment>,
  ]
  return (
    <div style={{ background: bg, borderRadius: 16, position: "relative", overflow: "hidden", ...style }}>
      {patterns[variant % patterns.length]}
      {price && <span style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,0.92)", color: "#2C1A0E", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 999 }}>{price}</span>}
      {label && <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,0.88)", color: "#2C1A0E", fontSize: 8, fontWeight: 600, padding: "2px 7px", borderRadius: 999 }}>{label}</span>}
    </div>
  )
}

// ─── Phone shell + bottom nav ─────────────────────────────────
const PW = 260
const PH = 520

function PhoneShell({ children }) {
  return (
    <div style={{ width: PW, flexShrink: 0 }}>
      <div style={{ background: "#2C1A0E", borderRadius: 40, padding: 9, boxShadow: "0 24px 48px -12px rgba(44,26,14,0.45)" }}>
        <div style={{ background: "#F8F2E8", borderRadius: 32, overflow: "hidden", height: PH, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px 2px", fontSize: 9, color: "rgba(44,26,14,0.5)", fontWeight: 600, flexShrink: 0 }}>
            <span>9:41</span>
            <span style={{ display: "flex", gap: 3 }}>
              <span style={{ width: 10, height: 5, background: "rgba(44,26,14,0.4)", borderRadius: 2 }} />
              <span style={{ width: 10, height: 5, background: "rgba(44,26,14,0.4)", borderRadius: 2 }} />
              <span style={{ width: 14, height: 7, border: "1.5px solid rgba(44,26,14,0.4)", borderRadius: 2 }} />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

function BottomNav({ active = "home" }) {
  const items = [
    { k: "home",    I: Ico.Home,   l: "HOME" },
    { k: "search",  I: Ico.Search, l: "SEARCH" },
    { k: "plus",    I: null,       l: "" },
    { k: "chat",    I: Ico.Chat,   l: "CHAT" },
    { k: "profile", I: Ico.User,   l: "PROFILE" },
  ]
  return (
    <div style={{ borderTop: "1px solid rgba(44,26,14,0.08)", background: "white", padding: "6px 4px 8px", display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0 }}>
      {items.map((it) => {
        if (it.k === "plus") {
          return (
            <div key="plus" style={{ marginTop: -18 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(44,26,14,0.35)" }}>
                <Ico.Plus style={{ width: 16, height: 16, color: "#F8F2E8" }} />
              </div>
            </div>
          )
        }
        const on = active === it.k
        const Icon = it.I
        return (
          <div key={it.k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flex: 1 }}>
            <Icon style={{ width: 16, height: 16, color: on ? "#2C1A0E" : "rgba(44,26,14,0.28)" }} />
            <span style={{ fontSize: 6, letterSpacing: "0.07em", color: on ? "#2C1A0E" : "rgba(44,26,14,0.28)", fontWeight: on ? 700 : 400 }}>{it.l}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Phone mockups ────────────────────────────────────────────
function DiscoverPhone() {
  // Real-app inspired: small Instagram-style 3-column tiles, vertical aspect
  // Photo URLs reference the same illustrations used for avatars + abstract tiles
  const grid = [
    { src: "/creators/zoe.png",    name: "Zoe",    loc: "Los Angeles" },
    { src: "/creators/marcus.png", name: "Marcus", loc: "New York" },
    { src: "/creators/sofia.png",  name: "Sofia",  loc: "Miami" },
    { src: "/creators/ava.png",    name: "Ava",    loc: "San Francisco" },
    { src: "/creators/kai.png",    name: "Kai",    loc: "Portland" },
    { src: "/creators/lena.png",   name: "Lena",   loc: "Chicago" },
  ]
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ padding: "4px 12px 6px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 7, letterSpacing: "0.22em", fontWeight: 700, color: "#2C1A0E" }}>V I S I O N</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#2C1A0E", marginTop: 2, lineHeight: 1.2 }}>find creatives that<br/>match your vision</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "white", border: "1px solid rgba(44,26,14,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ico.Search style={{ width: 10, height: 10, color: "#2C1A0E" }} />
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ padding: "8px 12px 8px", display: "flex", gap: 5, overflowX: "auto", flexShrink: 0 }} className="no-scrollbar">
        {[
          { l: "For you", a: true },
          { l: "Photography", a: false },
          { l: "Videography", a: false },
          { l: "Content", a: false },
        ].map(({ l, a }) => (
          <span key={l} style={{ fontSize: 8, padding: "4px 10px", borderRadius: 18, fontWeight: 600, whiteSpace: "nowrap", background: a ? "#2C1A0E" : "white", color: a ? "#F8F2E8" : "rgba(44,26,14,0.6)", border: a ? "none" : "1px solid rgba(44,26,14,0.1)" }}>{l}</span>
        ))}
      </div>

      {/* "Discover creatives / See all" row */}
      <div style={{ padding: "4px 12px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#2C1A0E" }}>Discover creatives</span>
        <span style={{ fontSize: 8, color: "rgba(44,26,14,0.55)", display: "flex", alignItems: "center", gap: 2 }}>
          See all <Ico.Arrow style={{ width: 7, height: 7 }} />
        </span>
      </div>

      {/* Instagram-style 3-column grid, small tiles */}
      <div style={{ flex: 1, padding: "0 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, gridAutoRows: "min-content", overflowY: "hidden" }}>
        {grid.map((g, i) => (
          <div key={i} style={{ position: "relative", aspectRatio: "3/4", borderRadius: 8, overflow: "hidden", background: "#EFE5D4" }}>
            <img src={g.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {/* Subtle bottom gradient + name */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "8px 5px 4px", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)", color: "white" }}>
              <div style={{ fontSize: 7, fontWeight: 700, lineHeight: 1.1 }}>{g.name}</div>
              <div style={{ fontSize: 6, opacity: 0.85, display: "flex", alignItems: "center", gap: 1.5, marginTop: 1 }}>
                <Ico.Map style={{ width: 5, height: 5 }} /> {g.loc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="home" />
    </PhoneShell>
  )
}

function ProfilePhone() {
  const c = CREATORS[0]
  const Av = c.Av
  return (
    <PhoneShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 14px 6px", flexShrink: 0 }}>
        <span style={{ fontSize: 8, letterSpacing: "0.22em", fontWeight: 700, color: "#2C1A0E" }}>V I S I O N</span>
        <span style={{ fontSize: 8, color: "rgba(44,26,14,0.4)" }}>{c.handle}</span>
      </div>
      <div style={{ flex: 1, overflowY: "hidden", padding: "0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}><Av size={46} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#2C1A0E" }}>{c.name}</span>
              <span style={{ background: "#FBE9D6", color: "#7A3A10", fontSize: 8, padding: "2px 7px", borderRadius: 999, fontWeight: 600 }}>CREATIVE</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
              <Ico.Map style={{ width: 8, height: 8, color: "rgba(44,26,14,0.4)" }} />
              <span style={{ fontSize: 9, color: "rgba(44,26,14,0.5)" }}>{c.location}</span>
            </div>
          </div>
          <button style={{ background: "#2C1A0E", color: "#F8F2E8", border: "none", borderRadius: 18, padding: "5px 11px", fontSize: 9, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Hire</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
          {[[c.works, "WORKS"], ["4.9 ★", "RATING"], [c.bookings, "BOOKED"]].map(([v, l]) => (
            <div key={l} style={{ background: "white", borderRadius: 10, padding: "6px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#2C1A0E" }}>{v}</div>
              <div style={{ fontSize: 7, letterSpacing: "0.06em", color: "rgba(44,26,14,0.45)", marginTop: 1 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {["Portfolio", "Packages", "Reviews"].map((t, i) => (
            <span key={t} style={{ fontSize: 9, padding: "4px 10px", borderRadius: 18, fontWeight: 600, background: i === 0 ? "#2C1A0E" : "white", color: i === 0 ? "#F8F2E8" : "rgba(44,26,14,0.5)", border: i === 0 ? "none" : "1px solid rgba(44,26,14,0.1)" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, flex: 1 }}>
          <ArtTile bg="#E8B8A8" price="$120" variant={0} style={{ aspectRatio: "3/4" }} />
          <ArtTile bg="#C8D4A0" price="$200" variant={1} style={{ aspectRatio: "3/4" }} />
          <ArtTile bg="#A8C8D0" price="$95"  variant={2} style={{ aspectRatio: "3/4" }} />
          <ArtTile bg="#D4B8E0" price="$180" variant={3} style={{ aspectRatio: "3/4" }} />
        </div>
      </div>
      <BottomNav active="profile" />
    </PhoneShell>
  )
}

function ChatPhone() {
  const msgs = [
    { f: "them", t: "Hi! Loved your editorial work. Are you free June 14?" },
    { f: "me",   t: "Yes, 3–5 PM works! What type of shoot?" },
    { f: "them", t: "Brand content for my skincare line. ~2 hours." },
    { f: "me",   t: "Perfect. Sending a booking request now — $320." },
    { f: "them", t: "Accepted! So excited to collaborate." },
  ]
  return (
    <PhoneShell>
      <div style={{ padding: "4px 12px 8px", borderBottom: "1px solid rgba(44,26,14,0.06)", display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
        <div style={{ borderRadius: "50%", overflow: "hidden" }}><Avatar.Marcus size={28} /></div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 11, color: "#2C1A0E" }}>Marcus Ali</div>
          <div style={{ fontSize: 8, color: "rgba(44,26,14,0.45)" }}>Videographer · New York</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, overflowY: "hidden" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.f === "me" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "78%", padding: "6px 9px", borderRadius: m.f === "me" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", background: m.f === "me" ? "#2C1A0E" : "white", color: m.f === "me" ? "#F8F2E8" : "#2C1A0E", fontSize: 9, lineHeight: 1.4, border: m.f === "me" ? "none" : "1px solid rgba(44,26,14,0.07)" }}>{m.t}</div>
          </div>
        ))}
        <div style={{ alignSelf: "center", background: "#E6F0E6", color: "#2A5A2A", fontSize: 8, fontWeight: 600, padding: "3px 10px", borderRadius: 18, display: "flex", alignItems: "center", gap: 3 }}>
          <Ico.Check style={{ width: 8, height: 8 }} /> Booking confirmed — Jun 14, 3:00 PM
        </div>
      </div>
      <div style={{ padding: "6px 10px", borderTop: "1px solid rgba(44,26,14,0.07)", display: "flex", gap: 6, flexShrink: 0 }}>
        <div style={{ flex: 1, background: "white", borderRadius: 18, padding: "5px 10px", fontSize: 9, color: "rgba(44,26,14,0.35)", border: "1px solid rgba(44,26,14,0.08)" }}>Message</div>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ico.Arrow style={{ width: 11, height: 11, color: "#F8F2E8" }} />
        </div>
      </div>
      <BottomNav active="chat" />
    </PhoneShell>
  )
}

// ─── Header ───────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-cream-100/85 backdrop-blur-md border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-espresso font-bold tracking-vision text-sm">V I S I O N</a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-espresso/65 font-medium">
          <a href="#discover" className="hover:text-espresso transition-colors">Discover</a>
          <a href="#how" className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <a href="#download" className="hover:text-espresso transition-colors">Install App</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href={APP_URL} className="hidden sm:inline-flex items-center bg-espresso text-cream-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-espresso-dark transition-colors">Explore Creatives</a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-espresso" aria-label="Menu">
            {open ? <Ico.Close style={{ width: 20, height: 20 }} /> : <Ico.Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-cream-200/60 bg-cream-100">
          <div className="px-5 py-4 flex flex-col gap-4 text-espresso/80 font-medium">
            <a href="#discover" onClick={() => setOpen(false)}>Discover</a>
            <a href="#how" onClick={() => setOpen(false)}>How it Works</a>
            <a href="#creatives" onClick={() => setOpen(false)}>For Creatives</a>
            <a href="#download" onClick={() => setOpen(false)}>Install App</a>
            <a href={APP_URL} className="bg-espresso text-cream-50 text-center py-2.5 rounded-full font-semibold mt-1">Explore Creatives</a>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const mosaic = [
    { bg: "#E8C4B8", v: 0, label: "Photography" },
    { bg: "#C4D4C0", v: 1, label: "Styling" },
    { bg: "#C4C8E8", v: 2, label: "Branding" },
    { bg: "#E8D8B8", v: 3, label: "Creative Dir." },
    { bg: "#D4C0E8", v: 4, label: "Content" },
    { bg: "#B8DDE0", v: 5, label: "Makeup" },
    { bg: "#E0C8B8", v: 0, label: "Events" },
    { bg: "#C8D8B0", v: 1, label: "Design" },
  ]
  const heroPills = [
    { l: "Photography", bg: "#FAF4D6", c: "#6A5010" },
    { l: "Styling",     bg: "#E6F0E6", c: "#2A5A2A" },
    { l: "Branding",    bg: "#E2EEF6", c: "#1A4A6A" },
    { l: "Content",     bg: "#EDE6F5", c: "#4A2A7A" },
    { l: "Events",      bg: "#FBE9E9", c: "#7A2A2A" },
    { l: "Design",      bg: "#D6EEE8", c: "#1A5A48" },
  ]
  return (
    <section id="top" className="relative overflow-hidden bg-cream-100">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "#F2C4A0", filter: "blur(90px)" }} />
      <div className="absolute top-60 -left-32 w-96 h-96 rounded-full opacity-20" style={{ background: "#B8C8E8", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-20" style={{ background: "#C8B8E0", filter: "blur(70px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "#EDE6F5", color: "#4A2A7A" }}>
            <Ico.Sparkle style={{ width: 12, height: 12 }} /> The creative marketplace
          </div>

          <h1 className="text-espresso font-bold leading-[1.06] tracking-tight text-4xl sm:text-5xl lg:text-[58px]">
            find creatives<br />
            that match<br />
            <span style={{ color: "#8B6A3A", fontStyle: "italic", fontWeight: 400 }}>your vision.</span>
          </h1>

          <p className="mt-6 text-espresso/60 text-base sm:text-lg max-w-lg leading-relaxed">
            Discover and collaborate with photographers, stylists, directors, designers, and creators — for content, branding, events, and everything in between.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {heroPills.map(({ l, bg, c }) => (
              <span key={l} style={{ background: bg, color: c, fontSize: 12, padding: "5px 13px", borderRadius: 999, fontWeight: 600 }}>{l}</span>
            ))}
          </div>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-espresso text-cream-50 px-7 py-4 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft text-base">
              Explore Creatives <Ico.Arrow className="w-4 h-4" />
            </a>
            <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-200 text-espresso px-7 py-4 rounded-full font-semibold hover:bg-cream-50 transition-colors text-base">
              Become a Creative
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[Avatar.Zoe, Avatar.Marcus, Avatar.Sofia, Avatar.Ava, Avatar.Kai].map((Av, i) => (
                <div key={i} style={{ borderRadius: "50%", overflow: "hidden", outline: "2px solid #F8F2E8" }}><Av size={30} /></div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => <Ico.Star key={i} style={{ width: 11, height: 11, color: "#C8A040" }} />)}
              </div>
              <p className="text-xs text-espresso/50 font-medium mt-0.5">Loved by creatives and clients</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block mosaic-grid">
          {mosaic.map((t, i) => (
            <div key={i} className={i === 0 || i === 3 ? "mosaic-tall" : ""}>
              <ArtTile bg={t.bg} variant={t.v} label={t.label} style={{ borderRadius: 20, height: "100%" }} />
            </div>
          ))}
        </div>

        <div className="flex lg:hidden justify-center">
          <ProfilePhone />
        </div>
      </div>
    </section>
  )
}

// ─── Creative Categories ──────────────────────────────────────
function Categories() {
  const cats = [
    { Icon: Ico.Eye,      label: "Photography",      desc: "Portrait, brand, editorial, events",      bg: "#FAF4D6", ic: "#6A5010" },
    { Icon: Ico.Film,     label: "Videography",      desc: "Content, reels, brand films, events",     bg: "#E2EEF6", ic: "#1A4A6A" },
    { Icon: Ico.Palette,  label: "Styling",          desc: "Fashion, lifestyle, wardrobe curation",   bg: "#E6F0E6", ic: "#2A5A2A" },
    { Icon: Ico.Wand,     label: "Creative Dir.",    desc: "Art direction, concept, visual strategy", bg: "#EDE6F5", ic: "#4A2A7A" },
    { Icon: Ico.Sparkle,  label: "Makeup & Beauty",  desc: "Editorial, events, personal, brand",      bg: "#FBE9E9", ic: "#7A2A2A" },
    { Icon: Ico.Layers,   label: "Branding & Design",desc: "Identity, graphics, campaigns",           bg: "#D6EEE8", ic: "#1A5A48" },
    { Icon: Ico.Calendar, label: "Events",           desc: "Weddings, activations, brand moments",    bg: "#FBE9D6", ic: "#7A3A10" },
    { Icon: Ico.User,     label: "Content Creation", desc: "Social, UGC, influencer, lifestyle",      bg: "#E2EEF6", ic: "#1A4A6A" },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: "#FDFAF5" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Creative Categories</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">every type of creative, in one place.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Vision is for every kind of creative discipline — explore the categories below.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((c, i) => {
            const IconC = c.Icon
            return (
              <a key={i} href={APP_URL} className="bg-white rounded-3xl p-5 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform block">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: c.bg }}>
                  <IconC style={{ width: 20, height: 20, color: c.ic }} />
                </div>
                <div className="font-bold text-sm text-espresso">{c.label}</div>
                <div className="text-xs text-espresso/55 mt-1 leading-relaxed">{c.desc}</div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Discover Creatives ───────────────────────────────────────
function DiscoverSection() {
  return (
    <section id="discover" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Discover</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">browse creatives across every discipline.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Filter by category, location, and price. Every profile shows real work, honest pricing, and open availability.</p>
        </div>
        {/* Instagram-style 3-col grid of small vertical creator tiles */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CREATORS.map((c, i) => (
            <a key={i} href={APP_URL} className="block group">
              <div className="relative overflow-hidden rounded-2xl bg-cream-200" style={{ aspectRatio: "3/4" }}>
                <img
                  src={`/creators/${c.name.split(" ")[0].toLowerCase()}.png`}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                {/* Tag */}
                <span className="absolute top-2 left-2" style={{ background: c.tagBg, color: c.tagC, fontSize: 9, padding: "2px 7px", borderRadius: 999, fontWeight: 700 }}>{c.tag}</span>
                {/* Name + location */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                  <div className="font-bold text-xs leading-tight">{c.name.split(" ")[0]}</div>
                  <div className="flex items-center gap-1 text-[10px] opacity-90 mt-0.5">
                    <Ico.Map style={{ width: 8, height: 8 }} /> {c.location}
                  </div>
                </div>
              </div>
              {/* Below the image, a small role + price line */}
              <div className="mt-2 px-1 flex items-center justify-between">
                <span className="text-[10px] text-espresso/55 font-medium truncate">{c.role}</span>
                <span className="text-[11px] font-bold text-espresso">{c.price}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={APP_URL} className="inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
            Explore All Creatives <Ico.Arrow className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── For Any Project ──────────────────────────────────────────
function SharedVision() {
  const projects = [
    { label: "A content shoot",     bg: "#F5E6C0", c: "#6A4A10" },
    { label: "A brand launch",      bg: "#C8D4E8", c: "#1A3A6A" },
    { label: "A wedding",           bg: "#EDD8E8", c: "#5A2A6A" },
    { label: "A product campaign",  bg: "#D8E8D8", c: "#1A5A2A" },
    { label: "A music video",       bg: "#D8D4C0", c: "#4A3A10" },
    { label: "An event",            bg: "#E8C8B8", c: "#6A2A10" },
    { label: "A creative identity", bg: "#FBE9D6", c: "#7A3A10" },
    { label: "A personal idea",     bg: "#D6EEE8", c: "#1A5A48" },
  ]
  // Right column: a varied project-card mosaic representing different kinds of work
  const cards = [
    { Icon: Ico.Eye,      title: "Content Shoot",   tag: "Photography",  bg: "#F0D8B8", tagBg: "#FAF4D6", tagC: "#6A5010" },
    { Icon: Ico.Film,     title: "Brand Film",      tag: "Video",        bg: "#C8D4E8", tagBg: "#E2EEF6", tagC: "#1A4A6A" },
    { Icon: Ico.Layers,   title: "Identity Refresh",tag: "Branding",     bg: "#D8C4E8", tagBg: "#EDE6F5", tagC: "#4A2A7A" },
    { Icon: Ico.Sparkle,  title: "Bridal Beauty",   tag: "Makeup",       bg: "#F4D0D8", tagBg: "#FBE9E9", tagC: "#7A2A2A" },
    { Icon: Ico.Calendar, title: "Launch Event",    tag: "Events",       bg: "#E8D0B8", tagBg: "#FBE9D6", tagC: "#7A3A10" },
    { Icon: Ico.Palette,  title: "Editorial Style", tag: "Styling",      bg: "#C8DCC0", tagBg: "#E6F0E6", tagC: "#2A5A2A" },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: "#FDFAF5" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">For Any Project</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">find the right creative for your next project, shoot, or idea.</h2>
            <p className="mt-5 text-espresso/60 text-base leading-relaxed max-w-lg">Whatever you are building — a brand, an event, a campaign, a personal moment — there is a creative on Vision who can bring it to life.</p>
            <p className="mt-4 text-espresso/60 text-base leading-relaxed max-w-lg">Search by category, location, budget, or the kind of work you need. Real portfolios, real availability, no guesswork.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {projects.map(({ label, bg, c }) => (
                <span key={label} style={{ background: bg, color: c, fontSize: 12, padding: "6px 14px", borderRadius: 999, fontWeight: 600 }}>{label}</span>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Find a Creative <Ico.Arrow className="w-4 h-4" />
            </a>
          </div>
          {/* Right: project-card mosaic */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => {
              const IconC = card.Icon
              return (
                <div key={i} className={`bg-white rounded-3xl overflow-hidden shadow-card border border-cream-200/40 ${i === 0 || i === 5 ? "mt-0" : i === 1 || i === 4 ? "mt-6" : "mt-0"}`}>
                  <div style={{ background: card.bg, height: 100, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-20%", right: "-15%", width: "60%", paddingBottom: "60%", borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
                    <div style={{ position: "absolute", bottom: "-25%", left: "10%", width: "45%", paddingBottom: "45%", borderRadius: "50%", background: "rgba(0,0,0,0.06)" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ background: "rgba(255,255,255,0.85)", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconC style={{ width: 17, height: 17, color: "#2C1A0E" }} />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-xs font-bold text-espresso">{card.title}</div>
                    <span style={{ background: card.tagBg, color: card.tagC, fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 600, display: "inline-block", marginTop: 4 }}>{card.tag}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────
function HowItWorks() {
  const [tab, setTab] = useState("hire")
  const steps = {
    hire: [
      { n: "01", t: "Browse & discover",        d: "Search by aesthetic, category, location, and price. Filter to find creatives who match your exact vision.", bg: "#FAF4D6", tc: "#6A5010" },
      { n: "02", t: "View portfolios & packages", d: "See real work, transparent pricing, and open availability — all in one clean profile.",                    bg: "#E2EEF6", tc: "#1A4A6A" },
      { n: "03", t: "Book, collaborate & pay",  d: "Send a request, chat in-app, confirm the details. Pay securely through Stripe. Done in minutes.",            bg: "#E6F0E6", tc: "#2A5A2A" },
    ],
    create: [
      { n: "01", t: "Build your creative profile", d: "Showcase your portfolio, style tags, location, and packages. Your aesthetic is the first thing they see.", bg: "#FBE9D6", tc: "#7A3A10" },
      { n: "02", t: "Get discovered & hired",      d: "Clients search by vibe. Your aesthetic tags and portfolio do the selling — no cold pitching.",            bg: "#EDE6F5", tc: "#4A2A7A" },
      { n: "03", t: "Collaborate & get paid",      d: "Accept bookings, message clients in-app, and receive direct deposits via Stripe Connect.",                 bg: "#D6EEE8", tc: "#1A5A48" },
    ],
  }
  return (
    <section id="how" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">How it works</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">simple for both sides of a creative collaboration.</h2>
          </div>
          <div className="inline-flex bg-cream-200/80 p-1 rounded-full self-start">
            {[["hire", "Hiring"], ["create", "Creating"]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === k ? "bg-espresso text-cream-50" : "text-espresso/60"}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps[tab].map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/50">
              <span className="inline-block font-bold text-xl px-3 py-1.5 rounded-xl" style={{ background: s.bg, color: s.tc }}>{s.n}</span>
              <h3 className="mt-5 font-bold text-lg text-espresso">{s.t}</h3>
              <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── App Showcase ─────────────────────────────────────────────
function AppShowcase() {
  const screens = [
    { Phone: DiscoverPhone, label: "Discover Creatives", bg: "#E6F0E6", tc: "#2A5A2A" },
    { Phone: ProfilePhone,  label: "View Profiles",      bg: "#FAF4D6", tc: "#6A5010" },
    { Phone: ChatPhone,     label: "Collaborate & Book", bg: "#EDE6F5", tc: "#4A2A7A" },
  ]
  return (
    <section className="py-16 sm:py-24 overflow-hidden" style={{ background: "#FDFAF5" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The App</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">book & collaborate without the back-and-forth.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Browse portfolios, send project requests, message in-app, and pay — all in one clean flow.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 items-start justify-center">
          {screens.map((s, i) => {
            const Phone = s.Phone
            return (
              <div key={i} className="flex flex-col items-center gap-4 flex-1">
                <Phone />
                <span style={{ background: s.bg, color: s.tc, fontSize: 12, fontWeight: 700, padding: "5px 16px", borderRadius: 999 }}>{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── For Creatives ────────────────────────────────────────────
function ForCreatives() {
  const benefits = [
    { Icon: Ico.Palette,  t: "Showcase your aesthetic",       d: "Upload portfolio work with style tags. Your visual identity is your pitch.",                bg: "#FBE9D6", ic: "#7A3A10" },
    { Icon: Ico.Layers,   t: "List packages & set your price", d: "Create clear, bookable packages so clients know exactly what they are getting.",          bg: "#E6F0E6", ic: "#2A5A2A" },
    { Icon: Ico.Calendar, t: "Control your availability",      d: "Set weekly slots and toggle instant booking. You decide when and how you work.",          bg: "#EDE6F5", ic: "#4A2A7A" },
    { Icon: Ico.Sparkle,  t: "Get paid directly",              d: "Stripe Connect deposits straight to your bank. Track earnings in one dashboard.",         bg: "#E2EEF6", ic: "#1A4A6A" },
  ]
  return (
    <section id="creatives" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <ArtTile bg="#E8C4B8" variant={0} style={{ aspectRatio: "3/4", borderRadius: 20 }} />
              <ArtTile bg="#C4D4C0" variant={1} style={{ aspectRatio: "4/3", borderRadius: 20 }} />
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <ArtTile bg="#C4C8E8" variant={2} style={{ aspectRatio: "4/3", borderRadius: 20 }} />
              <ArtTile bg="#E8D8B8" variant={3} style={{ aspectRatio: "3/4", borderRadius: 20 }} />
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">For Creatives</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">get paid for your creative vision.</h2>
            <p className="mt-4 text-espresso/60 text-base leading-relaxed">Vision is built for creatives who are serious about their work. Build a profile that shows your aesthetic, set your packages, and let clients come to you.</p>
            <div className="mt-8 space-y-5">
              {benefits.map((b, i) => {
                const IconC = b.Icon
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: b.bg }}>
                      <IconC style={{ width: 18, height: 18, color: b.ic }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-espresso">{b.t}</div>
                      <div className="text-sm text-espresso/60 mt-0.5 leading-relaxed">{b.d}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <a href={APP_URL} className="mt-9 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Become a Creative <Ico.Arrow className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Trust ────────────────────────────────────────────────────
function TrustSection() {
  const items = [
    { Icon: Ico.Eye,      t: "Aesthetic-first discovery",   d: "Search by style, not just job title.",                bg: "#FAF4D6", ic: "#6A5010" },
    { Icon: Ico.Layers,   t: "Clear packages & pricing",    d: "No DMs to get a rate. Everything upfront.",           bg: "#E2EEF6", ic: "#1A4A6A" },
    { Icon: Ico.Calendar, t: "Real-time availability",      d: "See open slots and book without the wait.",           bg: "#E6F0E6", ic: "#2A5A2A" },
    { Icon: Ico.Chat,     t: "In-app collaboration",        d: "Message, align, and confirm in one thread.",          bg: "#EDE6F5", ic: "#4A2A7A" },
    { Icon: Ico.Sparkle,  t: "Stripe-secured payments",     d: "Safe checkout for clients, direct pay for creatives.",bg: "#FBE9E9", ic: "#7A2A2A" },
    { Icon: Ico.Star,     t: "Ratings & reviews",           d: "Build trust through verified client feedback.",       bg: "#D6EEE8", ic: "#1A5A48" },
    { Icon: Ico.User,     t: "Verified creative profiles",  d: "Real portfolios. Real people. Real work.",            bg: "#FBE9D6", ic: "#7A3A10" },
    { Icon: Ico.Download, t: "PWA — no app store needed",   d: "Install directly from your browser, any device.",     bg: "#E2EEF6", ic: "#1A4A6A" },
  ]
  return (
    <section className="py-16 sm:py-24" style={{ background: "#FDFAF5" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The Platform</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">built for the way creative work actually happens.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((f, i) => {
            const IconC = f.Icon
            return (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: f.bg }}>
                  <IconC style={{ width: 20, height: 20, color: f.ic }} />
                </div>
                <h3 className="mt-4 font-bold text-sm text-espresso">{f.t}</h3>
                <p className="mt-1.5 text-espresso/60 text-xs leading-relaxed">{f.d}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── PWA ──────────────────────────────────────────────────────
function PWA() {
  const steps = [
    { n: "1", t: "Open joinvision.app in Safari or Chrome", bg: "#FBE9D6", c: "#7A3A10" },
    { n: "2", t: "Tap Share, then Add to Home Screen",      bg: "#E6F0E6", c: "#2A5A2A" },
    { n: "3", t: "Launch from your home screen anytime",    bg: "#E2EEF6", c: "#1A4A6A" },
  ]
  return (
    <section id="download" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="bg-espresso rounded-[2.5rem] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: "#F2C4A0", filter: "blur(60px)" }} />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{ background: "#B8C8E8", filter: "blur(60px)" }} />
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "rgba(248,242,232,0.12)", color: "#F8F2E8" }}>
              <Ico.Download style={{ width: 12, height: 12 }} /> Progressive Web App
            </span>
            <h2 className="text-cream-50 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Vision lives in your pocket.</h2>
            <p className="mt-5 text-cream-50/65 text-base leading-relaxed max-w-lg">Install Vision directly from your browser — no App Store, no friction. Add it to your home screen and it feels exactly like a native app.</p>
            <div className="mt-8 flex flex-col gap-3">
              {steps.map((s) => (
                <div key={s.n} className="flex items-center gap-3">
                  <span style={{ background: s.bg, color: s.c, fontWeight: 700, fontSize: 11, width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</span>
                  <span className="text-cream-50/75 text-sm">{s.t}</span>
                </div>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-cream-50 text-espresso px-6 py-3.5 rounded-full font-semibold hover:bg-cream-100 transition-colors">
              Open Vision App <Ico.Arrow className="w-4 h-4" />
            </a>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div style={{ width: 160 }}>
              <div style={{ background: "#3A2A1A", borderRadius: 32, padding: 7, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                <div style={{ background: "#F8F2E8", borderRadius: 26, padding: 18, display: "flex", flexDirection: "column", alignItems: "center", minHeight: 270 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <span style={{ color: "#F8F2E8", fontSize: 22, fontWeight: 800, letterSpacing: "0.05em" }}>V</span>
                  </div>
                  <p style={{ fontSize: 7, letterSpacing: "0.28em", fontWeight: 700, color: "#2C1A0E", marginBottom: 2 }}>V I S I O N</p>
                  <p style={{ fontSize: 7, color: "rgba(44,26,14,0.5)", marginBottom: 16 }}>Creative Marketplace</p>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
                    {[100, 80, 60].map((w, i) => <div key={i} style={{ height: 6, background: "#EFE5D4", borderRadius: 8, width: `${w}%` }} />)}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", gap: 8, width: "100%", justifyContent: "center" }}>
                    {[Avatar.Zoe, Avatar.Marcus, Avatar.Sofia].map((Av, i) => (
                      <div key={i} style={{ borderRadius: "50%", overflow: "hidden", outline: "2px solid #F8F2E8" }}><Av size={28} /></div>
                    ))}
                  </div>
                  <button style={{ marginTop: 14, background: "#2C1A0E", color: "#F8F2E8", border: "none", borderRadius: 18, padding: "6px 18px", fontSize: 8, fontWeight: 700, cursor: "pointer" }}>Install App</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────
function FinalCTA() {
  const audiences = [
    { l: "Photographers",     bg: "#FAF4D6", c: "#6A5010" },
    { l: "Videographers",     bg: "#E2EEF6", c: "#1A4A6A" },
    { l: "Stylists",          bg: "#E6F0E6", c: "#2A5A2A" },
    { l: "Designers",         bg: "#EDE6F5", c: "#4A2A7A" },
    { l: "Creative Directors",bg: "#FBE9E9", c: "#7A2A2A" },
    { l: "Makeup Artists",    bg: "#D6EEE8", c: "#1A5A48" },
    { l: "Content Creators",  bg: "#FBE9D6", c: "#7A3A10" },
    { l: "Brands & Clients",  bg: "#E2EEF6", c: "#1A4A6A" },
  ]
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" style={{ background: "#FDFAF5" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-25" style={{ background: "#F2C4A0", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-20" style={{ background: "#B8C8E8", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-15" style={{ background: "#C8B8E0", filter: "blur(70px)" }} />
      </div>
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Join Vision</span>
        <h2 className="mt-4 text-espresso text-3xl sm:text-5xl font-bold leading-tight">bring your vision to life.</h2>
        <p className="mt-5 text-espresso/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">Whether you are hiring a creative or ready to share your own — Vision is where it starts.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {audiences.map((a) => (
            <span key={a.l} style={{ background: a.bg, color: a.c, fontSize: 12, padding: "5px 14px", borderRadius: 999, fontWeight: 600 }}>{a.l}</span>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-espresso text-cream-50 px-8 py-4 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft text-base">
            Explore Creatives <Ico.Arrow className="w-4 h-4" />
          </a>
          <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-200 text-espresso px-8 py-4 rounded-full font-semibold hover:bg-cream-50 transition-colors text-base">
            Become a Creative
          </a>
        </div>
        <div className="mt-10 flex justify-center items-center gap-3">
          <div className="flex -space-x-2">
            {Object.values(Avatar).map((Av, i) => (
              <div key={i} style={{ borderRadius: "50%", overflow: "hidden", outline: "2px solid #F8F2E8" }}><Av size={34} /></div>
            ))}
          </div>
          <p className="text-sm text-espresso/50 font-medium text-left">Creatives ready<br />to collaborate</p>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-4 gap-8 items-start">
        <div className="sm:col-span-2">
          <p className="font-bold tracking-vision text-espresso text-sm">V I S I O N</p>
          <p className="mt-3 text-espresso/55 text-sm max-w-xs leading-relaxed">A modern creative marketplace — discover, collaborate with, and hire creatives for content, branding, events, and everything in between.</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[
              { l: "Photography", bg: "#FAF4D6", c: "#6A5010" },
              { l: "Styling",     bg: "#E6F0E6", c: "#2A5A2A" },
              { l: "Branding",    bg: "#E2EEF6", c: "#1A4A6A" },
              { l: "Content",     bg: "#EDE6F5", c: "#4A2A7A" },
            ].map((p) => (
              <span key={p.l} style={{ background: p.bg, color: p.c, fontSize: 10, padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>{p.l}</span>
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
          <a href="#discover" className="hover:text-espresso transition-colors">Discover Creatives</a>
          <a href="#how" className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <a href="#download" className="hover:text-espresso transition-colors">Install App</a>
        </div>
      </div>
      <div className="border-t border-cream-200/70 py-5 px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-espresso/40">
        <span>© {new Date().getFullYear()} Vision. All rights reserved.</span>
        <span>Stripe-secured payments · Built for PWA access</span>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-cream-100 min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <Categories />
        <DiscoverSection />
        <SharedVision />
        <HowItWorks />
        <AppShowcase />
        <ForCreatives />
        <TrustSection />
        <PWA />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
