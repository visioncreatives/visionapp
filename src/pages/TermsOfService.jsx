import { Link } from 'react-router-dom'

const CONTACT = 'hello@joinvision.app'
const EFFECTIVE = 'May 26, 2025'

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-espresso/[0.08]" style={{ background: "#F2F2F2" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-vision text-espresso text-sm">V I S I O N</Link>
          <Link to="/contact" className="text-sm font-semibold text-espresso/70 hover:text-espresso transition-colors">Contact Us</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Legal</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-espresso leading-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-espresso/50">Effective date: {EFFECTIVE}</p>

        <div className="mt-10 space-y-8 text-sm text-espresso/70 leading-relaxed">

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using the Vision platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service. These terms apply to all users, including clients and creatives.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">2. Description of Service</h2>
            <p>Vision is a marketplace that connects clients with creative professionals. We provide tools for discovery, communication, booking, and payment. Vision is not a party to the agreements between clients and creatives — we facilitate the connection.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">3. Eligibility</h2>
            <p>You must be at least 18 years old to use Vision. By using the Service, you represent that you are 18 or older and have the legal capacity to enter into these Terms.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">4. User Accounts</h2>
            <p className="mb-2">When you create an account, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and truthful information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Be responsible for all activity under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">5. For Creatives</h2>
            <p className="mb-2">If you use Vision as a creative professional, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Represent your skills, portfolio, and availability accurately</li>
              <li>Deliver services as described in your accepted booking</li>
              <li>Communicate professionally and respond to messages in a timely manner</li>
              <li>Connect a valid Stripe account to receive payments</li>
              <li>Comply with all applicable tax obligations in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">6. For Clients</h2>
            <p className="mb-2">If you use Vision as a client, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate project details when submitting booking requests</li>
              <li>Pay the agreed amount through the Vision platform</li>
              <li>Treat creatives with respect and professionalism</li>
              <li>Not attempt to take transactions off the platform to avoid fees</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">7. Payments & Fees</h2>
            <p>All payments are processed through Stripe. Vision charges a platform fee on completed transactions. Fees are disclosed before booking confirmation. Vision is not responsible for bank fees, currency conversion charges, or tax withholdings.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">8. Cancellations & Refunds</h2>
            <p>Cancellation and refund policies are set at the platform level. Disputes should be raised within 72 hours of a booking's scheduled completion by emailing <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>. We will review each case and determine resolution at our discretion.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">9. Prohibited Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Post false, misleading, or fraudulent content</li>
              <li>Harass, abuse, or threaten other users</li>
              <li>Use the platform for any illegal purpose</li>
              <li>Attempt to circumvent Vision's payment system</li>
              <li>Scrape, copy, or reproduce platform content without permission</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">10. Intellectual Property</h2>
            <p>Creatives retain ownership of their original work. By uploading content to Vision, you grant us a limited, non-exclusive license to display it on the platform for the purpose of providing the Service. You represent that you own or have rights to all content you upload.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">11. Disclaimers</h2>
            <p>Vision is provided "as is" without warranties of any kind. We do not guarantee the quality, accuracy, or suitability of any creative's work. We are not responsible for disputes between clients and creatives beyond our facilitation role.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">12. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Vision shall not be liable for any indirect, incidental, special, or consequential damages arising from use of the Service. Our total liability shall not exceed the fees you paid to Vision in the 3 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">13. Termination</h2>
            <p>We reserve the right to suspend or terminate any account that violates these Terms, at our discretion and without prior notice. You may close your account at any time by contacting us at <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">14. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms. We will notify you of material changes by email or in-app notice.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">15. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the courts of California.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">16. Contact</h2>
            <p>Questions about these Terms? Email us at <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>.</p>
          </section>

        </div>
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
