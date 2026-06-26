import { Link } from 'react-router-dom'

export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-espresso/[0.08]" style={{ background: "#F2F2F2" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-vision text-espresso text-sm">V I S I O N</Link>
          <Link to="/faq" className="text-sm font-semibold text-espresso/70 hover:text-espresso transition-colors">FAQ</Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Get in Touch</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-espresso leading-tight">Contact Us</h1>
        <p className="mt-4 text-espresso/60 text-base leading-relaxed">
          We're here to help. Before reaching out, check our{' '}
          <Link to="/faq" className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
            FAQ page
          </Link>{' '}
          — most questions about bookings, payments, profiles, and the app are answered there.
        </p>

        {/* FAQ nudge card */}
        <div
          className="mt-8 rounded-2xl p-6 flex items-start gap-4"
          style={{ background: '#FBE9D6' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#F4D4B0' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A3A10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm text-espresso">Check the FAQ first</p>
            <p className="mt-1 text-sm text-espresso/65 leading-relaxed">
              We've answered the most common questions about using Vision — for both clients and creatives.
            </p>
            <Link
              to="/faq"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-espresso hover:opacity-70 transition-opacity"
            >
              Browse FAQ →
            </Link>
          </div>
        </div>

        {/* Email card */}
        <div
          className="mt-4 rounded-2xl p-6 flex items-start gap-4"
          style={{ background: 'white', border: '1px solid rgba(44,26,14,0.08)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#F0EBE4' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C1A0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm text-espresso">Still have questions?</p>
            <p className="mt-1 text-sm text-espresso/65 leading-relaxed">
              Send us an email and we'll get back to you within 1–2 business days.
            </p>
            <a
              href="mailto:hello@joinvision.app"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-espresso hover:opacity-70 transition-opacity"
            >
              hello@joinvision.app
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-espresso/40 leading-relaxed">
          For urgent matters related to payments or account security, please include your registered email address in your message so we can assist you faster.
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-espresso/[0.08] py-8 px-5 sm:px-8 text-center text-xs text-espresso/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} Vision. All rights reserved.</span>
          <div className="flex gap-5">
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
