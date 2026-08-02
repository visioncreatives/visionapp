import { Link } from 'react-router-dom'
import { LogoLockup } from '../Logo'

const CONTACT = 'hello@joinvision.app'
const EFFECTIVE = 'July 16, 2026'

export default function TermsOfService() {
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
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-light text-espresso leading-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-espresso/50">Effective date: {EFFECTIVE}</p>

        <div className="mt-10 space-y-8 text-sm text-espresso/70 leading-relaxed">

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using the Vision platform ("Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the Service. These Terms apply to all users, including clients and creatives, and form a binding legal agreement between you and Vision.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">2. Description of Service</h2>
            <p>Vision is a platform that connects clients with independent creative professionals and provides tools for discovery, communication, booking, and payment. Vision is a venue only: we are not a party to, and do not control, the agreements, services, or interactions between clients and creatives.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">3. Eligibility</h2>
            <p className="mb-2">Vision is intended for adult use only. By creating an account, you agree that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least 18 years old to create an account or use Vision</li>
              <li>You represent and warrant that you are at least 18 years old and legally able to enter into binding agreements</li>
              <li>You are responsible for providing accurate information, including your date of birth, when registering</li>
              <li>Vision may suspend or terminate any account found to belong to a user under 18</li>
            </ul>
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
            <h2 className="font-bold text-espresso text-base mb-2">5. Relationship of the Parties</h2>
            <p>Vision is a technology platform, not an employment agency, staffing agency, or party to any transaction between users. Creatives are independent contractors and are not employees, agents, partners, or representatives of Vision. Nothing in these Terms creates an employment, agency, joint venture, or partnership relationship between Vision and any user, or between a client and a creative. Vision does not direct or control the manner in which creatives perform their work, and is not responsible for the acts, omissions, quality of work, or conduct of any user.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">6. For Creatives</h2>
            <p className="mb-2">If you use Vision as a creative professional, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Represent your skills, portfolio, and availability accurately</li>
              <li>Deliver services as described in your accepted booking</li>
              <li>Communicate professionally and respond to messages in a timely manner</li>
              <li>Connect a valid Stripe account to receive payments</li>
              <li>Comply with all applicable tax obligations in your jurisdiction</li>
              <li>Understand that Vision does not guarantee bookings, income, or any particular outcome from using the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">7. For Clients</h2>
            <p className="mb-2">If you use Vision as a client, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate project details when submitting booking requests</li>
              <li>Pay the agreed amount through the Vision platform</li>
              <li>Treat creatives with respect and professionalism</li>
              <li>Not attempt to take transactions off the platform to avoid fees</li>
              <li>Understand that Vision does not guarantee the quality, timeliness, legality, or outcome of any creative's work</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">8. Payments & Fees</h2>
            <p>All payments are processed through Stripe. Vision charges a platform fee on completed transactions, disclosed before booking confirmation. Vision is not responsible for bank fees, currency conversion charges, or tax withholdings. Except as expressly stated in these Terms or required by applicable law, all fees are non-refundable. Vision may change its fees at any time, with notice for existing bookings.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">9. Paid Features & Featured Placement</h2>
            <p className="mb-2">Vision offers optional paid promotional services that allow users to increase the visibility of eligible listings and creative profiles within the platform.</p>

            <h3 className="font-semibold text-espresso mb-2">9.1 Featured Placement</h3>
            <p className="mb-4">Users may purchase Featured Listings or Featured Profiles for a specified duration. A Featured placement may increase visibility within Vision&apos;s search results, discovery feeds, recommendations, or other areas of the platform.</p>

            <h3 className="font-semibold text-espresso mb-2">9.2 No Guarantee of Results</h3>
            <p className="mb-2">A Featured placement is intended to increase visibility only. Vision does not guarantee:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>A specific search ranking or placement</li>
              <li>A minimum number of impressions, views, clicks, inquiries, applications, messages, or bookings</li>
              <li>Increased revenue, business opportunities, or any particular outcome</li>
            </ul>
            <p className="mb-4">Actual performance depends on many factors, including but not limited to user searches, location, category, competition, profile quality, listing quality, availability, user preferences, and other ranking signals.</p>

            <h3 className="font-semibold text-espresso mb-2">9.3 Payment</h3>
            <p className="mb-4">Featured placements are one-time purchases processed through Vision&apos;s authorized payment provider. Featured placement purchases are separate from Vision&apos;s marketplace transaction fees and do not affect platform booking fees or payouts.</p>

            <h3 className="font-semibold text-espresso mb-2">9.4 Refund Policy</h3>
            <p className="mb-4">Once a Featured placement has been activated, the purchase is generally non-refundable, except where required by applicable law or when Vision determines that a refund is appropriate due to a verified technical or billing error.</p>

            <h3 className="font-semibold text-espresso mb-2">9.5 Eligibility & Removal</h3>
            <p className="mb-4">Vision reserves the right to refuse, suspend, or remove a Featured placement if the associated account, listing, or content violates these Terms, Community Guidelines, or becomes ineligible for promotion.</p>

            <h3 className="font-semibold text-espresso mb-2">9.6 Changes to Featured Services</h3>
            <p className="mb-4">Vision may modify pricing, durations, placement methods, ranking algorithms, eligibility requirements, or available feature plans at any time. Changes will not affect feature purchases that have already been activated unless required for security, legal compliance, or platform integrity.</p>

            <h3 className="font-semibold text-espresso mb-2">9.7 Acceptance</h3>
            <p>By purchasing a Featured Listing or Featured Profile, you acknowledge that you have read and agree to these terms and understand that purchasing a feature does not guarantee visibility, engagement, bookings, or business results.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">10. Cancellations & Refunds</h2>
            <p>Cancellation and refund policies are set at the platform level. Disputes should be raised within 72 hours of a booking's scheduled completion by emailing <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>. We will review each case and determine resolution at our sole discretion. Vision's decision on any such dispute is final.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">11. Prohibited Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Post false, misleading, or fraudulent content</li>
              <li>Harass, abuse, threaten, or defame other users</li>
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Attempt to circumvent Vision's payment system or fees</li>
              <li>Scrape, copy, or reproduce platform content without permission</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
              <li>Upload viruses, malware, or other harmful code, or interfere with the Service's operation</li>
              <li>Attempt to gain unauthorized access to any account, system, or network connected to the Service</li>
              <li>Violate any applicable law or any third party's intellectual property, privacy, or publicity rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">12. User Content & License Grant</h2>
            <p className="mb-2">You retain ownership of the content you submit to Vision (including portfolio images, bios, and messages). By submitting content, you grant Vision a worldwide, non-exclusive, royalty-free, sublicensable license to host, store, reproduce, display, and distribute that content solely for the purpose of operating, providing, and promoting the Service. You represent and warrant that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You own or have all necessary rights to the content you upload</li>
              <li>Your content does not infringe or violate any third party's rights</li>
              <li>Your content complies with these Terms and applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">13. Vision's Intellectual Property</h2>
            <p>The Vision name, logo, and all related trademarks, branding, and platform software are the property of Vision or its licensors and are protected by intellectual property law. Nothing in these Terms grants you any right to use Vision's trademarks, branding, or software outside of your ordinary use of the Service, without our prior written consent.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">14. Copyright Complaints</h2>
            <p>If you believe content on Vision infringes your copyright, email <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a> with: identification of the copyrighted work, identification and location of the allegedly infringing material, your contact information, a statement of your good-faith belief that the use is unauthorized, and a statement under penalty of perjury that the information is accurate and that you are authorized to act on the copyright owner's behalf. We may remove content and terminate accounts of repeat infringers at our discretion.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">15. Third-Party Services</h2>
            <p>The Service may link to or integrate with third-party services, including Stripe and app marketplaces such as the Apple App Store. Vision does not control and is not responsible for the content, policies, security, or practices of any third party. Your use of any third-party service is at your own risk and governed by that third party's own terms.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">16. Disclaimers</h2>
            <p className="font-semibold text-espresso">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.</p>
            <p className="mt-2">Vision does not guarantee the identity, quality, accuracy, safety, or legality of any user, content, or work performed through the Service, and is not responsible for disputes between clients and creatives beyond our facilitation role. Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">17. Limitation of Liability</h2>
            <p className="font-semibold text-espresso">TO THE FULLEST EXTENT PERMITTED BY LAW, VISION AND ITS OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING FROM YOUR USE OF THE SERVICE OR ANY INTERACTION WITH ANOTHER USER, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
            <p className="mt-2">Vision's total aggregate liability for any claim arising from these Terms or the Service will not exceed the greater of (a) the amount of fees you paid to Vision in the 12 months preceding the claim, or (b) $100. Some jurisdictions do not allow the limitation of certain damages, so some of the above limitations may not apply to you.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">18. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless Vision and its officers, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to: your use of the Service; your content; your violation of these Terms or any law; your violation of any third party's rights; or any dispute between you and another user.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">19. Dispute Resolution & Arbitration</h2>
            <p className="mb-2">Please read this section carefully — it affects your legal rights.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Before filing a claim, you agree to try to resolve the dispute informally by emailing <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a> and allowing 30 days for resolution.</li>
              <li>If informal resolution fails, you and Vision agree that any dispute arising from these Terms or the Service will be resolved by binding arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, rather than in court, except that either party may bring an individual claim in small claims court, and Vision may seek injunctive relief in court to protect its intellectual property or the security of the Service.</li>
              <li className="font-semibold text-espresso">YOU AND VISION EACH WAIVE THE RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN A CLASS ACTION OR CLASS ARBITRATION.</li>
              <li>You may opt out of this arbitration agreement by emailing <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a> within 30 days of first accepting these Terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">20. Termination</h2>
            <p>We reserve the right to suspend or terminate any account that violates these Terms, at our discretion and without prior notice. You may close your account at any time by contacting us at <a href={`mailto:${CONTACT}`} className="text-espresso font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">{CONTACT}</a>. Sections of these Terms that by their nature should survive termination (including Sections 12–19) will survive.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">21. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms. We will notify you of material changes by email or in-app notice.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">22. Governing Law & Venue</h2>
            <p>These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Subject to Section 19 (Dispute Resolution & Arbitration), any claim not subject to arbitration will be brought exclusively in the state or federal courts located in California, and you consent to that jurisdiction and venue.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">23. Miscellaneous</h2>
            <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Vision regarding the Service. If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any right or provision is not a waiver of that right or provision. You may not assign these Terms without our prior written consent; we may assign these Terms without restriction. Neither party is liable for delays or failures caused by events beyond its reasonable control.</p>
          </section>

          <section>
            <h2 className="font-bold text-espresso text-base mb-2">24. Contact</h2>
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
