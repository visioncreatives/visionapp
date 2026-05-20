import React, { useState } from 'react'

// ============================================================
// REPLACE THIS URL WITH YOUR LOVABLE APP / PWA URL
// Example: const APP_URL = "https://your-app.lovable.app"
// ============================================================
const APP_URL = "https://app.joinvision.app"

// ── Inline SVG icons ──────────────────────────────────────────
const Ico = {
  Home:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12 12 4l9 8"/><path d="M5 10v10h5v-5h4v5h5V10"/></svg>,
  Search:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Chat:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>,
  User:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  Plus:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Calendar: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Star:     p => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.8.7-5 4.7 1.4 6.7L12 17l-6.1 3.4 1.4-6.7-5-4.7 6.8-.7L12 2Z"/></svg>,
  Package:  p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="m3 7 9 4 9-4M12 11v10M3 7v10l9 4M21 7v10l-9 4"/></svg>,
  Tag:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2H7a2 2 0 0 0-2 2v5l7 7 7-7-5-5a2 2 0 0 0-2-2Z"/><path d="M7 7h.01"/></svg>,
  Stripe:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  Lock:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Grid:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  Bookmark: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>,
  Download: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>,
  Dollar:   p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Map:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2"/></svg>,
  Arrow:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>,
  Menu:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  Close:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  Check:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  Lightning:p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>,
}

// ── Pixar-style cartoon avatar portraits ──────────────────────
// Large round heads, big colored irises, small noses, wide smiles
// Diverse cast: East Asian woman, Black man, Latina woman, Japanese woman, mixed-heritage person
const Avatar = {

  // Zoe — East Asian woman, peach skin, dark brown hair with bangs, warm peach bg
  Zoe: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="#FADADC"/>
      {/* Neck + shirt */}
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#F4A261"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#F4A261"/>
      {/* Neck */}
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#F7C59F"/>
      {/* Head — big Pixar round */}
      <ellipse cx="50" cy="52" rx="28" ry="30" fill="#F7C59F"/>
      {/* Ears */}
      <ellipse cx="22" cy="53" rx="5" ry="7" fill="#F0B88A"/>
      <ellipse cx="78" cy="53" rx="5" ry="7" fill="#F0B88A"/>
      {/* Hair back */}
      <ellipse cx="50" cy="34" rx="29" ry="22" fill="#2D1B0E"/>
      {/* Hair sides */}
      <ellipse cx="21" cy="52" rx="7" ry="14" fill="#2D1B0E"/>
      <ellipse cx="79" cy="52" rx="7" ry="14" fill="#2D1B0E"/>
      {/* Hair top */}
      <ellipse cx="50" cy="26" rx="28" ry="16" fill="#3D2512"/>
      {/* Bangs */}
      <path d="M22 38 Q36 48 50 40 Q64 48 78 38 Q72 24 50 22 Q28 24 22 38Z" fill="#2D1B0E"/>
      {/* White eyes — large cartoon circles */}
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      {/* Iris — warm brown */}
      <circle cx="38" cy="54" r="5.5" fill="#6B3A2A"/>
      <circle cx="62" cy="54" r="5.5" fill="#6B3A2A"/>
      {/* Pupils */}
      <circle cx="38" cy="54" r="3" fill="#1A0D06"/>
      <circle cx="62" cy="54" r="3" fill="#1A0D06"/>
      {/* Eye shine — two dots for Pixar sparkle */}
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      {/* Eyebrows — soft arched */}
      <path d="M30 43 Q38 39 46 43" stroke="#2D1B0E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M54 43 Q62 39 70 43" stroke="#2D1B0E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* Nose — tiny button */}
      <ellipse cx="50" cy="63" rx="3" ry="2" fill="#E8A882" opacity="0.8"/>
      {/* Smile with teeth — wide Pixar grin */}
      <path d="M36 70 Q50 78 64 70" fill="#C0392B" stroke="none"/>
      <path d="M36 70 Q50 72 64 70" fill="white" stroke="none"/>
      <path d="M36 70 Q50 78 64 70" fill="none" stroke="#A0281E" strokeWidth="1"/>
      {/* Blush cheeks */}
      <ellipse cx="26" cy="62" rx="7" ry="4" fill="#F4908A" opacity="0.35"/>
      <ellipse cx="74" cy="62" rx="7" ry="4" fill="#F4908A" opacity="0.35"/>
    </svg>
  ),

  // Marcus — Black man, rich brown skin, short natural hair, blue bg
  Marcus: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#B8D4E8"/>
      {/* Shirt */}
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#3A7BD5"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#3A7BD5"/>
      {/* Neck */}
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#7A4A28"/>
      {/* Head */}
      <ellipse cx="50" cy="52" rx="28" ry="30" fill="#8B5030"/>
      {/* Ears */}
      <ellipse cx="22" cy="53" rx="5" ry="7" fill="#7A4020"/>
      <ellipse cx="78" cy="53" rx="5" ry="7" fill="#7A4020"/>
      {/* Hair — short natural texture, soft bumpy top */}
      <ellipse cx="50" cy="28" rx="27" ry="18" fill="#1A0D06"/>
      <circle cx="33" cy="27" r="8" fill="#1A0D06"/>
      <circle cx="40" cy="22" r="9" fill="#1A0D06"/>
      <circle cx="50" cy="20" r="10" fill="#1A0D06"/>
      <circle cx="60" cy="22" r="9" fill="#1A0D06"/>
      <circle cx="67" cy="27" r="8" fill="#1A0D06"/>
      {/* White eyes */}
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      {/* Iris — dark hazel */}
      <circle cx="38" cy="54" r="5.5" fill="#3D2010"/>
      <circle cx="62" cy="54" r="5.5" fill="#3D2010"/>
      {/* Pupils */}
      <circle cx="38" cy="54" r="3" fill="#0D0806"/>
      <circle cx="62" cy="54" r="3" fill="#0D0806"/>
      {/* Eye shine */}
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      {/* Eyebrows — thick, expressive */}
      <path d="M29 43 Q38 38 46 42" stroke="#0D0806" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M54 42 Q62 38 71 43" stroke="#0D0806" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M44 63 Q47 68 50 67 Q53 68 56 63" fill="none" stroke="#5A2A10" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="45.5" cy="65" rx="3" ry="2.5" fill="#5A2A10" opacity="0.35"/>
      <ellipse cx="54.5" cy="65" rx="3" ry="2.5" fill="#5A2A10" opacity="0.35"/>
      {/* Big smile with teeth */}
      <path d="M35 71 Q50 81 65 71" fill="#8B1A10" stroke="none"/>
      <path d="M35 71 Q50 74 65 71" fill="white" stroke="none"/>
      <path d="M35 71 Q50 81 65 71" fill="none" stroke="#6A1508" strokeWidth="1"/>
      {/* Blush */}
      <ellipse cx="25" cy="63" rx="7" ry="4" fill="#C06840" opacity="0.25"/>
      <ellipse cx="75" cy="63" rx="7" ry="4" fill="#C06840" opacity="0.25"/>
    </svg>
  ),

  // Sofia — Latina woman, warm medium skin, wavy auburn hair, mint bg
  Sofia: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#D4EDE4"/>
      {/* Shirt */}
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#E8608A"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#E8608A"/>
      {/* Neck */}
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#D4916A"/>
      {/* Hair back — wavy, falls behind head */}
      <ellipse cx="50" cy="44" rx="33" ry="32" fill="#7B3F1A"/>
      <path d="M18 50 Q10 65 16 82" stroke="#7B3F1A" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <path d="M82 50 Q90 65 84 82" stroke="#7B3F1A" strokeWidth="14" fill="none" strokeLinecap="round"/>
      {/* Head */}
      <ellipse cx="50" cy="53" rx="27" ry="29" fill="#DDA07A"/>
      {/* Ears */}
      <ellipse cx="23" cy="53" rx="5" ry="7" fill="#CD9068"/>
      <ellipse cx="77" cy="53" rx="5" ry="7" fill="#CD9068"/>
      {/* Hair top — wavy front */}
      <ellipse cx="50" cy="29" rx="29" ry="18" fill="#8B4820"/>
      <path d="M21 40 Q30 52 42 44 Q50 40 58 44 Q70 52 79 40 Q70 20 50 18 Q30 20 21 40Z" fill="#7B3F1A"/>
      {/* Wavy side strands */}
      <path d="M21 45 Q14 58 18 74" stroke="#7B3F1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M79 45 Q86 58 82 74" stroke="#7B3F1A" strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* White eyes */}
      <ellipse cx="38" cy="53" rx="8" ry="9" fill="white"/>
      <ellipse cx="62" cy="53" rx="8" ry="9" fill="white"/>
      {/* Iris — warm dark brown */}
      <circle cx="38" cy="54" r="5.5" fill="#5C3010"/>
      <circle cx="62" cy="54" r="5.5" fill="#5C3010"/>
      <circle cx="38" cy="54" r="3" fill="#1A0806"/>
      <circle cx="62" cy="54" r="3" fill="#1A0806"/>
      <circle cx="40" cy="52" r="1.6" fill="white"/>
      <circle cx="64" cy="52" r="1.6" fill="white"/>
      <circle cx="36.5" cy="55.5" r="0.8" fill="white"/>
      <circle cx="60.5" cy="55.5" r="0.8" fill="white"/>
      {/* Eyebrows — arched, expressive */}
      <path d="M29 43 Q38 38 46 42" stroke="#5C2A08" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M54 42 Q62 38 71 43" stroke="#5C2A08" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <ellipse cx="50" cy="64" rx="3" ry="2" fill="#C07850" opacity="0.7"/>
      {/* Wide smile with teeth */}
      <path d="M35 71 Q50 80 65 71" fill="#B03060" stroke="none"/>
      <path d="M35 71 Q50 74 65 71" fill="white" stroke="none"/>
      <path d="M35 71 Q50 80 65 71" fill="none" stroke="#902848" strokeWidth="1"/>
      {/* Blush */}
      <ellipse cx="25" cy="63" rx="7" ry="4" fill="#E8706A" opacity="0.3"/>
      <ellipse cx="75" cy="63" rx="7" ry="4" fill="#E8706A" opacity="0.3"/>
    </svg>
  ),

  // Ava — Japanese woman, light skin, sleek black hair, lilac bg
  Ava: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#DDD0F0"/>
      {/* Shirt */}
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#9B59B6"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#9B59B6"/>
      {/* Neck */}
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#F0D0B0"/>
      {/* Hair back — long straight */}
      <rect x="17" y="28" width="66" height="60" rx="10" fill="#1A0D06"/>
      {/* Head */}
      <ellipse cx="50" cy="51" rx="27" ry="29" fill="#F2D8B8"/>
      {/* Ears */}
      <ellipse cx="23" cy="51" rx="5" ry="7" fill="#E8C8A0"/>
      <ellipse cx="77" cy="51" rx="5" ry="7" fill="#E8C8A0"/>
      {/* Hair top — smooth, centre part */}
      <path d="M18 38 Q50 18 82 38 Q80 22 50 18 Q20 22 18 38Z" fill="#1A0D06"/>
      <ellipse cx="50" cy="26" rx="28" ry="12" fill="#1A0D06"/>
      {/* Straight bangs with curve */}
      <path d="M22 38 Q36 46 50 40 Q64 46 78 38 Q72 26 50 24 Q28 26 22 38Z" fill="#1A0D06"/>
      {/* White eyes — slightly wider, anime-ish */}
      <ellipse cx="37" cy="52" rx="9" ry="10" fill="white"/>
      <ellipse cx="63" cy="52" rx="9" ry="10" fill="white"/>
      {/* Iris — rich dark brown with hint of warmth */}
      <circle cx="37" cy="53" r="6.5" fill="#4A2810"/>
      <circle cx="63" cy="53" r="6.5" fill="#4A2810"/>
      <circle cx="37" cy="53" r="3.5" fill="#0D0806"/>
      <circle cx="63" cy="53" r="3.5" fill="#0D0806"/>
      <circle cx="39.5" cy="51" r="2" fill="white"/>
      <circle cx="65.5" cy="51" r="2" fill="white"/>
      <circle cx="35" cy="55" r="1" fill="white"/>
      <circle cx="61" cy="55" r="1" fill="white"/>
      {/* Thin elegant eyebrows */}
      <path d="M28 41 Q37 37 46 41" stroke="#1A0D06" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M54 41 Q63 37 72 41" stroke="#1A0D06" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Small nose */}
      <path d="M48 63 Q50 66 52 63" stroke="#D0A880" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Smile — sweet closed-mouth Pixar smile */}
      <path d="M37 70 Q50 79 63 70" fill="#C0506A" stroke="none"/>
      <path d="M37 70 Q50 73 63 70" fill="white" stroke="none"/>
      <path d="M37 70 Q50 79 63 70" fill="none" stroke="#A03858" strokeWidth="1"/>
      {/* Soft blush */}
      <ellipse cx="25" cy="61" rx="7" ry="4" fill="#F4A0A0" opacity="0.28"/>
      <ellipse cx="75" cy="61" rx="7" ry="4" fill="#F4A0A0" opacity="0.28"/>
    </svg>
  ),

  // Kai — mixed heritage, warm olive skin, big curly hair, teal bg
  Kai: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#A8D8C8"/>
      {/* Shirt */}
      <ellipse cx="50" cy="96" rx="28" ry="14" fill="#2ECC71"/>
      <rect x="28" y="82" width="44" height="20" rx="8" fill="#2ECC71"/>
      {/* Neck */}
      <rect x="40" y="68" width="20" height="16" rx="6" fill="#C8985A"/>
      {/* Curly hair back — big cloud of curls */}
      <circle cx="50" cy="24" r="26" fill="#2A1408"/>
      <circle cx="30" cy="30" r="16" fill="#2A1408"/>
      <circle cx="70" cy="30" r="16" fill="#2A1408"/>
      <circle cx="20" cy="44" r="13" fill="#2A1408"/>
      <circle cx="80" cy="44" r="13" fill="#2A1408"/>
      <circle cx="38" cy="18" r="13" fill="#2A1408"/>
      <circle cx="62" cy="18" r="13" fill="#2A1408"/>
      {/* Head */}
      <ellipse cx="50" cy="53" rx="27" ry="28" fill="#CFA070"/>
      {/* Ears */}
      <ellipse cx="23" cy="53" rx="5" ry="7" fill="#BF9060"/>
      <ellipse cx="77" cy="53" rx="5" ry="7" fill="#BF9060"/>
      {/* Hair front curls framing face */}
      <circle cx="22" cy="42" r="10" fill="#2A1408"/>
      <circle cx="78" cy="42" r="10" fill="#2A1408"/>
      <circle cx="32" cy="30" r="11" fill="#2A1408"/>
      <circle cx="68" cy="30" r="11" fill="#2A1408"/>
      <ellipse cx="50" cy="28" rx="24" ry="14" fill="#2A1408"/>
      {/* White eyes — big and expressive */}
      <ellipse cx="38" cy="53" rx="9" ry="10" fill="white"/>
      <ellipse cx="62" cy="53" rx="9" ry="10" fill="white"/>
      {/* Iris — warm hazel green */}
      <circle cx="38" cy="54" r="6" fill="#5A7A30"/>
      <circle cx="62" cy="54" r="6" fill="#5A7A30"/>
      <circle cx="38" cy="54" r="3.2" fill="#1A0D06"/>
      <circle cx="62" cy="54" r="3.2" fill="#1A0D06"/>
      <circle cx="40.5" cy="52" r="1.8" fill="white"/>
      <circle cx="64.5" cy="52" r="1.8" fill="white"/>
      <circle cx="36.5" cy="56" r="0.9" fill="white"/>
      <circle cx="60.5" cy="56" r="0.9" fill="white"/>
      {/* Bold eyebrows */}
      <path d="M28 43 Q38 38 47 42" stroke="#1A0D06" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M53 42 Q62 38 72 43" stroke="#1A0D06" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <ellipse cx="50" cy="64" rx="3.5" ry="2.5" fill="#A07040" opacity="0.6"/>
      {/* Big Pixar smile — dimples too */}
      <path d="M34 72 Q50 83 66 72" fill="#8B3A1A" stroke="none"/>
      <path d="M34 72 Q50 75 66 72" fill="white" stroke="none"/>
      <path d="M34 72 Q50 83 66 72" fill="none" stroke="#6A2A10" strokeWidth="1"/>
      {/* Dimples */}
      <circle cx="32" cy="72" r="2" fill="#A07040" opacity="0.35"/>
      <circle cx="68" cy="72" r="2" fill="#A07040" opacity="0.35"/>
      {/* Blush */}
      <ellipse cx="24" cy="63" rx="7" ry="4" fill="#E09060" opacity="0.28"/>
      <ellipse cx="76" cy="63" rx="7" ry="4" fill="#E09060" opacity="0.28"/>
    </svg>
  ),
}

// ── Pastel pill tag helper ────────────────────────────────────
const TAG_COLORS = {
  'CREATIVE':   { bg: '#FBE9D6', text: '#7A3A10' },
  'PERSONAL':   { bg: '#E2EEF6', text: '#1A4A6A' },
  'Golden Hour':{ bg: '#FAF4D6', text: '#6A5010' },
  'Editorial':  { bg: '#E2EEF6', text: '#1A4A6A' },
  'Casual':     { bg: '#E6F0E6', text: '#2A5A2A' },
  'Luxury':     { bg: '#EDE6F5', text: '#4A2A7A' },
  'Events':     { bg: '#FBE9E9', text: '#7A2A2A' },
  'Candid':     { bg: '#D6EEE8', text: '#1A5A48' },
  'Branding':   { bg: '#FAF4D6', text: '#6A5010' },
  'Filled':     { bg: '#FBE9D6', text: '#7A3A10' },
}
function Pill({ label, size = 'sm' }) {
  const c = TAG_COLORS[label] || { bg: '#E8E8E8', text: '#444' }
  const px = size === 'xs' ? '4px 9px' : '5px 12px'
  const fs = size === 'xs' ? '9px' : '11px'
  return (
    <span style={{ background: c.bg, color: c.text, padding: px, fontSize: fs, borderRadius: 999, fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.02em', display:'inline-block' }}>
      {label}
    </span>
  )
}

// ── Creator data ──────────────────────────────────────────────
const CREATORS = [
  { name: 'Zoe Chen',      AvatarCmp: Avatar.Zoe,    handle: '@zoechen',    role: 'CREATIVE', location: 'Los Angeles',    price: '$120', tag: 'Golden Hour', rating: '4.9', posts: 34, bookings: 89  },
  { name: 'Marcus Ali',    AvatarCmp: Avatar.Marcus,  handle: '@marcusali',  role: 'CREATIVE', location: 'New York',       price: '$200', tag: 'Editorial',   rating: '5.0', posts: 21, bookings: 52  },
  { name: 'Sofia Reyes',   AvatarCmp: Avatar.Sofia,   handle: '@sofiareyes', role: 'CREATIVE', location: 'Miami',          price: '$95',  tag: 'Casual',      rating: '4.8', posts: 47, bookings: 130 },
  { name: 'Ava Nakamura',  AvatarCmp: Avatar.Ava,     handle: '@avanaka',    role: 'CREATIVE', location: 'San Francisco',  price: '$175', tag: 'Luxury',      rating: '5.0', posts: 18, bookings: 44  },
  { name: 'Kai Williams',  AvatarCmp: Avatar.Kai,     handle: '@kaiwill',    role: 'CREATIVE', location: 'Portland',       price: '$110', tag: 'Candid',      rating: '4.9', posts: 29, bookings: 71  },
]

const LISTINGS = [
  { title: 'Golden Hour Portrait', location: 'Malibu, CA',       price: '$120', tag: 'Candid',    tileBg: '#F0DFA0', time: 'Jun 14, 3:00 PM'  },
  { title: 'Brand Content Day',    location: 'DTLA, CA',         price: '$350', tag: 'Editorial', tileBg: '#B8D4E8', time: 'Jun 20, 10:00 AM' },
  { title: 'Bridal Shower Shoot',  location: 'Pasadena, CA',     price: '$180', tag: 'Events',    tileBg: '#F2C4C4', time: 'Jul 5, 1:00 PM'   },
  { title: 'Lifestyle Content',    location: 'Venice Beach, CA', price: '$95',  tag: 'Casual',    tileBg: '#A8D8C8', time: 'Jun 28, 9:00 AM'  },
]

// ── iPhone-proportioned phone shell ───────────────────────────
// Real iPhone 14: 390×844px → ratio ~0.462
// We use 260×520 which nails the same ratio
const PHONE_W = 260
const PHONE_H = 520

function PhoneShell({ children }) {
  return (
    <div style={{ width: PHONE_W, flexShrink: 0 }}>
      <div style={{
        background: '#2C1A0E',
        borderRadius: 40,
        padding: 9,
        boxShadow: '0 24px 48px -12px rgba(44,26,14,0.5)',
      }}>
        {/* Screen */}
        <div style={{
          background: '#F8F2E8',
          borderRadius: 32,
          overflow: 'hidden',
          height: PHONE_H,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* Status bar */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 16px 2px', fontSize:9, color:'rgba(44,26,14,0.5)', fontWeight:600, flexShrink:0 }}>
            <span>9:41</span>
            <span style={{ display:'flex', gap:3 }}>
              <span style={{ width:10, height:5, background:'rgba(44,26,14,0.4)', borderRadius:2 }}/>
              <span style={{ width:10, height:5, background:'rgba(44,26,14,0.4)', borderRadius:2 }}/>
              <span style={{ width:14, height:7, border:'1.5px solid rgba(44,26,14,0.4)', borderRadius:2 }}/>
            </span>
          </div>
          {/* Content fills remaining space, bottom nav always last */}
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Bottom nav — always pinned to bottom of phone ─────────────
function BottomNav({ active = 'home' }) {
  const items = [
    { key:'home',    Ic:Ico.Home,   label:'HOME'    },
    { key:'search',  Ic:Ico.Search, label:'SEARCH'  },
    { key:'plus',    Ic:null,       label:''        },
    { key:'chat',    Ic:Ico.Chat,   label:'CHAT'    },
    { key:'profile', Ic:Ico.User,   label:'PROFILE' },
  ]
  return (
    <div style={{ borderTop:'1px solid rgba(44,26,14,0.08)', background:'white', padding:'6px 4px 8px', display:'flex', alignItems:'center', justifyContent:'space-around', flexShrink:0 }}>
      {items.map(it => {
        if (it.key === 'plus') return (
          <div key="plus" style={{ marginTop:-18 }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'#2C1A0E', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 10px rgba(44,26,14,0.35)' }}>
              <Ico.Plus style={{ width:16, height:16, color:'#F8F2E8' }}/>
            </div>
          </div>
        )
        const on = active === it.key
        return (
          <div key={it.key} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1, flex:1 }}>
            <it.Ic style={{ width:16, height:16, color: on ? '#2C1A0E' : 'rgba(44,26,14,0.28)' }}/>
            <span style={{ fontSize:6, letterSpacing:'0.07em', color: on ? '#2C1A0E' : 'rgba(44,26,14,0.28)', fontWeight: on ? 700 : 400 }}>{it.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Portfolio tile — clean abstract shapes, NO arch shadow ────
function PortfolioTile({ bg, price, variant = 0, style = {} }) {
  // Four distinct abstract compositions, purely geometric
  const shapes = [
    // Circles — golden hour vibe
    <>
      <div style={{ position:'absolute', top:'-20%', right:'-15%', width:'70%', paddingBottom:'70%', borderRadius:'50%', background:'rgba(255,255,255,0.15)' }}/>
      <div style={{ position:'absolute', bottom:'10%', left:'8%', width:'45%', paddingBottom:'45%', borderRadius:'50%', background:'rgba(0,0,0,0.08)' }}/>
      <div style={{ position:'absolute', top:'30%', left:'20%', width:'28%', paddingBottom:'28%', borderRadius:'50%', background:'rgba(255,255,255,0.12)' }}/>
    </>,
    // Diagonal stripe — editorial
    <>
      <div style={{ position:'absolute', top:0, right:0, width:'55%', height:'100%', background:'rgba(255,255,255,0.10)', transform:'skewX(-8deg)', transformOrigin:'top right' }}/>
      <div style={{ position:'absolute', bottom:'15%', left:'10%', width:'40%', height:'3px', background:'rgba(255,255,255,0.25)', borderRadius:2 }}/>
      <div style={{ position:'absolute', bottom:'22%', left:'10%', width:'55%', height:'3px', background:'rgba(255,255,255,0.15)', borderRadius:2 }}/>
    </>,
    // Rounded rect blocks — casual
    <>
      <div style={{ position:'absolute', top:'12%', left:'12%', width:'40%', paddingBottom:'40%', borderRadius:14, background:'rgba(255,255,255,0.14)' }}/>
      <div style={{ position:'absolute', top:'18%', right:'10%', width:'28%', paddingBottom:'28%', borderRadius:10, background:'rgba(0,0,0,0.08)' }}/>
      <div style={{ position:'absolute', bottom:'20%', right:'14%', width:'36%', paddingBottom:'36%', borderRadius:12, background:'rgba(255,255,255,0.10)' }}/>
    </>,
    // Half-circle horizon — luxury
    <>
      <div style={{ position:'absolute', bottom:'-10%', left:'50%', transform:'translateX(-50%)', width:'120%', paddingBottom:'60%', borderRadius:'50% 50% 0 0', background:'rgba(255,255,255,0.12)' }}/>
      <div style={{ position:'absolute', top:'14%', left:'50%', transform:'translateX(-50%)', width:'36%', paddingBottom:'36%', borderRadius:'50%', background:'rgba(255,255,255,0.18)' }}/>
    </>,
  ]
  return (
    <div style={{ background: bg, borderRadius:12, position:'relative', overflow:'hidden', aspectRatio:'3/4', ...style }}>
      {shapes[variant % 4]}
      <span style={{ position:'absolute', bottom:5, left:5, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(4px)', color:'#2C1A0E', fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:999 }}>{price}</span>
    </div>
  )
}

// ── HERO PHONE: creator profile ───────────────────────────────
function HeroPhone() {
  const c = CREATORS[0]
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 14px 6px', flexShrink:0 }}>
        <span style={{ fontSize:8, letterSpacing:'0.22em', fontWeight:700, color:'#2C1A0E' }}>V I S I O N</span>
        <span style={{ fontSize:8, color:'rgba(44,26,14,0.4)' }}>{c.handle}</span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex:1, overflowY:'hidden', padding:'0 12px', display:'flex', flexDirection:'column', gap:8 }}>
        {/* Profile row */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
            <c.AvatarCmp size={46}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:5, flexWrap:'wrap' }}>
              <span style={{ fontWeight:700, fontSize:13, color:'#2C1A0E' }}>{c.name}</span>
              <Pill label={c.role} size="xs"/>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:3, marginTop:2 }}>
              <Ico.Map style={{ width:8, height:8, color:'rgba(44,26,14,0.4)' }}/>
              <span style={{ fontSize:9, color:'rgba(44,26,14,0.5)' }}>{c.location}</span>
            </div>
          </div>
          <button style={{ background:'#2C1A0E', color:'#F8F2E8', border:'none', borderRadius:18, padding:'5px 11px', fontSize:9, fontWeight:700, cursor:'pointer', flexShrink:0 }}>Book</button>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:5 }}>
          {[[c.posts,'POSTS'],['4.9 ★','RATING'],[c.bookings,'BOOKINGS']].map(([v,l])=>(
            <div key={l} style={{ background:'white', borderRadius:10, padding:'6px 4px', textAlign:'center' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#2C1A0E' }}>{v}</div>
              <div style={{ fontSize:7, letterSpacing:'0.06em', color:'rgba(44,26,14,0.45)', marginTop:1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:5 }}>
          {['Portfolio','Packages','Reviews'].map((t,i)=>(
            <span key={t} style={{ fontSize:9, padding:'4px 10px', borderRadius:18, fontWeight:600, background: i===0 ? '#2C1A0E' : 'white', color: i===0 ? '#F8F2E8' : 'rgba(44,26,14,0.5)', border: i===0 ? 'none' : '1px solid rgba(44,26,14,0.1)' }}>{t}</span>
          ))}
        </div>

        {/* Portfolio grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5, flex:1 }}>
          <PortfolioTile bg="#E8B8A8" price="$120" variant={0}/>
          <PortfolioTile bg="#C8D4A0" price="$200" variant={1}/>
          <PortfolioTile bg="#A8C8D0" price="$95"  variant={2}/>
          <PortfolioTile bg="#D4B8E0" price="$180" variant={3}/>
        </div>
      </div>

      <BottomNav active="profile"/>
    </PhoneShell>
  )
}

// ── BROWSE PHONE ──────────────────────────────────────────────
function BrowsePhone() {
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ padding:'4px 14px 6px', textAlign:'center', flexShrink:0 }}>
        <span style={{ fontSize:8, letterSpacing:'0.22em', fontWeight:700, color:'#2C1A0E' }}>V I S I O N</span>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'hidden', padding:'0 12px', display:'flex', flexDirection:'column', gap:7 }}>
        {/* Search bar */}
        <div style={{ background:'white', borderRadius:18, padding:'6px 10px', display:'flex', alignItems:'center', gap:5, border:'1px solid rgba(44,26,14,0.08)' }}>
          <Ico.Search style={{ width:10, height:10, color:'rgba(44,26,14,0.3)' }}/>
          <span style={{ fontSize:9, color:'rgba(44,26,14,0.3)' }}>Search creatives, styles…</span>
        </div>

        {/* Aesthetic pills */}
        <div style={{ display:'flex', gap:4, overflowX:'auto' }} className="no-scrollbar">
          {[{l:'Golden Hour',bg:'#FAF4D6',c:'#6A5010'},{l:'Editorial',bg:'#E2EEF6',c:'#1A4A6A'},{l:'Casual',bg:'#E6F0E6',c:'#2A5A2A'},{l:'Luxury',bg:'#EDE6F5',c:'#4A2A7A'}].map(({l,bg,c})=>(
            <span key={l} style={{ background:bg, color:c, fontSize:8, padding:'3px 9px', borderRadius:18, fontWeight:600, whiteSpace:'nowrap' }}>{l}</span>
          ))}
        </div>

        {/* Creator rows */}
        {CREATORS.slice(0,3).map((cr,i)=>(
          <div key={i} style={{ background:'white', borderRadius:12, padding:'8px 10px', display:'flex', alignItems:'center', gap:9, border:'1px solid rgba(44,26,14,0.06)' }}>
            <div style={{ borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
              <cr.AvatarCmp size={36}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5, flexWrap:'wrap' }}>
                <span style={{ fontWeight:700, fontSize:11, color:'#2C1A0E' }}>{cr.name}</span>
                <span style={{ background: TAG_COLORS[cr.tag]?.bg||'#eee', color: TAG_COLORS[cr.tag]?.text||'#333', fontSize:7, padding:'2px 6px', borderRadius:18, fontWeight:600 }}>{cr.tag}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:3, marginTop:1 }}>
                <Ico.Map style={{ width:7, height:7, color:'rgba(44,26,14,0.4)' }}/>
                <span style={{ fontSize:8, color:'rgba(44,26,14,0.5)' }}>{cr.location}</span>
                <span style={{ marginLeft:4, fontSize:8, color:'rgba(44,26,14,0.45)' }}>★ {cr.rating}</span>
              </div>
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:'#2C1A0E', flexShrink:0 }}>{cr.price}</span>
          </div>
        ))}
      </div>

      <BottomNav active="search"/>
    </PhoneShell>
  )
}

// ── CHAT PHONE ────────────────────────────────────────────────
function ChatPhone() {
  const msgs = [
    { from:'them', text:'Hi! Loved your golden hour work. Are you free June 14?' },
    { from:'me',   text:'Yes, 3–5 PM works! Malibu or Santa Monica?' },
    { from:'them', text:'Malibu! Can we do the 1-hr portrait package?' },
    { from:'me',   text:'Perfect. Booking request sent — $120 all in.' },
    { from:'them', text:'Accepted! So excited 🙌' },
  ]
  return (
    <PhoneShell>
      {/* Chat header */}
      <div style={{ padding:'4px 12px 6px', borderBottom:'1px solid rgba(44,26,14,0.06)', display:'flex', alignItems:'center', gap:7, flexShrink:0 }}>
        <div style={{ borderRadius:'50%', overflow:'hidden' }}>
          <Avatar.Zoe size={28}/>
        </div>
        <div>
          <div style={{ fontWeight:700, fontSize:11, color:'#2C1A0E' }}>Zoe Chen</div>
          <div style={{ fontSize:8, color:'rgba(44,26,14,0.45)' }}>Golden Hour · Los Angeles</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, padding:'8px 10px', display:'flex', flexDirection:'column', gap:6, overflowY:'hidden' }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:'flex', justifyContent: m.from==='me' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth:'78%', padding:'6px 9px', borderRadius: m.from==='me' ? '12px 12px 3px 12px' : '12px 12px 12px 3px', background: m.from==='me' ? '#2C1A0E' : 'white', color: m.from==='me' ? '#F8F2E8' : '#2C1A0E', fontSize:9, lineHeight:1.4, border: m.from==='me' ? 'none' : '1px solid rgba(44,26,14,0.07)' }}>
              {m.text}
            </div>
          </div>
        ))}
        {/* Confirmed chip */}
        <div style={{ alignSelf:'center', background:'#E6F0E6', color:'#2A5A2A', fontSize:8, fontWeight:600, padding:'3px 10px', borderRadius:18, display:'flex', alignItems:'center', gap:3 }}>
          <Ico.Check style={{ width:8, height:8 }}/> Booking confirmed — Jun 14, 3:00 PM
        </div>
      </div>

      {/* Input */}
      <div style={{ padding:'6px 10px', borderTop:'1px solid rgba(44,26,14,0.07)', display:'flex', gap:6, flexShrink:0 }}>
        <div style={{ flex:1, background:'white', borderRadius:18, padding:'5px 10px', fontSize:9, color:'rgba(44,26,14,0.35)', border:'1px solid rgba(44,26,14,0.08)' }}>Message…</div>
        <div style={{ width:26, height:26, borderRadius:'50%', background:'#2C1A0E', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Ico.Arrow style={{ width:11, height:11, color:'#F8F2E8' }}/>
        </div>
      </div>

      <BottomNav active="chat"/>
    </PhoneShell>
  )
}

// ── PACKAGES PHONE ────────────────────────────────────────────
function PackagesPhone() {
  const pkgs = [
    { name:'1-Hour Portrait Session', price:'$150', desc:'Up to 30 edited photos, 1 location', tag:'Casual',      bg:'#E6F0E6', tc:'#2A5A2A' },
    { name:'2-Hour Brand Shoot',      price:'$320', desc:'Lifestyle + product, 2 locations',   tag:'Editorial',  bg:'#E2EEF6', tc:'#1A4A6A' },
    { name:'Golden Hour Mini',        price:'$95',  desc:'20 min, 15 edited photos',            tag:'Golden Hour',bg:'#FAF4D6', tc:'#6A5010' },
  ]
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ padding:'4px 12px 6px', textAlign:'center', flexShrink:0 }}>
        <span style={{ fontSize:8, letterSpacing:'0.22em', fontWeight:700, color:'#2C1A0E' }}>V I S I O N</span>
      </div>

      {/* Profile row */}
      <div style={{ padding:'0 12px 6px', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
        <div style={{ borderRadius:'50%', overflow:'hidden' }}>
          <Avatar.Zoe size={32}/>
        </div>
        <span style={{ fontWeight:700, fontSize:12, color:'#2C1A0E' }}>Zoe Chen</span>
        <Pill label="CREATIVE" size="xs"/>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:5, padding:'0 12px 8px', flexShrink:0 }}>
        {['Portfolio','Packages','Reviews'].map((t,i)=>(
          <span key={t} style={{ fontSize:9, padding:'4px 10px', borderRadius:18, fontWeight:600, background: i===1 ? '#2C1A0E' : 'white', color: i===1 ? '#F8F2E8' : 'rgba(44,26,14,0.5)', border: i===1 ? 'none' : '1px solid rgba(44,26,14,0.1)' }}>{t}</span>
        ))}
      </div>

      {/* Package cards */}
      <div style={{ flex:1, padding:'0 12px', display:'flex', flexDirection:'column', gap:7, overflowY:'hidden' }}>
        {pkgs.map((pkg,i)=>(
          <div key={i} style={{ background:'white', borderRadius:12, padding:'9px 10px', border:'1px solid rgba(44,26,14,0.07)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:11, color:'#2C1A0E', marginBottom:2 }}>{pkg.name}</div>
                <div style={{ fontSize:9, color:'rgba(44,26,14,0.5)', marginBottom:5 }}>{pkg.desc}</div>
                <span style={{ background:pkg.bg, color:pkg.tc, fontSize:8, padding:'2px 7px', borderRadius:18, fontWeight:600 }}>{pkg.tag}</span>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontWeight:800, fontSize:14, color:'#2C1A0E' }}>{pkg.price}</div>
                <button style={{ marginTop:4, background:'#2C1A0E', color:'#F8F2E8', border:'none', borderRadius:14, padding:'3px 9px', fontSize:9, fontWeight:700, cursor:'pointer' }}>Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="profile"/>
    </PhoneShell>
  )
}

// ── LISTING PHONE ─────────────────────────────────────────────
function ListingPhone() {
  return (
    <PhoneShell>
      {/* Header */}
      <div style={{ padding:'4px 14px 6px', flexShrink:0 }}>
        <span style={{ fontSize:8, letterSpacing:'0.22em', fontWeight:700, color:'#2C1A0E' }}>V I S I O N</span>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'hidden', padding:'0 12px', display:'flex', flexDirection:'column', gap:8 }}>
        {/* Hero image */}
        <div style={{ background:'linear-gradient(160deg, #F2C4C4, #D48080)', borderRadius:14, height:130, position:'relative', overflow:'hidden', flexShrink:0 }}>
          <div style={{ position:'absolute', top:'-15%', right:'-10%', width:'60%', paddingBottom:'60%', borderRadius:'50%', background:'rgba(255,255,255,0.18)' }}/>
          <div style={{ position:'absolute', bottom:'-20%', left:'15%', width:'45%', paddingBottom:'45%', borderRadius:'50%', background:'rgba(0,0,0,0.08)' }}/>
          <div style={{ position:'absolute', top:7, left:7, display:'flex', gap:4 }}>
            <Pill label="Filled" size="xs"/>
            <Pill label="Candid" size="xs"/>
          </div>
          {/* Arrows */}
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 7px', pointerEvents:'none' }}>
            {[true,false].map((l,i)=>(
              <div key={i} style={{ width:20, height:20, borderRadius:'50%', background:'rgba(255,255,255,0.85)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Ico.Arrow style={{ width:9, height:9, transform: l ? 'rotate(180deg)' : 'none', color:'#2C1A0E' }}/>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight:700, fontSize:15, color:'#2C1A0E', marginBottom:6 }}>Bridal Shower Photos</div>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:7 }}>
            <Pill label="Filled" size="xs"/>
            <span style={{ background:'#FAF4D6', color:'#6A5010', padding:'3px 8px', fontSize:8, borderRadius:999, fontWeight:600 }}>$150 budget</span>
            <Pill label="Candid" size="xs"/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:9, color:'rgba(44,26,14,0.5)', marginBottom:8 }}>
            <Ico.Map style={{ width:9, height:9 }}/> San Mateo
            <span>·</span>
            <Ico.Calendar style={{ width:9, height:9 }}/> May 17, 1:00 PM – 2:00 PM
          </div>
          <div style={{ background:'white', borderRadius:12, padding:'8px 10px' }}>
            <div style={{ fontSize:7, letterSpacing:'0.08em', fontWeight:700, color:'rgba(44,26,14,0.4)', marginBottom:3 }}>ABOUT</div>
            <div style={{ fontSize:9, color:'rgba(44,26,14,0.65)', lineHeight:1.5 }}>Candid photos and group photos. Preferably in the moment with some posed shots as well.</div>
          </div>
        </div>
      </div>

      <BottomNav active="home"/>
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
          <a href={APP_URL} className="hidden sm:inline-flex items-center bg-espresso text-cream-50 px-4 py-2 rounded-full text-sm font-semibold hover:bg-espresso-dark transition-colors">Get Vision</a>
          <button onClick={()=>setOpen(!open)} className="md:hidden p-2 text-espresso" aria-label="Menu">
            {open ? <Ico.Close style={{width:20,height:20}}/> : <Ico.Menu style={{width:20,height:20}}/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-cream-200/60 bg-cream-100">
          <div className="px-5 py-4 flex flex-col gap-4 text-espresso/80 font-medium">
            <a href="#how" onClick={()=>setOpen(false)}>How it Works</a>
            <a href="#creatives" onClick={()=>setOpen(false)}>For Creatives</a>
            <a href="#bookings" onClick={()=>setOpen(false)}>For Bookings</a>
            <a href="#download" onClick={()=>setOpen(false)}>Download</a>
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
      <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full opacity-35" style={{background:'#F2C4A0',filter:'blur(80px)'}}/>
      <div className="absolute top-48 -left-24 w-80 h-80 rounded-full opacity-25" style={{background:'#B8D4B8',filter:'blur(70px)'}}/>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full opacity-20" style={{background:'#C8B8E0',filter:'blur(60px)'}}/>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-24 pb-16 sm:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{background:'#FBE9D6',color:'#7A3A10'}}>
            <span className="w-1.5 h-1.5 rounded-full" style={{background:'#F2C4A0'}}/>
            Creator booking marketplace
          </div>
          <h1 className="mt-5 text-espresso text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight">
            book your next shoot<br/>
            <span className="italic font-normal" style={{color:'#7A4A2A'}}>without</span> the back-and-forth.
          </h1>
          <p className="mt-5 text-espresso/65 text-base sm:text-lg max-w-lg leading-relaxed">
            Discover creatives by aesthetic, browse real portfolios, view packages, and book content shoots — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[{l:'Golden Hour',bg:'#FAF4D6',c:'#6A5010'},{l:'Editorial',bg:'#E2EEF6',c:'#1A4A6A'},{l:'Casual',bg:'#E6F0E6',c:'#2A5A2A'},{l:'Luxury',bg:'#EDE6F5',c:'#4A2A7A'},{l:'Events',bg:'#FBE9E9',c:'#7A2A2A'}].map(({l,bg,c})=>(
              <span key={l} style={{background:bg,color:c,fontSize:12,padding:'5px 14px',borderRadius:999,fontWeight:600}}>{l}</span>
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
              {[Avatar.Zoe, Avatar.Marcus, Avatar.Sofia, Avatar.Ava].map((Av,i)=>(
                <div key={i} style={{borderRadius:'50%',overflow:'hidden',outline:'2px solid #F8F2E8'}}>
                  <Av size={32}/>
                </div>
              ))}
            </div>
            <p className="text-sm text-espresso/55 font-medium">Photographers · Videographers · Event shooters</p>
          </div>
        </div>

        {/* Right — phone with badges anchored to this container */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative" style={{width: PHONE_W + 80}}>
            {/* Phone positioned to the right of the container */}
            <div style={{marginLeft:'auto', width: PHONE_W}}>
              <HeroPhone/>
            </div>
            {/* Floating badge — anchored top-left of the container, near top of phone */}
            <div className="hidden sm:flex absolute top-16 left-0 bg-white rounded-2xl shadow-soft px-3.5 py-2.5 items-center gap-2.5 border border-cream-200/60" style={{whiteSpace:'nowrap'}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:'#A8D8C8'}}/>
              <span className="text-xs font-semibold text-espresso">New booking request</span>
            </div>
            {/* Bottom-right card */}
            <div className="hidden sm:block absolute bg-white rounded-2xl shadow-soft px-3.5 py-2.5 border border-cream-200/60" style={{bottom:80, left:0}}>
              <div className="text-[10px] text-espresso/50 font-medium">Starting from</div>
              <div className="text-sm font-bold text-espresso">$95 / session</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Problem ───────────────────────────────────────────────────
function Problem() {
  const items = [
    { n:'1', title:'Too many DMs',             body:'Endless back-and-forth across apps just to get a price and a date.',                    bg:'#FBE9E9', num:'#7A2A2A' },
    { n:'2', title:'No clear packages',        body:'Pricing shifts every conversation. Nothing transparent, nothing bookable.',            bg:'#FAF4D6', num:'#6A5010' },
    { n:'3', title:'Hard to compare creatives',body:'Style, rates, and availability are scattered across five different platforms.',         bg:'#EDE6F5', num:'#4A2A7A' },
  ]
  return (
    <section className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The Problem</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">booking content help shouldn't feel like a group project.</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {items.map((it,i)=>(
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base" style={{background:it.bg,color:it.num}}>{it.n}</div>
              <h3 className="mt-5 font-bold text-lg text-espresso">{it.title}</h3>
              <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-espresso/65 text-base sm:text-lg max-w-2xl leading-relaxed">Vision brings portfolios, packages, availability, and booking requests into one clean flow.</p>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const [tab, setTab] = useState('book')
  const steps = {
    book: [
      {n:'01',t:'Browse by aesthetic',       d:'Filter creatives by style — Golden Hour, Editorial, Casual, Luxury, and more.',             color:'#FAF4D6',tc:'#6A5010'},
      {n:'02',t:'View packages & availability',d:'See transparent pricing, real portfolio work, and open dates — all on one profile.',       color:'#E2EEF6',tc:'#1A4A6A'},
      {n:'03',t:'Book & pay securely',        d:'Request a date, confirm, and pay through Stripe Checkout — no DMs needed.',                 color:'#E6F0E6',tc:'#2A5A2A'},
    ],
    create: [
      {n:'01',t:'Build your profile',         d:'Add portfolio, bio, style tags, location, and starting price.',                            color:'#FBE9D6',tc:'#7A3A10'},
      {n:'02',t:'List packages & availability',d:'Create fixed-price packages and toggle instant booking to skip approval delays.',          color:'#EDE6F5',tc:'#4A2A7A'},
      {n:'03',t:'Get booked & get paid',       d:'Accept requests, chat in-app, and receive direct deposits via Stripe Connect.',            color:'#D6EEE8',tc:'#1A5A48'},
    ],
  }
  return (
    <section id="how" className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">How it works</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">simple for both sides of the booking.</h2>
          </div>
          <div className="inline-flex bg-cream-200/80 p-1 rounded-full self-start">
            {[['book','For Bookings'],['create','For Creatives']].map(([k,l])=>(
              <button key={k} id={k==='book'?'bookings':'creatives'} onClick={()=>setTab(k)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${tab===k?'bg-espresso text-cream-50':'text-espresso/60'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {steps[tab].map((s,i)=>(
            <div key={i} className="bg-white rounded-3xl p-7 shadow-card border border-cream-200/50">
              <span className="inline-block font-bold text-2xl px-3 py-1 rounded-xl" style={{background:s.color,color:s.tc}}>{s.n}</span>
              <h3 className="mt-4 font-bold text-lg text-espresso">{s.t}</h3>
              <p className="mt-2 text-espresso/60 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── App Showcase — 3 phones ───────────────────────────────────
function AppShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-cream-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">The App</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">one app. three views. zero confusion.</h2>
          <p className="mt-4 text-espresso/60 text-base leading-relaxed">Clients discover and book. Creatives list and get paid. Everyone stays on the same page.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 items-start justify-center">
          {[
            {Phone:BrowsePhone,  label:'Browse Creatives', bg:'#E6F0E6',tc:'#2A5A2A'},
            {Phone:ChatPhone,    label:'In-App Chat',      bg:'#E2EEF6',tc:'#1A4A6A'},
            {Phone:PackagesPhone,label:'Book a Package',   bg:'#EDE6F5',tc:'#4A2A7A'},
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

// ── Features ──────────────────────────────────────────────────
function Features() {
  const feats = [
    {Ic:Ico.User,     t:'Creator profiles',         b:'Bio, location, style tags, rating, and booking stats on one polished page.',         bg:'#FBE9D6',ic:'#7A3A10'},
    {Ic:Ico.Grid,     t:'Portfolio grids',           b:'Style-tagged work with draggable cover-image positioning, just like your app.',       bg:'#E2EEF6',ic:'#1A4A6A'},
    {Ic:Ico.Package,  t:'Fixed-price packages',      b:'Creatives list clear packages — no negotiating price every single booking.',          bg:'#E6F0E6',ic:'#2A5A2A'},
    {Ic:Ico.Tag,      t:'Aesthetic discovery',       b:'Filter by Golden Hour, Editorial, Casual, Luxury, Events, and more.',                 bg:'#FAF4D6',ic:'#6A5010'},
    {Ic:Ico.Calendar, t:'Availability scheduling',   b:'Weekly slots set by creatives; clients see open dates and request in real time.',     bg:'#EDE6F5',ic:'#4A2A7A'},
    {Ic:Ico.Chat,     t:'In-app messaging',          b:'Coordinate details, negotiate times, confirm everything — without leaving the app.',  bg:'#D6EEE8',ic:'#1A5A48'},
    {Ic:Ico.Stripe,   t:'Stripe payments',           b:'Secure checkout for clients, direct deposits for creatives. Platform takes 5%.',      bg:'#FBE9E9',ic:'#7A2A2A'},
    {Ic:Ico.Lightning,t:'Instant booking',           b:'Toggle it on and clients can lock in without waiting for your approval.',             bg:'#FAF4D6',ic:'#6A5010'},
    {Ic:Ico.Bookmark, t:'Save & shortlist',          b:'Bookmark creatives and listings to build your shortlist before committing.',          bg:'#EDE6F5',ic:'#4A2A7A'},
    {Ic:Ico.Star,     t:'Ratings & reviews',         b:'Both sides leave reviews after a shoot, building trust across the whole platform.',   bg:'#FBE9D6',ic:'#7A3A10'},
    {Ic:Ico.Lock,     t:'Secure & moderated',        b:'Google + email auth, in-app reporting, and an admin dashboard for oversight.',        bg:'#E6F0E6',ic:'#2A5A2A'},
    {Ic:Ico.Download, t:'PWA — no app store',        b:'Install Vision directly from your browser and add it to your home screen.',           bg:'#E2EEF6',ic:'#1A4A6A'},
  ]
  return (
    <section className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Features</span>
          <h2 className="mt-3 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">everything you need to book and get booked.</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {feats.map((f,i)=>(
            <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-cream-200/50 hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{background:f.bg}}>
                <f.Ic style={{width:20,height:20,color:f.ic}}/>
              </div>
              <h3 className="mt-4 font-bold text-base text-espresso">{f.t}</h3>
              <p className="mt-1.5 text-espresso/60 text-sm leading-relaxed">{f.b}</p>
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
    <section id="creatives" className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="flex justify-center">
            <HeroPhone/>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">For Creatives</span>
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">your profile is your portfolio, packages, and calendar — all in one.</h2>
            <div className="mt-8 flex flex-col gap-4">
              {[
                {Ic:Ico.Grid,    label:'Upload portfolio work with style tags and draggable cover images.',    bg:'#FBE9D6',ic:'#7A3A10'},
                {Ic:Ico.Package, label:'Set fixed-price packages — clients book without the back-and-forth.',  bg:'#E6F0E6',ic:'#2A5A2A'},
                {Ic:Ico.Calendar,label:'Toggle instant booking and set weekly availability slots.',             bg:'#EDE6F5',ic:'#4A2A7A'},
                {Ic:Ico.Dollar,  label:'Get paid via Stripe Connect. Track earnings and payout status in one place.',bg:'#E2EEF6',ic:'#1A4A6A'},
              ].map(({Ic,label,bg,ic},i)=>(
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:bg}}>
                    <Ic style={{width:18,height:18,color:ic}}/>
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
            <h2 className="mt-3 text-espresso text-3xl sm:text-4xl font-bold leading-tight">post a listing or browse creatives — either way, you're in control.</h2>
            <p className="mt-4 text-espresso/60 leading-relaxed">Post a custom shoot listing with your budget, location, and vibe — or browse available creatives and book directly from their profile. No DMs, no waiting.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {LISTINGS.map((l,i)=>(
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-cream-200/50">
                  <div style={{background:l.tileBg, height:80, position:'relative', overflow:'hidden'}}>
                    <div style={{position:'absolute',top:'-20%',right:'-10%',width:'55%',paddingBottom:'55%',borderRadius:'50%',background:'rgba(255,255,255,0.15)'}}/>
                    <div style={{position:'absolute',bottom:'-30%',left:'5%',width:'40%',paddingBottom:'40%',borderRadius:'50%',background:'rgba(0,0,0,0.06)'}}/>
                    <span style={{position:'absolute',top:7,left:7,background:'rgba(255,255,255,0.92)',fontSize:9,fontWeight:700,color:'#2C1A0E',padding:'2px 8px',borderRadius:999}}>{l.price}</span>
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-xs text-espresso leading-tight">{l.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Ico.Map style={{width:8,height:8,color:'rgba(44,26,14,0.4)'}}/>
                      <span style={{fontSize:9,color:'rgba(44,26,14,0.5)'}}>{l.location}</span>
                    </div>
                    <div className="mt-1.5"><Pill label={l.tag} size="xs"/></div>
                  </div>
                </div>
              ))}
            </div>
            <a href={APP_URL} className="mt-8 inline-flex items-center gap-2 bg-espresso text-cream-50 px-6 py-3.5 rounded-full font-semibold hover:bg-espresso-dark transition-colors shadow-soft">
              Start Browsing <Ico.Arrow className="w-4 h-4"/>
            </a>
          </div>
          <div className="flex justify-center">
            <ListingPhone/>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PWA ───────────────────────────────────────────────────────
function PWA() {
  return (
    <section id="download" className="py-16 sm:py-24" style={{background:'#FDFAF5'}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="bg-espresso rounded-[2.5rem] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10" style={{background:'#F2C4A0',filter:'blur(50px)'}}/>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{background:'#B8D4E8',filter:'blur(50px)'}}/>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{background:'rgba(248,242,232,0.12)',color:'#F8F2E8'}}>
              <Ico.Download style={{width:12,height:12}}/> Progressive Web App
            </div>
            <h2 className="mt-5 text-cream-50 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">install Vision directly from the web.</h2>
            <p className="mt-5 text-cream-50/65 text-base sm:text-lg leading-relaxed max-w-lg">Vision is a Progressive Web App — open it in your browser, add to your home screen, and use it like a native app. No App Store needed.</p>
            <div className="mt-7">
              <a href={APP_URL} className="inline-flex items-center gap-2 bg-cream-50 text-espresso px-6 py-3.5 rounded-full font-semibold hover:bg-cream-100 transition-colors">
                Open Vision App <Ico.Arrow className="w-4 h-4"/>
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {[
                {step:'1',text:'Open joinvision.app in Safari or Chrome',bg:'#FBE9D6',c:'#7A3A10'},
                {step:'2',text:'Tap "Share" then "Add to Home Screen"',  bg:'#E6F0E6',c:'#2A5A2A'},
                {step:'3',text:'Launch from home screen like any app',   bg:'#E2EEF6',c:'#1A4A6A'},
              ].map(s=>(
                <div key={s.step} className="flex items-center gap-3">
                  <span style={{background:s.bg,color:s.c,fontWeight:700,fontSize:11,width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{s.step}</span>
                  <span className="text-cream-50/75 text-sm">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div style={{width:160}}>
              <div style={{background:'#3A2A1A',borderRadius:32,padding:7,boxShadow:'0 20px 40px rgba(0,0,0,0.4)'}}>
                <div style={{background:'#F8F2E8',borderRadius:26,padding:18,display:'flex',flexDirection:'column',alignItems:'center',minHeight:260}}>
                  <div style={{width:48,height:48,borderRadius:14,background:'#2C1A0E',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:8}}>
                    <span style={{color:'#F8F2E8',fontSize:20,fontWeight:800}}>V</span>
                  </div>
                  <p style={{fontSize:7,letterSpacing:'0.28em',fontWeight:700,color:'#2C1A0E',marginBottom:2}}>V I S I O N</p>
                  <p style={{fontSize:7,color:'rgba(44,26,14,0.5)',marginBottom:14}}>Add to Home Screen</p>
                  <div style={{width:'100%',display:'flex',flexDirection:'column',gap:5}}>
                    <div style={{height:6,background:'#EFE5D4',borderRadius:8}}/>
                    <div style={{height:6,background:'#EFE5D4',borderRadius:8,width:'80%'}}/>
                    <div style={{height:6,background:'#EFE5D4',borderRadius:8,width:'60%'}}/>
                  </div>
                  <button style={{marginTop:14,background:'#2C1A0E',color:'#F8F2E8',border:'none',borderRadius:18,padding:'6px 16px',fontSize:8,fontWeight:700,cursor:'pointer'}}>Install App</button>
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
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-30" style={{background:'#F2C4A0',filter:'blur(70px)'}}/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-25" style={{background:'#B8D4B8',filter:'blur(70px)'}}/>
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-20" style={{background:'#C8B8E0',filter:'blur(60px)'}}/>
      </div>
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Join Vision</span>
        <h2 className="mt-4 text-espresso text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">ready to book or get booked?</h2>
        <p className="mt-5 text-espresso/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">Join Vision and make content bookings feel simple, visual, and organized.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[{l:'Photographers',bg:'#FBE9D6',c:'#7A3A10'},{l:'Videographers',bg:'#E2EEF6',c:'#1A4A6A'},{l:'Event Shooters',bg:'#E6F0E6',c:'#2A5A2A'},{l:'Content Creators',bg:'#EDE6F5',c:'#4A2A7A'},{l:'Brands & Clients',bg:'#FAF4D6',c:'#6A5010'}].map(({l,bg,c})=>(
            <span key={l} style={{background:bg,color:c,fontSize:12,padding:'5px 14px',borderRadius:999,fontWeight:600}}>{l}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
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
          <p className="mt-3 text-espresso/55 text-sm max-w-xs leading-relaxed">A creator booking marketplace for content shoots, events, and creative services.</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[{l:'Golden Hour',bg:'#FAF4D6',c:'#6A5010'},{l:'Editorial',bg:'#E2EEF6',c:'#1A4A6A'},{l:'Casual',bg:'#E6F0E6',c:'#2A5A2A'}].map(({l,bg,c})=>(
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
