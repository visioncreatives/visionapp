import { Link } from 'react-router-dom'
import { LogoLockup } from '../Logo'

const CONTACT = 'hello@joinvision.app'
const EFFECTIVE = 'July 16, 2026'

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-espresso/[0.08]" style={{ background: "#F2F2F2" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link to="/" aria-label="Vision home"><LogoLockup size={26} /></Link>
          <Link to="/contact" className="text-sm font-semibold text-espresso/70 hover:text-espresso transition-colors">Contact Us</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-vision-sm text-espresso/50">Legal</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-light text-espresso leading-tight">Privacy Policy</h1>
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
              <li>Account information (name, email address, date of birth, profile photo)</li>
              <li>Profile content (portfolio images, bio, location, service packages)</li>
              <li>Communications sent through the in-app messaging system</li>
              <li>Booking and transaction details</li>
              <li>Device and browser information for app functionality</li>
            </ul>
            <p className="mt-2">Your date of birth is collected solely to verify and enforce Vision's 18+ age requirement. It is never displayed publicly or shared with other users, and is used only for eligibility verification, legal compliance, fraud prevention, and account security. It is stored securely in accordance with the data handling practices described in this policy.</p>
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
              <li>If required by law, subpoena, or other legal process, or to protect the rights, property, and safety of Vision, our users, or the public</li>
              <li>In connection with a merger, acquisition, financing, or sale of assets, subject to this policy's protections</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties, and have not done so in the preceding 12 months.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">6. Data Retention</h2>
            <p>We retain your information for as long as your account is active or as needed to provide services, comply with our legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data by emailing <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>, subject to any records we are required or permitted to retain by law.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">7. Cookies & Tracking</h2>
            <p>We use essential cookies and local storage to keep you signed in and remember your preferences. We do not use third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">8. Your Rights</h2>
            <p className="mb-2">Depending on your jurisdiction (including under laws such as the California Consumer Privacy Act), you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Know what categories of personal information we collect and how we use it (see Section 2 and Section 3)</li>
              <li>Access, correct, delete, or export your personal data</li>
              <li>Opt out of the sale or sharing of your personal information (Vision does not sell your personal information)</li>
              <li>Not be discriminated against for exercising any of these rights</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>. We may need to verify your identity before fulfilling your request.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">9. Security</h2>
            <p>We use commercially reasonable administrative, technical, and physical safeguards designed to protect your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security. You are responsible for keeping your account credentials confidential.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">10. International Data Transfers</h2>
            <p>Vision is based in the United States, and your information may be processed, stored, and transferred to servers located in the United States or other countries. By using the Service, you consent to the transfer of your information to countries that may have different data protection laws than your own.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">11. Children's Privacy</h2>
            <p>Vision requires all users to be at least 18 years old, and the Service is not directed to or intended for use by anyone under 18. We do not knowingly collect personal information from anyone under 18. If we learn that we have collected information from a user under 18, we will delete that information and terminate the associated account.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">12. Disputes</h2>
            <p>Any dispute arising from this Privacy Policy is subject to the Dispute Resolution & Arbitration provisions in our <Link to="/terms" className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">Terms of Service</Link>, including the binding arbitration and class action waiver provisions described there.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">13. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We'll notify you of significant changes by posting the new policy and updating the effective date above.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">14. Contact</h2>
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
