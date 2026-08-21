import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Gumu Khola Hydropower.",
};

export default function ContactPage() {
  return (
    <div>
      <Hero 
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">
              Whether you have questions about our projects, sustainability initiatives, or career opportunities, our team is ready to answer.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg">Headquarters</h3>
                  <p className="text-muted-foreground mt-1">
                    Lamidanda 05<br />
                    Kalinchowk Rural Muncipality<br />
                    Dolakha, Nepal
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg">Phone</h3>
                  <p className="text-muted-foreground mt-1">
                    +977-9812345678
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg">Email</h3>
                  <p className="text-muted-foreground mt-1">
                    General: info@gumukholahydro.com<br />
                    Careers: careers@gumukholahydro.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg">Business Hours</h3>
                  <p className="text-muted-foreground mt-1">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <select 
                  id="subject" 
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="general">General Inquiry</option>
                  <option value="projects">Project Information</option>
                  <option value="careers">Careers</option>
                  <option value="press">Press/Media</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 px-4 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
