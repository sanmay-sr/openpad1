import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";

const Terms = () => {
  return (
    <LegalLayout 
      title="Terms of Service" 
      lastUpdated="April 21, 2024"
    >
      <div className={cn("space-y-8", animations.fadeIn({ delay: 0.1 }))}>
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using OpenPad, you accept and agree to be bound by the terms and provision of this agreement.
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground mb-4">
            OpenPad provides a platform for creating, sharing, and collaborating on text and code snippets. The service allows users to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Create and edit notes with custom URLs</li>
            <li>Share content with others</li>
            <li>Save and organize favorite notes</li>
            <li>Reserve custom URLs (for registered users)</li>
            <li>Collaborate in real-time with other users</li>
            <li>Use syntax highlighting for code snippets</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="text-muted-foreground mb-4">As a user of OpenPad, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide accurate information when creating an account</li>
            <li>Maintain the security of your account credentials</li>
            <li>Not use the service for any illegal purposes</li>
            <li>Not share content that violates intellectual property rights</li>
            <li>Not engage in any activity that could harm the service or other users</li>
            <li>Not attempt to access accounts or data that don't belong to you</li>
            <li>Not use automated means to access the service without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Content Ownership</h2>
          <p className="text-muted-foreground">
            You retain ownership of any content you create and share on OpenPad. However, by using our service, you grant us a license to store, display, and distribute your content. We will never claim ownership of your content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Account Termination</h2>
          <p className="text-muted-foreground">
            We reserve the right to terminate or suspend your account at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Service Modifications</h2>
          <p className="text-muted-foreground">
            OpenPad reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            OpenPad shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms, please contact us at <a href="mailto:support@openpad.io" className="text-primary hover:underline">support@openpad.io</a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Terms; 