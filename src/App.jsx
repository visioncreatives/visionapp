import React, { useState, useEffect } from 'react'

// ============================================================
// REPLACE THIS WITH YOUR LOVABLE / PWA URL
// ============================================================
const APP_URL = "https://app.joinvision.app"

// ── Icons ─────────────────────────────────────────────────────
const Ico = {
  Home:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12 12 4l9 8"/><path d="M5 10v10h5v-5h4v5h5V10"/></svg>,
  Search:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Chat:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>,
  User:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  Plus:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Calendar: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Star:     p => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.8.7-5 4.7 1.4 6.7L12 17l-6.1 3.4 1.4-6.7-5-4.7 6.8-.7L12 2Z"/></svg>,
  Arrow:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>,
  Menu:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  Close:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  Check:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  Map:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2"/></svg>,
  Download: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>,
  Sparkle:  p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  Eye:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Palette:  p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125C13.033 18.769 13 18.5 13 18c0-.586.414-1 1-1h1.5c2.485 0 4.5-2.015 4.5-4.5C20 7.253 16.418 2 12 2Z"/></svg>,
  Film:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>,
  Wand:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 4-9 9 6 6 9-9-6-6ZM4 20l2-2M9 4l2 2M4 9l2 2M14 19l2 2M19 14l2 2"/></svg>,
  Layers:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 2 10 6.5-10 6.5L2 8.5 12 2Z"/><path d="m20 13 2 1.5-10 6.5L2 14.5l2-1.5"/></svg>,
}

// ── Pixar-style cartoon avatars ───────────────────────────────
const Avatar = {
  Zoe: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FADADC"/>
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#F4A261"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#F4A261"/>
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#F7C59F"/>
      <ellipse cx="50" cy="52" rx="28" ry="30" fill="#F7C59F"/>
      <ellipse cx="22" cy="53" rx="5" ry="7" fill="#F0B88A"/>
      <ellipse cx="78" cy="53" rx="5" ry="7" fill="#F0B88A"/>
      <ellipse cx="50" cy="34" rx="29" ry="22" fill="#2D1B0E"/>
      <ellipse cx="21" cy="52" rx="7" ry="14" fill="#2D1B0E"/>
      <ellipse cx="79" cy="52" rx="7" ry="14" fill="#2D1B0E"/>
      <ellipse cx="50" cy="26" rx="28" ry="16" fill="#3D2512"/>
      <path d="M22 38 Q36 48 50 40 Q64 48 78 38 Q72 24 50 22 Q28 24 22 38Z" fill="#2D1B0E"/>
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      <circle cx="38" cy="54" r="5.5" fill="#6B3A2A"/>
      <circle cx="62" cy="54" r="5.5" fill="#6B3A2A"/>
      <circle cx="38" cy="54" r="3" fill="#1A0D06"/>
      <circle cx="62" cy="54" r="3" fill="#1A0D06"/>
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      <path d="M30 43 Q38 39 46 43" stroke="#2D1B0E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M54 43 Q62 39 70 43" stroke="#2D1B0E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="50" cy="63" rx="3" ry="2" fill="#E8A882" opacity="0.8"/>
      <path d="M36 70 Q50 78 64 70" fill="#C0392B" stroke="none"/>
      <path d="M36 70 Q50 72 64 70" fill="white" stroke="none"/>
      <path d="M36 70 Q50 78 64 70" fill="none" stroke="#A0281E" strokeWidth="1"/>
      <ellipse cx="26" cy="62" rx="7" ry="4" fill="#F4908A" opacity="0.35"/>
      <ellipse cx="74" cy="62" rx="7" ry="4" fill="#F4908A" opacity="0.35"/>
    </svg>
  ),
  Marcus: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#B8D4E8"/>
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#3A7BD5"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#3A7BD5"/>
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#7A4A28"/>
      <ellipse cx="50" cy="52" rx="28" ry="30" fill="#8B5030"/>
      <ellipse cx="22" cy="53" rx="5" ry="7" fill="#7A4020"/>
      <ellipse cx="78" cy="53" rx="5" ry="7" fill="#7A4020"/>
      <ellipse cx="50" cy="28" rx="27" ry="18" fill="#1A0D06"/>
      <circle cx="33" cy="27" r="8" fill="#1A0D06"/>
      <circle cx="40" cy="22" r="9" fill="#1A0D06"/>
      <circle cx="50" cy="20" r="10" fill="#1A0D06"/>
      <circle cx="60" cy="22" r="9" fill="#1A0D06"/>
      <circle cx="67" cy="27" r="8" fill="#1A0D06"/>
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      <circle cx="38" cy="54" r="5.5" fill="#3D2010"/>
      <circle cx="62" cy="54" r="5.5" fill="#3D2010"/>
      <circle cx="38" cy="54" r="3" fill="#0D0806"/>
      <circle cx="62" cy="54" r="3" fill="#0D0806"/>
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      <path d="M29 43 Q38 38 46 42" stroke="#0D0806" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M54 42 Q62 38 71 43" stroke="#0D0806" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M44 63 Q47 68 50 67 Q53 68 56 63" fill="none" stroke="#5A2A10" strokeWidth="2" strokeLinecap="round"/>
      <path d="M35 71 Q50 81 65 71" fill="#8B1A10" stroke="none"/>
      <path d="M35 71 Q50 74 65 71" fill="white" stroke="none"/>
      <ellipse cx="25" cy="63" rx="7" ry="4" fill="#C06840" opacity="0.25"/>
      <ellipse cx="75" cy="63" rx="7" ry="4" fill="#C06840" opacity="0.25"/>
    </svg>
  ),
  Sofia: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#D4EDE4"/>
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#E8608A"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#E8608A"/>
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#D4916A"/>
      <ellipse cx="50" cy="44" rx="33" ry="32" fill="#7B3F1A"/>
      <path d="M18 50 Q10 65 16 82" stroke="#7B3F1A" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <path d="M82 50 Q90 65 84 82" stroke="#7B3F1A" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <ellipse cx="50" cy="53" rx="27" ry="29" fill="#DDA07A"/>
      <ellipse cx="23" cy="53" rx="5" ry="7" fill="#CD9068"/>
      <ellipse cx="77" cy="53" rx="5" ry="7" fill="#CD9068"/>
      <ellipse cx="50" cy="29" rx="29" ry="18" fill="#8B4820"/>
      <path d="M21 40 Q30 52 42 44 Q50 40 58 44 Q70 52 79 40 Q70 20 50 18 Q30 20 21 40Z" fill="#7B3F1A"/>
      <path d="M21 45 Q14 58 18 74" stroke="#7B3F1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M79 45 Q86 58 82 74" stroke="#7B3F1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      <circle cx="38" cy="54" r="5.5" fill="#5C3010"/>
      <circle cx="62" cy="54" r="5.5" fill="#5C3010"/>
      <circle cx="38" cy="54" r="3" fill="#1A0806"/>
      <circle cx="62" cy="54" r="3" fill="#1A0806"/>
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      <path d="M29 43 Q38 38 46 42" stroke="#5C2A08" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M54 42 Q62 38 71 43" stroke="#5C2A08" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="50" cy="64" rx="3" ry="2" fill="#C07850" opacity="0.7"/>
      <path d="M35 71 Q50 80 65 71" fill="#B03060" stroke="none"/>
      <path d="M35 71 Q50 74 65 71" fill="white" stroke="none"/>
      <ellipse cx="25" cy="63" rx="7" ry="4" fill="#E8706A" opacity="0.3"/>
      <ellipse cx="75" cy="63" rx="7" ry="4" fill="#E8706A" opacity="0.3"/>
    </svg>
  ),
  Ava: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#DDD0F0"/>
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#9B59B6"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#9B59B6"/>
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#F0D0B0"/>
      <rect x="17" y="28" width="66" height="60" rx="10" fill="#1A0D06"/>
      <ellipse cx="50" cy="51" rx="27" ry="29" fill="#F2D8B8"/>
      <ellipse cx="23" cy="51" rx="5" ry="7" fill="#E8C8A0"/>
      <ellipse cx="77" cy="51" rx="5" ry="7" fill="#E8C8A0"/>
      <path d="M18 38 Q50 18 82 38 Q80 22 50 18 Q20 22 18 38Z" fill="#1A0D06"/>
      <ellipse cx="50" cy="26" rx="28" ry="12" fill="#1A0D06"/>
      <path d="M22 38 Q36 46 50 40 Q64 46 78 38 Q72 26 50 24 Q28 26 22 38Z" fill="#1A0D06"/>
      <ellipse cx="37" cy="52" rx="9" ry="10" fill="white"/>
      <ellipse cx="63" cy="52" rx="9" ry="10" fill="white"/>
      <circle cx="37" cy="53" r="6.5" fill="#4A2810"/>
      <circle cx="63" cy="53" r="6.5" fill="#4A2810"/>
      <circle cx="37" cy="53" r="3.5" fill="#0D0806"/>
      <circle cx="63" cy="53" r="3.5" fill="#0D0806"/>
      <circle cx="39.5" cy="51" r="2" fill="white"/>
      <circle cx="65.5" cy="51" r="2" fill="white"/>
      <circle cx="35" cy="55" r="1" fill="white"/>
      <circle cx="61" cy="55" r="1" fill="white"/>
      <path d="M28 41 Q37 37 46 41" stroke="#1A0D06" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M54 41 Q63 37 72 41" stroke="#1A0D06" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M48 63 Q50 66 52 63" stroke="#D0A880" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M37 70 Q50 79 63 70" fill="#C0506A" stroke="none"/>
      <path d="M37 70 Q50 73 63 70" fill="white" stroke="none"/>
      <ellipse cx="25" cy="61" rx="7" ry="4" fill="#F4A0A0" opacity="0.28"/>
      <ellipse cx="75" cy="61" rx="7" ry="4" fill="#F4A0A0" opacity="0.28"/>
    </svg>
  ),
  Kai: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#A8D8C8"/>
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#2ECC71"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#2ECC71"/>
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#C8985A"/>
      <circle cx="50" cy="24" r="26" fill="#2A1408"/>
      <circle cx="30" cy="30" r="16" fill="#2A1408"/>
      <circle cx="70" cy="30" r="16" fill="#2A1408"/>
      <circle cx="20" cy="44" r="13" fill="#2A1408"/>
      <circle cx="80" cy="44" r="13" fill="#2A1408"/>
      <ellipse cx="50" cy="53" rx="27" ry="28" fill="#CFA070"/>
      <ellipse cx="23" cy="53" rx="5" ry="7" fill="#BF9060"/>
      <ellipse cx="77" cy="53" rx="5" ry="7" fill="#BF9060"/>
      <circle cx="22" cy="42" r="10" fill="#2A1408"/>
      <circle cx="78" cy="42" r="10" fill="#2A1408"/>
      <ellipse cx="50" cy="28" rx="24" ry="14" fill="#2A1408"/>
      <ellipse cx="38" cy="53" rx="9" ry="10" fill="white"/>
      <ellipse cx="62" cy="53" rx="9" ry="10" fill="white"/>
      <circle cx="38" cy="54" r="6" fill="#5A7A30"/>
      <circle cx="62" cy="54" r="6" fill="#5A7A30"/>
      <circle cx="38" cy="54" r="3.2" fill="#1A0D06"/>
      <circle cx="62" cy="54" r="3.2" fill="#1A0D06"/>
      <circle cx="40.5" cy="52" r="1.8" fill="white"/>
      <circle cx="64.5" cy="52" r="1.8" fill="white"/>
      <path d="M28 43 Q38 38 47 42" stroke="#1A0D06" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M53 42 Q62 38 72 43" stroke="#1A0D06" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="50" cy="64" rx="3.5" ry="2.5" fill="#A07040" opacity="0.6"/>
      <path d="M34 72 Q50 83 66 72" fill="#8B3A1A" stroke="none"/>
      <path d="M34 72 Q50 75 66 72" fill="white" stroke="none"/>
      <circle cx="32" cy="72" r="2" fill="#A07040" opacity="0.35"/>
      <circle cx="68" cy="72" r="2" fill="#A07040" opacity="0.35"/>
      <ellipse cx="24" cy="63" rx="7" ry="4" fill="#E09060" opacity="0.28"/>
      <ellipse cx="76" cy="63" rx="7" ry="4" fill="#E09060" opacity="0.28"/>
    </svg>
  ),
  Lena: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FDE8D0"/>
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#E8A87C"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#E8A87C"/>
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#F5CFA8"/>
      <ellipse cx="50" cy="52" rx="28" ry="30" fill="#F5CFA8"/>
      <ellipse cx="22" cy="53" rx="5" ry="7" fill="#EBBF96"/>
      <ellipse cx="78" cy="53" rx="5" ry="7" fill="#EBBF96"/>
      {/* Red wavy hair */}
      <ellipse cx="50" cy="30" rx="30" ry="24" fill="#8B2500"/>
      <path d="M20 42 Q12 55 18 72" stroke="#8B2500" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M80 42 Q88 55 82 72" stroke="#8B2500" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <ellipse cx="50" cy="24" rx="29" ry="16" fill="#A02E00"/>
      <path d="M20 36 Q34 50 50 42 Q66 50 80 36 Q72 20 50 18 Q28 20 20 36Z" fill="#8B2500"/>
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      <circle cx="38" cy="54" r="5.5" fill="#2E6FA8"/>
      <circle cx="62" cy="54" r="5.5" fill="#2E6FA8"/>
      <circle cx="38" cy="54" r="3" fill="#0D1A2A"/>
      <circle cx="62" cy="54" r="3" fill="#0D1A2A"/>
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      <path d="M30 42 Q38 38 46 42" stroke="#6B3A00" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M54 42 Q62 38 70 42" stroke="#6B3A00" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="50" cy="63" rx="3" ry="2" fill="#E8A882" opacity="0.8"/>
      <path d="M36 70 Q50 79 64 70" fill="#C0392B" stroke="none"/>
      <path d="M36 70 Q50 72.5 64 70" fill="white" stroke="none"/>
      <ellipse cx="26" cy="62" rx="7" ry="4" fill="#F4908A" opacity="0.35"/>
      <ellipse cx="74" cy="62" rx="7" ry="4" fill="#F4908A" opacity="0.35"/>
    </svg>
  ),
}

// ── Creator data ──────────────────────────────────────────────
const CREATORS = [
  { name: 'Zoe Chen',     Av: Avatar.Zoe,    handle: '@zoechen',    role: 'PHOTOGRAPHER',    location: 'Los Angeles', price: '$120', tag: 'Golden Hour',     rating: '4.9', works: 34, bookings: 89,  tagBg:'#FAF4D6', tagC:'#6A5010' },
  { name: 'Marcus Ali',   Av: Avatar.Marcus,  handle: '@marcusali',  role: 'VIDEOGRAPHER',    location: 'New York',    price: '$200', tag: 'Editorial',       rating: '5.0', works: 21, bookings: 52,  tagBg:'#E2EEF6', tagC:'#1A4A6A' },
  { name: 'Sofia Reyes',  Av: Avatar.Sofia,   handle: '@sofiareyes', role: 'STYLIST',         location: 'Miami',       price: '$95',  tag: 'Lifestyle',       rating: '4.8', works: 47, bookings: 130, tagBg:'#E6F0E6', tagC:'#2A5A2A' },
  { name: 'Ava Nakamura', Av: Avatar.Ava,     handle: '@avanaka',    role: 'CREATIVE DIR.',   location: 'San Francisco',price: '$175',tag: 'Luxury',          rating: '5.0', works: 18, bookings: 44,  tagBg:'#EDE6F5', tagC:'#4A2A7A' },
  { name: 'Kai Williams', Av: Avatar.Kai,     handle: '@kaiwill',    role: 'CONTENT CREATOR', location: 'Portland',    price: '$110', tag: 'Candid',          rating: '4.9', works: 29, bookings: 71,  tagBg:'#D6EEE8', tagC:'#1A5A48' },
  { name: 'Lena Park',    Av: Avatar.Lena,    handle: '@lenapark',   role: 'GRAPHIC DESIGNER',location: 'Chicago',     price: '$140', tag: 'Branding',        rating: '4.8', works: 38, bookings: 60,  tagBg:'#FBE9E9', tagC:'#7A2A2A' },
]

// ── Abstract portfolio tile patterns ──────────────────────────
function ArtTile({ bg, variant = 0, price, label, style = {} }) {
  const patterns = [
    // Circles composition
    <><div style={{position:'absolute',top:'-15%',right:'-15%',width:'65%',paddingBottom:'65%',borderRadius:'50%',background:'rgba(255,255,255,0.18)'}}/><div style={{position:'absolute',bottom:'-10%',left:'-10%',width:'50%',paddingBottom:'50%',borderRadius:'50%',background:'rgba(0,0,0,0.07)'}}/><div style={{position:'absolute',top:'35%',left:'20%',width:'28%',paddingBottom:'28%',borderRadius:'50%',background:'rgba(255,255,255,0.14)'}}/></>,
    // Diagonal
    <><div style={{position:'absolute',top:0,right:0,width:'60%',height:'100%',background:'rgba(255,255,255,0.12)',transform:'skewX(-10deg)',transformOrigin:'top right'}}/><div style={{position:'absolute',bottom:'18%',left:'12%',width:'42%',height:'2px',background:'rgba(255,255,255,0.3)',borderRadius:2}}/><div style={{position:'absolute',bottom:'25%',left:'12%',width:'58%',height:'2px',background:'rgba(255,255,255,0.18)',borderRadius:2}}/></>,
    // Rounded rects
    <><div style={{position:'absolute',top:'10%',left:'10%',width:'42%',paddingBottom:'42%',borderRadius:14,background:'rgba(255,255,255,0.16)'}}/><div style={{position:'absolute',top:'20%',right:'8%',width:'30%',paddingBottom:'30%',borderRadius:10,background:'rgba(0,0,0,0.07)'}}/><div style={{position:'absolute',bottom:'15%',right:'12%',width:'38%',paddingBottom:'38%',borderRadius:12,background:'rgba(255,255,255,0.11)'}}/></>,
    // Horizon arc
    <><div style={{position:'absolute',bottom:'-8%',left:'50%',transform:'translateX(-50%)',width:'130%',paddingBottom:'65%',borderRadius:'50% 50% 0 0',background:'rgba(255,255,255,0.14)'}}/><div style={{position:'absolute',top:'12%',left:'50%',transform:'translateX(-50%)',width:'35%',paddingBottom:'35%',borderRadius:'50%',background:'rgba(255,255,255,0.2)'}}/></>,
    // Cross lines
    <><div style={{position:'absolute',top:'50%',left:0,right:0,height:'1px',background:'rgba(255,255,255,0.25)'}}/><div style={{position:'absolute',left:'50%',top:0,bottom:0,width:'1px',background:'rgba(255,255,255,0.25)'}}/><div style={{position:'absolute',top:'25%',left:'25%',width:'50%',paddingBottom:'50%',borderRadius:'50%',background:'rgba(255,255,255,0.12)'}}/></>,
    // Scattered dots
    <>{[{t:'15%',l:'20%',s:'8%'},{t:'30%',l:'60%',s:'12%'},{t:'55%',l:'25%',s:'10%'},{t:'65%',l:'65%',s:'7%'},{t:'80%',l:'40%',s:'6%'}].map((d,i)=><div key={i} style={{position:'absolute',top:d.t,left:d.l,width:d.s,paddingBottom:d.s,borderRadius:'50%',background:'rgba(255,255,255,0.2)'}}/>)}</>,
  ]
  return (
    <div style={{ background:bg, borderRadius:16, position:'relative', overflow:'hidden', ...style }}>
      {patterns[variant % patterns.length]}
      {price && <span style={{position:'absolute',bottom:8,left:8,background:'rgba(255,255,255,0.92)',color:'#2C1A0E',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:999}}>{price}</span>}
      {label && <span style={{position:'absolute',top:8,left:8,background:'rgba(255,255,255,0.88)',color:'#2C1A0E',fontSize:8,fontWeight:600,padding:'2px 7px',borderRadius:999}}>{label}</span>}
    </div>
  )
}

// ── iPhone phone shell ────────────────────────────────────────
const PW = 260, PH = 520
function PhoneShell({ children }) {
  return (
    <div style={{width:PW,flexShrink:0}}>
      <div style={{background:'#2C1A0E',borderRadius:40,padding:9,boxShadow:'0 24px 48px -12px rgba(44,26,14,0.45)'}}>
        <div style={{background:'#F8F2E8',borderRadius:32,overflow:'hidden',height:PH,display:'flex',flexDirection:'column',position:'relative'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 16px 2px',fontSize:9,color:'rgba(44,26,14,0.5)',fontWeight:600,flexShrink:0}}>
            <span>9:41</span>
            <span style={{display:'flex',gap:3}}><span style={{width:10,height:5,background:'rgba(44,26,14,0.4)',borderRadius:2}}/><span style={{width:10,height:5,background:'rgba(44,26,14,0.4)',borderRadius:2}}/><span style={{width:14,height:7,border:'1.5px solid rgba(44,26,14,0.4)',borderRadius:2}}/></span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
function BottomNav({ active='home' }) {
  const items=[{k:'home',I:Ico.Home,l:'HOME'},{k:'search',I:Ico.Search,l:'SEARCH'},{k:'plus',I:null,l:''},{k:'chat',I:Ico.Chat,l:'CHAT'},{k:'profile',I:Ico.User,l:'PROFILE'}]
  return (
    <div style={{borderTop:'1px solid rgba(44,26,14,0.08)',background:'white',padding:'6px 4px 8px',display:'flex',alignItems:'center',justifyContent:'space-around',flexShrink:0}}>
      {items.map(it=>{
        if(it.k==='plus') return <div key="plus" style={{marginTop:-18}}><div style={{width:38,height:38,borderRadius:'50%',background:'#2C1A0E',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 10px rgba(44,26,14,0.35)'}}><Ico.Plus style={{width:16,height:16,color:'#F8F2E8'}}/></div></div>
        const on=active===it.k
        return <div key={it.k} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:1,flex:1}}><it.I style={{width:16,height:16,color:on?'#2C1A0E':'rgba(44,26,14,0.28)'}}/><span style={{fontSize:6,letterSpacing:'0.07em',color:on?'#2C1A0E':'rgba(44,26,14,0.28)',fontWeight:on?700:400}}>{it.l}</span></div>
      })}
    </div>
  )
}

// ── HERO PHONE — Discover feed ────────────────────────────────
function DiscoverPhone() {
  const tiles = [
    {bg:'#E8C4B8',label:'Photography', v:0},{bg:'#B8D4C0',label:'Styling', v:1},
    {bg:'#C4C8E8',label:'Branding', v:2},{bg:'#E8D8B8',label:'Content', v:3},
    {bg:'#D8C4E8',label:'Direction', v:4},{bg:'#B8DDE8',label:'Video', v:5},
  ]
  return (
    <PhoneShell>
      <div style={{padding:'4px 12px 6px',flexShrink:0}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:8,letterSpacing:'0.22em',fontWeight:700,color:'#2C1A0E'}}>V I S I O N</span>
          <div style={{background:'white',borderRadius:12,padding:'4px 8px',display:'flex',alignItems:'center',gap:4,border:'1px solid rgba(44,26,14,0.08)'}}>
            <Ico.Search style={{width:8,height:8,color:'rgba(44,26,14,0.4)'}}/>
            <span style={{fontSize:8,color:'rgba(44,26,14,0.4)'}}>Find creatives…</span>
          </div>
        </div>
      </div>
      {/* Category pills */}
      <div style={{padding:'0 12px 8px',display:'flex',gap:5,overflowX:'auto',flexShrink:0}} className="no-scrollbar">
        {[{l:'All',a:true},{l:'Photo'},{l:'Video'},{l:'Style'},{l:'Brand'},{l:'Design'}].map(({l,a})=>(
          <span key={l} style={{fontSize:8,padding:'3px 10px',borderRadius:18,fontWeight:600,whiteSpace:'nowrap',background:a?'#2C1A0E':'white',color:a?'#F8F2E8':'rgba(44,26,14,0.55)',border:a?'none':'1px solid rgba(44,26,14,0.1)'}}>{l}</span>
        ))}
      </div>
      {/* 2-col tile grid */}
      <div style={{flex:1,padding:'0 12px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,overflowY:'hidden'}}>
        {tiles.map((t,i)=>(
          <div key={i} style={{position:'relative'}}>
            <ArtTile bg={t.bg} variant={t.v} label={t.label} style={{height:'100%',minHeight:i===0||i===3?95:75}}/>
            {i===0 && (
              <div style={{position:'absolute',bottom:6,right:6,background:'rgba(255,255,255,0.9)',borderRadius:8,padding:'3px 6px',display:'flex',alignItems:'center',gap:4}}>
                <div style={{borderRadius:'50%',overflow:'hidden'}}><Avatar.Zoe size={14}/></div>
                <span style={{fontSize:7,fontWeight:700,color:'#2C1A0E'}}>Zoe</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav active="search"/>
    </PhoneShell>
  )
}

// ── PROFILE PHONE ─────────────────────────────────────────────
function ProfilePhone() {
  const c = CREATORS[0]
  return (
    <PhoneShell>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 14px 6px',flexShrink:0}}>
        <span style={{fontSize:8,letterSpacing:'0.22em',fontWeight:700,color:'#2C1A0E'}}>V I S I O N</span>
        <span style={{fontSize:8,color:'rgba(44,26,14,0.4)'}}>{c.handle}</span>
      </div>
      <div style={{flex:1,overflowY:'hidden',padding:'0 12px',display:'flex',flexDirection:'column',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{borderRadius:'50%',overflow:'hidden',flexShrink:0}}><c.Av size={46}/></div>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:5,flexWrap:'wrap'}}>
              <span style={{fontWeight:700,fontSize:13,color:'#2C1A0E'}}>{c.name}</span>
              <span style={{background:'#FBE9D6',color:'#7A3A10',fontSize:8,padding:'2px 7px',borderRadius:999,fontWeight:600}}>CREATIVE</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:3,marginTop:2}}>
              <Ico.Map style={{width:8,height:8,color:'rgba(44,26,14,0.4)'}}/><span style={{fontSize:9,color:'rgba(44,26,14,0.5)'}}>{c.location}</span>
            </div>
          </div>
          <button style={{background:'#2C1A0E',color:'#F8F2E8',border:'none',borderRadius:18,padding:'5px 11px',fontSize:9,fontWeight:700,cursor:'pointer',flexShrink:0}}>Hire</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:5}}>
          {[[c.works,'WORKS'],['4.9 ★','RATING'],[c.bookings,'BOOKED']].map(([v,l])=>(
            <div key={l} style={{background:'white',borderRadius:10,padding:'6px 4px',textAlign:'center'}}>
              <div style={{fontSize:12,fontWeight:700,color:'#2C1A0E'}}>{v}</div>
              <div style={{fontSize:7,letterSpacing:'0.06em',color:'rgba(44,26,14,0.45)',marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:5}}>
          {['Portfolio','Packages','Reviews'].map((t,i)=>(
            <span key={t} style={{fontSize:9,padding:'4px 10px',borderRadius:18,fontWeight:600,background:i===0?'#2C1A0E':'white',color:i===0?'#F8F2E8':'rgba(44,26,14,0.5)',border:i===0?'none':'1px solid rgba(44,26,14,0.1)'}}>{t}</span>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,flex:1}}>
          <ArtTile bg="#E8B8A8" price="$120" variant={0} style={{aspectRatio:'3/4'}}/>
          <ArtTile bg="#C8D4A0" price="$200" variant={1} style={{aspectRatio:'3/4'}}/>
          <ArtTile bg="#A8C8D0" price="$95"  variant={2} style={{aspectRatio:'3/4'}}/>
          <ArtTile bg="#D4B8E0" price="$180" variant={3} style={{aspectRatio:'3/4'}}/>
        </div>
      </div>
      <BottomNav active="profile"/>
    </PhoneShell>
  )
}

// ── CHAT PHONE ────────────────────────────────────────────────
function ChatPhone() {
  const msgs=[
    {f:'them',t:'Hi! Loved your editorial work. Are you free June 14?'},
    {f:'me',  t:'Yes, 3–5 PM works! What type of shoot?'},
    {f:'them',t:'Brand content for my skincare line. ~2 hours.'},
    {f:'me',  t:'Perfect. Sending a booking request now — $320.'},
    {f:'them',t:'Accepted! So excited to collaborate 🙌'},
  ]
  return (
    <PhoneShell>
      <div style={{padding:'4px 12px 8px',borderBottom:'1px solid rgba(44,26,14,0.06)',display:'flex',alignItems:'center',gap:7,flexShrink:0}}>
        <div style={{borderRadius:'50%',overflow:'hidden'}}><Avatar.Marcus size={28}/></div>
        <div><div style={{fontWeight:700,fontSize:11,color:'#2C1A0E'}}>Marcus Ali</div><div style={{fontSize:8,color:'rgba(44,26,14,0.45)'}}>Videographer · New York</div></div>
      </div>
      <div style={{flex:1,padding:'8px 10px',display:'flex',flexDirection:'column',gap:6,overflowY:'hidden'}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:'flex',justifyContent:m.f==='me'?'flex-end':'flex-start'}}>
            <div style={{maxWidth:'78%',padding:'6px 9px',borderRadius:m.f==='me'?'12px 12px 3px 12px':'12px 12px 12px 3px',background:m.f==='me'?'#2C1A0E':'white',color:m.f==='me'?'#F8F2E8':'#2C1A0E',fontSize:9,lineHeight:1.4,border:m.f==='me'?'none':'1px solid rgba(44,26,14,0.07)'}}>{m.t}</div>
          </div>
        ))}
        <div style={{alignSelf:'center',background:'#E6F0E6',color:'#2A5A2A',fontSize:8,fontWeight:600,padding:'3px 10px',borderRadius:18,display:'flex',alignItems:'center',gap:3}}>
          <Ico.Check style={{width:8,height:8}}/> Booking confirmed — Jun 14, 3:00 PM
        </div>
      </div>
      <div style={{padding:'6px 10px',borderTop:'1px solid rgba(44,26,14,0.07)',display:'flex',gap:6,flexShrink:0}}>
        <div style={{flex:1,background:'white',borderRadius:18,padding:'5px 10px',fontSize:9,color:'rgba(44,26,14,0.35)',border:'1px solid rgba(44,26,14,0.08)'}}>Message…</div>
        <div style={{width:26,height:26,borderRadius:'50%',background:'#2C1A0E',display:'flex',alignItems:'center',justifyContent:'center'}}><Ico.Arrow style={{width:11,height:11,color:'#F8F2E8'}}/></div>
      </div>
      <BottomNav active="chat"/>
    </PhoneShell>
  )
}

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-cream-100/88 backdrop-blur-md border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-espresso font-bold tracking-vision text-sm">V I S I O N</a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-espresso/65 font-medium">
          <a href="#discover"   className="hover:text-espresso transition-colors">Discover</a>
          <a href="#how"        className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#creatives"  className="hover:text-espresso transition-colors">For Creatives</a>
          <a href="#download"   className="hover:text-espresso transition-colors">Install App</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href={APP_URL} className="hidden sm:inline-flex items-center bg-espresso text-cream-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-espresso-dark transition-colors">Explore Creatives</a>
          <button onClick={()=>setOpen(!open)} className="md:hidden p-2 text-espresso">
            {open ? <Ico.Close style={{width:20,height:20}}/> : <Ico.Menu style={{width:20,height:20}}/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-cream-200/60 bg-cream-100">
          <div className="px-5 py-4 flex flex-col gap-4 text-espresso/80 font-medium">
            <a href="#discover"  onClick={()=>setOpen(false)}>Discover</a>
            <a href="#how"       onClick={()=>setOpen(false)}>How it Works</a>
            <a href="#creatives" onClick={()=>setOpen(false)}>For Creatives</a>
            <a href="#download"  onClick={()=>setOpen(false)}>Install App</a>
            <a href={APP_URL} className="bg-espresso text-cream-50 text-center py-2.5 rounded-full font-semibold mt-1">Explore Creatives</a>
          </div>
        </div>
      )}
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  // Mosaic tiles — the "aesthetic collage" hero visual
  const mosaic = [
    {bg:'#E8C4B8',v:0,span:'row-span-2',label:'Photography'},
    {bg:'#C4D4C0',v:1,label:'Styling'},
    {bg:'#C4C8E8',v:2,label:'Branding'},
    {bg:'#E8D8B8',v:3,span:'row-span-2',label:'Creative Dir.'},
    {bg:'#D4C0E8',v:4,label:'Content'},
    {bg:'#B8DDE0',v:5,label:'Makeup'},
    {bg:'#E0C8B8',v:0,label:'Events'},
    {bg:'#C8D8B0',v:1,label:'Design'},
  ]
  return (
    <section id="top" className="relative overflow-hidden bg-cream-100">
      {/* Ambient light blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{background:'#F2C4A0',filter:'blur(90px)'}}/>
      <div className="absolute top-60 -left-32 w-96 h-96 rounded-full opacity-20" style={{background:'#B8C8E8',filter:'blur(80px)'}}/>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-20" style={{background:'#C8B8E0',filter:'blur(70px)'}}/>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{background:'#EDE6F5',color:'#4A2A7A'}}>
            <Ico.Sparkle style={{width:12,height:12}}/> The creative marketplace
          </div>

          <h1 className="text-espresso font-bold leading-[1.06] tracking-tight text-4xl sm:text-5xl lg:text-[58px]">
            find creatives<br/>
            that match<br/>
            <span style={{color:'#8B6A3A',fontStyle:'italic',fontWeight:400}}>your vision.</span>
          </h1>

          <p className="mt-6 text-espresso/60 text-base sm:text-lg max-w-lg leading-relaxed">
            Discover and collaborate with photographers, stylists, directors, designers, and creators — for content, branding, events, and everything in between.
          </p>

          {/* Category pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              {l:'Photography', bg:'#FAF4D6', c:'#6A5010'},
              {l:'Styling',     bg:'#E6F0E6', c:'#2A5A2A'},
              {l:'Branding',    bg:'#E2EEF6', c:'#1A4A6A'},
              {l:'Content',     bg:'#EDE6F5', c:'#4A2A7A'},
              {l:'Events',      bg:'#FBE9E9', c:'#7A2A2A'},
              {l:'Design',      bg:'#D6EEE8', c:'#1A5A48'},
            ].map(({l,bg,c})=>(
              <span key={l} style={{background:bg,color:c,fontSize:12,padding:'5px 13px',borderRadius:999,fontWeight:600}}>{l}</span>
            ))}
          </div>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-espresso text-cream-50 px-7 py-4 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft text-base">
              Explore Creatives <Ico.Arrow className="w-4 h-4"/>
            </a>
            <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-200 text-espresso px-7 py-4 rounded-full font-semibold hover:bg-cream-50 transition-colors text-base">
              Become a Creative
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[Avatar.Zoe,Avatar.Marcus,Avatar.Sofia,Avatar.Ava,Avatar.Kai].map((Av,i)=>(
                <div key={i} style={{borderRadius:'50%',overflow:'hidden',outline:'2px solid #F8F2E8'}}><Av size={30}/></div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i=><Ico.Star key={i} style={{width:11,height:11,color:'#C8A040'}}/>)}
              </div>
              <p className="text-xs text-espresso/50 font-medium mt-0.5">Loved by creatives & clients</p>
            </div>
          </div>
        </div>

        {/* Right — aesthetic mosaic grid */}
        <div className="hidden lg:block mosaic-grid">
          {mosaic.map((t,i)=>(
            <div key={i} className={i===0||i===3 ? 'mosaic-tall' : ''}>
              <ArtTile bg={t.bg} variant={t.v} label={t.label} style={{borderRadius:20, height:'100%'}}/>
            </div>
          ))}
        </div>
        </div>

        {/* Mobile: phone instead of mosaic */}
        <div className="flex lg:hidden justify-center">
          <div className="relative">
            <ProfilePhone/>
            <div className="absolute -left-6 top-20 hidden sm:flex bg-white rounded-2xl shadow-soft px-3 py-2 items-center gap-2 border border-cream-200/60">
              <div style={{width:8,height:8,borderRadius:'50%',background:'#A8D8C8'}}/>
              <span className="text-xs font-semibold text-espresso">New project request</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Creative Categories ───────────────────────────────────────
function Categories() {
  const cats = [
    {icon:Ico.Eye,     label:'Photography',    desc:'Portrait, brand, editorial, events',      bg:'#FAF4D6', ic:'#6A5010'},
    {icon:Ico.Film,    label:'Videography',    desc:'Content, reels, brand films, events',     bg:'#E2EEF6', ic:'#1A4A6A'},
    {icon:Ico.Palette, label:'Styling',        desc:'Fashion, lifestyle, wardrobe curation',   bg:'#E6F0E6', ic:'#2A5A2A'},
    {icon:Ico.Wand,    label:'Creative Dir.',  desc:'Art direction, concept, visual strategy', bg:'#EDE6F5', ic:'#4A2A7A'},
    {icon:Ico.Sparkle, label:'Makeup & Beauty','desc':'Editorial, events, personal, brand',    bg:'#FBE9E9', ic:'#7A2A2A'},
    {icon:Ico.Layers,  label:'Branding & Design','desc':'Identity, graphics, campaigns',      bg:'#D6EEE8', ic:'#1A5A48'},
    {icon:Ico.Calendar,label:'Events',         desc:'Weddings, activations, brand moments',   bg:'#FBE9D6', ic:'#7A3A10'},
    {icon:Ico.User,    label:'Content Creation','desc':'Social, UGC, influencer, lifestyle',   bg:'#E2EEF6', ic:'#1A4A6A'},
  ]
  return (
    <section className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Creative Categories</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">every type of creative, in one place.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Vision isn't just for photographers. Explore every creative discipline.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((c,i)=>(
            <a key={i} href={APP_URL} className="bg-white rounded-3xl p-5 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform group block">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{background:c.bg}}>
                <c.icon style={{width:20,height:20,color:c.ic}}/>
              </div>
              <div className="font-bold text-sm text-espresso">{c.label}</div>
              <div className="text-xs text-espresso/55 mt-1 leading-relaxed">{c.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Discover Creatives ────────────────────────────────────────
function DiscoverSection() {
  const [active, setActive] = useState(0)
  return (
    <section id="discover" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Discover</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">browse creatives who get your aesthetic.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Filter by style, location, category, and price. Every profile shows real work, honest pricing, and open availability.</p>
        </div>

        {/* Creator cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREATORS.map((c,i)=>(
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-card border border-cream-200/40 hover:-translate-y-1 transition-transform">
              {/* Portfolio preview */}
              <div className="grid grid-cols-3 h-28">
                {[0,1,2].map(j=>(
                  <ArtTile key={j} bg={['#E8C4B8','#C4C8E8','#C4D4C0','#E8D8B8','#D4C0E8','#B8DDE0'][i*3%6+j%3]} variant={(i+j)%6} style={{borderRadius:0,height:'100%'}}/>
                ))}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div style={{borderRadius:'50%',overflow:'hidden',flexShrink:0}}><c.Av size={38}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-espresso">{c.name}</div>
                    <div className="text-xs text-espresso/50 truncate">{c.role} · {c.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-espresso">{c.price}</div>
                    <div className="text-xs text-espresso/50">/ session</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span style={{background:c.tagBg,color:c.tagC,fontSize:10,padding:'3px 9px',borderRadius:999,fontWeight:600}}>{c.tag}</span>
                  <div className="flex items-center gap-1 text-xs text-espresso/60">
                    <Ico.Star style={{width:10,height:10,color:'#C8A040'}}/>{c.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={APP_URL} className="inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
            Explore All Creatives <Ico.Arrow className="w-4 h-4"/>
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Shared Vision ─────────────────────────────────────────────
function SharedVision() {
  const aesthetics = [
    {label:'Golden Hour',     bg:'#F5E6C0', c:'#6A4A10', tiles:['#E8C090','#D4A870','#F0D4A0']},
    {label:'Editorial',       bg:'#C8D4E8', c:'#1A3A6A', tiles:['#A0B4D0','#8898B8','#B8C8E0']},
    {label:'Soft & Dreamy',   bg:'#EDD8E8', c:'#5A2A6A', tiles:['#D8B8D8','#C4A0C4','#E8CCE8']},
    {label:'Clean & Minimal', bg:'#D8E8D8', c:'#1A5A2A', tiles:['#B8D0B8','#A0C0A0','#C8DCC8']},
    {label:'Luxury',          bg:'#D8D4C0', c:'#4A3A10', tiles:['#C0B898','#A89870','#D4C4A8']},
    {label:'Bold & Vivid',    bg:'#E8C8B8', c:'#6A2A10', tiles:['#D0A090','#B88070','#E4B8A8']},
  ]
  return (
    <section className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Shared Vision</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">find someone who sees what you see.</h2>
            <p className="mt-5 text-espresso/60 text-base leading-relaxed max-w-lg">Every creative on Vision is tagged by aesthetic — so you can search by vibe, not just job title. Find a Golden Hour photographer. A minimalist brand designer. A bold editorial stylist.</p>
            <p className="mt-4 text-espresso/60 text-base leading-relaxed max-w-lg">Your creative vision deserves someone who already gets it.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {aesthetics.map(({label,bg,c})=>(
                <span key={label} style={{background:bg,color:c,fontSize:12,padding:'6px 14px',borderRadius:999,fontWeight:600}}>{label}</span>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Find Your Aesthetic <Ico.Arrow className="w-4 h-4"/>
            </a>
          </div>
          {/* Aesthetic moodboard grid */}
          <div className="grid grid-cols-3 gap-3">
            {aesthetics.map(({label,tiles,bg,c},i)=>(
              <div key={i} className="flex flex-col gap-2">
                {tiles.map((t,j)=>(
                  <ArtTile key={j} bg={t} variant={(i+j)%6} style={{aspectRatio: j===1?'1/1.2':'1/1', borderRadius:14}}/>
                ))}
                <span style={{background:bg,color:c,fontSize:9,padding:'3px 8px',borderRadius:999,fontWeight:600,textAlign:'center'}}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const [tab, setTab] = useState('hire')
  const steps = {
    hire: [
      {n:'01', t:'Browse & discover',       d:'Search by aesthetic, category, location, and price. Filter to find creatives who match your exact vision.',           bg:'#FAF4D6', tc:'#6A5010'},
      {n:'02', t:'View portfolios & packages',d:'See real work, transparent pricing, open availability — all in one clean profile. No DM guessing game.',            bg:'#E2EEF6', tc:'#1A4A6A'},
      {n:'03', t:'Book, collaborate & pay', d:'Send a request, chat in-app, confirm the details. Pay securely through Stripe. Done in minutes.',                     bg:'#E6F0E6', tc:'#2A5A2A'},
    ],
    create: [
      {n:'01', t:'Build your creative profile', d:'Showcase your portfolio, style tags, location, and packages. Make your aesthetic the first thing they see.',      bg:'#FBE9D6', tc:'#7A3A10'},
      {n:'02', t:'Get discovered & hired',       d:'Clients search by vibe. Your aesthetic tags and portfolio do the selling — no cold pitching, no chasing leads.',  bg:'#EDE6F5', tc:'#4A2A7A'},
      {n:'03', t:'Collaborate & get paid',       d:'Accept bookings, message clients in-app, and receive direct deposits via Stripe Connect. Build your creative business.', bg:'#D6EEE8', tc:'#1A5A48'},
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
            {[['hire','Hiring'],['create','Creating']].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab===k?'bg-espresso text-cream-50':'text-espresso/60'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps[tab].map((s,i)=>(
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/50">
              <span className="inline-block font-bold text-xl px-3 py-1.5 rounded-xl" style={{background:s.bg,color:s.tc}}>{s.n}</span>
              <h3 className="mt-5 font-bold text-lg text-espresso">{s.t}</h3>
              <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── App showcase — phones ─────────────────────────────────────
function AppShowcase() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The App</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">book & collaborate without the back-and-forth.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Browse portfolios, send project requests, message in-app, and pay — all in one clean flow.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 items-start justify-center">
          {[
            {Phone:DiscoverPhone, label:'Discover Creatives', bg:'#E6F0E6', tc:'#2A5A2A'},
            {Phone:ProfilePhone,  label:'View Profiles',      bg:'#FAF4D6', tc:'#6A5010'},
            {Phone:ChatPhone,     label:'Collaborate & Book', bg:'#EDE6F5', tc:'#4A2A7A'},
          ].map(({Phone,label,bg,tc},i)=>(
            <div key={i} className="flex flex-col items-center gap-4 flex-1">
              <Phone/>
              <span style={{background:bg,color:tc,fontSize:12,fontWeight:700,padding:'5px 16px',borderRadius:999}}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── For Creatives ─────────────────────────────────────────────
function ForCreatives() {
  return (
    <section id="creatives" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: portfolio mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <ArtTile bg="#E8C4B8" variant={0} style={{aspectRatio:'3/4',borderRadius:20}}/>
              <ArtTile bg="#C4D4C0" variant={1} style={{aspectRatio:'4/3',borderRadius:20}}/>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <ArtTile bg="#C4C8E8" variant={2} style={{aspectRatio:'4/3',borderRadius:20}}/>
              <ArtTile bg="#E8D8B8" variant={3} style={{aspectRatio:'3/4',borderRadius:20}}/>
            </div>
          </div>
          {/* Right: copy */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">For Creatives</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">get paid for your creative vision.</h2>
            <p className="mt-4 text-espresso/60 text-base leading-relaxed">Vision is built for creatives who are serious about their work. Build a profile that shows your aesthetic, set your packages, and let clients come to you.</p>
            <div className="mt-8 space-y-5">
              {[
                {icon:Ico.Palette,  t:'Showcase your aesthetic',     d:'Upload portfolio work with style tags. Your visual identity is your pitch.',  bg:'#FBE9D6', ic:'#7A3A10'},
                {icon:Ico.Layers,   t:'List packages & set your price',d:'Create clear, bookable packages. Clients know exactly what they\'re getting.', bg:'#E6F0E6', ic:'#2A5A2A'},
                {icon:Ico.Calendar, t:'Control your availability',   d:'Set weekly slots and toggle instant booking. You decide when and how you work.', bg:'#EDE6F5', ic:'#4A2A7A'},
                {icon:Ico.Sparkle,  t:'Get paid directly',           d:'Stripe Connect deposits straight to your bank. Track earnings in one dashboard.', bg:'#E2EEF6', ic:'#1A4A6A'},
              ].map(({icon:I,t,d,bg,ic},i)=>(
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:bg}}>
                    <I style={{width:18,height:18,color:ic}}/>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-espresso">{t}</div>
                    <div className="text-sm text-espresso/60 mt-0.5 leading-relaxed">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={APP_URL} className="mt-9 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Become a Creative <Ico.Arrow className="w-4 h-4"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Trust & Platform ──────────────────────────────────────────
function TrustSection() {
  const features = [
    {icon:Ico.Eye,      t:'Aesthetic-first discovery',  d:'Search by style, not just job title.',              bg:'#FAF4D6', ic:'#6A5010'},
    {icon:Ico.Layers,   t:'Clear packages & pricing',   d:'No DMs to get a rate. Everything upfront.',         bg:'#E2EEF6', ic:'#1A4A6A'},
    {icon:Ico.Calendar, t:'Real-time availability',      d:'See open slots and book without the wait.',         bg:'#E6F0E6', ic:'#2A5A2A'},
    {icon:Ico.Chat,     t:'In-app collaboration',        d:'Message, align, and confirm in one thread.',        bg:'#EDE6F5', ic:'#4A2A7A'},
    {icon:Ico.Sparkle,  t:'Stripe-secured payments',     d:'Safe checkout for clients, direct pay for creatives.', bg:'#FBE9E9', ic:'#7A2A2A'},
    {icon:Ico.Star,     t:'Ratings & reviews',           d:'Build trust through verified client feedback.',     bg:'#D6EEE8', ic:'#1A5A48'},
    {icon:Ico.User,     t:'Verified creative profiles',  d:'Real portfolios. Real people. Real work.',          bg:'#FBE9D6', ic:'#7A3A10'},
    {icon:Ico.Download, t:'PWA — no app store needed',   d:'Install directly from your browser, any device.',  bg:'#E2EEF6', ic:'#1A4A6A'},
  ]
  return (
    <section className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The Platform</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">built for the way creative work actually happens.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f,i)=>(
            <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{background:f.bg}}>
                <f.icon style={{width:20,height:20,color:f.ic}}/>
              </div>
              <h3 className="mt-4 font-bold text-sm text-espresso">{f.t}</h3>
              <p className="mt-1.5 text-espresso/60 text-xs leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PWA Install ───────────────────────────────────────────────
function PWA() {
  return (
    <section id="download" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="bg-espresso rounded-[2.5rem] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{background:'#F2C4A0',filter:'blur(60px)'}}/>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{background:'#B8C8E8',filter:'blur(60px)'}}/>
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{background:'rgba(248,242,232,0.12)',color:'#F8F2E8'}}>
              <Ico.Download style={{width:12,height:12}}/> Progressive Web App
            </span>
            <h2 className="text-cream-50 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Vision lives in your pocket.</h2>
            <p className="mt-5 text-cream-50/65 text-base leading-relaxed max-w-lg">Install Vision directly from your browser — no App Store, no friction. Add it to your home screen and it feels exactly like a native app.</p>
            <div className="mt-8 flex flex-col gap-3">
              {[
                {n:'1', t:'Open joinvision.app in Safari or Chrome', bg:'#FBE9D6', c:'#7A3A10'},
                {n:'2', t:'Tap Share → "Add to Home Screen"',        bg:'#E6F0E6', c:'#2A5A2A'},
                {n:'3', t:'Launch from your home screen anytime',    bg:'#E2EEF6', c:'#1A4A6A'},
              ].map(s=>(
                <div key={s.n} className="flex items-center gap-3">
                  <span style={{background:s.bg,color:s.c,fontWeight:700,fontSize:11,width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{s.n}</span>
                  <span className="text-cream-50/75 text-sm">{s.t}</span>
                </div>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-cream-50 text-espresso px-6 py-3.5 rounded-full font-semibold hover:bg-cream-100 transition-colors">
              Open Vision App <Ico.Arrow className="w-4 h-4"/>
            </a>
          </div>
          {/* Mini phone */}
          <div className="flex justify-center lg:justify-end">
            <div style={{width:160}}>
              <div style={{background:'#3A2A1A',borderRadius:32,padding:7,boxShadow:'0 20px 40px rgba(0,0,0,0.4)'}}>
                <div style={{background:'#F8F2E8',borderRadius:26,padding:18,display:'flex',flexDirection:'column',alignItems:'center',minHeight:270}}>
                  <div style={{width:50,height:50,borderRadius:14,background:'#2C1A0E',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                    <span style={{color:'#F8F2E8',fontSize:22,fontWeight:800,letterSpacing:'0.05em'}}>V</span>
                  </div>
                  <p style={{fontSize:7,letterSpacing:'0.28em',fontWeight:700,color:'#2C1A0E',marginBottom:2}}>V I S I O N</p>
                  <p style={{fontSize:7,color:'rgba(44,26,14,0.5)',marginBottom:16}}>Creative Marketplace</p>
                  <div style={{width:'100%',display:'flex',flexDirection:'column',gap:6}}>
                    {[100,80,60].map((w,i)=><div key={i} style={{height:6,background:'#EFE5D4',borderRadius:8,width:`${w}%`}}/>)}
                  </div>
                  <div style={{marginTop:16,display:'flex',gap:8,width:'100%',justifyContent:'center'}}>
                    {[Avatar.Zoe,Avatar.Marcus,Avatar.Sofia].map((Av,i)=>(
                      <div key={i} style={{borderRadius:'50%',overflow:'hidden',outline:'2px solid #F8F2E8'}}><Av size={28}/></div>
                    ))}
                  </div>
                  <button style={{marginTop:14,background:'#2C1A0E',color:'#F8F2E8',border:'none',borderRadius:18,padding:'6px 18px',fontSize:8,fontWeight:700,cursor:'pointer'}}>Install App</button>
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
    <section className="py-20 sm:py-32 relative overflow-hidden" style={{background:'#FDFAF5'}}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-25" style={{background:'#F2C4A0',filter:'blur(80px)'}}/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-20" style={{background:'#B8C8E8',filter:'blur(80px)'}}/>
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-15" style={{background:'#C8B8E0',filter:'blur(70px)'}}/>
      </div>
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Join Vision</span>
        <h2 className="mt-4 text-espresso text-3xl sm:text-5xl font-bold leading-tight">bring your vision to life.</h2>
        <p className="mt-5 text-espresso/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Whether you're hiring a creative or ready to share your own — Vision is where it starts.
        </p>
        {/* Audience pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            {l:'Photographers',    bg:'#FAF4D6', c:'#6A5010'},
            {l:'Videographers',    bg:'#E2EEF6', c:'#1A4A6A'},
            {l:'Stylists',         bg:'#E6F0E6', c:'#2A5A2A'},
            {l:'Designers',        bg:'#EDE6F5', c:'#4A2A7A'},
            {l:'Creative Directors',bg:'#FBE9E9', c:'#7A2A2A'},
            {l:'Makeup Artists',   bg:'#D6EEE8', c:'#1A5A48'},
            {l:'Content Creators', bg:'#FBE9D6', c:'#7A3A10'},
            {l:'Brands & Clients', bg:'#E2EEF6', c:'#1A4A6A'},
          ].map(({l,bg,c})=>(
            <span key={l} style={{background:bg,color:c,fontSize:12,padding:'5px 14px',borderRadius:999,fontWeight:600}}>{l}</span>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <a href={APP_URL} className="inline-flex items-center justify-center gap-2 bg-espresso text-cream-50 px-8 py-4 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft text-base">
            Explore Creatives <Ico.Arrow className="w-4 h-4"/>
          </a>
          <a href={APP_URL} className="inline-flex items-center justify-center bg-white border border-cream-200 text-espresso px-8 py-4 rounded-full font-semibold hover:bg-cream-50 transition-colors text-base">
            Become a Creative
          </a>
        </div>
        {/* Avatar row */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <div className="flex -space-x-2">
            {Object.values(Avatar).map((Av,i)=>(
              <div key={i} style={{borderRadius:'50%',overflow:'hidden',outline:'2px solid #F8F2E8'}}><Av size={34}/></div>
            ))}
          </div>
          <p className="text-sm text-espresso/50 font-medium text-left">Creatives ready<br/>to collaborate</p>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-cream-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-4 gap-8 items-start">
        <div className="sm:col-span-2">
          <p className="font-bold tracking-vision text-espresso text-sm">V I S I O N</p>
          <p className="mt-3 text-espresso/55 text-sm max-w-xs leading-relaxed">A modern creative marketplace — discover, collaborate with, and hire creatives for content, branding, events, and everything in between.</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[{l:'Photography',bg:'#FAF4D6',c:'#6A5010'},{l:'Styling',bg:'#E6F0E6',c:'#2A5A2A'},{l:'Branding',bg:'#E2EEF6',c:'#1A4A6A'},{l:'Content',bg:'#EDE6F5',c:'#4A2A7A'}].map(({l,bg,c})=>(
              <span key={l} style={{background:bg,color:c,fontSize:10,padding:'3px 10px',borderRadius:999,fontWeight:600}}>{l}</span>
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
          <a href="#discover"  className="hover:text-espresso transition-colors">Discover Creatives</a>
          <a href="#how"       className="hover:text-espresso transition-colors">How it Works</a>
          <a href="#creatives" className="hover:text-espresso transition-colors">For Creatives</a>
          <a href="#download"  className="hover:text-espresso transition-colors">Install App</a>
        </div>
      </div>
      <div className="border-t border-cream-200/70 py-5 px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-espresso/40">
        <span>© {new Date().getFullYear()} Vision. All rights reserved.</span>
        <span>Stripe-secured payments · Built for PWA access</span>
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
        <Categories/>
        <DiscoverSection/>
        <SharedVision/>
        <HowItWorks/>
        <AppShowcase/>
        <ForCreatives/>
        <TrustSection/>
        <PWA/>
        <FinalCTA/>
      </main>
      <Footer/>
    </div>
  )
}
