import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Mail, HelpCircle, Briefcase, Clock } from "lucide-react";

const Contact = () => {
  return (
    <LegalLayout 
      title="Contact Us" 
      lastUpdated="April 21, 2024"
    >
      <div className={cn("space-y-8", animations.fadeIn({ delay: 0.1 }))}>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground">
            We'd love to hear from you! Whether you have a question about features, need help with your account,
            or want to provide feedback, we're here to help.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">General Inquiries</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              For general questions about OpenPad, partnerships, or media inquiries.
            </p>
            <a 
              href="mailto:contact@openpad.io" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              contact@openpad.io
            </a>
          </div>

          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Technical Support</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Need help with your account or experiencing technical issues?
            </p>
            <a 
              href="mailto:support@openpad.io" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              support@openpad.io
            </a>
          </div>

          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Business Inquiries</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Interested in business partnerships or enterprise solutions?
            </p>
            <a 
              href="mailto:business@openpad.io" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              business@openpad.io
            </a>
          </div>

          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Response Time</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              We typically respond to all inquiries within 24-48 hours during business days.
            </p>
            <p className="text-sm text-muted-foreground">
              Business hours: Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border/30 bg-card">
              <h3 className="font-semibold mb-2">How do I reset my password?</h3>
              <p className="text-muted-foreground">
                You can reset your password by clicking the "Forgot Password" link on the login page. We'll send you an email with instructions to reset your password.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/30 bg-card">
              <h3 className="font-semibold mb-2">Can I delete my account?</h3>
              <p className="text-muted-foreground">
                Yes, you can delete your account at any time. Go to your account settings and click on "Delete Account". Please note that this action cannot be undone.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border/30 bg-card">
              <h3 className="font-semibold mb-2">How do I report a bug?</h3>
              <p className="text-muted-foreground">
                If you encounter any issues, please email us at <a href="mailto:support@openpad.io" className="text-primary hover:underline">support@openpad.io</a> with a detailed description of the problem.
              </p>
            </div>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Contact; 