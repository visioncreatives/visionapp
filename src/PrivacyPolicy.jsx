import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="bg-cream-100 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        {/* Header */}
        <a href="#/" className="text-espresso/60 hover:text-espresso text-sm font-medium inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Back to Vision
        </a>

        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso/50">Legal</span>
        <h1 className="mt-3 text-espresso text-3xl sm:text-5xl font-bold leading-tight">Privacy Policy</h1>
        <p className="mt-4 text-espresso/55 text-sm">Last updated: May 26, 2026</p>

        <div className="mt-10 space-y-8 text-espresso/75 text-base leading-relaxed">
          <section>
            <p>
              Vision ("we," "us," or "our") operates the Vision website and mobile application (collectively, the "Service"), a creative marketplace that connects clients with creatives for content, branding, events, and other creative projects. This Privacy Policy explains how we collect, use, share, and protect information about you when you use the Service.
            </p>
            <p className="mt-3">
              By using Vision, you agree to the practices described in this Policy. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="mb-3"><strong className="text-espresso">Account information.</strong> When you create an account, we collect your name, email address, password, profile photo, location (city), and account type (client or creative).</p>
            <p className="mb-3"><strong className="text-espresso">Profile and portfolio content.</strong> Creatives may upload portfolio work, packages, pricing, availability, and biographical details. This information is visible to other users of the Service.</p>
            <p className="mb-3"><strong className="text-espresso">Booking and project information.</strong> When you send or receive a booking request, we collect details about the project (date, location, scope, budget) and any messages exchanged between users.</p>
            <p className="mb-3"><strong className="text-espresso">Payment information.</strong> Payments are processed through Stripe. We do not store full credit card numbers on our servers. We receive limited information from Stripe (last four digits, card brand, transaction status) to display history and resolve disputes.</p>
            <p className="mb-3"><strong className="text-espresso">Usage data.</strong> We automatically collect information about how you use the Service, including pages viewed, features used, device type, browser type, IP address, and approximate location derived from your IP.</p>
            <p><strong className="text-espresso">Cookies and similar technologies.</strong> We use cookies to keep you signed in, remember preferences, and analyze how the Service is used.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Provide, maintain, and improve the Service.</li>
              <li>Process bookings and payments between clients and creatives.</li>
              <li>Display creative profiles, portfolios, and packages to other users.</li>
              <li>Send service-related communications (booking confirmations, receipts, account notices).</li>
              <li>Send marketing communications, where permitted by law and only if you have not opted out.</li>
              <li>Detect and prevent fraud, abuse, and violations of our Terms of Service.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">3. How We Share Your Information</h2>
            <p className="mb-3"><strong className="text-espresso">With other users.</strong> Creative profiles, portfolios, packages, ratings, and reviews are visible to other Vision users. Booking information is shared with the parties involved in that booking.</p>
            <p className="mb-3"><strong className="text-espresso">With service providers.</strong> We share information with vendors who help us run the Service, including Stripe (payments), cloud hosting providers, analytics providers, and customer support tools. These providers are contractually limited to using your data only on our behalf.</p>
            <p className="mb-3"><strong className="text-espresso">For legal reasons.</strong> We may disclose information if required by law, subpoena, or other legal process, or if we believe disclosure is necessary to protect rights, property, or safety.</p>
            <p><strong className="text-espresso">In a business transfer.</strong> If Vision is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your information becomes subject to a different privacy policy.</p>
            <p className="mt-3">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">4. Your Rights and Choices</h2>
            <p className="mb-3">Depending on where you live, you may have the following rights with respect to your personal information:</p>
            <ul className="list-disc pl-6 space-y-1.5 mb-3">
              <li>Access the personal information we hold about you.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>Delete your account and personal information, subject to certain legal exceptions.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Request a portable copy of your data.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
            <p><strong className="text-espresso">California residents</strong> have additional rights under the CCPA/CPRA, including the right to know what personal information is collected, the right to deletion, the right to correct, and the right to opt out of the sale or sharing of personal information. We do not sell personal information.</p>
            <p className="mt-3"><strong className="text-espresso">EU/UK residents</strong> have rights under the GDPR/UK GDPR, including the rights listed above and the right to lodge a complaint with a supervisory authority.</p>
            <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:hello@joinvision.app" className="text-espresso underline font-medium">hello@joinvision.app</a>.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">5. Data Security</h2>
            <p>We use industry-standard administrative, technical, and physical safeguards to protect your information from unauthorized access, alteration, disclosure, and destruction. No system is 100% secure, so we cannot guarantee absolute security. You are responsible for keeping your password confidential.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">6. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide the Service. We may retain information after account closure to comply with legal obligations, resolve disputes, prevent fraud, and enforce our agreements.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">7. International Data Transfers</h2>
            <p>Vision is based in the United States. If you access the Service from outside the U.S., your information may be transferred to, stored, and processed in the U.S. or other countries where we and our service providers operate. We use appropriate safeguards (such as Standard Contractual Clauses) when transferring data from the EU/UK.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">8. Children's Privacy</h2>
            <p>Vision is not intended for users under 18. We do not knowingly collect personal information from anyone under 18. If we learn we have collected information from someone under 18, we will delete it. If you believe a minor has provided us with personal information, please contact us.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">9. Third-Party Links and Services</h2>
            <p>The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to read their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through the Service before the changes take effect. The "Last updated" date at the top reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="text-espresso text-xl sm:text-2xl font-bold mb-3">11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, please reach out:</p>
            <p className="mt-3">
              <a href="mailto:hello@joinvision.app" className="text-espresso underline font-medium">hello@joinvision.app</a>
            </p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-cream-200">
          <a href="#/" className="text-espresso/60 hover:text-espresso text-sm font-medium inline-flex items-center gap-1.5">
            <span>←</span> Back to Vision
          </a>
        </div>
      </div>
    </div>
  )
}
