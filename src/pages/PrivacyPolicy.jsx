import { Link } from 'react-router-dom'

const CONTACT = 'hello@joinvision.app'
const EFFECTIVE = 'May 26, 2025'

export default function PrivacyPolicy() {
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
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-espresso leading-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-espresso/50">Effective date: {EFFECTIVE}</p>

        <div className="mt-10 space-y-8 text-sm text-espresso/70 leading-relaxed">

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">1. Who We Are</h2>
            <p>Vision ("we", "us", or "our") operates the Vision creative marketplace platform, accessible as a Progressive Web App. Our contact email is <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information (name, email address, profile photo)</li>
              <li>Profile content (portfolio images, bio, location, service packages)</li>
              <li>Communications sent through the in-app messaging system</li>
              <li>Booking and transaction details</li>
              <li>Device and browser information for app functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">3. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and improve the Vision platform</li>
              <li>Facilitate bookings and payments between clients and creatives</li>
              <li>Send transactional emails (booking confirmations, receipts)</li>
              <li>Respond to support requests</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">4. Payments</h2>
            <p>All payments are processed by Stripe. We do not store credit card or bank account details on our servers. Stripe's privacy policy governs how payment data is handled. Please review <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">stripe.com/privacy</a> for details.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">5. Sharing Your Information</h2>
            <p className="mb-2">We share information only in these limited circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>With other users, to the extent necessary to complete a booking (e.g., your name and profile are visible to users you transact with)</li>
              <li>With Stripe for payment processing</li>
              <li>With service providers who assist our operations, under confidentiality obligations</li>
              <li>If required by law or to protect the rights and safety of Vision and its users</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">6. Data Retention</h2>
            <p>We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by emailing <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">7. Cookies & Tracking</h2>
            <p>We use essential cookies and local storage to keep you signed in and remember your preferences. We do not use third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have rights to access, correct, delete, or export your personal data. To exercise these rights, contact us at <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">9. Children's Privacy</h2>
            <p>Vision is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us and we will delete it.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We'll notify you of significant changes by posting the new policy and updating the effective date above.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">11. Contact</h2>
            <p>Questions about this policy? Email us at <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>.</p>
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
