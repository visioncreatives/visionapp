import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "What is Vision?",
        a: "Vision is a creative marketplace that connects clients with photographers, videographers, content creators, stylists, makeup artists, and other creatives. Browse portfolios, send project requests, message in-app, and pay — all in one place.",
      },
      {
        q: "Is Vision free to use?",
        a: "Browsing and creating a profile is free. Vision takes a small platform fee on completed bookings to keep the service running. Full pricing details are available in the app.",
      },
      {
        q: "What devices does Vision support?",
        a: "Vision is a Progressive Web App (PWA) — you can install it directly from your browser on any device (iPhone, Android, desktop) without going through an app store. Just tap 'Add to Home Screen' when prompted.",
      },
    ],
  },
  {
    category: "For Clients",
    items: [
      {
        q: "How do I find and book a creative?",
        a: "Browse creatives by category, location, or style. Open a profile to view their portfolio, packages, and availability. Send a project request directly through the app and confirm the details in chat before paying.",
      },
      {
        q: "How does payment work?",
        a: "Payments are processed securely through Stripe. Funds are held until the project is confirmed complete, protecting both parties.",
      },
      {
        q: "What if I'm not happy with the work?",
        a: "We encourage clear communication through the in-app messaging before any booking is confirmed. If you have a dispute, contact us at hello@joinvision.app and we'll help mediate.",
      },
      {
        q: "Can I message a creative before booking?",
        a: "Yes — you can reach out to any creative through the in-app chat before sending a formal booking request.",
      },
    ],
  },
  {
    category: "For Creatives",
    items: [
      {
        q: "How do I set up my profile?",
        a: "Create an account, upload portfolio work with style tags, add your location and bio, then list your packages and set your pricing. Your aesthetic is your pitch — make it count.",
      },
      {
        q: "How do I get paid?",
        a: "Connect your Stripe account and earnings deposit directly to your bank after each completed booking. Track everything in your earnings dashboard.",
      },
      {
        q: "Can I set my own availability?",
        a: "Yes — set your weekly available slots and toggle instant booking on or off. You're always in control of when and how you work.",
      },
      {
        q: "How do clients discover my profile?",
        a: "Clients search by category, location, style tags, and budget. A complete profile with strong portfolio images and clear packages will rank higher in search results.",
      },
    ],
  },
  {
    category: "Payments & Security",
    items: [
      {
        q: "Is my payment information secure?",
        a: "Yes. All payments are handled by Stripe, a PCI-DSS Level 1 certified payment processor. Vision never stores your card details.",
      },
      {
        q: "When does a creative receive payment?",
        a: "Payment is released to the creative after the booking is marked complete by both parties, typically within 1–3 business days depending on your bank.",
      },
    ],
  },
]

function Chevron({ open }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-cream-200/80 rounded-2xl overflow-hidden"
      style={{ background: 'white' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left text-espresso font-semibold text-sm hover:bg-cream-100/60 transition-colors"
      >
        {q}
        <Chevron open={open} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-espresso/65 leading-relaxed border-t border-cream-200/50 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="bg-cream-100 min-h-screen font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-cream-200/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-vision text-espresso text-sm">V I S I O N</Link>
          <Link to="/contact" className="text-sm font-semibold text-espresso/70 hover:text-espresso transition-colors">Contact Us</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Support</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-espresso leading-tight">Frequently Asked Questions</h1>
        <p className="mt-4 text-espresso/60 text-base leading-relaxed">
          Can't find what you're looking for?{' '}
          <Link to="/contact" className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
            Contact us
          </Link>{' '}
          and we'll be happy to help.
        </p>

        <div className="mt-12 space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50 mb-4">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-200/80 py-8 px-5 sm:px-8 text-center text-xs text-espresso/40">
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
