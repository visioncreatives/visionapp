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
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
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
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
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
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
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
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
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
// Images mapped to actual professions shown:
// zoe.png   → content creator (podcast/mic)
// marcus.png → photographer (with camera)
// sofia.png  → stylist (palette + laptop)
// ava.png    → videographer (gimbal camera)
// kai.png    → graphic designer (tablet drawing)
// lena.png   → makeup artist (doing makeup)
const CREATORS = [
  { name: "Zoe Chen",     Av: Avatar.Zoe,    handle: "@zoechen",    role: "CONTENT CREATOR",  location: "Los Angeles",   price: "$110", rating: "4.9", works: 34, bookings: 89,  tagBg: "#D6EEE8", tagC: "#1A5A48", img: "zoe" },
  { name: "Marcus Ali",   Av: Avatar.Marcus, handle: "@marcusali",  role: "PHOTOGRAPHER",     location: "New York",      price: "$200", rating: "5.0", works: 21, bookings: 52,  tagBg: "#FAF4D6", tagC: "#6A5010", img: "marcus" },
  { name: "Sofia Reyes",  Av: Avatar.Sofia,  handle: "@sofiareyes", role: "STYLIST",          location: "Miami",         price: "$95",  rating: "4.8", works: 47, bookings: 130, tagBg: "#E6F0E6", tagC: "#2A5A2A", img: "sofia" },
  // Ava uses kai.png (drawing tablet) → graphic designer
  { name: "Ava Nakamura", Av: Avatar.Kai,    handle: "@avanaka",    role: "GRAPHIC DESIGNER", location: "San Francisco", price: "$140", rating: "5.0", works: 18, bookings: 44,  tagBg: "#EDE6F5", tagC: "#4A2A7A", img: "kai" },
  // Kai uses ava.png (gimbal camera) → videographer
  { name: "Kai Williams", Av: Avatar.Ava,    handle: "@kaiwill",    role: "VIDEOGRAPHER",     location: "Portland",      price: "$175", rating: "4.9", works: 29, bookings: 71,  tagBg: "#E2EEF6", tagC: "#1A4A6A", img: "ava" },
  { name: "Lena Park",    Av: Avatar.Lena,   handle: "@lenapark",   role: "MAKEUP ARTIST",    location: "Chicago",       price: "$120", rating: "4.8", works: 38, bookings: 60,  tagBg: "#FBE9E9", tagC: "#7A2A2A", img: "lena" },
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
  // Pull from CREATORS so names/images/locations stay in sync everywhere
  const grid = CREATORS.map(c => ({
    src:  `/creators/${c.img}.png`,
    name: c.name.split(" ")[0],
    loc:  c.location,
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

        {/* Right side — phone preview of the actual app on desktop, also visible on tablet */}
        <div className="hidden md:flex justify-center lg:justify-end relative">
          {/* Soft glow behind the phone */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full opacity-40" style={{ background: "#F2C4A0", filter: "blur(70px)" }} />
          </div>
          <div className="relative">
            <DiscoverPhone />
            {/* Floating cue card next to phone */}
            <div className="absolute -left-8 top-20 hidden lg:flex bg-white rounded-2xl shadow-soft px-3.5 py-2.5 items-center gap-2.5 border border-cream-200/60" style={{ whiteSpace: "nowrap" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#A8D8C8" }} />
              <span className="text-xs font-semibold text-espresso">6 creatives near you</span>
            </div>
            <div className="absolute -right-6 bottom-36 hidden lg:block bg-white rounded-2xl shadow-soft px-3.5 py-2.5 border border-cream-200/60">
              <div className="text-[10px] text-espresso/50 font-medium">Starting from</div>
              <div className="text-sm font-bold text-espresso">$95 / project</div>
            </div>
          </div>
        </div>

        {/* Mobile: still show phone, simpler layout */}
        <div className="flex md:hidden justify-center">
          <DiscoverPhone />
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
                  src={`/creators/${c.img}.png`}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                {/* Name + location */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                  <div className="font-bold text-xs leading-tight">{c.name.split(" ")[0]}</div>
                  <div className="flex items-center gap-1 text-[10px] opacity-90 mt-0.5">
                    <Ico.Map style={{ width: 8, height: 8 }} /> {c.location}
                  </div>
                </div>
              </div>
              {/* Below the image, role + price line */}
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
  // Asymmetric collage layout: 5 image cards positioned absolutely
  // Sizes and offsets are tuned for a layered, editorial feel
  const cards = [
    { src: "/projects/content-creators.png",  title: "Content Creators",  pos: { top: "0%",  left: "2%",   width: "50%", rotate: "-2deg" }, z: 3 },
    { src: "/projects/photoshoots.png",       title: "Photoshoots",       pos: { top: "8%",  left: "48%",  width: "48%", rotate: "2deg"  }, z: 2 },
    { src: "/projects/branding.png",          title: "Branding",          pos: { top: "38%", left: "0%",   width: "55%", rotate: "1.5deg"}, z: 4 },
    { src: "/projects/makeup-artists.png",    title: "Makeup Artists",    pos: { top: "44%", left: "52%",  width: "46%", rotate: "-2deg" }, z: 3 },
    { src: "/projects/graphic-designers.png", title: "Graphic Designers", pos: { top: "78%", left: "20%",  width: "60%", rotate: "-1deg" }, z: 5 },
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
          {/* Right: editorial collage with overlapping, slightly rotated cards */}
          <div className="relative w-full" style={{ paddingBottom: "115%" }}>
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
    { Scene: SceneShowcase, t: "Showcase your aesthetic",       d: "Upload portfolio work with style tags. Your visual identity is your pitch.",                bg: "#FBE9D6", ic: "#7A3A10", Icon: Ico.Palette },
    { Scene: ScenePackages, t: "List packages & set your price", d: "Create clear, bookable packages so clients know exactly what they are getting.",          bg: "#E6F0E6", ic: "#2A5A2A", Icon: Ico.Layers },
    { Scene: SceneCalendar, t: "Control your availability",      d: "Set weekly slots and toggle instant booking. You decide when and how you work.",          bg: "#EDE6F5", ic: "#4A2A7A", Icon: Ico.Calendar },
    { Scene: ScenePayment,  t: "Get paid directly",              d: "Stripe Connect deposits straight to your bank. Track earnings in one dashboard.",         bg: "#E2EEF6", ic: "#1A4A6A", Icon: Ico.Sparkle },
  ]
  return (
    <section id="creatives" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: 2x2 themed Pixar scene mosaic, matching the 4 benefits */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl overflow-hidden shadow-card border border-cream-200/40" style={{ aspectRatio: "3/4" }}>
                <SceneShowcase />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-card border border-cream-200/40" style={{ aspectRatio: "4/3" }}>
                <ScenePackages />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="rounded-3xl overflow-hidden shadow-card border border-cream-200/40" style={{ aspectRatio: "4/3" }}>
                <SceneCalendar />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-card border border-cream-200/40" style={{ aspectRatio: "3/4" }}>
                <ScenePayment />
              </div>
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
