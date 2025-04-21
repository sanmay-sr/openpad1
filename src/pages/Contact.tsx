import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <LegalLayout title="Contact Us">
      <div className="space-y-8">
        <p className="text-lg">
          We'd love to hear from you. Please reach out using any of the methods below.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-muted-foreground">support@openpadz.app</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-muted-foreground">(123) 456-7890</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-muted-foreground">
                123 OpenPad Way<br />
                San Francisco, CA 94103
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Your message"
              />
            </div>
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </LegalLayout>
  );
} 