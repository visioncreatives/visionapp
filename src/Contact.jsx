import React from 'react'

const CONTACT_EMAIL = "hello@joinvision.app"

// ============================================================
// FAQ LINK — replace this with your actual FAQ URL once it exists.
// Could be an in-app URL, a Notion page, a help center, etc.
// Leave as "#/" for now and it will scroll to the top of the homepage.
// ============================================================
const FAQ_URL = "#/"

export default function Contact() {
  return (
    <div className="bg-cream-100 min-h-screen font-sans">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        <a href="#/" className="text-espresso/60 hover:text-espresso text-sm font-medium inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Back to Vision
        </a>

        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso/50">Contact</span>
        <h1 className="mt-3 text-espresso text-3xl sm:text-5xl font-bold leading-tight">get in touch.</h1>

        <div className="mt-8 space-y-5 text-espresso/70 text-base sm:text-lg leading-relaxed">
          <p>
            Most questions about Vision — how bookings work, how payments are processed, how to set up your profile, refund policies, and more — are already answered in our FAQ. It's the fastest way to get an answer.
          </p>
          <p>
            If you can't find what you're looking for there, or if you have a partnership inquiry, press request, or something we should know about, we'd love to hear from you. Send us a note and we'll get back to you within a few business days.
          </p>
        </div>

        {/* FAQ card */}
        <a
          href={FAQ_URL}
          className="mt-10 block bg-white rounded-2xl border border-cream-200/60 p-6 hover:-translate-y-0.5 transition-transform shadow-card"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#EDE6F5' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#4A2A7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-espresso/50 uppercase tracking-wider">Start here</div>
              <h2 className="text-espresso font-bold text-lg sm:text-xl mt-1">Browse the FAQ</h2>
              <p className="text-espresso/60 text-sm mt-1.5 leading-relaxed">
                Answers to the most common questions about how Vision works for clients and creatives.
              </p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5 text-espresso/40 mt-2 flex-shrink-0">
              <path d="M5 12h14m-5-5 5 5-5 5"/>
            </svg>
          </div>
        </a>

        {/* Email card */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-4 block bg-white rounded-2xl border border-cream-200/60 p-6 hover:-translate-y-0.5 transition-transform shadow-card"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FBE9D6' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#7A3A10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-espresso/50 uppercase tracking-wider">Need more help?</div>
              <h2 className="text-espresso font-bold text-lg sm:text-xl mt-1">Email us</h2>
              <p className="text-espresso/60 text-sm mt-1.5 leading-relaxed">
                For anything the FAQ doesn't cover, reach out and we'll get back to you within a few business days.
              </p>
              <p className="mt-3 text-espresso font-bold text-base">{CONTACT_EMAIL}</p>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5 text-espresso/40 mt-2 flex-shrink-0">
              <path d="M5 12h14m-5-5 5 5-5 5"/>
            </svg>
          </div>
        </a>

        <p className="mt-10 text-xs text-espresso/45 leading-relaxed">
          For privacy or data requests, see our <a href="#/privacy" className="underline hover:text-espresso">Privacy Policy</a>. For terms-related questions, see our <a href="#/terms" className="underline hover:text-espresso">Terms of Service</a>.
        </p>

        <div className="mt-14 pt-8 border-t border-cream-200">
          <a href="#/" className="text-espresso/60 hover:text-espresso text-sm font-medium inline-flex items-center gap-1.5">
            <span>←</span> Back to Vision
          </a>
        </div>
      </div>
    </div>
  )
}
