import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";

const Privacy = () => {
  return (
    <LegalLayout 
      title="Privacy Policy" 
      lastUpdated="April 21, 2024"
    >
      <div className={cn("space-y-8", animations.fadeIn({ delay: 0.1 }))}>
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information to provide better services to our users. The types of information we collect include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Account information (email, username)</li>
            <li>Content you create and share on OpenPad</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
          <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Send important updates and notifications</li>
            <li>Prevent abuse and ensure security</li>
            <li>Analyze usage patterns and trends</li>
            <li>Personalize your experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-muted-foreground mb-4">
            We do not sell your personal information. We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist in our operations</li>
            <li>In case of business transfers or acquisitions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure. We use industry-standard encryption and security practices to safeguard your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-muted-foreground mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
            <li>Object to certain data processing activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
          <p className="text-muted-foreground">
            We use cookies and similar technologies to improve your experience and analyze usage. You can control cookie settings through your browser. We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device until they expire or you delete them).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of our service after any changes indicates your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@openpad.io" className="text-primary hover:underline">privacy@openpad.io</a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Privacy; 