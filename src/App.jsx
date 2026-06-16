import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ============================================================
// Landing page CTAs → local download/install guide
// ============================================================
const APP_URL = "/download"
const LOVABLE_URL = "https://live.joinvision.app"

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
  Back:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  Profile:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Msg:      (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Bolt:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Clock:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Send:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
}

// ─── Realistic creator avatars ────────────────────────────────
const AVATAR_SRCS = {
  Emi:   "/creators/emi.jpg",
  Mia:   "/creators/mia.jpg",
  Dre:   "/creators/dre.jpg",
  Leila: "/creators/leila.jpg",
  Nova:  "/creators/nova.jpg",
  Sage:  "/creators/sage.jpg",
  Luca:  "/creators/luca.jpg",
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
  Emi:   makeAvatar("Emi"),
  Mia:   makeAvatar("Mia"),
  Dre:   makeAvatar("Dre"),
  Leila: makeAvatar("Leila"),
  Nova:  makeAvatar("Nova"),
  Sage:  makeAvatar("Sage"),
  Luca:  makeAvatar("Luca"),
}

// ─── Pixar-style scene illustrations (inline SVG) ─────────────
// Detailed cartoon scenes in muted brand palette for project + creative cards
const SkinTones = ["#F2C9A0", "#D9A07A", "#B07B57", "#8B5536"]

// Reusable simple cartoon person (mini, for backgrounds of scenes)
function MiniPerson({ x, y, scale = 1, skin = "#F2C9A0", hair = "#3D2512", shirt = "#C8B8A0" }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="35" rx="18" ry="14" fill={shirt} />
      <rect x="-15" y="22" width="30" height="20" rx="6" fill={shirt} />
      {/* Neck */}
      <rect x="-5" y="10" width="10" height="8" rx="3" fill={skin} />
      {/* Head */}
      <ellipse cx="0" cy="0" rx="14" ry="15" fill={skin} />
      {/* Hair */}
      <ellipse cx="0" cy="-8" rx="15" ry="10" fill={hair} />
      <path d={`M-14 -2 Q -10 8 -14 14 Z`} fill={hair} />
      <path d={`M14 -2 Q 10 8 14 14 Z`} fill={hair} />
      {/* Eyes */}
      <circle cx="-5" cy="2" r="2" fill="white"/>
      <circle cx="5" cy="2" r="2" fill="white"/>
      <circle cx="-5" cy="2" r="1.2" fill="#1A0D06"/>
      <circle cx="5" cy="2" r="1.2" fill="#1A0D06"/>
      {/* Smile */}
      <path d="M-4 7 Q 0 10 4 7" stroke="#7A3A1A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Blush */}
      <circle cx="-8" cy="5" r="2" fill="#E89080" opacity="0.4"/>
      <circle cx="8" cy="5" r="2" fill="#E89080" opacity="0.4"/>
    </g>
  )
}

// CONTENT SHOOT — photographer + subject in soft daylight
function SceneContentShoot() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Sky background */}
      <rect width="200" height="130" fill="#F4E4D0"/>
      {/* Soft sun */}
      <circle cx="160" cy="35" r="22" fill="#F0D8A8" opacity="0.7"/>
      <circle cx="160" cy="35" r="14" fill="#F8E4BC" opacity="0.7"/>
      {/* Distant landscape */}
      <ellipse cx="30" cy="115" rx="60" ry="20" fill="#C8A878" opacity="0.5"/>
      <ellipse cx="170" cy="118" rx="55" ry="18" fill="#B08858" opacity="0.4"/>
      {/* Subject (model) */}
      <MiniPerson x={130} y={70} scale={1.2} skin="#D9A07A" hair="#3D2512" shirt="#E8C8B8"/>
      {/* Photographer */}
      <MiniPerson x={60} y={75} scale={1.1} skin="#E8B89A" hair="#4A2A10" shirt="#A89070"/>
      {/* Camera on photographer */}
      <g transform="translate(75,78)">
        <rect x="-8" y="-5" width="16" height="10" rx="2" fill="#2C1A0E"/>
        <circle cx="0" cy="0" r="4" fill="#1A0D06"/>
        <circle cx="0" cy="0" r="2.5" fill="#4A3A28"/>
      </g>
      {/* Tripod hint */}
      <line x1="68" y1="98" x2="64" y2="118" stroke="#3A2A20" strokeWidth="1.5"/>
      <line x1="68" y1="98" x2="72" y2="118" stroke="#3A2A20" strokeWidth="1.5"/>
    </svg>
  )
}

// BRAND FILM — videographer with stabilizer + monitor
function SceneBrandFilm() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="130" fill="#D4DDE8"/>
      {/* Window */}
      <rect x="120" y="10" width="70" height="60" rx="4" fill="#E8EEF4" opacity="0.7"/>
      <line x1="155" y1="10" x2="155" y2="70" stroke="#B8C4D0" strokeWidth="1.5"/>
      <line x1="120" y1="40" x2="190" y2="40" stroke="#B8C4D0" strokeWidth="1.5"/>
      {/* Monitor on desk */}
      <rect x="10" y="55" width="50" height="32" rx="3" fill="#2C1A0E"/>
      <rect x="13" y="58" width="44" height="26" rx="1" fill="#5A6878"/>
      {/* Timeline bars */}
      <rect x="16" y="76" width="38" height="2" fill="#B8C4D0"/>
      <rect x="16" y="71" width="20" height="3" fill="#E8A878"/>
      <rect x="38" y="71" width="14" height="3" fill="#8B7AA8"/>
      <line x1="35" y1="87" x2="35" y2="105" stroke="#2C1A0E" strokeWidth="2"/>
      <ellipse cx="35" cy="106" rx="14" ry="3" fill="#2C1A0E"/>
      {/* Videographer */}
      <MiniPerson x={115} y={80} scale={1.2} skin="#E8B89A" hair="#3A2410" shirt="#9AB0A0"/>
      {/* Gimbal/camera */}
      <g transform="translate(140,78)">
        <rect x="-3" y="-12" width="6" height="14" rx="1" fill="#2C1A0E"/>
        <rect x="-9" y="-20" width="18" height="11" rx="2" fill="#2C1A0E"/>
        <circle cx="0" cy="-14" r="3.5" fill="#4A3A28"/>
      </g>
    </svg>
  )
}

// IDENTITY REFRESH — designer at desk with brand swatches
function SceneIdentity() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="130" fill="#DDD0E8"/>
      {/* Wall shelf */}
      <rect x="10" y="20" width="80" height="3" fill="#A89878" opacity="0.5"/>
      {/* Plants */}
      <ellipse cx="25" cy="15" rx="6" ry="8" fill="#9AB0A0"/>
      <ellipse cx="60" cy="13" rx="7" ry="9" fill="#A8C0A8"/>
      <rect x="20" y="20" width="10" height="6" fill="#A89878"/>
      <rect x="55" y="22" width="10" height="4" fill="#A89878"/>
      {/* Desk */}
      <rect x="0" y="95" width="200" height="35" fill="#C4A888"/>
      <rect x="0" y="95" width="200" height="3" fill="#A88858"/>
      {/* Designer */}
      <MiniPerson x={100} y={65} scale={1.3} skin="#F2C9A0" hair="#5A3A20" shirt="#9A9AB8"/>
      {/* Color swatches sheet */}
      <rect x="35" y="100" width="55" height="22" rx="2" fill="white" stroke="#B0A088" strokeWidth="0.5"/>
      <rect x="40" y="103" width="9" height="8" rx="1" fill="#D8A878"/>
      <rect x="51" y="103" width="9" height="8" rx="1" fill="#9AB0A0"/>
      <rect x="62" y="103" width="9" height="8" rx="1" fill="#C8B0D8"/>
      <rect x="73" y="103" width="9" height="8" rx="1" fill="#E8C8B8"/>
      <rect x="40" y="113" width="42" height="2" fill="#D0C0B0"/>
      <rect x="40" y="116" width="32" height="2" fill="#D0C0B0"/>
      {/* Laptop */}
      <rect x="120" y="100" width="45" height="22" rx="2" fill="#2C1A0E"/>
      <rect x="123" y="103" width="39" height="16" rx="1" fill="#E8E0D4"/>
      {/* Logo on laptop screen */}
      <circle cx="142" cy="111" r="4" fill="#8B6AA8"/>
    </svg>
  )
}

// BRIDAL BEAUTY — makeup artist applying makeup
function SceneBridal() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="130" fill="#F4DCE0"/>
      {/* Vanity mirror */}
      <rect x="125" y="10" width="60" height="50" rx="6" fill="#E8C4CC"/>
      <rect x="130" y="15" width="50" height="40" rx="3" fill="#F8E4E8"/>
      {/* Mirror lights */}
      {[0,1,2,3].map(i=>(
        <circle key={i} cx={132 + i*16} cy={9} r="2.5" fill="#FAEFCF"/>
      ))}
      {/* Makeup artist (standing left, focused) */}
      <MiniPerson x={50} y={70} scale={1.3} skin="#F4D0B8" hair="#E8C898" shirt="#FFFFFF"/>
      {/* Brush */}
      <g transform="translate(70,75) rotate(35)">
        <rect x="0" y="-1" width="14" height="2" rx="1" fill="#A88858"/>
        <ellipse cx="15" cy="0" rx="3" ry="1.5" fill="#E8C8B8"/>
      </g>
      {/* Client (sitting right) */}
      <MiniPerson x={120} y={78} scale={1.4} skin="#C8956A" hair="#3A2410" shirt="#D8B8A8"/>
      {/* Eyes closed indicator on client */}
      <line x1="115" y1="79" x2="119" y2="79" stroke="#1A0D06" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="121" y1="79" x2="125" y2="79" stroke="#1A0D06" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Makeup table */}
      <rect x="0" y="115" width="200" height="15" fill="#C4A888"/>
      <rect x="15" y="108" width="14" height="9" rx="1" fill="#D8A088"/>
      <rect x="32" y="106" width="6" height="11" rx="1" fill="#E8C09A"/>
      <rect x="42" y="108" width="10" height="9" rx="1" fill="#C8889A"/>
    </svg>
  )
}

// LAUNCH EVENT — confetti, balloons, stage
function SceneEvent() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="130" fill="#F0DDC0"/>
      {/* String lights */}
      <path d="M 10 20 Q 100 45 190 20" fill="none" stroke="#A89878" strokeWidth="1"/>
      {[20,40,60,80,100,120,140,160,180].map((x,i)=>{
        // bulb positions follow the curve approximately
        const y = 20 + Math.sin((x-10)/180 * Math.PI) * 25
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#F8E4A8"/>
      })}
      {/* Balloons */}
      <g>
        <ellipse cx="30" cy="55" rx="8" ry="10" fill="#E8A8A8"/>
        <line x1="30" y1="65" x2="32" y2="85" stroke="#A89878" strokeWidth="0.6"/>
        <ellipse cx="48" cy="48" rx="8" ry="10" fill="#C8B0D8"/>
        <line x1="48" y1="58" x2="46" y2="82" stroke="#A89878" strokeWidth="0.6"/>
        <ellipse cx="170" cy="50" rx="8" ry="10" fill="#A8C0D8"/>
        <line x1="170" y1="60" x2="172" y2="84" stroke="#A89878" strokeWidth="0.6"/>
      </g>
      {/* People crowd */}
      <MiniPerson x={75} y={82} scale={0.85} skin="#E8B89A" hair="#3D2512" shirt="#9AB0A0"/>
      <MiniPerson x={100} y={80} scale={0.9} skin="#C8956A" hair="#1A0D06" shirt="#D8A8B0"/>
      <MiniPerson x={125} y={82} scale={0.85} skin="#F2C9A0" hair="#5A3A20" shirt="#A89A78"/>
      {/* Stage / podium */}
      <rect x="60" y="105" width="80" height="20" rx="3" fill="#8B6A48"/>
      <rect x="60" y="105" width="80" height="3" fill="#6A4A28"/>
      {/* Floor */}
      <rect x="0" y="120" width="200" height="10" fill="#A88858"/>
      {/* Confetti */}
      {[{x:80,y:30,c:"#E89080"},{x:110,y:35,c:"#8BB098"},{x:140,y:28,c:"#C8B0D8"},{x:65,y:40,c:"#F8D898"},{x:155,y:42,c:"#E8A8A8"}].map((c,i)=>(
        <rect key={i} x={c.x} y={c.y} width="3" height="3" fill={c.c} transform={`rotate(${i*30} ${c.x+1.5} ${c.y+1.5})`}/>
      ))}
    </svg>
  )
}

// EDITORIAL STYLE — stylist arranging clothing rack
function SceneEditorial() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="130" fill="#C8DCC0"/>
      {/* Window light streaks */}
      <rect x="10" y="0" width="40" height="130" fill="#E0EDD8" opacity="0.5"/>
      {/* Clothing rack */}
      <line x1="70" y1="35" x2="180" y2="35" stroke="#3A2A20" strokeWidth="2"/>
      <line x1="75" y1="35" x2="75" y2="115" stroke="#3A2A20" strokeWidth="1.5"/>
      <line x1="175" y1="35" x2="175" y2="115" stroke="#3A2A20" strokeWidth="1.5"/>
      {/* Hangers + clothes */}
      {[{x:85,c:"#D8A8B8",h:"#A89878"},{x:105,c:"#C8B098",h:"#A89878"},{x:125,c:"#A8B0D0",h:"#A89878"},{x:145,c:"#E8C8A8",h:"#A89878"},{x:165,c:"#B0C8B0",h:"#A89878"}].map((c,i)=>(
        <g key={i}>
          {/* hanger */}
          <path d={`M ${c.x-7} 38 L ${c.x} 33 L ${c.x+7} 38`} stroke={c.h} strokeWidth="1" fill="none"/>
          {/* clothes */}
          <path d={`M ${c.x-10} 40 L ${c.x-12} 90 L ${c.x+12} 90 L ${c.x+10} 40 Z`} fill={c.c}/>
        </g>
      ))}
      {/* Stylist */}
      <MiniPerson x={35} y={75} scale={1.2} skin="#D9A07A" hair="#2D1B0E" shirt="#E8C0A8"/>
      {/* Floor */}
      <rect x="0" y="115" width="200" height="15" fill="#B89878"/>
    </svg>
  )
}

// CREATIVE SCENES — for "For Creatives" section
// SHOWCASE AESTHETIC — gallery wall / portfolio grid
function SceneShowcase() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="200" fill="#F4E4D0"/>
      {/* Gallery wall frames */}
      <g>
        <rect x="20" y="30" width="55" height="70" rx="2" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="25" y="35" width="45" height="55" fill="#E8C4B8"/>
        <circle cx="47" cy="55" r="10" fill="#D8A088" opacity="0.7"/>
        <ellipse cx="47" cy="80" rx="18" ry="5" fill="#C88068" opacity="0.5"/>

        <rect x="85" y="20" width="50" height="50" rx="2" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="90" y="25" width="40" height="40" fill="#C8D4E8"/>
        <rect x="95" y="30" width="30" height="3" fill="#A8B8D0"/>
        <rect x="95" y="36" width="20" height="3" fill="#A8B8D0"/>
        <rect x="95" y="42" width="25" height="3" fill="#A8B8D0"/>

        <rect x="145" y="35" width="40" height="65" rx="2" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="150" y="40" width="30" height="50" fill="#D8C4E8"/>
        <ellipse cx="165" cy="65" rx="10" ry="14" fill="#B89AC8" opacity="0.6"/>

        <rect x="30" y="115" width="60" height="50" rx="2" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="35" y="120" width="50" height="40" fill="#C8DCC0"/>
        <path d="M40 145 Q 50 130 60 145 Q 70 135 80 145 L 80 155 L 40 155 Z" fill="#A8C098"/>

        <rect x="100" y="100" width="80" height="60" rx="2" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="105" y="105" width="70" height="50" fill="#E8D0B8"/>
        <circle cx="140" cy="125" r="12" fill="#D8B098"/>
        <rect x="115" y="142" width="50" height="3" fill="#C8A878"/>
      </g>
      {/* Floor */}
      <rect x="0" y="170" width="200" height="30" fill="#D4C4A8"/>
      <rect x="0" y="170" width="200" height="3" fill="#B8A488"/>
    </svg>
  )
}

// LIST PACKAGES — pricing/menu card
function ScenePackages() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="200" fill="#D8E0D0"/>
      {/* Three package cards stacked */}
      <g>
        {/* Card 1 */}
        <rect x="20" y="25" width="160" height="48" rx="10" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="30" y="35" width="50" height="6" rx="2" fill="#5A4A38"/>
        <rect x="30" y="46" width="80" height="4" rx="1" fill="#B8A088"/>
        <rect x="30" y="55" width="70" height="4" rx="1" fill="#B8A088"/>
        <rect x="140" y="40" width="30" height="18" rx="9" fill="#2C1A0E"/>
        <text x="155" y="52" fontSize="9" fontWeight="700" fill="#F8F2E8" textAnchor="middle">$120</text>

        {/* Card 2 */}
        <rect x="20" y="80" width="160" height="48" rx="10" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="30" y="90" width="60" height="6" rx="2" fill="#5A4A38"/>
        <rect x="30" y="101" width="90" height="4" rx="1" fill="#B8A088"/>
        <rect x="30" y="110" width="60" height="4" rx="1" fill="#B8A088"/>
        <rect x="140" y="95" width="30" height="18" rx="9" fill="#2C1A0E"/>
        <text x="155" y="107" fontSize="9" fontWeight="700" fill="#F8F2E8" textAnchor="middle">$220</text>

        {/* Card 3 */}
        <rect x="20" y="135" width="160" height="48" rx="10" fill="white" stroke="#C8B098" strokeWidth="1"/>
        <rect x="30" y="145" width="55" height="6" rx="2" fill="#5A4A38"/>
        <rect x="30" y="156" width="75" height="4" rx="1" fill="#B8A088"/>
        <rect x="30" y="165" width="65" height="4" rx="1" fill="#B8A088"/>
        <rect x="140" y="150" width="30" height="18" rx="9" fill="#2C1A0E"/>
        <text x="155" y="162" fontSize="9" fontWeight="700" fill="#F8F2E8" textAnchor="middle">$350</text>
      </g>
    </svg>
  )
}

// CONTROL AVAILABILITY — calendar with selected dates
function SceneCalendar() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="200" fill="#E0D4F0"/>
      {/* Calendar */}
      <rect x="25" y="25" width="150" height="150" rx="12" fill="white" stroke="#B8A4D0" strokeWidth="1"/>
      {/* Header */}
      <rect x="25" y="25" width="150" height="32" rx="12" fill="#2C1A0E"/>
      <rect x="25" y="45" width="150" height="12" fill="#2C1A0E"/>
      <text x="100" y="46" fontSize="11" fontWeight="700" fill="#F8F2E8" textAnchor="middle">June 2026</text>
      {/* Day labels */}
      {["S","M","T","W","T","F","S"].map((d,i)=>(
        <text key={i} x={37 + i*21} y={70} fontSize="7" fontWeight="600" fill="#8B7A6A" textAnchor="middle">{d}</text>
      ))}
      {/* Calendar grid — 5 weeks */}
      {Array.from({length: 35}, (_, i) => {
        const row = Math.floor(i/7)
        const col = i % 7
        const cx = 37 + col*21
        const cy = 84 + row*18
        const day = i - 2 // start Mon
        const valid = day > 0 && day <= 30
        const selected = [8, 14, 21, 28].includes(day)
        const today = day === 17
        return (
          <g key={i}>
            {selected && <circle cx={cx} cy={cy} r="8" fill="#B89AC8"/>}
            {today && <circle cx={cx} cy={cy} r="8" fill="#2C1A0E"/>}
            {valid && <text x={cx} y={cy+3} fontSize="8" fontWeight={selected || today ? "700" : "500"} fill={selected || today ? "white" : "#5A4A38"} textAnchor="middle">{day}</text>}
          </g>
        )
      })}
    </svg>
  )
}

// GET PAID DIRECTLY — payment / earnings dashboard
function ScenePayment() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="200" fill="#D4E0EC"/>
      {/* Dashboard card */}
      <rect x="20" y="25" width="160" height="150" rx="14" fill="white" stroke="#A8B8C8" strokeWidth="1"/>
      {/* Heading */}
      <rect x="30" y="35" width="55" height="4" rx="1" fill="#8B98A8"/>
      <text x="30" y="60" fontSize="22" fontWeight="800" fill="#2C1A0E">$4,820</text>
      <rect x="30" y="68" width="35" height="3" rx="1" fill="#A8B8C8"/>
      {/* Chart bars */}
      <g>
        {[
          {h:18,c:"#B8C4D0"},
          {h:24,c:"#B8C4D0"},
          {h:32,c:"#B8C4D0"},
          {h:22,c:"#B8C4D0"},
          {h:38,c:"#2C1A0E"},
          {h:30,c:"#B8C4D0"},
          {h:42,c:"#B8C4D0"},
        ].map((b,i)=>(
          <rect key={i} x={32 + i*20} y={155 - b.h} width="14" height={b.h} rx="3" fill={b.c}/>
        ))}
      </g>
      {/* Transaction row */}
      <rect x="20" y="180" width="160" height="14" rx="3" fill="#E8D4B8"/>
      <circle cx="30" cy="187" r="4" fill="#2C8C5A"/>
      <text x="30" y="189" fontSize="6" fontWeight="700" fill="white" textAnchor="middle">✓</text>
      <rect x="40" y="184" width="50" height="3" fill="#5A4A38"/>
      <rect x="40" y="189" width="35" height="2" fill="#A89878"/>
      <text x="172" y="190" fontSize="8" fontWeight="700" fill="#2C8C5A" textAnchor="end">+$320</text>
    </svg>
  )
}

// ─── Creators dataset ─────────────────────────────────────────
// CREATORS[0] is used for the profile phone mockup (snapsbyemi)
const CREATORS = [
  { name: "Emi Chen",  Av: Avatar.Emi,  handle: "@snapsbyemi", role: "WEDDING PHOTOGRAPHER", location: "Los Angeles", price: "$250", rating: "5.0", works: 34, bookings: 89, tagBg: "#D6EEE8", tagC: "#1A5A48", img: "emi" },
]

// ─── Browse Creatives section (landing page, 6 cards) ─────────
const DISCOVER_PROFILES = [
  { name: "Mia Torres",   img: "mia",   loc: "Los Angeles", role: "UGC CREATOR",    price: "$95"  },
  { name: "Diego Reyes",  img: "diego", loc: "Chicago",     role: "PHOTOGRAPHER",   price: "$185" },
  { name: "Yumi Park",    img: "yumi",  loc: "Seoul",       role: "CONTENT CREATOR",price: "$110" },
  { name: "Ellie Ross",   img: "ellie", loc: "Los Angeles", role: "MODEL",          price: "$145" },
  { name: "Luca Finn",    img: "luca",  loc: "Portland",    role: "PHOTOGRAPHER",   price: "$160" },
  { name: "Dre Williams", img: "dre",   loc: "Atlanta",     role: "VIDEOGRAPHER",   price: "$220" },
]

// ─── DiscoverPhone grid (12 profiles: 9 full + 3 peek) ─────────
const DISCOVER_PHONE_GRID = [
  { name: "Mia",   img: "mia",   loc: "Los Angeles" },
  { name: "Diego", img: "diego", loc: "Chicago"     },
  { name: "Yumi",  img: "yumi",  loc: "Seoul"       },
  { name: "Ellie", img: "ellie", loc: "Los Angeles" },
  { name: "Luca",  img: "luca",  loc: "Portland"    },
  { name: "Dre",   img: "dre",   loc: "Atlanta"     },
  { name: "Leila", img: "leila", loc: "Miami"       },
  { name: "Nova",  img: "nova",  loc: "New York"    },
  { name: "Sage",  img: "sage",  loc: "Austin"      },
  { name: "Nia",   img: "nia",   loc: "Atlanta"     },
  { name: "Chloe", img: "chloe", loc: "Seattle"     },
  { name: "Zara",  img: "zara",  loc: "London"      },
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
const E = '#2C1A0E'
const C = '#F8F2E8'

// ── Data for InteractivePhone ──────────────────────────────────
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

const StarFilled = ({ size = 9 }) => <svg viewBox="0 0 24 24" fill="#E8A030" style={{ width: size, height: size }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

function EmiAv({ size = 26 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: '#D4C4A8', flexShrink: 0 }}>
      <img src="/creators/emi.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
    </div>
  )
}

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

function BottomNav({ active = "home", onNav }) {
  const items = [
    { k: "home",    I: Ico.Home,   l: "HOME" },
    { k: "search",  I: Ico.Search, l: "SEARCH" },
    { k: "plus",    I: null,       l: "" },
    { k: "chat",    I: Ico.Chat,   l: "CHAT" },
    { k: "profile", I: Ico.User,   l: "PROFILE" },
  ]
  return (
    <div style={{ borderTop: "1px solid rgba(44,26,14,0.08)", background: "white", padding: "6px 4px 14px", display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0, position: "relative", zIndex: 10 }}>
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
          <div key={it.k} onClick={() => onNav?.(it.k)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, flex: 1, cursor: "pointer" }}>
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
  // 12 profiles: 9 fully visible (3×3 grid) + 3 peeking from the 4th row
  const grid = DISCOVER_PHONE_GRID.map(p => ({
    src:  `/creators/${p.img}.jpg`,
    name: p.name,
    loc:  p.loc,
  }))
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

      {/* 3-col grid — 9 full tiles + 3 peeking, flex:1 fills remaining height so BottomNav always sits flush at the bottom */}
      <div style={{ flex: 1, overflowY: "hidden" }}>
        <div style={{ padding: "0 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, alignContent: "start" }}>
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
      </div>

      <BottomNav active="home" />
    </PhoneShell>
  )
}

function ProfilePhone() {
  const c = CREATORS[0]
  const [activeTab, setActiveTab] = useState("Portfolio")

  const portfolioImgs = [
    "/zoe-portfolio/emi-1.jpg",
    "/zoe-portfolio/emi-2.jpg",
    "/zoe-portfolio/emi-3.jpg",
    "/zoe-portfolio/emi-4.jpg",
    "/zoe-portfolio/emi-5.jpg",
    "/zoe-portfolio/emi-6.jpg",
    "/zoe-portfolio/emi-7.jpg",
    "/zoe-portfolio/emi-8.jpg",
    "/zoe-portfolio/emi-9.jpg",
  ]

  const services = [
    {
      title: "Half Day Coverage",
      price: "$250",
      unit: "/session",
      duration: "4 hours",
      desc: "Perfect for intimate ceremonies & elopements. Includes 150+ edited photos delivered in 2 weeks.",
    },
    {
      title: "Full Day Coverage",
      price: "$450",
      unit: "/session",
      duration: "8 hours",
      desc: "Full day from getting ready to reception. 300+ edited photos + online gallery & print release.",
    },
  ]

  const reviews = [
    {
      name: "Sofia R.",
      handle: "@sofiareyes",
      stars: 5,
      text: "Emi made us feel so at ease — our photos came out absolutely stunning. Booked her again for our anniversary shoot!",
    },
    {
      name: "Marcus A.",
      handle: "@marcusali",
      stars: 5,
      text: "Professional, creative, and so easy to work with. The gallery was delivered ahead of schedule. 10/10.",
    },
  ]

  return (
    <PhoneShell>
      {/* Top bar */}
      <div style={{ padding: "4px 12px 6px", flexShrink: 0 }}>
        <div style={{ fontSize: 7, letterSpacing: "0.22em", fontWeight: 700, color: "#2C1A0E" }}>V I S I O N</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#2C1A0E", marginTop: 1 }}>{c.handle}</div>
      </div>

      {/* Stats row */}
      <div style={{ padding: "0 12px 8px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <div style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0, width: 44, height: 44 }}>
          <c.Av size={44} />
        </div>
        {[["5.0 ★", "RATING"], [c.bookings, "BOOKED"]].map(([v, l]) => (
          <div key={l} style={{ flex: 1, background: "white", borderRadius: 9, padding: "5px 2px", textAlign: "center", border: "1px solid rgba(44,26,14,0.04)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2C1A0E" }}>{v}</div>
            <div style={{ fontSize: 6, letterSpacing: "0.08em", color: "rgba(44,26,14,0.45)", marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Name + pill */}
      <div style={{ padding: "0 12px 2px", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#2C1A0E" }}>{c.name.split(" ")[0]}</span>
        <span style={{ background: "#FBE9D6", color: "#7A3A10", fontSize: 7, padding: "2px 7px", borderRadius: 999, fontWeight: 700, letterSpacing: "0.04em" }}>CREATIVE</span>
      </div>

      {/* Location */}
      <div style={{ padding: "0 12px 4px", display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
        <Ico.Map style={{ width: 8, height: 8, color: "rgba(44,26,14,0.5)" }} />
        <span style={{ fontSize: 9, color: "rgba(44,26,14,0.55)" }}>{c.location}</span>
      </div>

      {/* Bio */}
      <div style={{ padding: "0 12px 6px", flexShrink: 0 }}>
        <p style={{ fontSize: 9, color: "rgba(44,26,14,0.7)", lineHeight: 1.35, margin: 0 }}>Wedding photographer capturing timeless moments. Available for bookings.</p>
      </div>

      {/* Message button */}
      <div style={{ padding: "0 12px 6px", flexShrink: 0 }}>
        <div style={{ background: "rgba(44,26,14,0.08)", borderRadius: 18, padding: "6px 0", textAlign: "center", fontSize: 9, fontWeight: 700, color: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <Ico.Chat style={{ width: 10, height: 10 }} /> Message Emi Chen
        </div>
      </div>

      {/* Tabs — clickable, inside white pill container */}
      <div style={{ padding: "0 12px 8px", flexShrink: 0 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "3px", display: "flex", gap: 2, border: "1px solid rgba(44,26,14,0.06)" }}>
          {[
            { label: "Portfolio",     icon: <Ico.Eye     style={{ width: 7, height: 7 }} /> },
            { label: "Services", icon: <Ico.Layers  style={{ width: 7, height: 7 }} /> },
            { label: "Reviews",  icon: <Ico.Star    style={{ width: 7, height: 7 }} /> },
          ].map(({ label, icon }) => (
            <span
              key={label}
              onClick={() => setActiveTab(label)}
              style={{
                flex: 1, fontSize: 8, padding: "5px 4px", borderRadius: 16, fontWeight: 600,
                whiteSpace: "nowrap", cursor: "pointer", textAlign: "center",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                background: activeTab === label ? "#2C1A0E" : "transparent",
                color: activeTab === label ? "#F8F2E8" : "rgba(44,26,14,0.45)",
                transition: "all 0.15s",
              }}
            >{icon}{label}</span>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: "hidden" }}>

        {/* WORK — 3-column portfolio grid */}
        {activeTab === "Portfolio" && (
          <div style={{ padding: "0 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
            {portfolioImgs.map((src, i) => (
              <div key={i} style={{ aspectRatio: "3/4", borderRadius: 6, overflow: "hidden", background: "#EFE5D4" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
            ))}
          </div>
        )}

        {/* SERVICES — package cards */}
        {activeTab === "Services" && (
          <div style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
            {services.map((s) => (
              <div key={s.title} style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 11, color: "#2C1A0E" }}>{s.title}</span>
                  <span style={{ fontWeight: 700, fontSize: 12, color: "#2C1A0E" }}>{s.price}<span style={{ fontSize: 9, fontWeight: 500, color: "rgba(44,26,14,0.5)" }}>{s.unit}</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 5 }}>
                  <Ico.Calendar style={{ width: 8, height: 8, color: "rgba(44,26,14,0.4)" }} />
                  <span style={{ fontSize: 8, color: "rgba(44,26,14,0.45)" }}>{s.duration}</span>
                </div>
                <p style={{ fontSize: 8.5, color: "rgba(44,26,14,0.65)", lineHeight: 1.4, margin: "0 0 8px" }}>{s.desc}</p>
                <div style={{ background: "#2C1A0E", borderRadius: 12, padding: "5px 0", textAlign: "center", fontSize: 8.5, fontWeight: 700, color: "#F8F2E8" }}>
                  Book This Package
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS — review cards */}
        {activeTab === "Reviews" && (
          <div style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
            {reviews.map((r) => (
              <div key={r.handle} style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#EFE5D4", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E" }}>{r.name}</div>
                      <div style={{ fontSize: 8, color: "rgba(44,26,14,0.4)" }}>{r.handle}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 1 }}>
                    {[...Array(r.stars)].map((_, i) => (
                      <Ico.Star key={i} style={{ width: 8, height: 8, color: "#C8A040" }} />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 9, color: "rgba(44,26,14,0.7)", lineHeight: 1.4, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}

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
        <div style={{ borderRadius: "50%", overflow: "hidden" }}><Avatar.Dre size={28} /></div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 11, color: "#2C1A0E" }}>Dre Williams</div>
          <div style={{ fontSize: 8, color: "rgba(44,26,14,0.45)" }}>Videographer · Atlanta</div>
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

// ─── PackagesPhone — profile w/ Services tab open ─────────────
function PackagesPhone() {
  const c = CREATORS[0]
  const services = [
    { title: "Half Day Coverage", price: "$250", unit: "/session", duration: "4 hours", desc: "150+ edited photos, online gallery. Perfect for intimate ceremonies & elopements." },
    { title: "Full Day Coverage", price: "$450", unit: "/session", duration: "8 hours", desc: "300+ edited photos, online gallery, and print release. ~2 week delivery." },
    { title: "Content Mini Shoot", price: "$120", unit: "/session", duration: "1 hour", desc: "Social-ready content in one focused hour. Great for brands & UGC creators." },
  ]
  return (
    <PhoneShell>
      <div style={{ padding: "4px 12px 4px", flexShrink: 0 }}>
        <div style={{ fontSize: 7, letterSpacing: "0.22em", fontWeight: 700, color: "#2C1A0E" }}>V I S I O N</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#2C1A0E", marginTop: 1 }}>{c.handle}</div>
      </div>
      <div style={{ padding: "0 12px 6px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <div style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0, width: 36, height: 36 }}><c.Av size={36} /></div>
        {[["5.0 ★", "RATING"], [c.bookings, "BOOKED"]].map(([v, l]) => (
          <div key={l} style={{ flex: 1, background: "white", borderRadius: 9, padding: "4px 2px", textAlign: "center", border: "1px solid rgba(44,26,14,0.04)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#2C1A0E" }}>{v}</div>
            <div style={{ fontSize: 6, letterSpacing: "0.08em", color: "rgba(44,26,14,0.45)", marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 12px 6px", flexShrink: 0 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "3px", display: "flex", gap: 2, border: "1px solid rgba(44,26,14,0.06)" }}>
          {[["Portfolio", Ico.Eye], ["Services", Ico.Layers], ["Reviews", Ico.Star]].map(([label, Icon]) => (
            <span key={label} style={{ flex: 1, fontSize: 8, padding: "5px 4px", borderRadius: 16, fontWeight: 600, whiteSpace: "nowrap", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 3, background: label === "Services" ? "#2C1A0E" : "transparent", color: label === "Services" ? "#F8F2E8" : "rgba(44,26,14,0.45)" }}>
              <Icon style={{ width: 7, height: 7 }} />{label}
            </span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "hidden", padding: "0 12px", display: "flex", flexDirection: "column", gap: 7 }}>
        {services.map((s) => (
          <div key={s.title} style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
              <span style={{ fontWeight: 700, fontSize: 10.5, color: "#2C1A0E" }}>{s.title}</span>
              <span style={{ fontWeight: 700, fontSize: 11, color: "#2C1A0E" }}>{s.price}<span style={{ fontSize: 8, fontWeight: 500, color: "rgba(44,26,14,0.5)" }}>{s.unit}</span></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
              <Ico.Calendar style={{ width: 8, height: 8, color: "rgba(44,26,14,0.4)" }} />
              <span style={{ fontSize: 8, color: "rgba(44,26,14,0.45)" }}>{s.duration}</span>
            </div>
            <p style={{ fontSize: 8, color: "rgba(44,26,14,0.6)", lineHeight: 1.4, margin: "0 0 7px" }}>{s.desc}</p>
            <div style={{ background: "#2C1A0E", borderRadius: 10, padding: "5px 0", textAlign: "center", fontSize: 8, fontWeight: 700, color: "#F8F2E8" }}>Book This Package</div>
          </div>
        ))}
      </div>
      <BottomNav active="profile" />
    </PhoneShell>
  )
}

// ─── CheckoutPhone — instant book checkout page ────────────────
function CheckoutPhone() {
  const c = CREATORS[0]
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ padding: "4px 12px 8px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(44,26,14,0.07)", flexShrink: 0 }}>
        <Ico.Back style={{ width: 14, height: 14 }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: "#2C1A0E" }}>Book Package</span>
      </div>
      <div style={{ flex: 1, overflowY: "hidden", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Creative row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: 12, padding: "8px 10px", border: "1px solid rgba(44,26,14,0.07)" }}>
          <div style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}><c.Av size={32} /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E" }}>Emi Chen</div>
            <div style={{ fontSize: 8, color: "rgba(44,26,14,0.5)" }}>Wedding Photographer · Los Angeles</div>
          </div>
        </div>
        {/* Package */}
        <div style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontWeight: 700, fontSize: 10.5, color: "#2C1A0E" }}>Full Day Coverage</span>
            <span style={{ fontWeight: 700, fontSize: 11, color: "#2C1A0E" }}>$450</span>
          </div>
          <div style={{ fontSize: 8, color: "rgba(44,26,14,0.5)" }}>8 hours · 300+ edited photos</div>
        </div>
        {/* Date */}
        <div style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 8, color: "rgba(44,26,14,0.45)", marginBottom: 2 }}>DATE</div>
            <div style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E" }}>June 14, 2026 · 10:00 AM</div>
          </div>
          <Ico.Calendar style={{ width: 14, height: 14, color: "rgba(44,26,14,0.35)" }} />
        </div>
        {/* Instant Book toggle — ON */}
        <div style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E", display: "flex", alignItems: "center", gap: 4 }}>
                <Ico.Bolt style={{ width: 10, height: 10, color: "#C8A040" }} /> Instant Book
              </div>
              <div style={{ fontSize: 8, color: "rgba(44,26,14,0.5)", marginTop: 1 }}>Auto-confirmed — no waiting</div>
            </div>
            {/* Toggle ON */}
            <div style={{ width: 32, height: 18, borderRadius: 9, background: "#2C1A0E", position: "relative", flexShrink: 0 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F8F2E8", position: "absolute", top: 2, right: 2 }} />
            </div>
          </div>
          <div style={{ background: "#FAF4D6", borderRadius: 8, padding: "4px 8px", fontSize: 8, color: "#6A5010", fontWeight: 600 }}>⚡ Confirmed instantly — no charge until booked</div>
        </div>
        {/* Price summary */}
        <div style={{ background: "white", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(44,26,14,0.07)" }}>
          {[["Package", "$450.00"], ["Total", "$450.00"]].map(([l, v], i) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 1 ? 4 : 0, borderTop: i === 1 ? "1px solid rgba(44,26,14,0.08)" : "none", paddingTop: i === 1 ? 6 : 0 }}>
              <span style={{ fontSize: i === 1 ? 10 : 8.5, fontWeight: i === 1 ? 700 : 500, color: i === 1 ? "#2C1A0E" : "rgba(44,26,14,0.55)" }}>{l}</span>
              <span style={{ fontSize: i === 1 ? 10 : 8.5, fontWeight: i === 1 ? 700 : 500, color: "#2C1A0E" }}>{v}</span>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div style={{ background: "#2C1A0E", borderRadius: 14, padding: "10px 0", textAlign: "center", fontSize: 11, fontWeight: 700, color: "#F8F2E8" }}>Book &amp; Pay $450.00</div>
        <div style={{ textAlign: "center", fontSize: 8, color: "rgba(44,26,14,0.4)" }}>Secured by Stripe · Cancel free before 48h</div>
      </div>
    </PhoneShell>
  )
}

// ─── ListingPhone — open projects + apply modal ────────────────
function ListingPhone() {
  return (
    <PhoneShell>
      {/* Top bar */}
      <div style={{ padding: "4px 12px 6px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(44,26,14,0.07)", flexShrink: 0 }}>
        <Ico.Back style={{ width: 14, height: 14 }} />
        <span style={{ fontWeight: 700, fontSize: 12, color: "#2C1A0E", flex: 1 }}>Open projects</span>
        <span style={{ fontSize: 9, color: "rgba(44,26,14,0.4)" }}>1 / 1</span>
      </div>
      {/* Project image - Emi's photo */}
      <div style={{ position: "relative", flexShrink: 0, height: 140, overflow: "hidden" }}>
        <img src="/zoe-portfolio/emi-1.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>
      {/* Apply to listing sheet */}
      <div style={{ background: "#F8F2E8", borderRadius: "16px 16px 0 0", flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7, overflowY: "hidden", marginTop: -8, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 12, color: "#2C1A0E" }}>Apply to listing</span>
          <span style={{ fontSize: 14, color: "rgba(44,26,14,0.35)", lineHeight: 1 }}>×</span>
        </div>
        {/* Text input */}
        <div style={{ background: "white", borderRadius: 10, padding: "8px 10px", border: "1px solid rgba(44,26,14,0.12)", flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: "rgba(44,26,14,0.35)" }}>Introduce yourself and your approach...</div>
          <div style={{ height: 28 }} />
        </div>
        {/* Price input */}
        <div style={{ background: "white", borderRadius: 10, padding: "8px 10px", border: "1px solid rgba(44,26,14,0.12)", flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: "rgba(44,26,14,0.35)" }}>Proposed price ($)</div>
        </div>
        {/* Send button */}
        <div style={{ background: "#2C1A0E", borderRadius: 12, padding: "9px 0", textAlign: "center", fontSize: 10, fontWeight: 700, color: "#F8F2E8", flexShrink: 0 }}>Send application</div>
        {/* Project details below */}
        <div style={{ borderTop: "1px solid rgba(44,26,14,0.08)", paddingTop: 8, flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 11, color: "#2C1A0E", marginBottom: 5 }}>Casual Content Shoot</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 5 }}>
            {[["Active", "#D6EEE8", "#1A5A48"], ["$100 budget", "#FAF4D6", "#6A5010"], ["✦ Aesthetic", "#FBE9D6", "#7A3A10"]].map(([l, bg, c]) => (
              <span key={l} style={{ fontSize: 7.5, fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: bg, color: c }}>{l}</span>
            ))}
          </div>
          <div style={{ fontSize: 8, color: "rgba(44,26,14,0.5)" }}>San Francisco · May 12, 9:00 AM – 11:00 AM</div>
        </div>
      </div>
    </PhoneShell>
  )
}

// ─── PayoutsPhone — earnings dashboard ────────────────────────
function PayoutsPhone() {
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ padding: "6px 12px 4px", flexShrink: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#2C1A0E" }}>Payouts</div>
        <div style={{ fontSize: 8.5, color: "rgba(44,26,14,0.5)", marginTop: 1 }}>Track your earnings and withdraw to your bank.</div>
      </div>
      <div style={{ flex: 1, overflowY: "hidden", padding: "6px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Available balance card */}
        <div style={{ background: "#2C1A0E", borderRadius: 14, padding: "12px 14px", flexShrink: 0 }}>
          <div style={{ fontSize: 7.5, letterSpacing: "0.1em", color: "rgba(248,242,232,0.55)", fontWeight: 600, marginBottom: 4 }}>AVAILABLE BALANCE</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#F8F2E8", lineHeight: 1.1, marginBottom: 6 }}>$260.00</div>
          <div style={{ fontSize: 8, color: "rgba(248,242,232,0.5)", lineHeight: 1.4 }}>Funds are paid out automatically to your bank ~2 days after each booking.</div>
        </div>
        {/* Pending + Lifetime */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, flexShrink: 0 }}>
          {[["PENDING", "$0.00"], ["LIFETIME", "$260.00"]].map(([l, v]) => (
            <div key={l} style={{ background: "white", borderRadius: 12, padding: "8px 10px", border: "1px solid rgba(44,26,14,0.07)" }}>
              <div style={{ fontSize: 7, letterSpacing: "0.08em", color: "rgba(44,26,14,0.4)", marginBottom: 3 }}>{l}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#2C1A0E" }}>{v}</div>
            </div>
          ))}
        </div>
        {/* Payout method */}
        <div style={{ background: "white", borderRadius: 12, padding: "8px 10px", border: "1px solid rgba(44,26,14,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E" }}>Payout method</span>
            <span style={{ fontSize: 7.5, fontWeight: 600, color: "#1A5A48", background: "#D6EEE8", padding: "2px 7px", borderRadius: 999 }}>✓ Ready</span>
          </div>
          <div style={{ fontSize: 8, color: "rgba(44,26,14,0.5)" }}>Connected · STRIPE BANK ••••2227</div>
        </div>
        {/* Activity */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 7.5, letterSpacing: "0.1em", fontWeight: 700, color: "rgba(44,26,14,0.4)", marginBottom: 6 }}>ACTIVITY</div>
          {[
            { name: "Julie", date: "Paid out · 5/12/2026", amount: "+$165.00", img: "/creators/mia.jpg" },
            { name: "Sarah K.", date: "Paid out · 5/8/2026",  amount: "+$95.00",  img: "/creators/ellie.jpg" },
          ].map((a) => (
            <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, background: "white", borderRadius: 12, padding: "8px 10px", border: "1px solid rgba(44,26,14,0.07)", marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#D4C4A8" }}>
                <img src={a.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = 'none'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E" }}>{a.name}</div>
                <div style={{ fontSize: 7.5, color: "rgba(44,26,14,0.45)" }}>{a.date}</div>
              </div>
              <span style={{ fontWeight: 700, fontSize: 10, color: "#1A5A48" }}>{a.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
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
          <a href="#for-creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <Link to="/download" className="hover:text-espresso transition-colors">Install App</Link>
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
            <a href="#for-creatives" onClick={() => setOpen(false)}>For Creatives</a>
            <Link to="/download" onClick={() => setOpen(false)}>Install App</Link>
            <a href={APP_URL} className="bg-espresso text-cream-50 text-center py-2.5 rounded-full font-semibold mt-1">Explore Creatives</a>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── FeedScroll — Instagram-style post feed ────────────────────
function FeedScroll({ startIndex, posts, imgs, c }) {
  const postRefs = React.useRef([])
  React.useEffect(() => {
    const el = postRefs.current[startIndex]
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" })
  }, [startIndex])

  return (
    <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", background: "#F8F2E8" }}>
      {posts.map((post, i) => (
        <div key={i} ref={el => postRefs.current[i] = el} style={{ background: "white", marginBottom: 6 }}>
          {/* Per-post mini header */}
          <div style={{ padding: "7px 10px", display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}><c.Av size={22} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 10, color: "#2C1A0E" }}>{c.name}</div>
              <div style={{ fontSize: 7.5, color: "rgba(44,26,14,0.4)" }}>{c.location}</div>
            </div>
            <svg viewBox="0 0 24 24" fill="#2C1A0E" style={{ width: 14, height: 14, opacity: 0.3 }}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
          </div>
          {/* Photo */}
          <div style={{ width: "100%", aspectRatio: "1/1", background: "#EFE5D4", overflow: "hidden" }}>
            <img src={imgs[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
          </div>
          {/* Actions */}
          <div style={{ padding: "7px 10px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="1.8" style={{ width: 15, height: 15 }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span style={{ fontSize: 8.5, color: "rgba(44,26,14,0.5)" }}>{post.likes}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="1.8" style={{ width: 14, height: 14 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span style={{ fontSize: 8.5, color: "rgba(44,26,14,0.5)" }}>{post.comments}</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="1.8" style={{ width: 14, height: 14 }}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="1.8" style={{ width: 14, height: 14 }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </div>
          {/* Tag + caption */}
          <div style={{ padding: "0 10px 6px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "#FBE9D6", color: "#7A3A10", fontSize: 7.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999, marginBottom: 4 }}>
              <Ico.Sparkle style={{ width: 6, height: 6 }} /> {post.tag}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#2C1A0E" }}>{post.caption}</div>
          </div>
          {/* Comment input */}
          <div style={{ padding: "0 10px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F8F2E8", borderRadius: 20, padding: "5px 9px" }}>
              <span style={{ flex: 1, fontSize: 8.5, color: "rgba(44,26,14,0.35)" }}>Add a comment...</span>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ico.Arrow style={{ width: 8, height: 8, color: "#F8F2E8" }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── HeroProfilePhone (fully interactive hero phone) ──────────
function HeroProfilePhone() {
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
              onFocus={e => e.target.focus({ preventScroll: true })}
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

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-20 pb-8 sm:pb-24 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
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
              {[Avatar.Emi, Avatar.Mia, Avatar.Dre, Avatar.Leila, Avatar.Nova].map((Av, i) => (
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

        {/* Right side — Emi Chen profile preview */}
        <div className="hidden md:flex justify-center relative overflow-visible">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full opacity-40" style={{ background: "#F2C4A0", filter: "blur(70px)" }} />
          </div>
          <div className="relative scale-90 md:scale-95 lg:scale-100 origin-top">
            <HeroProfilePhone />
            {/* Solid arrow: scroll hint — left of phone */}
            <div className="hidden xl:flex absolute flex-col items-end gap-2" style={{ right: "calc(100% + 16px)", top: "36%" }}>
              <div style={{ background: "#F8F2E8", border: "1.5px solid rgba(44,26,14,0.12)", borderRadius: 999, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: "#2C1A0E", whiteSpace: "nowrap" }}>
                scroll to explore
              </div>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none" style={{ display: "block", alignSelf: "flex-end" }}>
                <path d="M2 6 Q 14 2 30 10 Q 38 14 46 13" stroke="#2C1A0E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M41 9 L47 13 L40 16" stroke="#2C1A0E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            {/* Solid arrow + interactive label — right of phone */}
            <div className="hidden xl:flex absolute flex-col items-start gap-2" style={{ left: "calc(100% + 16px)", bottom: "26%" }}>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none" style={{ display: "block", transform: "scaleX(-1)" }}>
                <path d="M2 6 Q 14 2 30 10 Q 38 14 46 13" stroke="#2C1A0E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M41 9 L47 13 L40 16" stroke="#2C1A0E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <div style={{ background: "#F8F2E8", border: "1.5px solid rgba(44,26,14,0.12)", borderRadius: 16, padding: "9px 16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#2C1A0E", whiteSpace: "nowrap" }}>interactive preview</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: "rgba(44,26,14,0.45)", whiteSpace: "nowrap" }}>tap &amp; scroll</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — scale phone to fit smaller screens */}
        <div className="flex md:hidden justify-center flex-col items-center gap-4">
          <div className="scale-90 xs:scale-95 origin-top">
            <HeroProfilePhone />
          </div>
          {/* Mobile label below phone */}
          <div style={{ background: "#F8F2E8", border: "1.5px solid rgba(44,26,14,0.12)", borderRadius: 999, padding: "8px 16px", fontSize: 11, fontWeight: 700, color: "#2C1A0E", whiteSpace: "nowrap" }}>
            tap & scroll to explore
          </div>
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


// ─── How It Works ─────────────────────────────────────────────
function HowItWorks() {
  const [tab, setTab]           = useState("hire")
  const [activeStep, setActiveStep] = useState(0)

  const steps = {
    hire: [
      { n: "01", t: "Browse & discover",         d: "Search by aesthetic, category, location, and price. Filter to find creatives who match your exact vision.",      bg: "#FAF4D6", tc: "#6A5010", Phone: DiscoverPhone,
        tags: ["Filter by vibe", "Search by location", "Real portfolios"] },
      { n: "02", t: "View portfolios & packages", d: "See real work, transparent pricing, and open availability — all in one clean profile.",                          bg: "#E2EEF6", tc: "#1A4A6A", Phone: PackagesPhone,
        tags: ["Portfolio gallery", "Honest pricing", "Check availability"] },
      { n: "03", t: "Instant Book or Request",    d: "Toggle Instant Book for automatic confirmation, or send a request to chat first. Pay securely through Stripe.",  bg: "#E6F0E6", tc: "#2A5A2A", Phone: CheckoutPhone,
        tags: ["⚡ Instant Book", "Secure via Stripe", "No charge until confirmed"] },
    ],
    create: [
      { n: "01", t: "Build your creative profile", d: "Showcase your portfolio, style tags, location, and packages. Your aesthetic is the first thing they see.",      bg: "#FBE9D6", tc: "#7A3A10", Phone: ProfilePhone,
        tags: ["Upload your portfolio", "Set your packages", "Show your aesthetic"] },
      { n: "02", t: "Apply to project listings",   d: "Browse open project listings, pitch your approach, and propose your price — all from inside the app.",          bg: "#EDE6F5", tc: "#4A2A7A", Phone: ListingPhone,
        tags: ["Browse open listings", "Pitch your approach", "Propose your rate"] },
      { n: "03", t: "Collaborate & get paid",       d: "Accept bookings, message clients in-app, and get paid automatically via Stripe Connect within 2 days.",        bg: "#D6EEE8", tc: "#1A5A48", Phone: PayoutsPhone,
        tags: ["Auto payout ~2 days", "Track earnings", "Stripe Connect"] },
    ],
  }

  const currentSteps = steps[tab]
  const ActivePhone  = currentSteps[activeStep].Phone

  return (
    <section id="how" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header — label left, toggle right, heading below */}
        <div className="mb-8 sm:mb-14">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">How it works</span>
            <div className="inline-flex bg-cream-200/80 p-1 rounded-full">
              {[["hire", "Hiring"], ["create", "Creating"]].map(([k, l]) => (
                <button key={k} onClick={() => { setTab(k); setActiveStep(0) }}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab === k ? "bg-espresso text-cream-50" : "text-espresso/60"}`}
                >{l}</button>
              ))}
            </div>
          </div>
          <h2 className="text-espresso text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">simple for both sides of a creative collaboration.</h2>
        </div>

        {/* ── MOBILE layout: phone on top (small), steps below ── */}
        <div className="lg:hidden">
          {/* Phone — compact, centered */}
          <div className="flex justify-center mb-5">
            <div style={{ transform: 'scale(0.58)', transformOrigin: 'top center', height: 300 }}>
              <ActivePhone />
            </div>
          </div>
          {/* Steps — compact rows, no expanded description */}
          <div className="flex flex-col gap-2">
            {currentSteps.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`rounded-2xl px-4 py-3 cursor-pointer transition-all border ${
                  activeStep === i
                    ? "bg-white shadow-card border-cream-200/50"
                    : "border-transparent hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block font-bold text-sm px-2.5 py-1 rounded-lg flex-shrink-0" style={{ background: s.bg, color: s.tc }}>{s.n}</span>
                  <h3 className="font-bold text-sm text-espresso leading-snug">{s.t}</h3>
                  {activeStep === i && (
                    <svg className="ml-auto flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
                {activeStep === i && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pl-10">
                    {s.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: s.bg, color: s.tc }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP layout: steps left, phone right ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-3">
            {currentSteps.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className={`rounded-2xl px-6 py-5 cursor-pointer transition-all border ${
                  activeStep === i
                    ? "bg-white shadow-card border-cream-200/50"
                    : "border-transparent hover:bg-white/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-block font-bold text-base px-3 py-1.5 rounded-xl flex-shrink-0 mt-0.5" style={{ background: s.bg, color: s.tc }}>{s.n}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-espresso">{s.t}</h3>
                    {activeStep === i && (
                      <>
                        <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{s.d}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {s.tags.map(tag => (
                            <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: s.bg, color: s.tc }}>{tag}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <ActivePhone />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Shared Vision ─────────────────────────────────────────────
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
  // Compact 2-column, 3-row staggered collage that aligns with text height on the left
  // Slight rotations + small overlaps give an editorial feel without making things big
  const cards = [
    { src: "/projects/content-shoot.jpg",  title: "Content Shoot",   pos: { top: "0%",   left: "10%",  width: "40%", rotate: "-2deg"   }, z: 3 },
    { src: "/projects/brand-campaign.jpg", title: "Brand Campaign",  pos: { top: "4%",   left: "55%",  width: "38%", rotate: "2deg"    }, z: 2 },
    { src: "/projects/editorial.jpg",      title: "Editorial",       pos: { top: "33%",  left: "0%",   width: "42%", rotate: "1.5deg"  }, z: 4 },
    { src: "/projects/music-video.jpg",    title: "Music Video",     pos: { top: "37%",  left: "48%",  width: "40%", rotate: "-1.5deg" }, z: 3 },
    { src: "/projects/photoshoot.jpg",     title: "Photoshoot",      pos: { top: "68%",  left: "25%",  width: "50%", rotate: "-1deg"   }, z: 5 },
  ]
  return (
    <section id="for-creatives" className="py-16 sm:py-24" style={{ background: "#FDFAF5" }}>
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
          {/* Right: compact staggered collage, sized to align with text height */}
          <div className="relative w-full" style={{ paddingBottom: "100%" }}>
            {cards.map((card, i) => (
              <div
                key={i}
                className="absolute group transition-transform duration-300 hover:scale-105 hover:z-50"
                style={{
                  top: card.pos.top,
                  left: card.pos.left,
                  width: card.pos.width,
                  zIndex: card.z,
                  transform: `rotate(${card.pos.rotate})`,
                }}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-soft border border-cream-200/40">
                  <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#EFE5D4" }}>
                    <img src={card.src} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  {/* Bottom gradient + title overlay on the image */}
                  <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 75%)" }}>
                    <div className="text-white font-bold text-sm leading-tight">{card.title}</div>
                  </div>
                </div>
              </div>
            ))}
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
        <div className="mt-4 flex justify-center">
          <a href={LOVABLE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-espresso/60 hover:text-espresso text-sm font-medium transition-colors group">
            <Ico.Download className="w-4 h-4 group-hover:text-espresso transition-colors" />
            Install Vision App
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
          <Link to="/privacy" className="hover:text-espresso transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-espresso transition-colors">Terms of Service</Link>
          <Link to="/faq" className="hover:text-espresso transition-colors">FAQ</Link>
          <Link to="/contact" className="hover:text-espresso transition-colors">Contact</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-espresso/60">
          <p className="font-semibold text-espresso/80 text-xs uppercase tracking-vision-sm mb-1">Platform</p>
          <a href="#discover" className="hover:text-espresso transition-colors">Discover Creatives</a>
          <a href="#how" className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#for-creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <Link to="/download" className="hover:text-espresso transition-colors">Install App</Link>
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
        <HowItWorks />
        <Categories />
        <SharedVision />

        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
